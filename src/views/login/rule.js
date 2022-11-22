export const phoneReg = /^(?:(?:\+|00)86)?1\d{10}$/

export const usernameReg = /^[a-zA-Z0-9_-]{4,16}$/

export const passwordReg = /^[-\w\d_!\@\#\%\*\^]{6,}$/

export function validateUsername(rule, value, callback) {
  if (!value)
    return callback(new Error('请输入用户名'))

  setTimeout(() => {
    if (!usernameReg.test(value))
      callback(new Error('用户名由4-16位字母数字字符组成'))
    callback()
  }, 1000)
}

export function validatePassword(rule, value, callback) {
  if (!value) {
    callback(new Error('Please input the password'))
  }
  else {
    if (!passwordReg.test(value))
      callback(new Error('密码由至少6位字符加数字组成'))
    callback()
  }
}

export function validatePhone(rule, value, callback) {
  if (!value)
    callback(new Error('请输入电话'))
  if (!phoneReg.test(value))
    callback(new Error('电话不合法！'))
  callback()
}
