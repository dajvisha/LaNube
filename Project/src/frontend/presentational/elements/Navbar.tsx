import * as React from 'react';
import Grid from 'material-ui/Grid';
import Input, { InputAdornment } from 'material-ui/Input';
import Paper from 'material-ui/Paper';
import {Search, Clear} from 'material-ui-icons';
import IconButton from 'material-ui/IconButton';

export default class Navbar extends React.Component<any, any> {
    state = {
        hover: false
    };
    public render() {
        let searchStyle;
        if (this.state.hover) {
          searchStyle = {backgroundColor: '#A0C9EF'}
        } else {
          searchStyle = {backgroundColor: '#99C5EF'}
        }

        let toggleHover = () => {
            this.setState({hover: !this.state.hover})
        }
      return(
        <div style={{ padding: 20 }}>
            <Grid
            spacing={40}
            container
            direction='row'
            alignItems='center'>
                <Grid container item xs={12} sm={4} md={2} justify='center'>
                    <a>
                        <img src={'/src/frontend/presentational/assets/logo.svg'}/>
                    </a>
                </Grid>
                <Grid item xs={12} sm={8} md={10}>
                    <Paper elevation={0} style={{
                        backgroundColor: searchStyle.backgroundColor,
                        paddingRight: 10,
                        paddingLeft: 10,
                        paddingBottom: 5,
                        paddingTop: 5}}
                        onMouseEnter={toggleHover} 
                        onMouseLeave={toggleHover}>
                    <Input
                        style={{alignItems: 'center'}}
                        value={this.props.searchQuery}
                        disableUnderline
                        fullWidth
                        onChange={(e) => this.props.handleSearch(e.target.value)}
                        startAdornment={
                        <InputAdornment position="start">
                            <Search color='#f1f1f1'/>
                        </InputAdornment>}
                        endAdornment={
                            <InputAdornment
                                position="start">
                                <IconButton
                                    onClick={(_) => this.props.handleSearch('')}
                                    onMouseDown={(event) => { event.preventDefault(); }}
                                >
                                    <Clear color='#f1f1f1'/>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    </Paper>
                </Grid>
            </Grid>
        </div>
      );
  }
}