/* eslint-disable no-unused-vars */
import api from "@/api";

export default {
  addSimpanan({ commit }, { data, success, fail } = {}) {
    api.simpanan
      .add(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  editSimpanan({ commit }, { data, success, fail } = {}) {
    api.simpanan
      .edit(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  deleteSimpanan({ commit }, { data, success, fail } = {}) {
    api.simpanan
      .delete(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  getDetailSimpanan({ commit }, { data, success, fail } = {}) {
    api.simpanan
      .getDetail(data)
      .then(response => {
        success && success(response);
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
