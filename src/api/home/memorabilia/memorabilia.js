import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function updateMemorabilia(data, id) {
  return request({
    url: '/vue-element-admin/article/update/' + id,
    method: 'patch',
    data
  })
}

export function deleteMemorabilia(id) {
  return request({
    url: '/vue-element-admin/article/update/' + id,
    method: 'delete'
  })
}

