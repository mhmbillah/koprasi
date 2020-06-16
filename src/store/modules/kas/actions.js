/* eslint-disable no-unused-vars */
import api from "@/api";

export default {
  addKas({ commit }, { data, success, fail } = {}) {
    api.kas
      .add(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  editKas({ commit }, { data, success, fail } = {}) {
    api.kas
      .edit(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  deleteKas({ commit }, { data, success, fail } = {}) {
    api.kas
      .delete(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  getDetailKas({ commit }, { data, success, fail } = {}) {
    api.kas
      .getDetail(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  getKas({ commit }, { data, success, fail } = {}) {
    api.kas
      .get(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  getTotalKas({ commit }, { data, success, fail } = {}) {
    api.kas
      .getTotal(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  deleteByMonthAndYearKas({ commit }, { data, success, fail } = {}) {
    api.kas
      .deleteByMonthAndYear(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  },
  generateKas({ commit }, { data, success, fail } = {}) {
    api.kas
      .generate(data)
      .then(response => {
        success && success(response);
      })
      .catch(fail);
  }
};
