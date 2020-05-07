import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function updateSchool(data, id) {
  return request({
    url: '/vue-element-admin/article/update/' + id,
    method: 'post',
    data
  })
}
