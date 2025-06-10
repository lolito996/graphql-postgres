import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theatre } from './entities/theatre.entity';
import { CreateTheatreInput } from './dto/create-theatre.input';
import { UpdateTheatreInput } from './dto/update-theatre.input';

@Injectable()
export class TheatresService {
    constructor(
        @InjectRepository(Theatre)
        private theatreRepository: Repository<Theatre>,
    ) { }

    create(createTheatreInput: CreateTheatreInput): Promise<Theatre> {
        const theatre = this.theatreRepository.create(createTheatreInput);
        return this.theatreRepository.save(theatre);
    }

    findAll(): Promise<Theatre[]> {
        return this.theatreRepository.find();
    }

    async findOne(id: string): Promise<Theatre> {
        const theatre = await this.theatreRepository.findOne({ where: { id } });
        if (!theatre) {
            throw new Error(`Theatre with id ${id} not found`);
        }
        return theatre;
    }

    async update(updateTheatreInput: UpdateTheatreInput): Promise<Theatre> {
        await this.theatreRepository.update(updateTheatreInput.id, updateTheatreInput);
        return this.findOne(updateTheatreInput.id);
    }

    async remove(id: string): Promise<Theatre> {
        const theatre = await this.findOne(id);
        await this.theatreRepository.delete(id);
        return theatre;
    }
}
