/* eslint-disable no-unused-vars */
import api from "@/api";

export default {
  addAnggota({ commit }, { data, succes, fail } = {}) {
    api.anggota
      .add(data)
      .then(response => {
        succes && succes(response);
      })
      .catch(fail);
  },
  editAnggota({ commit }, { data, succes, fail } = {}) {
    api.anggota
      .edit(data)
      .then(response => {
        succes && succes(response);
      })
      .catch(fail);
  },
  deleteAnggota({ commit }, { data, succes, fail } = {}) {
    api.anggota
      .delete(data)
      .then(response => {
        succes && succes(response);
      })
      .catch(fail);
  },
  getDetailAnggota({ commit }, { data, succes, fail } = {}) {
    api.anggota
      .getDetail(data)
      .then(response => {
        succes && succes(response);
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
