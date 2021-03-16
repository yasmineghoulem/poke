<template>
  <div class="stats">
    <div class="card1">
      <h4>
        <h2>the average base stats: {{ avg[0].statsAvg }}</h2>
      </h4>
      <h1>The most used abilities:</h1>
      <div v-for="ability in abilities" :key="ability.id">
        <h2>{{ ability.name }} used {{ ability.count }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getCurrentInstance } from "vue";
import { ref } from "vue";
export default {
  name: "Stats",
  setup() {
    const internalInstance = getCurrentInstance();
    const axios = internalInstance.appContext.config.globalProperties.axios;
    let abilities = ref(null);
    let avg = ref(null);
    let error = ref(null);

    const load = async () => {
      axios
        .get(`http://localhost:3001/stats/ability`)
        .then(response => {
          abilities.value = response.data;
        })
        .catch(err => {
          error.value = err.message;
          console.log(error.value);
        });
      axios
        .get(`http://localhost:3001/stats/avg`)
        .then(response => {
          avg.value = response.data;
        })
        .catch(err => {
          error.value = err.message;
          console.log(error.value);
        });
    };
    load();
    return {
      load,
      avg,
      abilities
    };
  }
};
</script>
<style>
.card1 {
  padding-top: 1%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 30%;
  height: 400px;
  margin-bottom: 3%;
  margin-left: 35%;
  margin-right: 35%;
}
.container {
  padding: 2px 16px;
}
</style>