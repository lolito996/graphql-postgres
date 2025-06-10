import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('functions')
export class FunctionEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  movieTitle: string;

  @Field()
  @Column()
  startTime: string;

  @Field()
  @Column()
  room: string;

  @Field()
  @Column()
  price: number;
}
