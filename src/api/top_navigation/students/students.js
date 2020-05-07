import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function createStudents(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}

export function updateStudents(data, id) {
  return request({
    url: '/vue-element-admin/article/update/' + id,
    method: 'patch',
    data
  })
}

export function updatePic(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'patch',
    data
  })
}

export function deleteStudents(id) {
  return request({
    url: '/vue-element-admin/article/update/' + id,
    method: 'delete'
  })
}

