import ReactGA from 'react-ga'

export const ADD_DEPENDENCY_REQUEST = 'ADD_DEPENDENCY_REQUEST'
export const ADD_DEPENDENCY_SUCCESS = 'ADD_DEPENDENCY_SUCCESS'
export const ADD_DEPENDENCY_FAILURE = 'ADD_DEPENDENCY_FAILURE'

export const REMOVE_DEPENDENCY = 'REMOVE_DEPENDENCY'

const findDependencyVersion = (dep) => {
  return dep.VERSION || dep.version || dep.Version || dep.v
}

export const addDependency = (name) => async (dispatch) => {
  if (global[name]) {
    return
  }
  ReactGA.event({
    category: 'dependency',
    action: 'add',
    label: name
  });
  try {
    dispatch({
      type: ADD_DEPENDENCY_REQUEST,
      payload: {
        name
      }
    })
    const { default: depExport } = await import(/* webpackIgnore: true */ `https://dev.jspm.io/${name}`)
    if (depExport) {
      global[name] = depExport
      dispatch({
        type: ADD_DEPENDENCY_SUCCESS,
        payload: {
          name,
          version: findDependencyVersion(depExport)
        }
      })
    } else {
      throw new Error('Dependency not found')
    }
  } catch (error) {
    dispatch({
      type: ADD_DEPENDENCY_FAILURE,
      payload: {
        name,
        error
      }
    })
  }
}

export const removeDependency = (name) => {
  ReactGA.event({
    category: 'dependency',
    action: 'remove'
  });
  delete global[name]
  return {
    type: REMOVE_DEPENDENCY,
    payload: {
      name
    }
  }
}
