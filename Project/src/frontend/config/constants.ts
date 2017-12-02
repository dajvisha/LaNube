import {Action} from 'redux';

export enum SessionActions {
    Login = 'LOGIN',
    Logout = 'LOGOUT'
}

export enum UserActions {
    Update = 'UPDATE_USER',
    All = 'ALL_USERS',
    Remove = 'REMOVE_USER'
}

export enum CategoryActions {
    Update = 'UPDATE_CATEGORY',
    All = 'ALL_CATEGORIES',
    Remove = 'REMOVE_CATEGORY'
}

export enum ResourceActions {
    Update = 'UPDATE_RESOURCE',
    All = 'ALL_RESOURCES',
    Remove = 'REMOVE_RESOURCE'
}

export enum TagActions {
    Update = 'UPDATE_TAG',
    All = 'ALL_TAGS',
    Remove = 'REMOVE_TAG'
}

export enum Status {
    WaitingOnServer = 'WAITING_ON_SERVER',
    WaitingOnUser = 'WAITING_ON_USER',
    Ready = 'READY',
    Failed = 'FAILED'
}

export interface IAction extends Action {
    type: UserActions | CategoryActions | ResourceActions | TagActions,
    object: any,
    error: any,
    status: Status
}

export type User = {
    name?: string,
    email?: string,
    password?: string,
    passwordConf?: string,
    isAdmin?: boolean,
    _id?: string
}

export type LoginAttempt = {
    email: string,
    password: string
}

export type Category = {
    _id?: string,
    name?: string,
    description?: string,
    updatedBy?: any[]
}

export type Resource = {
    _id?: string,
    name?: string,
    description?: string,
    url?: string,
    imageUrl?: string,
    category?: Category,
    tags?: string[] | string,
    type?: string
}

export type Tag = {
    _id?: string,
    name?: string,
    count?: number
}

export var fetchHeader = [
    ['Accept', 'application/json'],
    ['Content-Type', 'application/json']
]

export var serverUrl =  'http://localhost:8000/';