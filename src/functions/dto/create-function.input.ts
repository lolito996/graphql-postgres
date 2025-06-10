import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFunctionInput {
  @Field()
  movieTitle: string;

  @Field()
  startTime: string;

  @Field()
  room: string;

  @Field()
  price: number;
}
