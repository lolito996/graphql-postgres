import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateFunctionInput } from './create-function.input';

@InputType()
export class UpdateFunctionInput extends PartialType(CreateFunctionInput) {
  @Field(() => Int)
  id: number;
}
