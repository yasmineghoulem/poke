import {
  Controller,
  Get,
  Post,
  HttpService,
  Req,
  Res,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Pokemon } from './interfaces/pokemon.interface';
import { PokemonService } from './pokemon.service';
import { Request, Response } from 'express';
import { CreatePokemonDto } from './dto/create-pokemone-dto';
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  @Get(':limit/:start')
  findAll(@Param('limit') limit, @Param('start') start): Promise<Pokemon[]> {
    return this.pokemonService.findAll(limit, start);
  }
  @Get(':id')
  findOne(@Param('id') id): Promise<Pokemon> {
    return this.pokemonService.findOne(id);
  }
  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    return this.pokemonService.create(createPokemonDto);
  }
  @Delete(':id')
  delete(@Param('id') id): Promise<Pokemon> {
    return this.pokemonService.delete(id);
  }
  @Put(':id')
  update(
    @Body() updatePokemonDto: CreatePokemonDto,
    @Param('id') id,
  ): Promise<Pokemon> {
    return this.pokemonService.update(id, updatePokemonDto);
  }
}
