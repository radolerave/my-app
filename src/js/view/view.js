import { components } from './components.js'

export default class FsView {
    constructor() {
        this.components = components
    }

    generateThisComponent(component, isRoot = false) {//isRoot must be set to true if the component is the Root NavComponent
        let attempts = 0

        //rendering the content
        customElements.define(component.name, class extends HTMLElement {
            connectedCallback() {
                this.innerHTML = component.content

                component.logic()
            }
        })        
    }

    async generateView(component = undefined) {
        this.generateThisComponent(this.components.mainPage, true)
        this.generateThisComponent(this.components.myAccount)  
        this.generateThisComponent(this.components.signInOrSignUp)      
        this.generateThisComponent(this.components.signIn)  
        this.generateThisComponent(this.components.signUp)  
    }

    async skeleton() {

    }
}