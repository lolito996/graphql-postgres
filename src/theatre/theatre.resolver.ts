import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TheatresService } from './theatre.service';
import { Theatre } from './entities/theatre.entity';
import { CreateTheatreInput } from './dto/create-theatre.input';
import { UpdateTheatreInput } from './dto/update-theatre.input';
import { Auth } from '../auth/decorators/auth/auth.decorator';
import { ValidRoles } from '../auth/enums/valid-roles.enum';

@Resolver(() => Theatre)
export class TheatresResolver {
  constructor(private readonly theatresService: TheatresService) {}

  @Mutation(() => Theatre)
  @Auth(ValidRoles.ADMIN)
  createTheatre(@Args('createTheatreInput') createTheatreInput: CreateTheatreInput) {
    return this.theatresService.create(createTheatreInput);
  }

  @Query(() => [Theatre], { name: 'theatres' })
  findAll() {
    return this.theatresService.findAll();
  }

  @Query(() => Theatre, { name: 'theatre' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.theatresService.findOne(id);
  }

  @Mutation(() => Theatre)
  updateTheatre(@Args('updateTheatreInput') updateTheatreInput: UpdateTheatreInput) {
    return this.theatresService.update(updateTheatreInput);
  }

  @Mutation(() => Theatre)
  @Auth(ValidRoles.ADMIN)
  removeTheatre(@Args('id', { type: () => String }) id: string) {
    return this.theatresService.remove(id);
  }
}
