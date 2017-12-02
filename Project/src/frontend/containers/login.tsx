import * as React from 'react';
import { connect } from 'react-redux';

import { thunks } from 'Logic/actions/thunks';

import { isEmpty } from 'Config/helper';

import {
  Status,
  LoginAttempt
} from 'Config/constants';

import { LoginForm } from 'Presentational/components/login';

class Login extends React.Component<any, any> {
    componentDidMount() {
        if(isEmpty(this.props.session.current)) {
            this.props.loadProfile();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(!isEmpty(nextProps.session.current)) {
            this.props.history.push('/admin');
        }
    }

    errorText() {
        var errorText = this.props.session.error.statusText;
        if (errorText != "Por favor inicia sesión") {
            return errorText;
        } else {
            errorText = "";
        }
        return errorText;
    }

  render() {
    return (
      <div>
        <LoginForm
            visible = {this.props.session.login.open}
            submit = {this.props.loginSubmit}
            waiting = {this.props.session.status == 
                                    Status.WaitingOnServer}
            failed = {this.props.session.error && 
                    this.props.session.error.status && 
                    this.props.session.error.status == 400}
            error = {this.errorText()}
        />  
      </div>
    );
  }
}

function mapStateToProps(state: any) {
    return {
        session: state.session
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        loginSubmit: (loginAttempt: LoginAttempt) => 

            dispatch(thunks.session.login(loginAttempt)),
        loadProfile: () => dispatch(thunks.session.profile())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)