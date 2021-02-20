import request, { MethodType } from "../utils/request";
import { Timelines } from "../config/interface";

export const getAccountsById = (id: string): Promise<any> => {
  const url = '/api/v1/accounts/' + id;

  return request(url, MethodType.GET);
}

export const getStatusesById = (id: string, params: string = ''): Promise<Array<Timelines>> => {
  const url = '/api/v1/accounts/' + id + '/statuses' + params;

  return request(url, MethodType.GET);
}

// 获取当前账号的用户信息
// /api/v1/accounts/verify_credentials
export const getSelfInformation = (): Promise<any> => {
  const url = '/api/v1/accounts/verify_credentials';

  return request(url, MethodType.GET);
}

// /api/v1/favourites
export const getFavouritesById = (params: string = ''): Promise<Array<Timelines>> => {
  const url = '/api/v1/favourites' + params;

  return request(url, MethodType.GET);
}
