import path from "@/config/api-path.js";
import api from "@/utils/api-methods.js";

export default {
  add(data) {
    return api.postRequest(path.api.kas, data);
  },
  edit({ id, data }) {
    return api.putRequest(path.api.kas + "/" + id, data);
  },
  delete({ id }) {
    return api.deleteRequest(path.api.kas + "/" + id);
  },
  get(data) {
    return api.getRequest(path.api.kas, data);
  },
  getDetail({ id }) {
    return api.getRequest(path.api.kas + "/" + id);
  },
  getTotal(data) {
    return api.getRequest(path.api.kas + "/total", data);
  },
  deleteByMonthAndYear(data) {
    return api.deleteRequest(path.api.kas, data);
  },
  generate(data) {
    return api.postRequest(path.api.kas + "/generate", data);
  }
};
