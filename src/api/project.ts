import axios from "axios";

export interface ProjectSearch {
  pageSize: number;
  pageNum: number;
  keyword?: string;
}

export interface ProjectInfo {
  "project_id"?: number;
  "name"?: string;
  "description"?: string;
  "creator_id"?: number;
  "created_at"?: string;
}

export interface queryProjectParams {
  pageSize?: number;
  page?: number;
  keyword?: string;
}

export function getAllProjectList(params: queryProjectParams){
  return axios({
    url: '/api/projects/list',
    method: 'get',
    params
  })
}

export function getProjectInterface(project_id: number){
  return axios({
    url: '/api/project_participations/list',
    method: 'get',
    params: {
      project_id: project_id
    }
  })
}

export function getProjectMember(project_id: number){
  return axios({
    url: '/api/project_participations/member',
    method: 'get',
    params: {
      project_id: project_id
    }
  })
}

export function createProject(name: string, description: string, creator_id: number){
  return axios({
    url: '/api/projects/create',
    method: 'post',
    data: {
      Name: name,
      description,
      creator_id
    }
  })
}

export function deleteProject(project_id: number){
  return axios({
    url: '/api/projects/delete',
    method: 'post',
    data: {
      project_id
    }
  })
}

export function addProjectMemeber(project_id: number, user_id: number, role_id: number){
  return axios({
    url: '/api/project_participations/add',
    method: 'post',
    data: {
      project_id,
      user_id,
      role_id
    }
  })
}
