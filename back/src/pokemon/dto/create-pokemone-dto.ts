export class CreatePokemonDto {
  readonly name: string;
  readonly url: string;
  readonly abilities: [];
  readonly stats: [];
  readonly sprites: object;
  readonly types: [];
  readonly weight: number;
  readonly order: number;
  readonly past_types: [];
  readonly species: object;
  readonly height: number;
  readonly held_items: [];
  readonly id: number;
  readonly is_default: boolean;
  readonly location_area_encounters: string;
  readonly moves: [];
  readonly game_indices: [];
  readonly forms: [];
  readonly base_experience: [];
}
