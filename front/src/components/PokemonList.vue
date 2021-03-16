<template>
  <div class="pokemon-list row">
    <div v-for="poke in pokemon" :key="poke.id">
      <SinglePokemon :poke="poke" />
    </div>
  </div>
</template>
<script>
import SinglePokemon from "@/components/SinglePokemon";

export default {

  components: { SinglePokemon },
  props: ["pokemon"]
};
</script>
<style></style>
