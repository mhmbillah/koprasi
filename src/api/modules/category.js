import path from "@/config/api-path.js";
import api from "@/utils/api-methods.js";

export default {
  add(data) {
    return api.postRequest(path.api.category, data);
  },
  edit({ id, data }) {
    return api.putRequest(path.api.category + "/" + id, data);
  },
  delete({ id }) {
    return api.deleteRequest(path.api.category + "/" + id);
  },
  getDetail({ id }) {
    return api.getRequest(path.api.category + "/" + id);
  },
  get() {
    return api.getRequest(path.api.category);
  }
};
