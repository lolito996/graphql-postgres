import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTheatreInput {
  @Field()
  roomNumber: number;

  @Field()
  capacity: number;

  @Field()
  type: '2D' | '3D' | 'VIP';
}
