import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const namespaced = true;
const state = {
  item: null
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced
};
