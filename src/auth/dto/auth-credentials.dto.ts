import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username : string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(
        /^[a-zA-Z0-9]*$/,                                           // 영어, 숫자만 가능하도록 정규표현식 사용
        {message : 'password only accepts english and number!'})    // 유효성 검증 메세지 설정      
    password : string;
}