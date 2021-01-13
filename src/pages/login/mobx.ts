// import { observable, action, runInAction } from "mobx";
// import { getAppConfig } from "../../server/app";
// import { ClientName, RedirectUris, Scopes } from "../../config/oauth";
// import LoadingModal from "../../components/Modal/loadingModal";
// import ToastModal from "../../components/Modal/toastModal";

// export default class LoginMobx {
//   @observable path: string = "";

//   @action changePath = (value: string) => {
//     this.path = value;
//   }

//   @action handleLogin = () => {
//     const allPath = "https://" + this.path;
//     const params = {
//       client_name: ClientName,
//       redirect_uris: RedirectUris,
//       scopes: Scopes,
//     }
//     getAppConfig(allPath, params).then(res => {
//       // console.log(res);

//     })
//   }
// }