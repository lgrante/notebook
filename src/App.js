import React from 'react';
import './styles.css'
import Editor from './components/editor/Editor'


class App extends React.Component {
          /*
  constructor() {
    super()


    this.lineNumbersRef = React.createRef()
    this.editorRef = React.createRef()

    this.state = {
      text: '',
      lineIndexes: []
    }
  }

  componentDidMount() {
    const editor = this.editorRef.current

    this.setState(state => ({
      totalLines: editor.selectionStart / editor.rows
    }))
  }

  appendLineIndex(number, position) {
    this.setState({
      lineIndexes: [
        {number, position},
        ...this.state.lineIndexes
      ]
    })
  }

  handleEditorChange(input) {
    const textArea = this.editorRef.current
    let currentLineLength = 0

    this.setState({
      text: input,
      lineIndexes: []
    }, () => {
      for (let i = 0; i <= input.length; i++) {
        const char = input.charAt(i)

        if (char === '\n') {
          this.setState(state => ({
            lineNumbers: [lineNumber, ...state.lineNumbers],
            ...state
          }), () => {
            console.log(this.state.lineNumbers)
            console.log(text)
            console.log('\n\n')
          })
        }
      }
    })
  }
          */

  render () {
    return (
      <div id="app">
        <div id="main-layout">
          <div id="lesson"></div>
          <div id="playground">
            <Editor/>
            {/*
            <div id="playground-line-number" ref={this.lineNumbersRef}>
              {this.state.lineNumbers.map((lineNumber, index) => (
                lineNumber === index ? index : ''
              ))}
            </div>
            <textarea id="playground-editor" ref={this.editorRef} onChange={e => this.handleEditorChange(e.target.value)}></textarea>
              */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
