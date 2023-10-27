export default class FormValidators {
    constructor() {

    }

    validateEmailInput(email, input) {
        const test = email.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)  
        
        return test
    }

    validatePasswordInput(password, input) {
        const test = password.length > 0 
        
        return test
    }
}