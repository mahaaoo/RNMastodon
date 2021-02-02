import { CardStyleInterpolators } from '@react-navigation/stack';
import { StackHeaderOptions, TransitionPreset, StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types';
import Guide from "./guide";
import Login from "./login";
import WebView from "./webView";
import User from "./user";

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
  }
]

export default routes;