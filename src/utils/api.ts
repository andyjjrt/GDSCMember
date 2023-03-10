import axios, { AxiosRequestConfig } from "axios";

axios.defaults.headers.post["Content-Type"] = "text/plain";
axios.defaults.headers.get["Content-Type"] = "text/plain";
/*
  Function Usage Sample:
  ajax("/api/user/login", "post", {
    data: {}
    params:{}
  }).then(res => {  
    ...
  })
  
*/

export const ajax = async (
  url: string,
  method: string,
  baseURL?: string,
  options?: AxiosRequestConfig<any>
) => {
  if (options !== undefined) {
    var { params = {}, data = {} } = options;
  } else {
    params = data = null;
  }
  const axiosOptions: AxiosRequestConfig<any> = {
    url: url,
    method: method,
    params: params,
    data: data,
    baseURL: baseURL,
    timeout: 0,
    ...options,
  };
  return axios(axiosOptions)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

export const fetchApi = (method: string, options?: AxiosRequestConfig<any>) =>
  ajax(import.meta.env.VITE_API_ENDPOINT, method, "", {
    ...options,
  });
