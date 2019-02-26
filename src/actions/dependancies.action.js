import ReactGA from 'react-ga'

export const ADD_DEPENDANCY_REQUEST = 'ADD_DEPENDANCY_REQUEST'
export const ADD_DEPENDANCY_SUCCESS = 'ADD_DEPENDANCY_SUCCESS'
export const ADD_DEPENDANCY_FAILURE = 'ADD_DEPENDANCY_FAILURE'

export const REMOVE_DEPENDANCY = 'REMOVE_DEPENDANCY'

const findDependancyVersion = (dep) => {
  return dep.VERSION || dep.version || dep.Version || dep.v
}

export const addDependancy = (name) => async (dispatch) => {
  if (global[name]) {
    return
  }
  ReactGA.event({
    category: 'dependancy',
    action: 'add',
    label: name
  });
  try {
    dispatch({
      type: ADD_DEPENDANCY_REQUEST,
      payload: {
        name
      }
    })
    const { default: depExport } = await import(/* webpackIgnore: true */ `https://dev.jspm.io/${name}`)
    if (depExport) {
      global[name] = depExport
      dispatch({
        type: ADD_DEPENDANCY_SUCCESS,
        payload: {
          name,
          version: findDependancyVersion(depExport)
        }
      })
    } else {
      throw new Error('Dependancy not found')
    }
  } catch (error) {
    dispatch({
      type: ADD_DEPENDANCY_FAILURE,
      payload: {
        name,
        error
      }
    })
  }
}

export const removeDependancy = (name) => {
  ReactGA.event({
    category: 'dependancy',
    action: 'remove'
  });
  delete global[name]
  return {
    type: REMOVE_DEPENDANCY,
    payload: {
      name
    }
  }
}
