/* 是否手机号码
export function isPhone(rule, value, callback) {
  var pattern =  /^[0-9]+.?[0-9]*$/
  if(!pattern.test(value)){
    return callback(new Error('请输入正确的手机号'))
  }
  return callback()
}
/* 是否身份证号码
export function isCard(rule, value,callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(value)) {
      callback(new Error('请输入正确的身份证号码'));
    } else {
      callback();
    }
  }

/* 是否姓名
export function isName(rule, value,callback) {
  const reg = /^[\u0391-\uFFE5A-Za-z]+$/;
    if (!reg.test(value)) {
      callback(new Error('请输入正确的姓名'));
    } else {
      callback();
    }
  }*/
