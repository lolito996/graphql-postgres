import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { FunctionEntity } from '../../functions/entities/function.entity';

@ObjectType()
@Entity()
export class Theatre {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  roomNumber: number;

  @Field()
  @Column()
  capacity: number;

  @Field()
  @Column({
    type: 'enum',
    enum: ['2D', '3D', 'VIP'],
  })
  type: '2D' | '3D' | 'VIP';

  @OneToMany(() => FunctionEntity, (func) => func.theatre)
  @Field(() => [FunctionEntity], { nullable: true })
  functions?: FunctionEntity[];

}
