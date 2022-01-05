import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import * as config from 'config';

const jwtConfig : { secret, expiresIn }= config.get('jwt');
@Module({
  imports : [
    TypeOrmModule.forFeature([UserRepository]),           // 1. TypeOrmModule 등록
    // UserRepository를 다른 곳에서도 사용하기 위해 imports
    JwtModule.register({                                  // 2. JwtModule 등록
      secret : process.env.JWT_SECRET || jwtConfig.secret,      // JWT의 Secret을 입력하는 부분
      signOptions : {             // 토큰의 만료시간, 알고리즘, 인코딩 등을 설정할 수 있는 옵션
        expiresIn : jwtConfig.expiresIn,       
      }
    }),
   PassportModule.register({defaultStrategy : 'jwt'})     // 3. PassportModule 등록 
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],                  // 4. 생성한 JwtStrategy를 providers에 등록
  exports : [JwtStrategy, PassportModule]                 // 5. 다른 모듈에서 JwtStrategy, PassportModule를 사용하기 위해 exports에 등록
})
export class AuthModule {}
