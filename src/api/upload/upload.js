import request from '@/utils/request'

// 单图上传
export function uploadImage(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
// 视频上传
export function uploadVideo(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
