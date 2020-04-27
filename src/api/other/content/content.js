import request from '@/utils/request'

export function updateContact(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
