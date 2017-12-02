import { 
    User, 
    UserActions, 
    Status 
} from 'Config/constants';
import { createAction } from 'Logic/actions';
import { post, get, del } from 'Logic/actions/thunks';

export function update(user: User, editing: boolean) {
    return (dispatch: any) => {
        dispatch(createAction(UserActions.Update, null, 
            null, Status.WaitingOnServer));
        if(editing){
            post(user, 'api/users/' + user._id + '/edit/')
                .then(response => dispatch(
                    createAction(UserActions.Update, response.user as User, 
                        null, Status.Ready)))
                .catch((error) => dispatch(
                    createAction(UserActions.Update, user, error, 
                        Status.Failed)));
        }
        else {
            post(user, 'api/users/new/')
            .then(response => dispatch(
                createAction(UserActions.Update, response.user as User, 
                    null, Status.Ready)))
            .catch((error) => dispatch(
                createAction(UserActions.Update, null, error, 
                    Status.Failed)));
        }
    };
}

export function all() {
    return (dispatch:any) => {
        dispatch(createAction(UserActions.All, null, 
            null, Status.WaitingOnServer));
        get('api/users/')
            .then((response) => dispatch(
                createAction(UserActions.All, response.users as User[], null, 
                    Status.Ready)))
            .catch((error) => {dispatch(
                createAction(UserActions.Remove, null, error, 
                    Status.Failed))
            });
    };
}

export function remove(user: User) {
    return (dispatch:any) => {
        dispatch(createAction(UserActions.Remove, null, 
            null, Status.WaitingOnServer));
        del('api/users/' + user._id)
            .then(() => dispatch(
                createAction(UserActions.Remove, user, null, Status.Ready)))
            .catch((error) => {
                const status = error.response ? error.response.status : 500
                if (status === 404) {
                  console.log('Not found');
                } else {
                  console.log('Other error');
                }
                dispatch(
                createAction(UserActions.Remove, user, error, 
                    Status.Failed))
            });
    };
}