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


  // 3. 게시글 삭제
  async deleteBoard(id : number) : Promise<void> {
    const result = await this.delete(id);
    console.log(result);
    
  }

  
  // 4. 게시글 수정
  async updateBoardStatus(id : number, status : BoardStatus) : Promise<Board> {

    const board = await this.getBoardById(id);  // 1. id로 수정할 게시글을 불러옴
    
    board.status = status;                      // 2. 파라미터로 입력받은 status로 board의 상태를 업데이트함
    await this.save(board);                     // 3. DB에 저장함

    return board;                               // 4. 리턴
  }

  // 5. 모든 게시물 조회
  async getAllBoards() : Promise<Board[]> {
    const boards = await this.find();
    return boards;
  }
}