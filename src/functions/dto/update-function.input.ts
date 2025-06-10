import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateFunctionInput } from './create-function.input';

@InputType()
export class UpdateFunctionInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  movieId?: string;

  @Field({ nullable: true })
  theatreId?: string;

  @Field({ nullable: true })
  startTime?: string;

  @Field({ nullable: true })
  price?: number;
}
