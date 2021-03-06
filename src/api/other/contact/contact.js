import request from '@/utils/request'

export function fetchInfo(data) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get'
  })
}

export function updateContact(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
