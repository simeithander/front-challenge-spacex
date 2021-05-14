import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import LastLaunches from "./components/LastLaunches";
import LaunchDetails from "./components/LaunchDetails";

const routes = [
  {
    path: "/",
    component: LastLaunches,
  },
  {
    path: "/launch-details/:slug",
    name: "launch-details",
    component: LaunchDetails,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
