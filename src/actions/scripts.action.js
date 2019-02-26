import { SETUP_ID, DEFAULT_SETUP, DEFAULT_SCRIPT } from '../util/scriptDefaults'
import { generateId } from '../util'
import ReactGA from 'react-ga'

export const ADD_SCRIPT = 'ADD_SCRIPT'
export const REMOVE_SCRIPT = 'REMOVE_SCRIPT'
export const UPDATE_SCRIPT = 'UPDATE_SCRIPT'

export const addScript = (name, value) => {
  ReactGA.event({
    category: 'script',
    action: 'create'
  });
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
  ReactGA.event({
    category: 'script',
    action: 'create'
  });
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
  ReactGA.event({
    category: 'script',
    action: 'remove'
  });
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
