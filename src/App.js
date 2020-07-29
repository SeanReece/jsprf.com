import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IoMdDocument, IoMdSettings } from 'react-icons/io'

import { addSetup, addScript, removeScript, updateScript } from './actions/scripts.action'
import { addDependency, removeDependency } from './actions/dependencies.action'
import { startBenchmark } from './actions/bench.action'
import { getSetupScript, getScripts } from './selectors/scripts.selector'
import { isBenchmarkingInProgress } from './selectors/bench.selector'

import Editor from './components/Editor'
import BenchResults from './components/BenchResults'
import FileList from './components/FileList'
import Settings from './components/Settings'

import './App.css'
import logo from './images/jsprf_logo.png'


const NAV_BUTTONS = {
  FILES: 'files',
  SETTINGS: 'settings'
}

class App extends Component {
  state = {
    selected: NAV_BUTTONS.FILES
  }

  componentDidMount() {
    this.props.addSetup('// Setup your scripts here\nconst myString = \'Hello World!\'')
    this.props.addScript('RegExp#test', '// Write code to benchmark here\n/o/.test(myString);')
    this.props.addScript('String#indexOf', '// Write code to benchmark here\nmyString.indexOf(\'o\') > -1;')
    this.props.addScript('String#match', '// Write code to benchmark here\n!!myString.match(/o/);')
  }

  render() {
    const { setup, scripts, dependencies, addSetup, addScript, removeScript, updateScript, addDependency, removeDependency, startBenchmark, inProgress } = this.props
    return (
      <div className="app">
        <div className="header">
          <img src={logo} className="header__logo" alt="logo" />
          <span className="header__title">JSprf</span>
          <span className="header__subtitle">Javascript Benchmarking tool</span>
        </div>
        <div className="content">
          <div className="sidebar">
            <div className="navigate">
              <div 
                className={`navigate__icon ${this.state.selected === NAV_BUTTONS.FILES ? 'selected' : ''}`} 
                onClick={() => this.setState({selected: NAV_BUTTONS.FILES})}>
                  <IoMdDocument />
              </div>
              <div 
                className={`navigate__icon ${this.state.selected === NAV_BUTTONS.SETTINGS ? 'selected' : ''}`} 
                onClick={() => this.setState({selected: NAV_BUTTONS.SETTINGS})}>
                  <IoMdSettings />
              </div>
            </div>
            {this.state.selected === NAV_BUTTONS.FILES &&
            <div className="fileList">
              <FileList
                setup={setup}
                scripts={scripts}
                dependencies={dependencies}
                onAddSetup={addSetup}
                onAddScript={addScript}
                onRemoveScript={removeScript}
                onUpdateScript={updateScript}
                onAddDependency={addDependency}
                onRemoveDependency={removeDependency}
              />
            </div>
            }
            {this.state.selected === NAV_BUTTONS.SETTINGS &&
            <div className="settings">
              <Settings />
            </div>
            }
          </div>
          <div className="editors">
            {setup && (
              <Editor
                key="setup"
                name={setup.name}
                defaultValue={setup.value}
                onChange={value => updateScript(setup.id, { value })}
                disabled={inProgress}
              />
            )}
            {Object.values(scripts).map(script => (
              <Editor
                key={script.id}
                name={script.name}
                defaultValue={script.value}
                onChange={value => updateScript(script.id, { value })}
                benchmark={script.result}
                disabled={inProgress}
              />
            ))}
          </div>
          <div className="info">
            <button type="button" className="benchmark-start__button" onClick={startBenchmark} disabled={inProgress}>
              {!inProgress && "Run Benchmark" }
              {inProgress && <div className="loader" />}
            </button>
            <BenchResults scripts={scripts} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    setup: getSetupScript(state),
    scripts: getScripts(state),
    dependencies: state.dependencies,
    inProgress: isBenchmarkingInProgress(state),
  }
}

export default connect(
  mapStateToProps,
  {
    addSetup,
    addScript,
    removeScript,
    updateScript,
    addDependency,
    removeDependency,
    startBenchmark
  }
)(App)
