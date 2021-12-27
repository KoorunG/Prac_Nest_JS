import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.status';
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/createBoard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardService {
  // private boards : Board[] = [];

  // getAllBoards() : Board[] {
  //   return this.boards;
  // }

  // createBoard(createBoardDto : CreateBoardDto) : Board {

  //   const {title, description} = createBoardDto;  // 구조 객체 분해
  //   const board = {
  //     id : uuid(),    // id는 모든 게시물에서 unique해야 한다 => DB를 이용하는 것이 아니므로 uuid를 이용하자
  //     title, 
  //     description, 
  //     status : BoardStatus.PUBLIC
  //     }

  //     this.boards.push(board);
      
  //     return board;
  // }

  // getBoardById(id : string) : Board {
  //   const found = this.boards.find((board) => board.id == id); // 배열에서 find(predicate) 메소드를 이용하여 조회

  //   if(!found){
  //     throw new NotFoundException(`Can't find Board with id : ${id}`);
  //   }

  //   return found;
  // }

  // deleteBoard(id : string) : void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id != found.id);
  // }

  // updateBoardStatus(id : string, status : BoardStatus) : Board {
  //   const board = this.getBoardById(id);    // 1. id로 게시글 조회
  //   board.status = status;                  // 2. board.status를 파라미터로 받은 status로 교체
  //   return board;
  // }


  // ################## Use PostgreSQL ################## //

  // Repository를 Service에 DI
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository : BoardRepository
  ){}

  // 1. 특정 게시글 조회
  async getBoardById(id : number) : Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if(!found) {
      throw new NotFoundException(`Can't find Board with id : ${id}`);
    }
    
    return found;
  }

  // 2. 게시글 생성
  async createBoard(createBoardDto : CreateBoardDto) : Promise<Board> {
    const {title, description} = createBoardDto;

    // 2-1. create()로 객체를 생성한 뒤
    const board = this.boardRepository.create({
      title,
      description,
      status : BoardStatus.PUBLIC
    });
    
    // 2-2. save()로 DB에 값을 저장한다!
    await this.boardRepository.save(board);
    return board;
  }
}
