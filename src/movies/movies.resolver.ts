import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Auth } from '../auth/decorators/auth/auth.decorator';
import { ValidRoles } from '../auth/enums/valid-roles.enum';

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Mutation(() => Movie)
  @Auth(ValidRoles.ADMIN)
  async createMovie(
    @Args('createMovieInput') createMovieInput: CreateMovieInput,
  ): Promise<Movie> {
    return this.moviesService.create(createMovieInput);
  }

  @Query(() => [Movie])
  @Auth(ValidRoles.ADMIN, ValidRoles.CLIENT)
  async findAllMovies(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Query(() => Movie)
  @Auth(ValidRoles.ADMIN, ValidRoles.CLIENT)
  async findMovieByTitle(
    @Args('title') title: string,
  ): Promise<Movie> {
    return this.moviesService.findOneByTitle(title);
  }

  @Mutation(() => Movie)
  @Auth(ValidRoles.ADMIN)
  async updateMovieByTitle(
    @Args('title') title: string,
    @Args('updateMovieInput') updateMovieInput: UpdateMovieInput,
  ): Promise<Movie> {
    return this.moviesService.updateByTitle(title, updateMovieInput);
  }
}