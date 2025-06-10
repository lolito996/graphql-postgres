import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateTheatreInput } from './create-theatre.input';

@InputType()
export class UpdateTheatreInput extends PartialType(CreateTheatreInput) {
  @Field()
  id: string;
}
