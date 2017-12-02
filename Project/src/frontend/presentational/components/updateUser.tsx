import * as React from 'react';
import Dialog, { DialogActions, DialogTitle, DialogContent } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { LinearProgress } from 'material-ui/Progress';
import { User } from 'Config/constants';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Input, { InputAdornment, InputLabel } from 'material-ui/Input';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff'; 
import Error from 'Presentational/elements/Error';
import { 
  isEmpty,
  containsOnlyIsAdmin,
} from 'Config/helper';

export class UpdateUser extends React.Component<any, any> {
  state = {
    user: {
      name: '',
      email: '',
      password: '',
      passwordConf: '',
      isAdmin: true
    } as User,
    editing: false,
    showPassword: false
  };

  componentWillReceiveProps(nextProps) {
    if(!isEmpty(nextProps.object)) {
      if(containsOnlyIsAdmin(nextProps.object) && !nextProps.failed && !nextProps.waiting) {
        this.setState({
          user: {
            name: '',
            email: '',
            password: '',
            passwordConf: '',
            isAdmin: nextProps.object.isAdmin,
          } as User,
          editing: false,
          showPassword: false
        });
      }

      else if(!nextProps.failed && !nextProps.waiting) {
        this.setState({
          user: {
            name: nextProps.object.name,
            email: nextProps.object.email,
            password: '',
            passwordConf: '',
            isAdmin: nextProps.object.isAdmin,
          } as User,
          editing: true,
          showPassword: false
        });
      }
    }
  }

  public render() {
    var handleChange = (name) => e => {
        this.setState({
          user: { 
            ...this.state.user,
            [name]: e.target.value 
          }
        });
    };

    var handleCheck = name => (_, checked) => {
      this.setState({ 
        user: { 
          ...this.state.user,
          [name]: checked 
        }
      })
    };

    var handleShowPassword = () => {
      this.setState({
        showPassword: !this.state.showPassword
      });
    };

    var handleSubmit = () => {
      let user = this.state.user
      if(this.state.editing) {
        user._id = this.props.object._id;
        if(this.state.user.password == '') {
          user.password = this.props.object.password;
        }
      }
      this.props.submit(user, this.state.editing);
    }

    var title = this.state.editing? 'Editar ' : 'Registrar ';
    title += this.state.user.isAdmin? 'Administrador' : 'Colaborador';

    return (
        <Dialog 
          open = {this.props.visible}
          onRequestClose={this.props.hide}>
            <DialogTitle>{title}</DialogTitle>
              <DialogContent>

              <TextField
                  label="Nombre"
                  value={this.state.user.name}
                  onChange={handleChange('name')}
              /><br />

              <TextField
                label="Correo electrónico"
                value={this.state.user.email}
                onChange={handleChange('email')}
              /><br />

              <FormControl>
                <InputLabel htmlFor="password">Contraseña</InputLabel>
                <Input
                  id="password"
                  onChange={handleChange('password')}
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.user.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleShowPassword}
                        onMouseDown={(event) => { event.preventDefault(); }}
                      >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl><br />

              {!this.state.editing && 
                <div>
                  <TextField
                    label="Confirmación de contraseña"
                    type="password"
                    value={this.state.user.passwordConf}
                    onChange={handleChange('passwordConf')}
                  />
                  <br />
                </div>}

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.user.isAdmin}
                      onChange={handleCheck('isAdmin')}
                    />
                  }
                  label="Administrador"
                /><br />

              {this.props.error && <Error description={this.props.error.statusText}/>}
              {this.props.waiting && <LinearProgress mode="indeterminate" />}

            </DialogContent>
          <DialogActions>
            <Button 
              onClick = {this.props.hide} 
              color='primary'>
                Cancelar
            </Button>,
            <Button 
              onClick = {handleSubmit}
              color='primary'>
                {this.state.editing? 'Editar' : 'Registrar'}
            </Button>
          </DialogActions>
        </Dialog>)
  }
}