import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from 'Config/app';
// Stylesheets
require('Presentational/style/home.scss');

const rootEl = document.getElementById("root");

function render(Root) {
  ReactDOM.render(
      <Root />,
    rootEl
  );
}

render(App);