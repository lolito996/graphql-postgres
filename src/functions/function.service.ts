import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FunctionEntity } from './entities/function.entity';
import { CreateFunctionInput } from './dto/create-function.input';
import { UpdateFunctionInput } from './dto/update-function.input';
import { Movie } from '../movies/entities/movie.entity';
import { Theatre } from '../theatre/entities/theatre.entity';

@Injectable()
export class FunctionService {
  constructor(
    @InjectRepository(FunctionEntity)
    private functionRepo: Repository<FunctionEntity>,
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
    @InjectRepository(Theatre)
    private theatreRepo: Repository<Theatre>,
  ) {}

  async create(input: CreateFunctionInput): Promise<FunctionEntity> {
  const movie = await this.movieRepo.findOneBy({ id: input.movieId });
  if (!movie) throw new NotFoundException(`Movie ${input.movieId} not found`);

  const theatre = await this.theatreRepo.findOneBy({ id: input.theatreId });
  if (!theatre) throw new NotFoundException(`Theatre ${input.theatreId} not found`);

  const func = this.functionRepo.create({
    ...input,
    movie,
    theatre,
  });

  return this.functionRepo.save(func);
}


  findAll(): Promise<FunctionEntity[]> {
  return this.functionRepo.find({
    relations: ['movie', 'theatre'],
  });
}


  async findOne(id: number): Promise<FunctionEntity> {
  const func = await this.functionRepo.findOne({
    where: { id },
    relations: ['movie', 'theatre'],
  });

  if (!func) throw new NotFoundException(`Function ${id} not found`);

  return func;
}


  async update(input: UpdateFunctionInput): Promise<FunctionEntity> {
  const func = await this.findOne(input.id);

  if (input.movieId) {
    const movie = await this.movieRepo.findOneBy({ id: input.movieId });
    if (!movie) throw new NotFoundException(`Movie ${input.movieId} not found`);
    func.movie = movie;
  }

  if (input.theatreId) {
    const theatre = await this.theatreRepo.findOneBy({ id: input.theatreId });
    if (!theatre) throw new NotFoundException(`Theatre ${input.theatreId} not found`);
    func.theatre = theatre;
  }

  // Actualiza otros campos simples
  Object.assign(func, input);

  return this.functionRepo.save(func);
}


  
}
