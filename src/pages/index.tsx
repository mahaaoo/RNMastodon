import { CardStyleInterpolators } from '@react-navigation/stack';
import { StackHeaderOptions, TransitionPreset, StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types';
import Guide from "./guide";
import Login from "./login";
import WebView from "./webView";
import User from "./user";
import UserFans from "./fans/userFans";
import UserFollow from "./fans/userFollow";
import StatusDetail from "./statusDetail";
import Publish from "./publish";
import Favourites from "./setting/favourites";

import Test from "./test";

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
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  },
  {
    name: 'User',
    component: User,
    options: {
      header: () => null,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }
  },
  {
    name: 'UserFans',
    component: UserFans,
    options: {
      title: '粉丝',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }
  },
  {
    name: 'UserFollow',
    component: UserFollow,
    options: {
      title: '正在关注',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }
  },
  {
    name: 'StatusDetail',
    component: StatusDetail,
    options: {
      title: '嘟文详情',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }
  },
  {
    name: 'Test',
    component: Test,
    options: {
      title: '测试页面',
    }
  },
  {
    name: 'Publish',
    component: Publish,
    options: {
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      title: '发送嘟文',
    }
  },
  {
    name: 'Favourites',
    component: Favourites,
    options: {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      title: '我的喜欢',
    }
  },
]

export default routes;