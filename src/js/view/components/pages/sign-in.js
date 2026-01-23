import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { Dexie } from 'dexie'
import { Dialog } from '@capacitor/dialog';

import { myAccountTemplate } from './../templates/my-account-template.js';
import FormValidators from "../../../helpers/form-validators.js"
import { fsConfig } from './../../../config/fsConfig.js'

let signIn = {
    name: "sign-in",
    content: /*html*/`
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>

                <ion-title>Connexion</ion-title>

                <ion-text class="ion-margin-end" id="user-type-indicator" slot="end">userType</ion-text>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-list>
                <ion-item>
                    <ion-input type="email" id="goSignInEmail" label="Email : " label-placement="stacked" placeholder="example@example.com"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-input type="password" id="goSignInPassword" label="Mot de passe : " label-placement="stacked" placeholder="password"></ion-input>
                </ion-item>
            </ion-list>        

            <ion-button id="goSignIn" disabled="true">Se connecter</ion-button>
            <br>
            <ion-text id="error-text" color="danger"></ion-text>
        </ion-content>
    `,
    logic: async () => {
        const apiUrl = fsConfig.apiUrl
        const formValidation = new FormValidators()
        let myFs = new Fs(FsDb, Dexie)
        let nbrOfAttempts = 0

        const navigation = fsGlobalVariable.navigation
        let currPage, userType
        const userTypeIndicator = document.querySelector("sign-in #user-type-indicator")
        const goSignInBtn = document.querySelector("#goSignIn")
        const goSignInEmail = document.querySelector("#goSignInEmail")
        const goSignInPassword = document.querySelector("#goSignInPassword")
        const errorText = document.querySelector("sign-in #error-text")
        const credentials = {}

        const listener = async () => {
            let currentPage = currPage = await navigation.getActive()
        
            console.log(currentPage)
        
            if(currentPage.component == "sign-in") {
                userTypeIndicator.innerHTML = currentPage.params.userType
            }
        }        
    
        navigation.addEventListener('ionNavDidChange', listener)
        
        goSignInBtn.addEventListener("click", async () => {
            credentials.email = goSignInEmail.value
            credentials.password = goSignInPassword.value

            userType = currPage.params.userType

            const testSignedIn = await myFs.signIn(apiUrl, credentials, userType)

            if(testSignedIn) {
                try {
                    const localCredentials = await myFs.getLocalCredentials()//signIn mode : device <=> localDb
                    fsGlobalVariable.session = localCredentials
                    
                    await myAccountTemplate.logic(testSignedIn)//true
                }
                catch(err) {
                    await Dialog.alert({
                        title: 'Connexion impossible',
                        message: `Une erreur inattendue s'est produite.`,
                    })
                }
            }
            else {
                await Dialog.alert({
                    title: 'Connexion impossible',
                    message: `Veuillez vérifier vos informations d'identification.`,
                })

                nbrOfAttempts++

                if(nbrOfAttempts > 2) {
                    await myAccountTemplate.logic(testSignedIn)//false
                }
            }            
        })

        function validateThisInput() {
            const validEmail = formValidation.validateInput(goSignInEmail.value, fsConfig.patterns.email)
            const validPwd = formValidation.validateInput(goSignInPassword.value, fsConfig.patterns.password)

            if(validEmail && validPwd) {
                goSignInBtn.removeAttribute("disabled")
                errorText.textContent = ``
            }
            else {
                goSignInBtn.setAttribute("disabled", "true")
                errorText.textContent = `Email ou mot de passe invalid`
            }
        }

        goSignInEmail.addEventListener('ionInput', (ev) => {
            validateThisInput()
        })

        goSignInPassword.addEventListener('ionInput', (ev) => {
            validateThisInput()
        })
    }
}

export { signIn }