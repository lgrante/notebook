export const defaultRules = [
    {
        keyTrigger: event => ['ArrowDown', 'ArrowUp'].includes(event.code),
        action: (event, lineIndex, cursorIndex, lines) => {
            const yOffset = event.code === 'ArrowUp' ? -1 : 1
            const result = lineIndex + yOffset

            if (result > lines.length - 1 || result < 0) {
                return {lines, lineIndex, cursorIndex}
            }
            return {lines, lineIndex: result, cursorIndex}
        } 
    },
    {
        keyTrigger: event => ['ArrowLeft', 'ArrowRight'].includes(event.code),
        action: (event, lineIndex, cursorIndex, lines) => {
            const xOffset = event.code === 'ArrowLeft' ? -1 : 1
            const result = cursorIndex + xOffset

            if (result > lines[lineIndex].text.length - 1 || result < 0) {
                return {lines, lineIndex, cursorIndex}
            }
            return {lines, lineIndex, cursorIndex: result}
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