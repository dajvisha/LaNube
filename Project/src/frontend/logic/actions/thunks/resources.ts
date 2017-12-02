import { Resource, ResourceActions, Status } from 'Config/constants';
import { createAction } from 'Logic/actions';
import { post, get, del } from 'Logic/actions/thunks';

export function update(resource: Resource, editing: boolean) {
    return (dispatch: any) => {
        console.log(editing);
        dispatch(createAction(ResourceActions.Update, null, 
            null, Status.WaitingOnServer));
        if(editing){
            post(resource, 'api/resources/' + resource._id + '/edit/')
                .then(response => dispatch(
                    createAction(ResourceActions.Update, response.resource as Resource, 
                        null, Status.Ready)))
                .catch((error) => dispatch(
                    createAction(ResourceActions.Update, resource as Resource, error, 
                        Status.Failed)));
        }
        else {
            post(resource, 'api/resources/new/')
            .then(response => dispatch(
                createAction(ResourceActions.Update, response.resource as Resource, 
                    null, Status.Ready)))
            .catch((error) => dispatch(
                createAction(ResourceActions.Update, resource as Resource, error, 
                    Status.Failed)));
        }
    };
}

export function all() {
    return (dispatch:any) => {
        dispatch(createAction(ResourceActions.All, null, 
            null, Status.WaitingOnServer));
        get('api/resources/')
            .then((response) => dispatch(
                createAction(ResourceActions.All, response.resources as Resource[], 
                    null, Status.Ready)))
            .catch((error) => dispatch(
                createAction(ResourceActions.All, null, error, Status.Failed)));
    };
}

export function remove(resource: Resource) {
    return (dispatch:any) => {
        dispatch(createAction(ResourceActions.Remove, null, 
            null, Status.WaitingOnServer));
        del('api/resources/' + resource._id)
            .then(() => dispatch(
                createAction(ResourceActions.Remove, resource, null, 
                    Status.Ready)))
            .catch((error) => dispatch(
                createAction(ResourceActions.Remove, resource, error, 
                    Status.Failed)));
    };
}
