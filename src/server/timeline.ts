import request, { MethodType } from "../utils/request";
import { AppInterface, AppToken } from "../config/interface";

// 获取关注人的信息
export const homeLine = (): Promise<{}> => {
  const url = '/api/v1/timelines/home';

  return request(url, MethodType.GET);
}
