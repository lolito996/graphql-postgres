import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { AuthReponse } from './types/auth-response.type';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignupInput } from './dto/signup.input';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService){}
  
  async login(loginInput: LoginInput): Promise<AuthReponse>{
    const {email, password} = loginInput;
    const user = await this.userService.findOneByEmail(email);

    if(!bcrypt.compareSync(password, user.password)){
      throw new BadRequestException('Email / Password does not match')
    }

    return {
      user,
      token: 'token'
    }

  }

  async signup(signupInput: SignupInput): Promise<AuthReponse>{
    const user = await this.userService.create(signupInput);

    if(!user) throw new InternalServerErrorException('An error happens while creating user');
    
    return {
      user,
      token: ''
    }
  }
  
}
