"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async signup(dto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            });
            delete user.hash;
            return user;
        }
        catch (error) {
            if (error instanceof
                client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('User with this email already exists');
                }
            }
            throw error;
        }
    }
    async signin(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user)
            throw new common_1.ForbiddenException('Email incorrect');
        const pwMatches = await argon.verify(user.hash, dto.password);
        if (!pwMatches)
            throw new common_1.ForbiddenException('Password incorrect');
        return this.signTokens(user.id, user.email);
    }
    async signTokens(userId, email) {
        const payload = {
            sub: userId,
            email,
        };
        const access_token = await this.jwt.signAsync(payload, {
            expiresIn: '1m',
            secret: this.config.get('JWT_ACCESS_SECRET'),
        });
        const refresh_token = await this.jwt.signAsync(payload, {
            expiresIn: '5d',
            secret: this.config.get('JWT_REFRESH_SECRET'),
        });
        const hash = await argon.hash(refresh_token);
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                refreshToken: hash,
            },
        });
        return { access_token, refresh_token };
    }
    async refreshTokens(refreshToken) {
        const decode = await this.jwt.decode(refreshToken);
        if (!decode) {
            throw new common_1.HttpException("Cannot decode refresh_token", 500);
        }
        console.log(decode);
        const user = await this.prisma.user.findUnique({
            where: {
                email: decode.email,
            },
        });
        if (!user || !user.refreshToken)
            throw new common_1.ForbiddenException('Access denied');
        const tokenMatches = await argon.verify(user.refreshToken, refreshToken);
        if (!tokenMatches)
            throw new common_1.ForbiddenException('Access denied');
        return await this.signTokens(decode.sub, user.email);
    }
    async logout(userId) {
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                refreshToken: null,
            },
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map