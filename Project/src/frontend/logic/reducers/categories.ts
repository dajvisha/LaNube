import { 
    Category, 
    CategoryActions, 
    Status 
} from 'Config/constants';
import { all, remove, update, IReducerState } from 'Logic/reducers';

interface ICategoriesState extends IReducerState {
    update: any
}

export function categories (
    state = {
        update: { open: false, object: {} },
        all: [] as Category[], 
        status: Status.Ready ,
        error: {}
    }, 
    action): ICategoriesState {

    switch(action.type) {

        case CategoryActions.All:
            return all(state, action);

        case CategoryActions.Remove:
            return remove(state, action);

        case CategoryActions.Update:
        return update(state, action);

        default:
            return { ...state } as ICategoriesState;
    }
}