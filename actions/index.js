export const CREATE_NODE = 'CREATE_NODE'
export const ADD_CHILD = 'ADD_CHILD'


let nextId = 0
export function createNode(component, props) {
  return {
    type: CREATE_NODE,
    nodeId: `new_${nextId++}`,
    component,
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
