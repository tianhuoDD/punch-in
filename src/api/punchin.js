// src/api/punchin.js
import request from '@/utils/request'
// 获得所有打卡卡片
export const getAllClockInsApi = ({ page = 1, per_page = 20 } = {}) => {
  return request({
    url: '/getAllClockIns',
    params: {
      page,
      per_page
    }
  })
}
// 新增打卡卡片
export const addClockInApi = ({ title, content, img }) => {
  const formData = new FormData()
  formData.append('title', title)
  formData.append('content', content)
  if (img && img.file) {
    formData.append('img', img.file)
  }
  return request({
    url: '/addClockIn',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
