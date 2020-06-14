import axios from "axios";

const mandatoryParams = {
  channelId: "web",
  clientId: "mallmap-ui"
};

axios.interceptors.request.use(config => {
  config.params = {
    ...mandatoryParams,
    ...config.params
  };
  return config;
});

export const getRequest = (path, params) =>
  axios.get(path, {
    params
  });

export const postRequest = (path, data, params) =>
  axios.post(path, data, {
    params
  });

export const putRequest = (path, data, params) =>
  axios.put(path, data, {
    params
  });

export const deleteRequest = (path, params) =>
  axios.delete(path, {
    params
  });

export const patchRequest = (path, data, params) =>
  axios.patch(path, data, {
    params
  });

export default {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  patchRequest
};
