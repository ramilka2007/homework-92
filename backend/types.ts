import {Model, Schema} from 'mongoose';
import {WebSocket} from 'ws';
import Types = module

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
}

export interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface MessageApi {
    _id: Types.ObjectId;
    message: string;
    user: Types.ObjectId;
    datetime: string;
}