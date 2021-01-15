import request, { MethodType } from "../utils/request";
import { ClientName, Scopes, RedirectUris } from "../config/oauth"
import { AppInterface, AppToken } from "../config/interface";

export const getAppConfig = (host: string): Promise<AppInterface> => {
  const url = host + '/api/v1/apps';

  const params = {
    client_name: ClientName,
    redirect_uris: RedirectUris,
    scopes: Scopes,
  }

  return request(url, MethodType.POST, params);
}

export const getToken = (host: string, param: Object): Promise<AppToken> => {
  const url = host + '/oauth/token';
  const params = {
    redirect_uri: RedirectUris,
    grant_type: 'authorization_code',
    ...param
  };

  return request(url, MethodType.POST, params);
}

