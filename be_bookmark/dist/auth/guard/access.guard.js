"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessGuard = void 0;
const passport_1 = require("@nestjs/passport");
class AccessGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor() {
        super();
    }
}
exports.AccessGuard = AccessGuard;
//# sourceMappingURL=access.guard.js.map