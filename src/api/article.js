// 文章部分
import myAxios from '@/axiosFile'

// 拿频道新闻推荐的数据
export const artData = (channelId, timestamp) => {
  return myAxios('/app/v1_1/articles', 'get', {
    channel_id: channelId,
    timestamp,
    with_top: 1
  })
}
