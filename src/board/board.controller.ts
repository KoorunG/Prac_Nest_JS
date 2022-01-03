import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './board.status';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/createBoard.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
  constructor(private boardService: BoardService) {}

  // @Get('/')
  // getAllBoards() : Board[] {
  //   return this.boardService.getAllBoards();
  // }

  // @Post('/')
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto : CreateBoardDto) : Board {
  //   return this.boardService.createBoard(createBoardDto);
  // }

  // @Get('/:id')
  // getBoardById(@Param('id') id : string) : Board {
  //   return this.boardService.getBoardById(id);
  // }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id : string) : string {
  //   this.boardService.deleteBoard(id);
  //   return "삭제 완료";
  // }

  // @Patch('/:id/status')
  // updateBoardStatus(@Param('id') id : string, 
  //                   @Body('status', BoardStatusValidationPipe) status : BoardStatus) : Board {
  //   return this.boardService.updateBoardStatus(id, status);
  // }


  // ################## Use PostgreSQL ################## //

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id : number) : Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto : CreateBoardDto) : Promise<Board> {
    return this.boardService.createBoard(createBoardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id : number) : Promise<void> {
    return this.boardService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id : number, 
    @Body('status', BoardStatusValidationPipe) status : BoardStatus) : Promise<Board> {
    return this.boardService.updateBoardStatus(id, status);
  }

  @Get('/')
  getAllBoards() : Promise<Board[]> {
    return this.boardService.getAllBoards();
  }
}
