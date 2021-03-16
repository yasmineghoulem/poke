import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pokemon, PokemonDocument } from './schemas/pokemon.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/common';

@Injectable()
export class PokemonService implements OnModuleInit {
  async onModuleInit() {
    const data = await this.pokemonModel.find();
    const count = await this.httpService
      .get('https://pokeapi.co/api/v2/pokemon')
      .toPromise()
      .then((res) => {
        return res.data.count;
      });
    if (data.length < count) {
      for (let i = data.length + 200; i <= count; i++) {
        const pokemon = await this.httpService
          .get('https://pokeapi.co/api/v2/pokemon/' + i)
          .toPromise()
          .then((res) => {
            console.log(res.data);
            if (res.data) {
              return res.data;
            }
            return false;
          })
          .catch((err) => {
            console.log(err);
          });
        if (pokemon) {
          const newPokemon = new this.pokemonModel(pokemon);
          await newPokemon.save();
        }
      }
    }
  }
  constructor(
    private httpService: HttpService,
    @InjectModel('Pokemon')
    private readonly pokemonModel: Model<PokemonDocument>,
  ) {}

  async findAll(limit: number, start: number): Promise<Pokemon[]> {
    return await this.pokemonModel.find({ id: { $lte: limit, $gte: start } });
  }
  async findOne(id: number): Promise<Pokemon> {
    return await this.pokemonModel.findOne({ id });
  }
  async create(pokemon: Pokemon): Promise<Pokemon> {
    const newPokemon = new this.pokemonModel(pokemon);
    return newPokemon.save();
  }
  async delete(id: number): Promise<Pokemon> {
    return await this.pokemonModel.findOneAndDelete({ id });
  }
  async update(id: number, body: Pokemon): Promise<Pokemon> {
    return await this.pokemonModel.findOneAndUpdate({ id }, body, {
      new: true,
    });
  }
}
