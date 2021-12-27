import { BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board.status";

export class BoardStatusValidationPipe implements PipeTransform {

    readonly StatusOptions = [  // readonly => 클래스 외부에서는 엑세스만 가능하며 수정이 불가능한 값
        BoardStatus.PUBLIC,
        BoardStatus.PRIVATE
    ]

    private isStatusValid(status : any) {
        const index = this.StatusOptions.indexOf(status);       // indexOf() 함수를 이용하여 그 값이 -1이 나온다면
                                                                // 배열에 속하지 않는 값이기 때문에 필터링이 가능함
        return index;
    }
    
    transform(value: string) {

        value = value.toUpperCase();                                        // 일단 어떤 값이 오든 대문자로 변환하고

        if(this.isStatusValid(value) == -1){                                // isStatusValid()의 값이 -1이면
            throw new BadRequestException(`${value} isn't in the status options`)   // 예외를 던진다
        }
        return value;
    }
}