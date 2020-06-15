/* eslint-disable no-unused-vars */
import api from "@/api";

export default {
  addAnggota({ commit }, { data, success, fail } = {}) {
    api.anggota
      .add(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  editAnggota({ commit }, { data, success, fail } = {}) {
    api.anggota
      .edit(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  deleteAnggota({ commit }, { data, success, fail } = {}) {
    api.anggota
      .delete(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  getDetailAnggota({ commit }, { data, success, fail } = {}) {
    api.anggota
      .getDetail(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  getAnggota({ commit }, { data, success, fail } = {}) {
    api.anggota
      .get(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  }
};
