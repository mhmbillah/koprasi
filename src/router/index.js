import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
const Trial = () => import("@/views/Trial");
const Simpanan = () => import("@/views/Simpanan");
const Pinjaman = () => import("@/views/Pinjaman");
const Cicilan = () => import("@/views/Cicilan");
const Anggota = () => import("@/views/Anggota");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/trial",
    name: "Trial",
    component: Trial
  },
  {
    path: "/simpanan",
    name: "Simpanan",
    component: Simpanan
  },
  {
    path: "/pinjaman",
    name: "Pinjaman",
    component: Pinjaman
  },
  {
    path: "/cicilan",
    name: "Cicilan",
    component: Cicilan
  },
  {
    path: "/anggota",
    name: "Anggota",
    component: Anggota
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
