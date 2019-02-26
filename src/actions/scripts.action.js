import { SETUP_ID, DEFAULT_SETUP, DEFAULT_SCRIPT } from '../util/scriptDefaults'
import { generateId } from '../util'

export const ADD_SCRIPT = 'ADD_SCRIPT'
export const REMOVE_SCRIPT = 'REMOVE_SCRIPT'
export const UPDATE_SCRIPT = 'UPDATE_SCRIPT'

export const addScript = (name, value) => {
  return {
    type: ADD_SCRIPT,
    payload: {
      id: generateId(),
      name,
      value: value || DEFAULT_SCRIPT
    }
  }
}

export const addSetup = (value) => {
  return {
    type: ADD_SCRIPT,
    payload: {
      id: SETUP_ID,
      name: 'Setup.js',
      value: value || DEFAULT_SETUP
    }
  }
}

export const removeScript = (id) => {
  return {
    type: REMOVE_SCRIPT,
    payload: {
      id
    }
  }
}

export const updateScript = (id, update) => {
  return {
    type: UPDATE_SCRIPT,
    payload: {
      id,
      ...update
    }
  }
}
