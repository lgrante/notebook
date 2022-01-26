const between = (x, min, max, range) => {
    const isRangeFormat = Array.from(range).every(char => char === '[' || char === ']')

    range = (range.length !== 2 || !isRangeFormat) ? '[]' : range

    const gtMin = range.charAt(0) === '[' ? (x >= min) : (x > min)
    const stMax = range.charAt(1) === ']' ? (x <= max) : (x < max)

    return gtMin && stMax
}

export default between