import request, { MethodType } from "../utils/request";
import { Timelines, Account } from "../config/interface";

export const getAccountsById = (id: string): Promise<any> => {
  const url = '/api/v1/accounts/' + id;

  return request(url, MethodType.GET);
}

// 获取当前账号的所有推文
export const getStatusesById = (id: string, params: string = ''): Promise<Array<Timelines>> => {
  const url = '/api/v1/accounts/' + id + '/statuses' + params;

  return request(url, MethodType.GET);
}

// 获取当前账号的用户信息
export const getSelfInformation = (): Promise<Account> => {
  const url = '/api/v1/accounts/verify_credentials';

  return request(url, MethodType.GET);
}

// 获取当前账号的所有推文和回复
export const getStatusesReplyById = (id: string, params: string = ''): Promise<Array<Timelines>> => {
  const url = '/api/v1/accounts/' + id + '/statuses?exclude_replies=false&' + params;

  return request(url, MethodType.GET);
}

// 获取当前账号的所有媒体信息
export const getStatusesMediaById = (id: string, params: string = ''): Promise<Array<Timelines>> => {
  const url = '/api/v1/accounts/' + id + '/statuses?only_media=true&' + params;

  return request(url, MethodType.GET);
}

// 获取当前账号的所有置顶消息
export const getStatusesPinById = (id: string, params: string = ''): Promise<Array<Timelines>> => {
  const url = '/api/v1/accounts/' + id + '/statuses?pinned=true&' + params;

  return request(url, MethodType.GET);
}

// /api/v1/favourites
export const getFavouritesById = (params: string = ''): Promise<Array<Timelines>> => {
  const url = '/api/v1/favourites' + params;

  return request(url, MethodType.GET);
}
