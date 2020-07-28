import axios from 'axios'

const STATUS_SUCCESS = 0
const STATUS_FAIL = -1
const FAIL_MSG = '系统异常'

const instance = axios.create()
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  if(response.data && response.data.status === STATUS_SUCCESS) {
    return response.data
  }
  const data = response.data || {
    status: STATUS_FAIL,
    data: {},
    msg: FAIL_MSG
  }
  return Promise.reject(data)
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default instance