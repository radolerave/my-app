import { Network } from '@capacitor/network';
import { sellerFormTemplate } from './seller-form-template.js'
import { myAccountTemplate as self } from './my-account-template.js';

let myAccountTemplate = {
    name: "my-account-template",
    content: /*html*/`                
        <div id="my-account-template-content" class="notConnected">This is the content for my account.</div>

        <style>
            #my-account-template-content.notConnected {
                text-align: center;
                /*border: solid red 1px;*/
                display: flex;
                justify-content: center;
                align-items: center;
                /* width: 100%; */
                height: 100%;
            }
        </style>
    `,
    logic: async (session) => {
        const myAccountContent = document.querySelector("#my-account-template-content")
        const signOutBtn = document.querySelector("#signOut")
        const signedIn = (typeof session == "object" && typeof session.email != "undefined") ? true : false


        const navigation = document.querySelector("ion-app ion-nav#navigation")
        
        // const connected = await promesse()

        const connected = signedIn    

        const networkStatus = await Network.getStatus();

        if(!networkStatus.connected) {//test if network is NOT connected
            myAccountContent.innerHTML = /*html*/`
                <div>
                    <ion-icon name="cloud-offline-outline" color="medium" style="font-size: 128px;"></ion-icon>
                    <div>Vous n'êtes pas connecté(e) à Internet!</div>
                </div>
            `
        }
        else if(connected) {//test if user is connected      
            if(myAccountContent.classList.contains("notConnected")) {//first load
                myAccountContent.classList.remove("notConnected") 

                myAccountContent.innerHTML = sellerFormTemplate.content

                sellerFormTemplate.logic(session)
            }

            await navigation.popToRoot()//important!!!

            if(signOutBtn.classList.contains("ion-hide")) signOutBtn.classList.remove("ion-hide")
        }
        else {
            await navigation.popToRoot()//important!!!

            if(!signOutBtn.classList.contains("ion-hide")) signOutBtn.classList.add("ion-hide") 

            if(!myAccountContent.classList.contains("notConnected")) myAccountContent.classList.add("notConnected") 
            
            // await navigation.push('sign-in-or-sign-up')                     

            myAccountContent.innerHTML = /*html*/`
                <div>
                    <ion-button id="signInBis" expand="full">Se connecter</ion-button>    
                    <ion-text>-</ion-text>
                    <ion-button id="signUpBis" expand="full">S'inscrire</ion-button>
                </div>
            `
            
            const signInBis = document.querySelector("#signInBis")
            const signUpBis = document.querySelector("#signUpBis")

            signInBis.addEventListener("click", async () => {
                navigation.push('sign-in')
                // await self.logic(true)
            })

            signUpBis.addEventListener("click", () => {
                navigation.push('sign-up')
            })
        }        
    }
}

export { myAccountTemplate }