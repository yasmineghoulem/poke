<template>
  <div class="">
    <div class="card1">
      <h4>
        <h2></h2>
      </h4>
      <h1>Edit your Pokemon</h1>
      <label>
        <h3>Name</h3>
        <input
          v-model="name"
          class="un "
          type="text"
          align="center"
          placeholder="Name"
        />
      </label>
      <label>
        <h3>Order</h3>
        <input
          v-model="order"
          class="un "
          type="text"
          align="center"
          placeholder="Email"
        />
      </label>
      <a class="submit" @click="handleSubmit()">Submit</a>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance, ref } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "pokemonDetails",
  setup() {
    const internalInstance = getCurrentInstance();
    const axios = internalInstance.appContext.config.globalProperties.axios;
    const route = useRoute();
    let error = ref(null);
    let pokemon = ref(null);
    let name = ref(null);
    let order = ref(null);
    let id = route.params.id;
    let handleSubmit = () => {
      axios
        .put(`http://localhost:3001/pokemon/${id}`, {
          name: name.value,
          order: order.value
        })
        .then(res => {
          pokemon.value = res.data;
          name.value = pokemon.value.name;
          order.value = pokemon.value.order;
        })
        .catch(err => {
          error.value = err.message;
          console.log(err);
        });
    };
    let load = () => {
      console.log(id);
      axios
        .get(`http://localhost:3001/pokemon/${id}`)
        .then(res => {
          pokemon.value = res.data;
          name.value = pokemon.value.name;
          order.value = pokemon.value.order;
        })
        .catch(err => {
          error.value = err.message;
          console.log(err);
        });
    };
    load();
    return {
      error,
      name,
      order,
      pokemon,
      handleSubmit,
      load
    };
  }
};
</script>
<style></style>
