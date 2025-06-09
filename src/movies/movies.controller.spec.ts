import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from '@nestjs/passport';
import { CreateMovieDto } from './dto/create-movie.input';

describe('MoviesController', () => {
  let controller: MoviesController;

  // Mock implementation of the MoviesService
  const mockMoviesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }), // Required for AuthGuard mock
      ],
      controllers: [MoviesController],
      providers: [{ provide: MoviesService, useValue: mockMoviesService }],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: jest.fn(() => true) }) // Mock AuthGuard to allow all requests
      .compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call MoviesService.create with correct parameters', async () => {
      const createMovieDto: CreateMovieDto = {
        title: 'Movie 1',
        description: 'Description 1',
        director: '',
        releaseDate: '',
        genre: '',
        duration: 0,
        language: '',
        status: '',
        classification: '',
      };

      // Mock the response of the create method
      mockMoviesService.create.mockReturnValue(createMovieDto);

      const result = await controller.create(createMovieDto);

      // Assert that the service method is called with the correct arguments
      expect(mockMoviesService.create).toHaveBeenCalledWith(createMovieDto);

      // Assert that the result matches the mocked return value
      expect(result).toEqual(createMovieDto);
    });
  });

  describe('findOne', () => {
    it('should call MoviesService.findOne with correct parameter', async () => {
      const movie = { title: 'Movie 1', description: 'Description 1' };

      // Mock the response for findOne
      mockMoviesService.findOne.mockReturnValue(movie);

      const result = await controller.findOne('Movie 1');

      // Validate that the service was called as expected
      expect(mockMoviesService.findOne).toHaveBeenCalledWith('Movie 1');
      expect(result).toEqual(movie);
    });
  });
});