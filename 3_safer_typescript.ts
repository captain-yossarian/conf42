interface Animal { // <--- change me
    tag: 'animal',
    name: 'some animal'
}

declare var animal: Animal;

const handleRecord = (obj: Record<string, unknown>) => {
    obj['_I_AM_AN_UNSAFE_PROPERTY'] = 23
}

const result = handleRecord(animal) // error

export { }