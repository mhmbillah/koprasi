import path from "@/config/api-path.js";
import api from "@/utils/api-methods.js";

export default {
  add(data) {
    return api.postRequest(path.api.simpanan, data);
  },
  edit({ id, data }) {
    return api.putRequest(path.api.simpanan + "/" + id, data);
  },
  delete({ id }) {
    return api.deleteRequest(path.api.simpanan + "/" + id);
  },
  get() {
    return api.getRequest(path.api.simpanan);
  },
  getDetail({ id }) {
    return api.getRequest(path.api.simpanan + "/" + id);
  }
};
