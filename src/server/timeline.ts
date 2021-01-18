import request, { MethodType } from "../utils/request";
import { Timelines } from "../config/interface";

// 获取关注人的信息
export const homeLine = (): Promise<Array<Timelines>> => {
  const url = '/api/v1/timelines/home';

  return request(url, MethodType.GET);
}
