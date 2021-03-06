import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function updateTeachers(data, id) {
  return request({
    url: '/vue-element-admin/article/update/' + id,
    method: 'post',
    data
  })
}

export function updatePic(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
