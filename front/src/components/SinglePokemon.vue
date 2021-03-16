<template>
  <div class="card pokemon-list col-sm-3" >
    <img :src="poke.sprites.front_default" alt="Avatar" style="width:100%" />
    <h4>
      <b>{{ poke.name }}</b>
    </h4>
    <button class="btn" @click="handleDelete(poke)">
      <i class="fa fa-trash" />
    </button>
    <button class="btn" @click="handleClick(poke)">
      <i class="fa fa-edit" />
    </button>
  </div>
</template>
<script>
import router from "@/router";
import { getCurrentInstance, ref } from "vue";
export default {
  props: ["poke"],
  setup() {
    const internalInstance = getCurrentInstance();
    const axios = internalInstance.appContext.config.globalProperties.axios;
    let error = ref(null);
    const handleClick = pokemon => {
      router.push({ name: "pokemonDetails", params: { id: pokemon.id } });
    };
    const handleDelete = pokemon => {
      axios
        .delete(`http://localhost:3001/pokemon/${pokemon.id}`)
        .then(res => {
          pokemon.value = res.data;
        })
        .catch(err => {
          error.value = err.message;
          console.log(err);
        });
    };
    return {
      handleClick,
      error,
      handleDelete
    };
  }
};
</script>
<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 18%;
  margin-bottom: 3%;
  margin-left: 3%;
  margin-right: 3%;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 2px 16px;
}
</style>
