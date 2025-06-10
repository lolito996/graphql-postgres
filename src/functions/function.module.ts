import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FunctionEntity } from './entities/function.entity';
import { FunctionService } from './function.service';
import { FunctionResolver } from './function.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([FunctionEntity])],
  providers: [FunctionService, FunctionResolver],
})
export class FunctionModule {}
