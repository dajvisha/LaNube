import {
    // Tag,
    TagActions,
    Status
} from 'Config/constants';
import { IReducerState } from 'Logic/reducers';

interface ITagsState extends IReducerState {

}

export function tags(
    state: ITagsState = {
        all: [] as string[],
        error: {},
        status: Status.Ready
    }, 
    action): ITagsState {

    switch(action.type) {
        case TagActions.All:
            switch(action.status) {
                case Status.Ready: {
                    return {
                        all: action.object,
                        error: {},
                        status: action.status
                    }
                }
                default: {
                    return {
                        ...state,
                        status: action.status,
                        error: action.error
                    }
                }
            }
        default:
            return {
                ...state
            }
    }
}