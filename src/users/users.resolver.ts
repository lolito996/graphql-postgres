import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { SignupInput } from '../auth/dto/signup.input';
import { Auth } from 'src/auth/decorators/auth/auth.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<User> {
    return this.usersService.create(signupInput);
  }

  @Query(() => User, { name: 'user', nullable: true })
  async findOne(@Args('id', { type: () => String }) id: string): Promise<User | null> {
    try {
      return await this.usersService.findOneById(id);
    } catch {
      return null;
    }
  }

 @Query(() => User, { name: 'userByEmail', nullable: true })
  async findOneByEmail(@Args('email', { type: () => String }) email: string): Promise<User | null> {
    try {
      return await this.usersService.findOneByEmail(email);
    } catch {
      return null;
    }

  }
  @Query(() => [User], { name: 'users' })
    @Auth(ValidRoles.ADMIN, ValidRoles.CLIENT)
      async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  
  
  @Mutation(() => User, { name: 'updateUser' })
  @Auth(ValidRoles.ADMIN, ValidRoles.CLIENT)
  async updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<User> {
    return await this.usersService.update(id, signupInput);
  }

  @Mutation(() => User,{name: 'deleteUser'})
  @Auth(ValidRoles.ADMIN)
  async removeUser(
    @Args('id', { type: () => String }) id: string,
  ): Promise<User> {
    return this.usersService.deleteById(id);
  }
    
}
