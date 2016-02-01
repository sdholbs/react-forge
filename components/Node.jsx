import React, {PropTypes} from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import RaisedButton from 'material-ui/lib/raised-button';
import ComponentChooser from './editor/ComponentChooser.jsx';
import ComponentPrototype from './editor/ComponentPrototype.jsx';


function canHaveChildren(component){
  if(component === 'div'){
    return true;
  }
  if(typeof component === 'string'){
    return false;
  }
  if(component && component.propTypes){
    return component.propTypes.children === PropTypes.node;
  }
  return false;
}

function isRoot(props){
  return props.id === 0;
}

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

  _onComponentSelection(component, props, childText){
    this.setState({
      isChoosingComponent: false
    });
    const { addChild, createNode, id } = this.props;
    let isString = childText.length > 0;
    if(isString){
      component = childText;
    }
    const childId = createNode(component, props, isString).nodeId
    addChild(id, childId)
  }

  renderChild(childId) {
    let childContent = null;
    return (
      <div key={childId}>
        {childContent}
        <ConnectedNode id={childId} />
      </div>
    )
  }

  render() {
    const { childIds } = this.props
    let chooser = null;
    let connectedComponent = null;
    if(this.state.isChoosingComponent){
      chooser = <ComponentChooser onSelection={this._onComponentSelection.bind(this)} />;
    }
    let component = this.props.component;
    let isAbleToHaveChildren = canHaveChildren(this.props.component);
    if(isRoot(this.props)){
      component = 'div';
      isAbleToHaveChildren = true;
    }
    if(this.props.isString){
      connectedComponent = this.props.component;
    }else if(component){
      let addChildButton = null;
      let children = childIds.map(this.renderChild.bind(this));
      if(isAbleToHaveChildren){
        addChildButton = (
          <div>
            <div key="add">
              <RaisedButton onClick={this.handleAddChildClick}>
                + Add child
              </RaisedButton>
            </div>
          </div>
        );
      }
      connectedComponent = (
        <ComponentPrototype component={component} props={this.props.props}>
          {children}
          {addChildButton}
        </ComponentPrototype>
      );
    } 

    return (
      <div>
        {chooser}
        {connectedComponent}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state.nodes[ownProps.id]
}

const ConnectedNode = connect(mapStateToProps, actions)(Node)
export default ConnectedNode
