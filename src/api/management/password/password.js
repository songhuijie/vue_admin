import request from '@/utils/request'

export function updatePassword(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
