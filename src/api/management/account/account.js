import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function fetchInfo(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function createAdmin(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateAdmin(data, id) {
  console.log(data)
  console.log(id)
  return request({
    url: '/vue-element-admin/article/update/' + id,
    method: 'patch',
    data
  })
}
export function deleteAdmin(id) {
  return request({
    url: '/vue-element-admin/article/delete/' + id,
    method: 'delete'
  })
}

export function resetPassword(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
