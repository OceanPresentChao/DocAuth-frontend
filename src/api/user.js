import request from '@/utils/request'

export function requestRegister(data) {
  return request({
    url: '/django/user/',
    method: 'post',
    data,
  })
}

export function requestLogin(data) {
  return request({
    url: '/django/user/login/',
    method: 'post',
    data,
  })
}

export function requestModifyUser(data) {
  return request({
    url: '/django/user/',
    method: 'put',
    data,
  })
}

export function requestUserDetail(data) {
  return request({
    url: '/django/user/',
    method: 'get',
    params: data,
  })
}

