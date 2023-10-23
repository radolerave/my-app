import { components } from './components.js'

export default class FsView {
    constructor() {
        this.components = components
    }

    generateThisComponent(component) {
        //rendering the content
        customElements.define(component.name, class extends HTMLElement {
            connectedCallback() {
                this.innerHTML = component.content

                component.logic()
            }
        })        
    }

    async generateView(component = undefined) {
        this.generateThisComponent(this.components.mainPage)
        this.generateThisComponent(this.components.myAccount)  
        this.generateThisComponent(this.components.signInOrSignUp)      
        this.generateThisComponent(this.components.signIn)  
        this.generateThisComponent(this.components.signUp)  
        this.generateThisComponent(this.components.sellerDetails) 
        this.generateThisComponent(this.components.sellerMediaManagement) 
        this.generateThisComponent(this.components.mediaPublication) 
    }

    async skeleton() {

    }
}