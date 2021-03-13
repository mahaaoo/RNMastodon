import { CardStyleInterpolators } from '@react-navigation/stack';
import { StackHeaderOptions, TransitionPreset, StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types';
import Guide from "./guide";
import Login from "./login";
import WebView from "./webView";
import User from "./user";
import UserFans from "./fans/userFans";
import UserFollow from "./fans/userFollow";
import StatusDetail from "./statusDetail";

export interface RouteParams {
  name: string;
  component: React.ComponentType<any>;
  options?: StackHeaderOptions | TransitionPreset | StackNavigationOptions;
  [key: string]: any;
}

const routes: Array<RouteParams> = [
  {
    name: 'Guide',
    component: Guide,
    options: {
      header: () => null,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }
  },
  {
    name: 'Login',
    component: Login,
    options: {
      header: () => null,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }
  },
  {
    name: 'WebView',
    component: WebView,
  },
  {
    name: 'User',
    component: User,
    options: {
      header: () => null,
    }
  },
  {
    name: 'UserFans',
    component: UserFans,
    options: {
      title: '粉丝',
    }
  },
  {
    name: 'UserFollow',
    component: UserFollow,
    options: {
      title: '正在关注',
    }
  },
  {
    name: 'StatusDetail',
    component: StatusDetail,
    options: {
      title: '嘟文详情',
    }
  }
]

export default routes;