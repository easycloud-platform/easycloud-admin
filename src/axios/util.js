import Cookies from 'js-cookie'

export const TOKEN_KEY = 'zhys'

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token)
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}
