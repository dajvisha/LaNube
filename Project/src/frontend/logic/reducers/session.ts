import { 
  User,
  SessionActions,
  Status
} from 'Config/constants';

function login(state, action) {
  switch(action.status){
      case Status.Ready:
          return {
              current: action.object,
              status: action.status,
              login: { open: false },
              error: {}
          }
      case Status.WaitingOnServer:
          return {
              ...state,
              status: action.status,
          }
      case Status.WaitingOnUser:
      case Status.Failed:
          return {
              ...state,
              status: action.status,
              login: { open: true },
              error: action.error
          }
      default:
          return {
              ...state,
              status: action.status,
              error: {}
          }
  }
}

function logout(state) {
  return {
      ...state,
      current: {},
      login: { open: true }
  }
}

interface ISessionState {
  login: any,
  current: User,
  status: Status,
  error: any
}

export function session (
  state = {
      login: { open: true },
      current: {} as User,
      status: Status.Ready,
      error: {}
  },
  action): ISessionState {
    switch(action.type){
      case SessionActions.Login:
        return login(state, action);

      case SessionActions.Logout:
        return logout(state);

      default:
        return {...state};
    }
  }