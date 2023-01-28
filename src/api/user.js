import request from '@/utils/request'

export function requestRegister(params = {}, data = {}) {
  return request({
    url: '/django/user',
    method: 'post',
    params,
    data,
  })
}

export function requestLogin(params = {}, data = {}) {
  return request({
    url: '/django/user/login',
    method: 'post',
    params,
    data,
  })
}

export function requestModifyUser(params = {}, data = {}) {
  return request({
    url: '/django/user',
    method: 'put',
    params,
    data,
  })
}

export function requestUserDetail(params = {}, data = {}) {
  return request({
    url: `/django/user/${params.id}}`,
    method: 'get',
    params,
    data,
  })
}

