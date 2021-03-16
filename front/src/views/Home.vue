<template>
  <div class="home">
    <button class="btnhome">add Pokemon</button>
    <PokemonList :pokemon="pokemon" />
    <button class="btnhome" @click="handleClick">next</button>
  </div>
</template>

<script>
// @ is an alias to /src
import { getCurrentInstance } from "vue";
import PokemonList from "@/components/PokemonList";
import { ref } from "vue";
export default {
  name: "Home",
  components: { PokemonList },
  setup() {
    const internalInstance = getCurrentInstance();
    const axios = internalInstance.appContext.config.globalProperties.axios;
    let pokemon = ref([]);
    let error = ref(null);
    let start = ref(0);
    let end = ref(20);
    const handleClick = () => {
      end.value = end.value + 20;
      start.value = start.value + 20;
      load();
    };
    const load = async () => {
      axios
        .get(`http://localhost:3001/pokemon/${end.value}/${start.value}`)
        .then(response => {
          pokemon.value = response.data;
        })
        .catch(err => {
          error.value = err.message;
          console.log(error.value);
        });
    };
    load();
    return {
      load,
      handleClick,
      pokemon
    };
  }
};
</script>
<style>
.btnhome {
  padding: 6px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-left: 80%;
  margin-bottom: 1%;
  transition-duration: 0.4s;
  cursor: pointer;
  background-color: white;
  color: black;
  border: 2px solid #e7e7e7;
}

.btnhome:hover {
  background-color: #e7e7e7;
}
</style>
