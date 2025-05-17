import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(username:string, pass:string) {
        const user = await this.usersService.findOneByUsername(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = {sub: user.id, username: user.username, roles: user.roles? user.roles.map(r => r.type) : []}
        const token = await this.jwtService.signAsync(payload);
        return {
            access_token: token
        };
    }
}
