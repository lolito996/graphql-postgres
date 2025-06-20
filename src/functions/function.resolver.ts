import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FunctionEntity } from './entities/function.entity';
import { FunctionService } from './function.service';
import { CreateFunctionInput } from './dto/create-function.input';
import { UpdateFunctionInput } from './dto/update-function.input';
import { Auth } from '../auth/decorators/auth/auth.decorator';
import { ValidRoles } from '../auth/enums/valid-roles.enum';

@Resolver(() => FunctionEntity)
export class FunctionResolver {
  constructor(private readonly functionService: FunctionService) {}

  @Auth(ValidRoles.ADMIN, ValidRoles.CLIENT)
  @Query(() => [FunctionEntity])
  functions() {
    return this.functionService.findAll();
  }
  @Auth(ValidRoles.ADMIN, ValidRoles.CLIENT)
  @Query(() => FunctionEntity)
  function(@Args('id', { type: () => Int }) id: number) {
    return this.functionService.findOne(id);
  }

  @Mutation(() => FunctionEntity)
    createFunction(
      @Args('createFunctionInput') createFunctionInput: CreateFunctionInput,
    ): Promise<FunctionEntity> {
    return this.functionService.create(createFunctionInput);
  }

  @Auth(ValidRoles.ADMIN)
  @Mutation(() => FunctionEntity)
  updateFunction(
    @Args('updateFunctionInput') updateFunctionInput: UpdateFunctionInput,
  ): Promise<FunctionEntity> {
    return this.functionService.update(updateFunctionInput);
  }

}
