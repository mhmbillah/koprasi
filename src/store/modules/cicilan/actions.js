/* eslint-disable no-unused-vars */
import api from "@/api";

export default {
  addCicilan({ commit }, { data, success, fail } = {}) {
    api.cicilan
      .add(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  editCicilan({ commit }, { data, success, fail } = {}) {
    api.cicilan
      .edit(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  deleteCicilan({ commit }, { data, success, fail } = {}) {
    api.cicilan
      .delete(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  getDetailCicilan({ commit }, { data, success, fail } = {}) {
    api.cicilan
      .getDetail(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  getCicilan({ commit }, { success, fail } = {}) {
    api.cicilan
      .get()
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  }
};
