import request from '@/utils/request'

export function requestRegister(data) {
  return request({
    url: '/django/user/',
    method: 'post',
    data,
  })
}
