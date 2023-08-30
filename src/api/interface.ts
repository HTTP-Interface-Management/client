import axios from "axios";

export interface InterfaceData {
  catalog_name: string;
  url: string;
  change_info?: string;
  created_by?: number;
  description: string;
  interface_id?: number;
  method: string;
  name: string;
  request_params: RequestParams;
  response_data: any;
  project_id?: number;
}

export interface RequestParams {
  "params"?: any;
  "body"?: any;
  "Header"?: any;
}

export interface queryInterfaceParam {
  page?: number,
  pageSize?: number,
  keyword?: string
}


export function addInterface(interfaceData: InterfaceData){
  return axios({
    method: 'post',
    data: interfaceData,
    url: '/api/interface/add'
  });
}


export function queryAllInterfaces(params: queryInterfaceParam){
  return axios({
    method: 'get',
    url: '/api/interface/queryAll',
    params
  });
}

export function updateInterfaces(newInterfaceData: InterfaceData){
  return axios({
    method: 'post',
    url: '/api/interface/update',
    data: newInterfaceData
  });
}

export function deleteInterface(interface_id: number){
  return axios({
    method: 'post',
    url: '/api/interface/delete',
    data: {
      interface_id
    }
  });
}

export function queryAllVersions(interface_id: number){
  return axios({
    method: 'get',
    url: '/api/interface/getAllVersions',
    params: {
      interface_id: interface_id
    }
  });
}

export function getVersionInfo(interface_id: number, version_id: number){
  return axios({
    method: 'post',
    url: '/api/interface/query',
    data: {
      interface_id,
      version_id
    }
  });
}
