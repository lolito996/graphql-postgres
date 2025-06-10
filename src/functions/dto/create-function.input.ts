import { Field, InputType, Float } from '@nestjs/graphql';

@InputType()
export class CreateFunctionInput {
  @Field()
  movieId: string;    // ID de la película

  @Field()
  theatreId: string;  // ID de la sala

  @Field()
  startTime: string;

  @Field(() => Float)
  price: number;
}
