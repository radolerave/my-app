import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { Dexie } from 'dexie'
import { Dialog } from '@capacitor/dialog';

import { myAccountTemplate } from './../templates/my-account-template.js';
import FormValidators from "../../../helpers/form-validators.js"

let signIn = {
    name: "sign-in",
    content: /*html*/`
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>

                <ion-title>Connexion</ion-title>
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
    logic: () => {
        const formValidation = new FormValidators()
        let myFs = new Fs(FsDb, Dexie)
        let nbrOfAttempts = 0

        const goSignInBtn = document.querySelector("#goSignIn")
        const goSignInEmail = document.querySelector("#goSignInEmail")
        const goSignInPassword = document.querySelector("#goSignInPassword")
        const errorText = document.querySelector("#error-text")
        const credentials = {}
        
        goSignInBtn.addEventListener("click", async () => {
            credentials.email = goSignInEmail.value
            credentials.password = goSignInPassword.value

            const testSignedIn = await myFs.signIn(credentials)

            if(testSignedIn) {
                await myAccountTemplate.logic(testSignedIn)//true
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

        goSignInEmail.addEventListener('ionInput', (ev) => {
            const validEmail = formValidation.validateEmailInput(ev.target.value, ev.target)
            const validPwd = formValidation.validatePasswordInput(goSignInPassword.value, goSignInPassword)

            if(validEmail && validPwd) {
                goSignInBtn.removeAttribute("disabled")
                errorText.textContent = ``
            }
            else {
                goSignInBtn.setAttribute("disabled", "true")
                errorText.textContent = `Email ou mot de passe invalid`
            }
        })

        goSignInPassword.addEventListener('ionInput', (ev) => {
            const validPwd = formValidation.validatePasswordInput(ev.target.value, ev.target)
            const validEmail = formValidation.validateEmailInput(goSignInEmail.value, goSignInEmail)

            if(validEmail && validPwd) {
                goSignInBtn.removeAttribute("disabled")
                errorText.textContent = ``
            }
            else {
                goSignInBtn.setAttribute("disabled", "true")
                errorText.textContent = `Email ou mot de passe invalid`
            }
        })
    }
}

export { signIn }