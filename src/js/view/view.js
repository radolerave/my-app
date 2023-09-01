import { components } from './components.js'

export default class FsView {
    constructor() {
        this.components = components
    }

    generateThisComponent(componentName, component, isRoot = false) {//isRoot must be set to true if the component is the Root NavComponent
        let attempts = 0

        //rendering the content
        customElements.define(componentName, class extends HTMLElement {
            connectedCallback() {
                this.innerHTML = component.content

                component.logic()
            }
        })

        
    }

    generateView() {
        this.generateThisComponent('main-page', components.mainPage, true)
        this.generateThisComponent('my-account', components.myAccount)  
        this.generateThisComponent('sign-in-or-sign-up', components.signInOrSignUp)      
        this.generateThisComponent('sign-in', components.signIn)  
        this.generateThisComponent('sign-up', components.signUp)  
    }

    async skeleton() {

    }
}