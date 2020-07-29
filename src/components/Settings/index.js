import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Settings.css'
import { shouldTranspile } from '../../selectors/settings.selector'
import { toggleTranspile } from '../../actions/settings.action'

function Settings() {
  const dispatch = useDispatch()
  const shouldTranspileSetting = useSelector(shouldTranspile)

  return (
    <>
      <div className="settings__header">SETTINGS</div>
      <span className="settings__subheader">Babel Transpile</span>
      <div className="settings__line">
        <span className="settings__line__text">Transpile code:</span>
        <input
          id="transpile"
          className="checkbox"
          name="transpile"
          type="checkbox"
          checked={shouldTranspileSetting}
          onChange={(e) => dispatch(toggleTranspile())} />
        <label for="transpile" className="checkbox-label"></label>
      </div>
    </>
  )
}

export default Settings
