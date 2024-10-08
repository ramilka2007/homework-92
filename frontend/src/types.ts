export interface RegisterMutation {
  username: string;
  displayName: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  role: string;
  token: string;
  displayName: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface UsersOnline {
  displayName: string;
  _id: string;
}

export interface MessageApi {
  _id: string;
  message: string;
  datetime: string;
  user: UsersOnline;
}

export interface IncomingEntered {
  type: 'ENTERED';
  payload: MessageApi[];
}
export interface IncomingMessages {
  type: 'ADD_MESSAGE';
  payload: MessageApi;
}

export interface IncomingOnlineUsers {
  type: 'SET_ONLINE_USERS';
  payload: UsersOnline[];
}

export type IncomingMessage = IncomingEntered | IncomingMessages| IncomingOnlineUsers;