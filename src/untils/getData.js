// 本地存储进行操作的模块
const myNum = 'project-m-dulaibin'

// 获取存储的方法
export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(myNum) || '{}')
}
// 修改存储的方法
export const setUser = (user) => {
  window.localStorage.setItem(myNum, JSON.stringify(user))
}
// 移除存储的方法
export const remove = () => {
  window.localStorage.removeItem(myNum)
}
