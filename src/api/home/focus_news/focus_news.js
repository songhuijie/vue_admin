import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function createFocusNews(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}

export function updateFocusNews(data, id) {
  return request({
    url: '/vue-element-admin/article/update/' + id,
    method: 'patch',
    data
  })
}

export function deleteFocusNews(id) {
  return request({
    url: '/vue-element-admin/article/update/' + id,
    method: 'delete'
  })
}

