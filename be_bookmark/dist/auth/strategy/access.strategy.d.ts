import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
declare const AccessStrategy_base: new (...args: any[]) => Strategy;
export declare class AccessStrategy extends AccessStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(payload: {
        sub: number;
        email: string;
    }): Promise<import(".prisma/client").User>;
}
export {};
