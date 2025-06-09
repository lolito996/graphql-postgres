import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { SignupInput } from '../auth/dto/signup.input';

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
}
