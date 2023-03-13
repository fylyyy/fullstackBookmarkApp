export class TokenPayload {
    constructor(sub: number, email: string) {
        this.sub = sub
        this.email = email
    }

    sub: number
    email: string
}