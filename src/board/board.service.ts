import { Injectable } from '@nestjs/common';
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
  getBoardById(id : number) : Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  // 2. 게시글 생성
  createBoard(createBoardDto : CreateBoardDto) : Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }
}
