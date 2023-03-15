import request from './request'
import qs from 'qs'
export function register(data) {
  return request({
    url: '/user/registr',
    method: 'post',
    data: qs.stringify(data),
  })
}
export function login(data) {
  console.log(data)
  return request({
    url: '/user/login',
    method: 'post',
    data: qs.stringify(data),
  })
}
