import * as React from 'react';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import Grid from 'material-ui/Grid';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  overrides: {
    MuiChip: {
      root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        margin: 7,
        color: 'white'
      },
    },
  },
});

export default class TrendingTopics extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Typography type='title' component='h2'>
          Temas Recurrentes
        </Typography>
        <br/>
        <Grid container justify='flex-start'>
        <MuiThemeProvider theme={theme}>
              {this.props.tags.map(tag => {
                return (
                  <Grid item key={tag._id}>
                    
                    <Chip
                      key={tag._id}
                      label={tag.name}
                      onClick={() => this.props.handleSearch(tag.name)}
                    />
                </Grid>)
              })}
            </MuiThemeProvider>
        </Grid>
      </div>
      );
  }
}