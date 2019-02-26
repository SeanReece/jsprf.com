import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addSetup, addScript, removeScript, updateScript } from './actions/scripts.action'
import { addDependancy, removeDependancy } from './actions/dependancies.action'
import { startBenchmark } from './actions/bench.action'
import { getSetupScript, getScripts } from './selectors/scripts.selector'
import { isBenchmarkingInProgress } from './selectors/bench.selector'

import Editor from './components/Editor'
import BenchResults from './components/BenchResults'
import FileList from './components/FileList'
import './App.css'
import logo from './images/jsprf_logo.png'

class App extends Component {
  componentDidMount() {
    this.props.addSetup('// Setup your scripts here\nconst myString = \'Hello World!\'')
    this.props.addScript('// Write code to benchmark here\nRegExp#test', '/o/.test(myString);')
    this.props.addScript('// Write code to benchmark here\nString#indexOf', 'myString.indexOf(\'o\') > -1;')
    this.props.addScript('// Write code to benchmark here\nString#match', '!!myString.match(/o/);')
  }

  render() {
    const { setup, scripts, dependancies, addSetup, addScript, removeScript, updateScript, addDependancy, removeDependancy, startBenchmark, inProgress } = this.props
    return (
      <div className="app">
        <div className="header">
          <img src={logo} className="header__logo" alt="logo" />
          {/* <span className="header__title">JSprf</span> */}
          {/* <span className="header__subtitle">Javascript Benchmarking tool</span> */}
        </div>
        <div className="content">
          <div className="sidebar">
            <div className="fileList">
              <FileList
                setup={setup}
                scripts={scripts}
                dependancies={dependancies}
                onAddSetup={addSetup}
                onAddScript={addScript}
                onRemoveScript={removeScript}
                onUpdateScript={updateScript}
                onAddDependancy={addDependancy}
                onRemoveDependancy={removeDependancy}
              />
            </div>
          </div>
          <div className="editors">
            {setup && (
              <Editor
                key="setup"
                defaultValue={setup.value}
                onChange={value => updateScript(setup.id, { value })}
                disabled={inProgress}
              />
            )}
            {Object.values(scripts).map(script => (
              <Editor
                key={script.id}
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
    dependancies: state.dependancies,
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
    addDependancy,
    removeDependancy,
    startBenchmark
  }
)(App)
