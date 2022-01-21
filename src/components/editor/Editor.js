import React from 'react'
import styles from '../../styles/Editor.module.css'
import PropTypes from 'prop-types'
import { languages } from './languageList'
import { defaultRules } from './defaultRules'


class Editor extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            lines: [
                {
                    text: 'Je suis trop fort',
                    colors: [...Array(17).fill('white')],
                    index: 1
                },
                {
                    text: 'Hello world',
                    colors: [...Array(17).fill('white')],
                    index: 2
                },
                {
                    text: 'Flemme d\'écrire plus lol',
                    colors: [...Array(24).fill('white')],
                    index: 3
                }
            ],
            currentLineIndex: 0,
            currentCursorIndex: 0,
            keyPressed: null
        }
        this.linesContainerRef = React.createRef()
        this.handleLineClick = this.handleLineClick.bind(this)
        this.handleLineChange = this.handleLineKeyPress.bind(this)
    }

    componentDidMount () {
        window.onkeydown = event => {
            this.handleLineKeyPress(event)
        }
    }

    handleLineClick (event) {
        const characterEl = event.target
        const lineEl = characterEl.parentElement
        const characterIndex = Array.prototype.slice.call(lineEl.children).indexOf(characterEl)

        const linesContainerEl = this.linesContainerRef.current
        const linesEl = Array.prototype.slice.call(linesContainerEl.children)
        const lineIndex = linesEl.findIndex(line => line.children[1] === lineEl)

        this.setState({
            currentLineIndex: lineIndex,
            currentCursorIndex: characterIndex
        })
    }

    handleLineKeyPress (event) {
        const {currentLineIndex, currentCursorIndex, lines} = this.state

        for (const rule of defaultRules) {
            if (rule.keyTrigger(event)) {
                const state = rule.action(event, currentLineIndex, currentCursorIndex, lines)

                console.log(state)
                this.setState({
                    lines: state.lines,
                    currentCursorIndex: state.cursorIndex,
                    currentLineIndex: state.lineIndex
                })
            }
        }
    }

    renderCharacter (character, index, lineIndex) {
        const {currentLineIndex, currentCursorIndex, lines} = this.state

        const isCharacterCursor = currentLineIndex === lineIndex && currentCursorIndex === index
        const color = lines[currentLineIndex].colors[currentCursorIndex]
        const id = isCharacterCursor ? (currentCursorIndex > 0 ? styles.cursor_right : styles.cursor_left) : ''

        return (
            <span
                key={`${character}_${index}`}
                style={{color}}
                id={id}
                onClick={e => this.handleLineClick(e)}
            >
                {character}
            </span>
        )
    }

    render () {
        const {width, height} = this.props
        const {lines} = this.state

        return (
            <div id="container" style={{width, height}}>
                <div id={styles.lines_container} ref={this.linesContainerRef}>
                    {lines.map((line, index) => (
                        <div className={styles.line_container} key={index}>
                            <div className={styles.line_index}>
                                <span>{line.index}</span>
                            </div>
                            <div 
                                className={styles.line_content} 
                            >
                                {Array.from(line.text).map((character, cursorIndex) => this.renderCharacter(character, cursorIndex, index))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

Editor.propTypes = {
    /**
     * Width of the Editor. Either string or number directly passed to CSS definition.
     * @memberof Editor
     */
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    /**
     * Height of the Editor. Either string or number directly passed to CSS definition.
     * @memberof Editor
     */
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    /**
     *  Programming language. One of the languages from the languages object into languageList module. 
     * @memberof Editor
     */
    language: PropTypes.oneOf(languages),
    /**
     * Color map. Take an array of object. The "rule" property correspond to a function that takes a line
     * into parameter. (For instance the function can check if the line contains html tag).
     * And the "color" property is the CSS color to be applied wether the function returns true.
     * @memberof Editor
     */
    colorMap: PropTypes.arrayOf(PropTypes.shape({
        rule: PropTypes.func,
        color: PropTypes.string,
    })),
    /**
     * Determines how editor should react to a given key. (Write "()" when user only press "(" for instance).
     * "keyTrigger" property is a function that returns true if the user press the desired key(s).
     * "action" property is a function that returns the new lines, new cursor and line indexes if "keyTrigger" returns true.
     * @memberof Editor
     */
    rules: PropTypes.arrayOf(PropTypes.shape({
        keyTrigger: PropTypes.func,
        action: PropTypes.func
    }))
}

Editor.defaultProps = {
    width: '100%',
    height: '100%',
    rules: defaultRules
}

export default Editor