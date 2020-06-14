/* eslint-disable no-unused-vars */
import api from "@/api";

export default {
  addCicilan({ commit }, { data, succes, fail } = {}) {
    api.cicilan
      .add(data)
      .then(response => {
        succes && succes(response);
      })
      .catch(fail);
  },
  editCicilan({ commit }, { data, succes, fail } = {}) {
    api.cicilan
      .edit(data)
      .then(response => {
        succes && succes(response);
      })
      .catch(fail);
  },
  deleteCicilan({ commit }, { data, succes, fail } = {}) {
    api.cicilan
      .delete(data)
      .then(response => {
        succes && succes(response);
      })
      .catch(fail);
  },
  getDetailCicilan({ commit }, { data, succes, fail } = {}) {
    api.cicilan
      .getDetail(data)
      .then(response => {
        succes && succes(response);
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
