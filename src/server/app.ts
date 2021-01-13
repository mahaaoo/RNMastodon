import request, { MethodType } from "../utils/request";
import { ClientName, Scopes, RedirectUris } from "../config/oauth"

export const getAppConfig = (host: string) => {
  const url = host + '/api/v1/apps';

  const params = {
    client_name: ClientName,
    redirect_uris: RedirectUris,
    scopes: Scopes,
  }

  return request(url, MethodType.POST, params);
}
