import path from "@/config/api-path.js";
import api from "@/utils/api-methods.js";

export default {
  add(data) {
    return api.postRequest(path.api.anggota, data);
  },
  edit(data) {
    return api.putRequest(path.api.anggota, data);
  },
  delete({ no }) {
    return api.deleteRequest(path.api.anggota + "/" + no);
  },
  getDetail({ name }) {
    return api.getRequest(path.api.anggota + "/" + name);
  },
  get(data) {
    return api.getRequest(path.api.anggota + "/search", data);
  }
};
