import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field()
  title: string;

  @Field()
  genre: string;

  @Field()
  director: string;

  @Field(() => Int)
  duration: number;

  @Field()
  description: string;

  @Field()
  language: string;

  @Field()
  status: string;

  @Field()
  classification: string;

  @Field(() => Int, { nullable: true })
  salesCount?: number;

  @Field(() => Float, { nullable: true })
  totalSalesValue?: number;
}