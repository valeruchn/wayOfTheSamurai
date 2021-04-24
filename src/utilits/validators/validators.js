export const requiredField = value => {
    if (value) return undefined

    return 'Field is required'
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `To long message. Max length is ${maxLength} char`

    return undefined
}