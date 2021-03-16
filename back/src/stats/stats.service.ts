import { Injectable } from '@nestjs/common';
import {PokemonDocument } from '../pokemon/schemas/pokemon.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class StatsService {
  async getMostUsedAbility(): Promise<object[]> {
    let agg = await this.pokemonModel.aggregate([
      { $group: { _id: "$abilities", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
    return [
        {name: agg[0]._id[0].ability.name, count: agg[0].count},
        {name: agg[1]._id[0].ability.name, count: agg[1].count},
        {name: agg[2]._id[0].ability.name, count: agg[2].count}
      ]

  }
  async getAvg(): Promise<object> {
    return this.pokemonModel.aggregate([
      {
        $project: {
          Avg: {
            $avg: "$stats.base_stat"
          }
        }
      }, {
        $group: {
          _id: null,
          statsAvg: { $avg: "$Avg" }
        }
      }
    ]);
  }
  constructor(
    @InjectModel('Pokemon')
    private readonly pokemonModel: Model<PokemonDocument>,
  ) {}

}





