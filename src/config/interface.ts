export interface AppInterface {
  client_id: string;
  client_secret: string;
  id: string;
  name: string;
  redirect_uri: string;
  vapid_key: string;
  website: string;
}

export interface AppToken {
  access_token: string;
  token_type: string;
  scope: string;
  create_at: number;
}
