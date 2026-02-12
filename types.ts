
export enum ViewType {
  CHATS = 'CHATS',
  DISCOVER = 'DISCOVER',
  CREATE = 'CREATE',
  SEARCH = 'SEARCH',
  PROFILE = 'PROFILE',
  SETTINGS = 'SETTINGS',
  WALLET = 'WALLET',
  NOTIFICATIONS = 'NOTIFICATIONS',
  LIVE_SUPPORT = 'LIVE_SUPPORT',
  LIVE_STREAMS = 'LIVE_STREAMS',
  WATCH_LIVE = 'WATCH_LIVE',
  CALLS = 'CALLS'
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  crystals: number;
}

export interface Notification {
  id: string;
  type: 'LIKE' | 'COMMENT' | 'FOLLOW' | 'WALLET' | 'SYSTEM';
  message: string;
  timestamp: string;
  read: boolean;
  userAvatar?: string;
}

export interface LiveStream {
  id: string;
  streamerName: string;
  streamerAvatar: string;
  viewerCount: string;
  title: string;
  thumbnail: string;
  category: string;
}
