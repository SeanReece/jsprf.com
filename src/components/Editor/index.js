import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import * as monaco from 'monaco-editor'
import jsIcon from '../../images/js.svg'
import './Editor.css'

function Editor({ name, onChange, defaultValue, disabled }) {
  const [editorInstance, setEditorInstance] = useState()
  const editorElement = useRef()

  useEffect(() => {
    const instance = monaco.editor.create(editorElement.current, {
      value: defaultValue,
      language: 'javascript',
      automaticLayout: true,
    })

    monaco.editor.setTheme('vs-dark')
    instance.onDidChangeModelContent(() => {
      onChange(instance.getValue())
    })
    setEditorInstance(instance)
  }, [])

  useEffect(() => {
    if (editorInstance) {
      editorInstance.updateOptions({ readOnly: disabled })
    }
  }, [disabled])

  return (
    <>
      <div className="editor-tab">
        <img src={jsIcon} className="filelist__item__icon" alt="js icon" />
        <span className="editor-tab__title">{name}</span>
      </div>
      <div ref={editorElement} className="editor" />
    </>
  )
}

Editor.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

Editor.defaultProps = {
  disabled: false,
}

export default Editor
