import {
    Resource,
    ResourceActions,
    Status
} from 'Config/constants';
import { all, remove, update, IReducerState } from 'Logic/reducers';

interface IResourcesState extends IReducerState {
    update: any
}

export function resources (
    state = {
        update: { open: false, object: {} },
        all: [] as Resource[],
        status: Status.Ready,
        error: {}
    },
    action): IResourcesState {

    switch(action.type) {

        case ResourceActions.All:
            return all(state, action);

        case ResourceActions.Remove:
            return remove(state, action);

        case ResourceActions.Update:
            return update(state, action);

        default:
            return {
                ...state
            }
    }
}