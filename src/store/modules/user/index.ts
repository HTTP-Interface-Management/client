import { defineStore } from 'pinia';
import {
  login as userLogin,
  register as userRegister,
  logout as userLogout,
  getUserInfo,
  LoginData,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserState } from './types';
import useAppStore from '../app';

const TOKEN_KEY = 'token';
const USER_INFO_KEY = 'user_info';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user_info: JSON.parse(localStorage.getItem(USER_INFO_KEY) as any),
    token: localStorage.getItem(TOKEN_KEY) as any
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      // const res = await getUserInfo();
      //
      // this.setInfo(res.data);
    },

    // Register
    async register(loginForm: LoginData) {
        return await userRegister(loginForm);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token, {
          user_id: res.data.user_id,
          username: loginForm.username
        });
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_INFO_KEY);
    },
  },
});

export default useUserStore;
