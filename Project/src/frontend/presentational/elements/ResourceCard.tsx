import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import { CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { Smartphone, Laptop } from 'material-ui-icons';
import Tooltip from 'material-ui/Tooltip';
import Avatar from 'material-ui/Avatar';

import { ShareButtons, generateShareIcon } from 'react-share';

const FacebookIcon = generateShareIcon('facebook');

const {
  FacebookShareButton,
} = ShareButtons;

export default class ResourceCard extends React.Component<any, any> {
    state = {
        boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2)",
        hover: false
    }

    public render() {
        let resource = this.props.resource;
        let fb = <div></div>;
        let type = resource.type == 'web' ? <Laptop /> : <Smartphone />;
        if (this.state.hover) {
            fb = (<FacebookShareButton
                        url={resource.url}
                        quote={`Información sobre ${resource.name}. 
                                        \n Aprende más en LaNube.mx`}>
                        <IconButton><FacebookIcon size={32} round /></IconButton>
                    </FacebookShareButton>);
        }
        let url = resource.url.indexOf('http://') !== -1 ? 
            resource.url : 
            `http://${resource.url}`;
        return (
            <div
                onMouseEnter={() => { 
                    this.setState({ 
                        boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.6)",
                        hover: true
                    });
                }}
                onMouseLeave={() => { 
                    this.setState({ 
                        boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2)",
                        hover: false
                     });
                }}
                className='resourceCard animated fadeIn delay'
                style={{
                    'animationDelay': this.props.delay + 's', 
                    boxShadow: this.state.boxShadow
                }}
                key={resource._id}
                onClick={() => window.open(url, '_blank')}>
                <CardContent>
                    <Typography type="headline" component="h2">
                        {resource.name}
                    </Typography>
                    <Typography component="p">
                        {resource.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Tooltip title={resource.category.name} placement='bottom'>
                        <Avatar style={{width: 30, height: 30}}>
                            {(resource.category.name as string).charAt(0).toUpperCase()}
                        </Avatar>
                    </Tooltip>
                    <IconButton>{type}</IconButton>
                    {fb}
                </CardActions>
            </div>
        );
    }
}

