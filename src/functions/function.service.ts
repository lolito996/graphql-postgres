import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FunctionEntity } from './entities/function.entity';
import { CreateFunctionInput } from './dto/create-function.input';
import { UpdateFunctionInput } from './dto/update-function.input';

@Injectable()
export class FunctionService {
  constructor(
    @InjectRepository(FunctionEntity)
    private functionRepo: Repository<FunctionEntity>,
  ) {}

  create(input: CreateFunctionInput): Promise<FunctionEntity> {
    const func = this.functionRepo.create(input);
    return this.functionRepo.save(func);
  }

  findAll(): Promise<FunctionEntity[]> {
    return this.functionRepo.find();
  }

  async findOne(id: number): Promise<FunctionEntity> {
    const func = await this.functionRepo.findOneBy({ id });
    if (!func) throw new NotFoundException(`Function ${id} not found`);
    return func;
  }

  async update(input: UpdateFunctionInput): Promise<FunctionEntity> {
    const func = await this.findOne(input.id);
    Object.assign(func, input);
    return this.functionRepo.save(func);
  }
}
