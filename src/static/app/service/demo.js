import request from '@app/lib/request.js';

export default {
  getList: params => {
    return request.get('/api/demo/list', {
      params
    }).then(res => {
      return res.data
    }, e => {
      throw e
    })
  }
}