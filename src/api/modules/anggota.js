import path from "@/config/api-path.js";
import api from "@/utils/api-methods.js";

export default {
  add(data) {
    return api.postRequest(path.api.anggota, data);
  },
  edit({ id, data }) {
    return api.putRequest(path.api.anggota + "/" + id, data);
  },
  delete({ id }) {
    return api.deleteRequest(path.api.anggota + "/" + id);
  },
  getDetail({ name }) {
    return api.getRequest(path.api.anggota + "/" + name);
  },
  get() {
    return api.getRequest(path.api.anggota);
  }
};
