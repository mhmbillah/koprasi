import path from "@/config/api-path.js";
import api from "@/utils/api-methods.js";

export default {
  add(data) {
    return api.postRequest(path.api.cicilan, data);
  },
  edit({ id, data }) {
    return api.putRequest(path.api.cicilan + "/" + id, data);
  },
  delete({ id }) {
    return api.deleteRequest(path.api.cicilan + "/" + id);
  },
  get(data) {
    return api.getRequest(path.api.cicilan, data);
  }
};
