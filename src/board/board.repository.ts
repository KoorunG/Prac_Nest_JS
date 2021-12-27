import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Board } from "./board.entity";
import { BoardStatus } from "./board.status";
import { CreateBoardDto } from "./dto/createBoard.dto";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {

    // 1. 특정 게시글 조회
  async getBoardById(id : number) : Promise<Board> {
    const found = await this.findOne(id);

    if(!found) {
      throw new NotFoundException(`Can't find Board with id : ${id}`);
    }
    
    return found;
  }

  // 2. 게시글 생성
  async createBoard(createBoardDto : CreateBoardDto) : Promise<Board> {
    const {title, description} = createBoardDto;

    // 2-1. create()로 객체를 생성한 뒤
    const board = this.create({
      title,
      description,
      status : BoardStatus.PUBLIC
    });
    
    // 2-2. save()로 DB에 값을 저장한다!
    await this.save(board);
    return board;
  }
}