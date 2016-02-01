export const CREATE_NODE = 'CREATE_NODE'
export const ADD_CHILD = 'ADD_CHILD'


let nextId = 1;
export function createNode(component, props, isString) {
  return {
    type: CREATE_NODE,
    nodeId: `new_${nextId++}`,
    component,
    isString,
    props
  }
}

export function addChild(nodeId, childId, component) {
  return {
    type: ADD_CHILD,
    nodeId,
    childId,
    component
  }
}
