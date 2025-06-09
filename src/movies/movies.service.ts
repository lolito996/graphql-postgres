import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieInput: CreateMovieInput): Promise<Movie> {
    const movie = this.movieRepository.create(createMovieInput);
    return this.movieRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findOneByTitle(title: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { title } });
    if (!movie) throw new NotFoundException(`Movie with title "${title}" not found`);
    return movie;
  }

  async updateByTitle(title: string, updateMovieInput: UpdateMovieInput): Promise<Movie> {
    const movie = await this.findOneByTitle(title);
    Object.assign(movie, updateMovieInput);
    return this.movieRepository.save(movie);
  }
}