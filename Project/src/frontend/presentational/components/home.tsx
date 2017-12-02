import * as React from 'react';
import { LinearProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';

import TrendingTopics from 'Presentational/elements/TrendingTopics'
import ResourceCard from 'Presentational/elements/ResourceCard';
import { Status } from 'Config/constants';

function createContent(objects, status) {
  if (objects != null && objects.length > 0)
    switch (status) {
      case Status.Ready:
        return objects.map((object, i) => (
          <ResourceCard
            key={object._id}
            resource={object}
            delay={i / 10}
          />
        ));
      case Status.Failed:
        return (<p>No hay conexión a Internet</p>);
      case Status.WaitingOnServer:
      default:
        return (<LinearProgress mode="indeterminate" />);
    }
}

export class Home extends React.Component<any, any> {
  public render() {
    let resources = createContent(this.props.resources, this.props.status);

    return (
      <div style={{ padding: 20 }}>
        <Grid className='topicsAndResources' container spacing={24}>
          <Grid container item xs={12} md={9}>
            <div className='resourcesWrapper'>
              <div className='resourcesGrid'>
                {resources}
              </div>
            </div>
          </Grid>
          <Grid container item xs={12} md={3}>
            <TrendingTopics
              handleSearch={this.props.handleSearch}
              tags={this.props.tags} />
          </Grid>
        </Grid>
      </div>
    );
  }
}