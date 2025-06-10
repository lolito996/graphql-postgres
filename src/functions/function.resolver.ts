import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FunctionEntity } from './entities/function.entity';
import { FunctionService } from './function.service';
import { CreateFunctionInput } from './dto/create-function.input';
import { UpdateFunctionInput } from './dto/update-function.input';

@Resolver(() => FunctionEntity)
export class FunctionResolver {
  constructor(private readonly functionService: FunctionService) {}

  @Query(() => [FunctionEntity])
  functions() {
    return this.functionService.findAll();
  }

  @Query(() => FunctionEntity)
  function(@Args('id', { type: () => Int }) id: number) {
    return this.functionService.findOne(id);
  }

  @Mutation(() => FunctionEntity)
  createFunction(@Args('input') input: CreateFunctionInput) {
    return this.functionService.create(input);
  }

  @Mutation(() => FunctionEntity)
  updateFunction(@Args('input') input: UpdateFunctionInput) {
    return this.functionService.update(input);
  }
}
