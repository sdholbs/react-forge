import React, { Component, PropTypes } from 'react';


export default class ComponentPrototype extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let content = React.createElement(
      this.props.component,
      this.props.props,
      this.props.children
    );
    return content;
  }
}
