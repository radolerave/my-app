import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { Dexie } from 'dexie'

import { myAccountTemplate } from './../templates/my-account-template.js';

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
                    <ion-input type="email" id="goSignInEmail" label="Email : "></ion-input>
                </ion-item>

                <ion-item>
                    <ion-input type="password" id="goSignInPassword" label="Mot de passe : "></ion-input>
                </ion-item>
            </ion-list>        

            <ion-button id="goSignIn">Se connecter</ion-button>
        </ion-content>
    `,
    logic: () => {
        let myFs = new Fs(FsDb, Dexie)

        const goSignInBtn = document.querySelector("#goSignIn")
        const goSignInEmail = document.querySelector("#goSignInEmail")
        const goSignInPassword = document.querySelector("#goSignInPassword")
        const credentials = {}
        
        goSignInBtn.addEventListener("click", async () => {
            credentials.email = goSignInEmail.value
            credentials.password = goSignInPassword.value

            const testSignedIn = await myFs.signIn(credentials)

            await myAccountTemplate.logic(testSignedIn)
        })
    }
}

export { signIn }