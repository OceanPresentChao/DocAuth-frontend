import request from '@/utils/request'

export function requestTaskDetail(params = {}, data = {}) {
  return request({
    url: `/django/business/task/${params.id}`,
    method: 'get',
    params,
    data,
  })
}

export function requestUserDuty(params = {}, data = {}) {
  return request({
    url: '/django/business/usertask/list',
    method: 'get',
    params,
    data,
  })
}

export function requestSubmitStep(params = {}, data = {}) {
  return request({
    url: `/django/business/task/submit/${params.task}`,
    method: 'post',
    params,
    data,
  })
}

export function requestFinishTask(params = {}, data = {}) {
  return request({
    url: `/django/business/task/finish/${params.task}`,
    method: 'post',
    params,
    data,
  })
}

export function requestRevertTask(params = {}, data = {}) {
  return request({
    url: `/django/business/task/revert/${params.task}`,
    method: 'post',
    params,
    data,
  })
}

export function requestTaskRecord(params = {}, data = {}) {
  return request({
    url: '/django/business/record/list',
    method: 'get',
    params,
    data,
  })
}
