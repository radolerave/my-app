export default class FormValidators {
    constructor() {

    }

    validateInput(value, pattern) {
        value.match(pattern)  
        
        return (value.match(pattern) !== null)
    }
}