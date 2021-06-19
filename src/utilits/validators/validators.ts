export type FieldValidatorType = (value: string) => string | undefined

export const requiredField: FieldValidatorType = (value) => {
    if (value) return undefined

    return 'Field is required'
}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    if (value.length > maxLength) return `To long message. Max length is ${maxLength} char`

    return undefined
}