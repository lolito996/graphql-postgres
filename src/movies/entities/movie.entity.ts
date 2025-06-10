import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { OneToMany } from 'typeorm';
import { FunctionEntity } from '../../functions/entities/function.entity';

@Entity({ name: 'movies'})
@ObjectType()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('text', { unique: true })
  @Field()
  title: string;

  @Column('text')
  @Field()
  genre: string;

  @Column('text')
  @Field()
  director: string;

  @Column('int')
  @Field(() => Int)
  duration: number;

  @Column('text')
  @Field()
  description: string;

  @Column()
  @Field()
  language: string;

  @Column('text')
  @Field()
  status: string;

  @Column('text')
  @Field()
  classification: string;

  @Column('int', { nullable: true })
  @Field(() => Int, { nullable: true })
  salesCount?: number;

  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  @Field(() => Float, { nullable: true })
  totalSalesValue?: number;

  @OneToMany(() => FunctionEntity, (func) => func.movie)
@Field(() => [FunctionEntity], { nullable: true })
functions?: FunctionEntity[];

}