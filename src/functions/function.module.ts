import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FunctionEntity } from './entities/function.entity';
import { FunctionService } from './function.service';
import { FunctionResolver } from './function.resolver';
import { Movie } from '../movies/entities/movie.entity';
import { Theatre } from '../theatre/entities/theatre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FunctionEntity, Movie, Theatre])],
  providers: [FunctionService, FunctionResolver],
  exports: [FunctionService],
})
export class FunctionModule {}
