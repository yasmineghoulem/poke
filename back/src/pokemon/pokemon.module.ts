import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { PokemonSchema, Pokemon } from './schemas/pokemon.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pokemon', schema: PokemonSchema }]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
