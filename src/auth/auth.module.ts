import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';

@Module({
  imports : [
    TypeOrmModule.forFeature([UserRepository])  
    // UserRepository를 다른 곳에서도 사용하기 위해 imports
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
