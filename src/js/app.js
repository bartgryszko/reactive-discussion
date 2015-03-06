"use strict";

var React = require('react'),
    injectTapEventPlugin = require("react-tap-event-plugin"),
    TopicsApp = require('./components/TopicsApp'),
    WebApiUtils = require('./utils/WebApiUtils');

injectTapEventPlugin();

WebApiUtils.loadInitialData();

React.render(<TopicsApp header="An interactive discussion with Tim Cook" />, document.getElementById('app'));