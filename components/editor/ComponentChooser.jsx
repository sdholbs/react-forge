import React, {PropTypes} from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import { connect } from 'react-redux'
import TextField from 'material-ui/lib/text-field';
export default class Chooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      componentSelected: null,
      componentProps: null
    };
  }

  handleOpen(){
    this.setState({open: true});
  }

  handleClose()  {
    this.props.onSelection(this.state.componentSelected, this.state.componentProps);
  }

  _onSelectedComponent(item){
    this.setState({
      componentSelected: item,
      componentProps: {}
    });
  }
  
  _updateComponentProp(key, value){
    let componentProps = this.state.componentProps;
    componentProps[key] = value;
    this.setState({
      componentSelected: this.state.componentSelected,
      componentProps: componentProps
    })
  }

  render() {
    let listStyles = {
      overflowY: 'scroll'
    };
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onClick={this.handleClose.bind(this)}/>,
    ];
    let self = this;
    let dialog = null;

    if(!this.state.componentSelected){
      let components = this.props.components.map(item =>{
        return <div key={item.displayName} onClick={() => self._onSelectedComponent(item)}>{item.displayName}</div>;
      });

      dialog = (
        <Dialog
          title="Select a component"
          actions={actions}
          modal={false}
          open={true}
          onRequestClose={this.handleClose.bind(this)} 
          autoScrollBodyContent={true}>
            {components}
        </Dialog>
      );
    }else{
      let content =[];
      for (let propTypeKey in this.state.componentSelected.propTypes){
        let propType = this.state.componentSelected.propTypes[propTypeKey];
        if(propTypeKey !== 'children' && propTypeKey !== 'style'){
          if(propType === PropTypes.bool){
            
          }else if(propType === PropTypes.func){
            //function
          }else{
            content.push(<TextField onChange={e=>this._updateComponentProp(propTypeKey,e.target.value)} floatingLabelText={propTypeKey} />);
          }
        }
      }

      dialog = (
        <Dialog
          title={this.state.componentSelected.displayName}
          actions={actions}
          modal={false}
          open={true}
          onRequestClose={this.handleClose.bind(this)} 
          autoScrollBodyContent={true}>
            {content}
        </Dialog>
      );
    }
    return (
      <div>
        {dialog}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    components: state.components
  };
}

const SmartChooser = connect(mapStateToProps)(Chooser)
export default SmartChooser
