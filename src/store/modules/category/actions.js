/* eslint-disable no-unused-vars */
import api from "@/api";

export default {
  add({ commit }, { data, succes, fail } = {}) {
    api.category
      .add(data)
      .then(response => {
        succes && succes(response);
      })
      .catch(fail);
  },
  edit({ commit }, { data, succes, fail } = {}) {
    api.category
      .edit(data)
      .then(response => {
        succes && succes(response);
      })
      .catch(fail);
  },
  delete({ commit }, { data, succes, fail } = {}) {
    api.category
      .delete(data)
      .then(response => {
        succes && succes(response);
      })
      .catch(fail);
  },
  getDetail({ commit }, { data, succes, fail } = {}) {
    api.category
      .getDetail(data)
      .then(response => {
        succes && succes(response);
      })
      .catch(fail);
  },
  get({ commit }, { success, fail } = {}) {
    api.category
      .get()
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  }
};
