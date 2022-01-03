import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    // DI
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
        
        private jwtService : JwtService
    ){}

    // 회원가입
    async signUp(authCredentialsDto : AuthCredentialsDto) : Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);  
    }

    // 로그인
    async signIn(authCredentialsDto : AuthCredentialsDto) : Promise<{ accessToken : string }> {
        
        const {username, password} = authCredentialsDto;
        
        // userRepository에서 CRUD API의 findOne 메소드로 username과 일치하는 객체를 하나 찾음
        const user = await this.userRepository.findOne({username});

        if(user && (await bcrypt.compare(password, user.password))) {

            // 유저 토큰 생성 (secret + payload)
            const payload = { username }                               // payload에는 중요한 정보를 넣으면 안됨 (당연)
            const accessToken = await this.jwtService.sign(payload);   // jwtService에서 자동으로 secret와 payload를 이용하여 액세스 토큰을 만들어줌!
            return { accessToken };
            // return 'login success';
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}
