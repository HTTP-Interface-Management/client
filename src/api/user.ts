import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface RegisterData {
  username: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
  user_id: number;
}

export function register(data: LoginData) {
  return axios.post('/api/users/register', data);
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/users/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}

export function getProjectList(user_id: any){
  return axios({
    url: '/api/users/projectList',
    params:{
      user_id: user_id
    }
  });
}
