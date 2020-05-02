import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}
export function updateHippophaeVideo(id) {
  return request({
    url: '/vue-element-admin/article/update/' + id,
    method: 'delete'
  })
}
export function deleteHippophaeVideo(id) {
  return request({
    url: '/vue-element-admin/article/update/' + id,
    method: 'delete'
  })
}

