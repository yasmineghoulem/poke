import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Stats from "../views/Stats.vue";
import Login from "@/views/Login";
import PokemonDetails from "@/components/PokemonDetails";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/stats",
    name: "stats",
    component: Stats
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/pokemonDetails",
    name: "pokemonDetails",
    component: PokemonDetails
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
