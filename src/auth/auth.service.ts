import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {

    // DI
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository
    ){}

    // 회원가입
    async signUp(authCredentialsDto : AuthCredentialsDto) : Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }
}
