/**
 * @Author mah93
 * @Date 2019-10-25  11:42
 */

import axios, { AxiosResponse } from 'axios';


const instance = axios.create({
  timeout: 30000,
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    console.log('\n===================请求拦截器=================');
    console.log(`请求地址：${config.url}`);
    console.log(`请求参数：`);
    console.log(config.data);
    console.log('============================================\n');

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 接受拦截器
instance.interceptors.response.use(
  response => {
    console.log('\n===================响应拦截器=================');
    console.log(`返回状态：${response.status}`);
    console.log(`返回数据：`, response.data);
    console.log('============================================\n');

    return response;
  },
  error => {
    console.log('返回了错误', error);
    return Promise.reject(error);
  },
);

export enum MethodType {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put',
}

export interface Response extends AxiosResponse {
  data: ResponseProps;
}

export interface ResponseProps {
  code: number;
  msg: string;
  data: any;
  [key: string]: any;
}

const checkStatus = (response: Response, url: string) => {
  if (response.status === 200) {
    return response;
  }

  throw new Error(url);
};

const handleError = (error: any) => {
  console.log("==============请求发生异常============");
  console.log(error);
  console.log("====================================");

  // 保证为promise返回一个包含data.msg的对象，以便显示错误信息
  return {
    code: 9,
    msg: '连接超时，请检查网络是否可用。',
  };
};

const request = (url: string, method: MethodType, params?: Object | null, options?: any): Promise<any> => {
  return instance(url, {
    method: method,
    data: params,
    ...options,
  }).then((response: Response) => checkStatus(response, url))
    .then((response: Response) => {
      return response.data;
    })
    .catch((error: any) => handleError(error));  
};

export default request;
