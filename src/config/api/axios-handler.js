import axios from "axios";
import { BASE_URL } from "./constants";

//INSTANCE
const vAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

vAxios.defaults.headers.common["Accept"] = "application/json";

//GET
export const vGetRequest = (url, token, headers = {}, params = {}) => {
  const config = {
    headers,
    params,
  };

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return vAxios.get(url, config);
};

//POST
export const vPostRequest = (
  url,
  token,
  data,
  headers = {},
  uploadProgressCallback = null
) => {
  const config = {
    headers: headers,
  };

  if (token) config.headers.Authorization = `Bearer ${token}`;

  if (uploadProgressCallback) config.onUploadProgress = uploadProgressCallback;

  return vAxios.post(url, data, config);
};

//POST FORM-DATA
export const vPostFormRequest = (
  url,
  token,
  data,
  headers = {},
  uploadProgressCallback = null
) => {
  const config = {
    headers: headers,
  };

  if (token) config.headers.Authorization = `Bearer ${token}`;

  if (uploadProgressCallback) config.onUploadProgress = uploadProgressCallback;

  return vAxios.postForm(url, data, config);
};

//PATCH
export const vPatchRequest = (url, token, data, headers = {}) => {
  const config = {
    headers: headers,
  };

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return vAxios.patch(url, data, config);
};

//PUT
export const vPutRequest = (url, token, data ,headers = {}) => {
  const config = {
    headers: headers,
  };
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return vAxios.put(url, data, config);
};

//del
export const vDeleteRequest = (url, token, headers = {}) => {
  const config = {
    headers: headers,
  };

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return vAxios.delete(url, config);
};

//BUILD FORM DATA
export const buildFormData = (payload) => {
  const formData = new FormData();

  Object.keys(payload).forEach((k) => {
    if (Array.isArray(payload[k])) {
      payload[k].forEach((e) => {
        formData.append(k + "[]", e);
      });
    } else formData.append(k, payload[k]);
  });

  return formData;
};
