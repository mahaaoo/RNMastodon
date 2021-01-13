import { useRef, useEffect, useCallback, useState } from "react";
import LoadingModal from "../components/Modal/loadingModal";
import ToastModal from "../components/Modal/toastModal";

// 防抖hooks
const useDebounce = <T extends () => void>(fn: T, delay: number = 1000, dep: Array<any> = []) => {
  const { current } : any = useRef({ fn, timer: null });
  useEffect(() => {
    current.fn = fn;
  }, [fn]);

  return useCallback(() => {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn();
    }, delay);
  }, dep)
}

interface UseRequestOptions {
  manual?: boolean; // 是否需要手动触发
}

// 请求
const useRequest = <T extends (...args: any) => Promise<any>>(fn: T, options?: UseRequestOptions) => {
  const [data, setData] = useState()
  const [error, setError] = useState()
  const { current } : any = useRef({ fn });

  const run = useCallback(() => {
    async function getData() {
      setData(await current.fn());
    }
    LoadingModal.getInstance().open();
    getData()
    .catch((error) => {
      ToastModal.getInstance().show(error.message);
      setError(error);
    })
    .finally(() => {
      LoadingModal.getInstance().close();
    });
  }, [fn]);

  useEffect(() => {
    current.fn = fn;
    if (!(options && options.manual && options.manual == true )) {
      run();
    }
  }, [fn]);

  return {
    data,
    error,
    run,
  }
}

export {
  useDebounce,
  useRequest,
}
