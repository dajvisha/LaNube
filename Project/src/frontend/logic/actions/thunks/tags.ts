import { Tag, TagActions, Status } from 'Config/constants';
import { createAction } from 'Logic/actions';
import { get } from 'Logic/actions/thunks';

export function all() {
    return (dispatch:any) => {
        dispatch(createAction(TagActions.All, null, 
            null, Status.WaitingOnServer));
        get('api/tags/')
            .then((response) => dispatch(
                createAction(TagActions.All, response.tags as Tag[], null, 
                    Status.Ready)))
            .catch((error) => dispatch(
                createAction(TagActions.All, null, error, Status.Failed)));
    };
}
