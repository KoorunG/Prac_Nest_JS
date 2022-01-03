import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardController } from './board.controller';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([BoardRepository]),
    AuthModule
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
