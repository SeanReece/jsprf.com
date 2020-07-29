import ReactGA from 'react-ga'

export const TOGGLE_TRANSPILE = 'TOGGLE_TRANSPILE'

export const toggleTranspile = () => {
  ReactGA.event({
    category: 'settings',
    action: 'transpile'
  });
  return {
    type: TOGGLE_TRANSPILE
  }
}