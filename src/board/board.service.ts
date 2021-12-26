import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/createBoard.dto';

@Injectable()
export class BoardService {
  private boards : Board[] = [];

  getAllBoards() : Board[] {
    return this.boards;
  }

  createBoard(createBoardDto : CreateBoardDto) : Board {

    const {title, description} = createBoardDto;  // 구조 객체 분해
    const board = {
      id : uuid(),    // id는 모든 게시물에서 unique해야 한다 => DB를 이용하는 것이 아니므로 uuid를 이용하자
      title, 
      description, 
      status : BoardStatus.PUBLIC
      }

      this.boards.push(board);
      
      return board;
  }

  getBoardById(id : string) : Board {
    const found = this.boards.find((board) => board.id == id); // 배열에서 find(predicate) 메소드를 이용하여 조회

    if(!found){
      throw new NotFoundException(`Can't find Board with id : ${id}`);
    }

    return found;
  }

  deleteBoard(id : string) : void {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id != found.id);
  }

  updateBoardStatus(id : string, status : BoardStatus) : Board {
    const board = this.getBoardById(id);    // 1. id로 게시글 조회
    board.status = status;                  // 2. board.status를 파라미터로 받은 status로 교체
    return board;
  }
}
