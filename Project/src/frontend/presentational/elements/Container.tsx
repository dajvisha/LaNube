import * as React from 'react';

export default class Container extends React.Component<any, any> {
    public render() {
      return(
        <div style={{backgroundColor: this.props.bgColor, paddingTop: '30px', paddingBottom: '30px'}}>
            <div className="uk-container">
                {this.props.children}
            </div>
        </div>
      );
  }
}