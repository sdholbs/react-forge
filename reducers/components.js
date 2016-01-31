import mui from 'material-ui/lib';

let components = [];

for (let key in mui){
  let item = mui[key];
  if(item.propTypes){
    components.push(item);
  }
}

let initialState = components;


export default function components(state = initialState, action) {
  return state;
}

