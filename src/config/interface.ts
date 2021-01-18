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

export interface Timelines {
  account: Account,
  application: string,
  bookmarked: boolean,
  card: string,
  content: string,
  created_at: string,
  emojis: any[],
  favourited: boolean,
  favourites_count: number,
  id: string,
  in_reply_to_account_id: string,
  in_reply_to_id: string,
  language: string,
  media_attachments: any[],
  mentions: any[],
  muted: boolean,
  poll: string,
  reblog: string,
  reblogged: string,
  reblogs_count: number,
  replies_count: number,
  sensitive: boolean,
  spoiler_text: string,
  tags: any[],
  uri: string,
  url: string,
  visibility: string,
}

export interface Account {
  acct: string,
  avatar: string,
  avatar_static: string,
  bot: boolean,
  created_at: string,
  discoverable: boolean,
  display_name: string,
  emojis: any[],
  fields: any[],
  followers_count: number,
  following_count: number,
  group: boolean,
  header: string,
  header_static: string,
  id: string,
  last_status_at: string,
  locked: boolean,
  note: string,
  statuses_count: number,
  url: string,
  username: string,
}
