import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository
    ){
        super(                                                             // PassportStrategy를 상속했기 때문에 super() 콜
            {
                secretOrKey : 'Secret1234',                                // 서버에서 토큰이 유효한지 체크하기 위해 사용
                jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()  // Bearer Token으로 요청을 보낼 것이기 때문에 설정
            }
        );
    }

    async validate(payload : { username : string, iat? : number , exp? : number }) : Promise<User> {
        const { username } = payload;
        const user : User = await this.userRepository.findOne({ username });
        if(!user){
            throw new UnauthorizedException(`UnauthorizedUser : ${username}`);
        }

        return user;

    }
}