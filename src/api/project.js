import request from '@/utils/request'

export function requestProjectList(params = {}, data = {}) {
  return request({
    url: '/django/business/project/list',
    method: 'get',
    params,
    data,
  })
}
