import between from '../../utils/between'


const moveCursorX = ['ArrowLeft', 'ArrowRight']
const moveCursorY = ['ArrowDown', 'ArrowUp']
const cursorDirections = {
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
    ArrowUp: [0, -1],
    ArrowDown: [0, 1]
}

export const moveCursorKeys = [...moveCursorX, ...moveCursorY]

export const defaultRules = [
    {
        keyTrigger: event => moveCursorKeys.includes(event.code),
        action: (event, lineIndex, cursorIndex, lines) => {
            const key = event.code
            const direction = cursorDirections[key]

            let newX = cursorIndex + direction[0]
            let newY = lineIndex + direction[1]

            newX = between(newX, 0, lines[lineIndex].text.length, '[[') ? newX : cursorIndex
            newY = between(newY, 0, lines.length, '[[') ? newY : lineIndex

            const newLineSize = lines[newY].text.length
            
            newX = (newY !== lineIndex && cursorIndex >= newLineSize) ? (newLineSize - 1) : newX

            return {lines, lineIndex: newY, cursorIndex: newX}
        }
    },
    {
        keyTrigger: event => event.code === 'Enter',
        action: (_, lineIndex, cursorIndex, lines) => {
            const currentLine = lines[lineIndex].text
            const insertingLineText = currentLine.substring(cursorIndex + 1, currentLine.length)
            const insertingLine = {
                text: insertingLineText,
                colors: [...Array(insertingLineText.length).fill('white')]
            }

            lines[lineIndex].text = currentLine.substring(0, cursorIndex + 1)
            lines.splice(lineIndex + 1, 0, insertingLine)

            return {lines, lineIndex: lineIndex + 1, cursorIndex: 0}
        }
    },
    {
        keyTrigger: event => ['(', '{', '[', '\'', '"'].includes(event.key),
        action: (event, lineIndex, cursorIndex, lines) => {
            const matchingPairs = ['()', '{}', '[]', '\'\'', '""']
            const matchingPair = matchingPairs.find(pair => pair.charAt(0) === event.key)
            let line = lines[lineIndex].slice()

            if (matchingPair) {
                line = line.substring(0, cursorIndex) + matchingPair + line.substring(cursorIndex + matchingPair.length, line.length - 1)
            }
            lines[lineIndex] = line
            return {lines, lineIndex, cursorIndex: cursorIndex + 2}
        }
    }
]