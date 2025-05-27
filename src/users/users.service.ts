import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignupInput } from 'src/auth/dto/signup.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}


  async create(signupInput: SignupInput) {
    try{
      const newUser = this.userRepository.create({
        ...signupInput,
        password: bcrypt.hashSync(signupInput.password, 10)
      })
      return await this.userRepository.save(newUser);
    }catch(error){
      this.handleExceptions(error);
    }

  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({email})
    } catch (error) {
      throw new NotFoundException(`${email} not found`);
    }
  }

  async findOneById(id: string) {
    try {
      return await this.userRepository.findOneByOrFail({id})
    } catch (error) {
      throw new NotFoundException(`${id} not found`);
    }
  }

   private handleExceptions(error: any){
    if(error.code === "23505")
      throw new BadRequestException(error.detail);

    if(error.code === 'error-001'){
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error.detail);
    throw new InternalServerErrorException('Unspected error, check your server');
  }

}
