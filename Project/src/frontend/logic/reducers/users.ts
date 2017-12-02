import { 
    User, 
    UserActions,
    Status 
} from 'Config/constants';
import { all, remove, update, IReducerState } from 'Logic/reducers';

interface IUserState extends IReducerState {
    update: any
}

export function users (
    state = {
        update: { open: false, object: {} },
        all: [] as User[],
        status: Status.Ready,
        error: {}
    },
    action): IUserState {

    switch(action.type) {
        case UserActions.All:
            return all(state, action);

        case UserActions.Remove:
            return remove(state, action);

        case UserActions.Update:
            return update(state, action);

        default:
            return { ...state };
    }
}