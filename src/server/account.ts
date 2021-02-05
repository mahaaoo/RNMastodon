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
