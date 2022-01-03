import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    // DI
    constructor(
        private authService : AuthService,
    ) {}
    
    @Post('/signUp')
    signUp(@Body(ValidationPipe) authCredentialsDto : AuthCredentialsDto) : Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signIn')
    signIn(@Body(ValidationPipe) authCredentialsDto : AuthCredentialsDto) : Promise<{ accessToken : string}> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('/authTest')
    @UseGuards(AuthGuard())
    test(@GetUser() user : User) {
        console.log('@GetUser : ', user);
    }
}
