import path from "@/config/api-path.js";
import api from "@/utils/api-methods.js";

export default {
  add(data) {
    return api.postRequest(path.api.pinjaman, data);
  },
  edit({ id, data }) {
    return api.putRequest(path.api.pinjaman + "/" + id, data);
  },
  delete({ id }) {
    return api.deleteRequest(path.api.pinjaman + "/" + id);
  },
  get(data) {
    return api.getRequest(path.api.pinjaman, data);
  },
  lunas(data) {
    return api.putRequest(path.api.pinjaman, data);
  }
};
