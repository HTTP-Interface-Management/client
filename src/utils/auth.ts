const TOKEN_KEY = 'token';
const USER_INFO_KEY = 'user_info';

const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string, userInfo: object) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_INFO_KEY);
};

export { isLogin, getToken, setToken, clearToken };
