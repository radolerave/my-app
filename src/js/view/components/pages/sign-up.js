import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { Dexie } from 'dexie'
import { Dialog } from '@capacitor/dialog';

import { myAccountTemplate } from './../templates/my-account-template.js';
import FormValidators from "../../../helpers/form-validators.js"
import { fsConfig } from './../../../config/fsConfig.js'

let signUp = {
    name: "sign-up",
    content: /*html*/`
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>

                <ion-title>Inscription</ion-title>

                <ion-text class="ion-margin-end" id="user-type-indicator" slot="end">userType</ion-text>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-list>
                <ion-item>
                    <ion-input type="text" id="goSignUpName" label="Nom : " required="true"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-input type="email" id="goSignUpEmail" label="Email : " required="true"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-input type="password" id="goSignUpPassword" label="Mot de passe : " required="true"></ion-input>
                </ion-item>
            </ion-list>

            <ion-button id="goSignUp" disabled="true">S'inscrire</ion-button>
            <br>
            <ion-text id="error-text" color="danger"></ion-text>
        </ion-content>
    `,
    logic: () => {
        const apiUrl = fsConfig.apiUrl
        const formValidation = new FormValidators()
        let myFs = new Fs(FsDb, Dexie)
        let nbrOfAttempts = 0

        const navigation = fsGlobalVariable.navigation
        let currPage, userType
        const userTypeIndicator = document.querySelector("sign-up #user-type-indicator")
        const goSignUpBtn = document.querySelector("#goSignUp")
        const goSignUpName = document.querySelector("#goSignUpName")
        const goSignUpEmail = document.querySelector("#goSignUpEmail")
        const goSignUpPassword = document.querySelector("#goSignUpPassword")
        const errorText = document.querySelector("sign-up #error-text")
        const credentials = {}

        const listener = async () => {
            let currentPage = currPage = await navigation.getActive()
        
            console.log(currentPage)
        
            if(currentPage.component == "sign-up") {
                userTypeIndicator.innerHTML = currentPage.params.userType
            }
        }        
    
        navigation.addEventListener('ionNavDidChange', listener)
        
        goSignUpBtn.addEventListener("click", async () => {
            credentials.name = goSignUpName.value
            credentials.email = goSignUpEmail.value
            credentials.password = goSignUpPassword.value

            userType = currPage.params.userType

            const signUpResult = await myFs.signUp(apiUrl, credentials, userType)

            console.log(signUpResult)
        })

        function validateThisInput() {
            const validName = formValidation.validateInput(goSignUpName.value, /.{1,}/g)
            const validEmail = formValidation.validateInput(goSignUpEmail.value, fsConfig.patterns.email)
            const validPwd = formValidation.validateInput(goSignUpPassword.value, fsConfig.patterns.password)            

            if(validEmail && validPwd && validName) {
                goSignUpBtn.removeAttribute("disabled")
                errorText.textContent = ``
            }
            else {
                goSignUpBtn.setAttribute("disabled", "true")
                errorText.textContent = `Nom, Email ou Mot de passe invalid`
            }
        }

        goSignUpName.addEventListener('ionInput', (ev) => {
            validateThisInput()
        })

        goSignUpEmail.addEventListener('ionInput', (ev) => {
            validateThisInput()
        })

        goSignUpPassword.addEventListener('ionInput', (ev) => {
            validateThisInput()
        })
    }
}

export { signUp }