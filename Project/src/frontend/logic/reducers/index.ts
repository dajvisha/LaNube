import { combineReducers } from 'redux';
import { Status, IAction } from 'Config/constants';
import { resources } from './resources';
import { categories } from './categories';
import { users } from './users';
import { tags } from './tags';
import { session } from './session';
import { routerReducer } from 'react-router-redux';

export interface IReducerState {
    all: Array<any>,
    error: any,
    status: Status
}

export function update(state, action:IAction) {
    switch(action.status){
        case Status.Ready:
            if(action.object)
            {
                let newState = remove(state, action);
                return {
                    ...newState,
                    all: [
                        ...newState.all,
                        action.object
                    ],
                    status: action.status,
                    update: { open: false, object: {} },
                    error: {}
                }
            }
            return {
                ...state,
                status: action.status,
                update: { open: false, object: {} },
                error: {}
            }
        case Status.WaitingOnServer:
        case Status.WaitingOnUser:
        case Status.Failed:
            return {
                ...state,
                status: action.status,
                update: { open: true, object: action.object },
                error: action.error
            }
        default:
            return {
                ...state,
                status: action.status,
                error: action.error
            }
    }
}

export function remove(state, action: IAction) {
    let objects: any[];
    let index: number;

    switch(action.status) {
        case Status.Ready:
            objects = state.all;
            if(objects && objects.length > 0)
            {
                index = objects.findIndex(obj => obj._id === action.object._id);
                if(index != -1) {
                    objects.splice(index, 1);
                }
                return {
                    ...state,
                    all: objects,
                    status: action.status,
                    error: {}
                }
            }
            return { 
                ...state, 
                status: action.error
            }

        default:
            return {
                ...state,
                status: action.status,
                error: action.error,
            }
    }
}

export function all(state, action: IAction) {
    return {
        ...state,
        status: action.status,
        all: action.object,
        error: action.error
    }
}

export interface IState {
    all: any[];
    error: any;
    status: Status;
}

export interface IModel extends IState {
    update: { open: boolean, object: any }
}

export interface ISession extends IState {
    login: { open: boolean, object: any }
}

const rootReducer = combineReducers({
    resources,
    categories,
    users,
    tags,
    session,
    router: routerReducer
});

export default rootReducer