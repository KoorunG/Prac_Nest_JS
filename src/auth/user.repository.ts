import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    // 1. 유저 생성
    async createUser(authCredentialsDto : AuthCredentialsDto) : Promise<void> {
        const {username, password} = authCredentialsDto;    // 구조객체분해

        // ########### bcrypt ########### //

        const salt = await bcrypt.genSalt();                        // 솔트 생성
        const hashedPassword = await bcrypt.hash(password, salt);   // 생성한 솔트를 바탕으로 해시 생성

        // ########### bcrypt ########### //
        
        const user = this.create({username, password : hashedPassword});     // create로 엔티티 생성
        try {
            await this.save(user);                             // 생성한 엔티티 DB에 저장 후 리턴
        } catch(error) {
            if(error.code == '23505') {
                throw new ConflictException(`Existing username : ${username}`);
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}