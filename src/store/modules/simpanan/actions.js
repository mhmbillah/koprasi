/* eslint-disable no-unused-vars */
import api from "../cicilan/node_modules/@/api";

export default {
  addSimpanan({ commit }, { data, succes, fail } = {}) {
    api.simpanan
      .add(data)
      .then(response => {
        succes && succes(response);
      })
      .catch(fail);
  },
  editSimpanan({ commit }, { data, succes, fail } = {}) {
    api.simpanan
      .edit(data)
      .then(response => {
        succes && succes(response);
      })
      .catch(fail);
  },
  deleteSimpanan({ commit }, { data, succes, fail } = {}) {
    api.simpanan
      .delete(data)
      .then(response => {
        succes && succes(response);
      })
      .catch(fail);
  },
  getDetailSimpanan({ commit }, { data, succes, fail } = {}) {
    api.simpanan
      .getDetail(data)
      .then(response => {
        succes && succes(response);
      })
      .catch(fail);
  },
  getSimpanan({ commit }, { success, fail } = {}) {
    api.simpanan
      .get()
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  }
};
