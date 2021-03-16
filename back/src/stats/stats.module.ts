import { HttpModule, Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from '../pokemon/pokemon.module';
import { PokemonSchema } from '../pokemon/schemas/pokemon.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pokemon', schema: PokemonSchema }]),
    PokemonModule,
    HttpModule,
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
