import * as React from 'react';

export default class Error extends React.Component<any, any> {
    public render() {
      return(
          <div style={{overflow: "hidden"}}>
              <p style={{color: "#E30A49", display: "inline-block",}}>{this.props.description}</p>
          </div>
      );
  }
}