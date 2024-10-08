import {Model} from 'mongoose';
import {WebSocket} from 'ws';
import module from "node:module";
import Types = module


export interface ActiveConnections {
    [id: string]: WebSocket
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
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

export interface UsersOnline {
    _id: string;
    displayName: string;
}