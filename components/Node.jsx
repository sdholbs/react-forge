import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import RaisedButton from 'material-ui/lib/raised-button';
import ComponentChooser from './editor/ComponentChooser.jsx';
import ComponentPrototype from './editor/ComponentPrototype.jsx';
class Node extends Component {
  constructor(props) {
    super(props)
    this.handleAddChildClick = this.handleAddChildClick.bind(this)
    this.state = {
      isChoosingComponent: false
    }
  }


  handleAddChildClick(e) {
    e.preventDefault()
    this.setState({
      isChoosingComponent: true
    });
  }

  _onComponentSelection(component, props){
    this.setState({
      isChoosingComponent: false
    });
    const { addChild, createNode, id } = this.props
    const childId = createNode(component, props).nodeId
    addChild(id, childId)
  }

  renderChild(childId) {
    let childContent = null;
    if(this.props.component){
      childContent = <ComponentPrototype component={this.props.component} props={this.props.props} />
    }
    return (
      <li key={childId}>
        {childContent}
        <ConnectedNode id={childId} />
      </li>
    )
  }

  render() {
    const { childIds } = this.props
    let chooser = null;
    if(this.state.isChoosingComponent){
      chooser = <ComponentChooser onSelection={this._onComponentSelection.bind(this)} />;
    }
    return (
      <div>
        {chooser}
        <ul>
          {childIds.map(this.renderChild.bind(this))}
          <li key="add">
            <a href="#" onClick={this.handleAddChildClick}>
              Add child
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state.nodes[ownProps.id]
}

const ConnectedNode = connect(mapStateToProps, actions)(Node)
export default ConnectedNode
