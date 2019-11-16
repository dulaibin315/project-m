import myAxios from '@/axiosFile'

// 登录
/**
 *
 * @param {string} mobile 手机号
 * @param {string} code 验证码
 */
export const login = ({
  mobile,
  code
}) => {
  return myAxios(
    '/app/v1_0/authorizations',
    'post',
    {
      mobile,
      code
    }
  )
}
