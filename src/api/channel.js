// 频道部分
import myAxios from '@/axiosFile'

export const channel = () => {
  return myAxios('/app/v1_0/user/channels', 'get')
}
