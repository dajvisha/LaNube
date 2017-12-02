import { 
  User, 
  LoginAttempt, 
  SessionActions, 
  Status 
} from 'Config/constants';
import { createAction } from 'Logic/actions';
import { post, get, del } from 'Logic/actions/thunks';

export function profile() {
  return (dispatch: any) => {
      get('api/profile/')
          .then(response => dispatch(
              createAction(SessionActions.Login, response.user as User, null, 
                  Status.Ready)))
          .catch((error) => dispatch(
              createAction(SessionActions.Login, null, error, 
                  Status.Failed)));
  }
}

export function login(loginAttempt: LoginAttempt) {
  return (dispatch: any) => {
      dispatch(createAction(SessionActions.Login, null, 
          null, Status.WaitingOnServer));
      post(loginAttempt, 'api/login/')
          .then(response => dispatch(
              createAction(SessionActions.Login, response.user as User, null, 
                  Status.Ready)))
          .catch((error) => dispatch(
              createAction(SessionActions.Login, null, error, 
                  Status.Failed)));
  };
}

export function logout() {
  return (dispatch:any) => {
      dispatch(createAction(SessionActions.Logout, null, 
          null, Status.WaitingOnServer));
      del('api/logout/')
          .then(() => dispatch(
              createAction(SessionActions.Logout, null, null, 
                  Status.Ready)))
          .catch((error) => dispatch(
              createAction(SessionActions.Logout, null, error, 
                  Status.Failed)));
  };
}