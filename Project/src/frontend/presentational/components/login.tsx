import * as React from 'react';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import Input, { InputAdornment, InputLabel } from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
// import { LinearProgress } from 'material-ui/Progress';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff'; 
import Error from 'Presentational/elements/Error'; 

export class LoginForm extends React.Component<any, any> {
  handleChange: (name: any) => (event: any) => void;
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false
    }
  }

  public render() {
    return (
      <Dialog 
        open = {this.props.visible}>
          <DialogTitle>Entrar</DialogTitle>
          <DialogContent>
             <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Correo electrónico"
              type="email"
              fullWidth
              onChange={(event) => {
                this.setState({
                email: event.target.value
              });}
            }
            /><br />
            <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              onChange={(event) => {
                  this.setState({
                  password: event.target.value
                });}
              }
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={(_) => {
                      this.setState({ showPassword: !this.state.showPassword });
                    }}
                    onMouseDown={(event) => { event.preventDefault(); }}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          
          <br />
          <br />
          {this.props.error && <Error description={this.props.error}/>}

          </DialogContent>
          <DialogActions>
            <Button 
              onClick = {() => this.props.submit({email: this.state.email, 
                password: this.state.password})}
              color="primary">
              Entrar
            </Button>
          </DialogActions>
      </Dialog>)
  }
}