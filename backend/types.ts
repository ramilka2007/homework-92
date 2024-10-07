import { Model } from 'mongoose';
import {WebSocket} from 'ws';

export interface ActiveConnections {
  [id: string]: WebSocket
}

export interface IncomingMessage {
  type: string;
  payload: string;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleID?: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;
