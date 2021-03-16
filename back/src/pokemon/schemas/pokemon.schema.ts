import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PokemonDocument = Pokemon & Document;



@Schema()
export class Pokemon {
  @Prop()
  name: string;
  @Prop()
  url: string;
  @Prop()
  abilities: [];
  @Prop()
  stats: [];
  @Prop({ type: {} })
  sprites;
  @Prop()
  types: [];
  @Prop()
  weight: number;
  @Prop()
  order: number;
  @Prop()
  past_types: [];
  @Prop({ type: {} })
  species;
  @Prop()
  height: number;
  @Prop()
  held_items: [];
  @Prop({
    type: Number,
    unique: true
  })
  id;
  @Prop()
  is_default: boolean;
  @Prop()
  location_area_encounters: string;
  @Prop()
  moves: [];
  @Prop()
  game_indices: [];
  @Prop()
  forms: [];
  @Prop()
  base_experience: [];
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
