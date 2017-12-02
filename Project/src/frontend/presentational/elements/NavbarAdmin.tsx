import * as React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Styles from 'Presentational/style/elementStyles';

export default class Navbar extends React.Component<any, any> {
    public render() {
        return(
            <div style={{ padding: 20 }}>
                <Grid
                spacing={40}
                container
                direction='row'
                alignItems='center'>
                    <Grid container item xs={3} sm={3} md={3} justify='center'>
                        <a>
                            <img src={'/src/frontend/presentational/assets/logo.svg'}/>
                        </a>
                    </Grid>
                    <Grid container item xs={6} sm={6} md={6}>
                        <h1>¡Hola! <span style={{color: '#FFFFFF'}}>{this.props.user}</span></h1>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                        <Button 
                            onClick = {this.props.logout}
                            color="primary"
                            style={Styles.logoutButton.style}>
                            Cerrar sesión
                        </Button>
                    </Grid>
                </Grid>
            </div>
      );
  }
}