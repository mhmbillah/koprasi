/* eslint-disable no-unused-vars */
import api from "@/api";

export default {
  addPinjaman({ commit }, { data, success, fail } = {}) {
    api.pinjaman
      .add(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  editPinjaman({ commit }, { data, success, fail } = {}) {
    api.pinjaman
      .edit(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  deletePinjaman({ commit }, { data, success, fail } = {}) {
    api.pinjaman
      .delete(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  getDetailPinjaman({ commit }, { data, success, fail } = {}) {
    api.pinjaman
      .getDetail(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  getPinjaman({ commit }, { data, success, fail } = {}) {
    api.pinjaman
      .get(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  setLunas({ commit }, { data, success, fail } = {}) {
    console.log("ACTION");
    api.pinjaman
      .lunas(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  }
};
