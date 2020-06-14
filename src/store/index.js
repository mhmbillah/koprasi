import Vue from "vue";
import Vuex from "vuex";

import category from "./modules/category";
import anggota from "./modules/anggota";
import cicilan from "./modules/cicilan";
import pinjaman from "./modules/pinjaman";
import simpanan from "./modules/simpanan";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    category,
    anggota,
    cicilan,
    pinjaman,
    simpanan
  }
});
