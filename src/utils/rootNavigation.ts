import * as React from 'react'

const navigationRef: any = React.createRef()
export const isReadyRef: any = React.createRef();

// 跳转到指定页面
function navigate (name: String, params?: any) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

// 重置路由栈
function reset(name: string, params?: any) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name: name, params: params }],
  })
}

// 返回上一页
function goBack() {
  navigationRef.current?.goBack();
}

export {
  navigationRef,
  navigate,
  goBack, 
  reset
}
