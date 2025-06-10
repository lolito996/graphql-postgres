import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne, JoinColumn } from 'typeorm';
import { Theatre } from '../../theatre/entities/theatre.entity';
import { Movie } from '../../movies/entities/movie.entity';

@ObjectType()
@Entity('functions')
export class FunctionEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  startTime: string;

  @Field()
  @Column()
  price: number;

  @ManyToOne(() => Theatre, (theatre) => theatre.functions, { eager: true })
  @JoinColumn({ name: 'theatreId' })
  @Field(() => Theatre)
  theatre: Theatre;

  @Column()
  theatreId: string;


  @ManyToOne(() => Movie, (movie) => movie.functions, { eager: true })
  @JoinColumn({ name: 'movieId' })
  @Field(() => Movie)
  movie: Movie;

  @Column()
  movieId: string;

}
