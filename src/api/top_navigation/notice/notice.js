import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function createNotice(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}

export function updateNotice(data, id) {
  return request({
    url: '/vue-element-admin/article/update/' + id,
    method: 'patch',
    data
  })
}

export function deleteNotice(id) {
  return request({
    url: '/vue-element-admin/article/update/' + id,
    method: 'delete'
  })
}

