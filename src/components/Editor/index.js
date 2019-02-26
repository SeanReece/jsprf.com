import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import * as monaco from 'monaco-editor'
import './Editor.css'

function Editor({ onChange, defaultValue, disabled }) {
  const [editorInstance, setEditorInstance] = useState()
  const editorElement = useRef()

  useEffect(() => {
    const instance = monaco.editor.create(editorElement.current, {
      value: defaultValue,
      language: 'javascript',
      automaticLayout: true,
      // scrollbar: {
      //   vertical: 'visible',
      //   // Render horizontal scrollbar.
      //   // Accepted values: 'auto', 'visible', 'hidden'.
      //   // Defaults to 'auto'
      //   horizontal: 'visible',
      // },
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

  const style = {
    width: '100%',
    height: '33%',
  }
  return <div ref={editorElement} style={style} className="editor" />
}

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

Editor.defaultProps = {
  disabled: false,
}

export default Editor
