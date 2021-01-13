import * as React from 'react'

const navigationRef: any = React.createRef()

// 跳转到指定页面
function navigate (name: String, params?: any) {
  navigationRef.current?.navigate(name, params)
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
