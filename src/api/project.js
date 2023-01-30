import request from '@/utils/request'

export function requestProjectList(params = {}, data = {}) {
  return request({
    url: '/django/business/project/list',
    method: 'get',
    params,
    data,
  })
}

export function requestCreateProject(params = {}, data = {}) {
  return request({
    url: '/django/business/project',
    method: 'post',
    params,
    data,
  })
}
