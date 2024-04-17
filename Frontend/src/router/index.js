import { createRouter, createWebHistory } from "vue-router";
import auth from "./auth.js";
import student from "./student.js";

const routes = [...auth, ...student];

const router = createRouter({
  history: createWebHistory(),

  routes,
});

export default router;
