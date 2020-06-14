/* eslint-disable no-unused-vars */
import api from "@/api";

export default {
  addPinjaman({ commit }, { data, succes, fail } = {}) {
    api.pinjaman
      .add(data)
      .then(response => {
        succes && succes(response);
      })
      .catch(fail);
  },
  editPinjaman({ commit }, { data, succes, fail } = {}) {
    api.pinjaman
      .edit(data)
      .then(response => {
        succes && succes(response);
      })
      .catch(fail);
  },
  deletePinjaman({ commit }, { data, succes, fail } = {}) {
    api.pinjaman
      .delete(data)
      .then(response => {
        succes && succes(response);
      })
      .catch(fail);
  },
  getDetailPinjaman({ commit }, { data, succes, fail } = {}) {
    api.pinjaman
      .getDetail(data)
      .then(response => {
        succes && succes(response);
      })
      .catch(fail);
  },
  getPinjaman({ commit }, { success, fail } = {}) {
    api.pinjaman
      .get()
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  }
};
