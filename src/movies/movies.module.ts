import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MoviesResolver,MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}