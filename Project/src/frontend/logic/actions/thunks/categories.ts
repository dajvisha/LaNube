import { Category, CategoryActions, Status } from 'Config/constants';
import { createAction } from 'Logic/actions';
import { post, get, del } from 'Logic/actions/thunks';

export function update(category: Category, editing: boolean) {
    return (dispatch: any) => {
        dispatch(createAction(CategoryActions.Update, null, 
            null, Status.WaitingOnServer));
        if(editing){
            post(category, 'api/categories/' + category._id + '/edit/')
                .then(response => dispatch(
                    createAction(CategoryActions.Update, response.category as Category, 
                        null, Status.Ready)))
                .catch((error) => dispatch(
                    createAction(CategoryActions.Update, category as Category, error, 
                        Status.Failed)));
        }
        else {
            post(category, 'api/categories/new/')
            .then(response => dispatch(
                createAction(CategoryActions.Update, response.category as Category, 
                    null, Status.Ready)))
            .catch((error) => dispatch(
                createAction(CategoryActions.Update, category as Category, error, 
                    Status.Failed)));
        }
    };
}

export function all() {
    return (dispatch:any) => {
        dispatch(createAction(CategoryActions.All, null, 
            null, Status.WaitingOnServer));
        get('api/categories/')
            .then((response) => dispatch(
                createAction(CategoryActions.All, response.categories as Category[], 
                    null, Status.Ready)))
            .catch((error) => dispatch(
                createAction(CategoryActions.All, null, error, 
                    Status.Failed)));
    };
}

export function remove(category: Category) {
    return (dispatch:any) => {
        dispatch(createAction(CategoryActions.Remove, null, 
            null, Status.WaitingOnServer));
        del('api/categories/' + category._id)
            .then(() => dispatch(
                createAction(CategoryActions.Remove, category, null, 
                    Status.Ready)))
            .catch((error) => dispatch(
                createAction(CategoryActions.Remove, category, error, 
                    Status.Failed)));
    };
}