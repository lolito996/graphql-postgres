import { Module } from '@nestjs/common';
import { TheatresService } from './theatre.service';
import { TheatresResolver } from './theatre.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theatre } from './entities/theatre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Theatre])],
  providers: [TheatresResolver, TheatresService],
})
export class TheatresModule {}
