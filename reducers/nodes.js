import { combineReducers } from 'redux'

import {ADD_CHILD, CREATE_NODE } from '../actions'

function node(state, action) {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
        component: action.component,
        props: action.props,
        isString: action.isString === true,
        childIds: []
      }
    case ADD_CHILD:
      return Object.assign({}, state, {
        childIds: [ ...state.childIds, action.childId ]
      })
    default:
      return state
  }
}

export default function nodes(state = {}, action) {
  const { nodeId } = action
  if (typeof nodeId === 'undefined') {
    return state
  }

  return Object.assign({}, state, {
    [nodeId]: node(state[nodeId], action),
  })
}

