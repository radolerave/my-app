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
    logic: async (conn = false) => {
        let session = fsGlobalVariable.session
        const myAccountContent = document.querySelector("#my-account-template-content")
        const signOutBtn = document.querySelector("#signOut")
        const signedIn = conn


        const navigation = document.querySelector("ion-app ion-nav#navigation")
        
        // const connected = await promesse()

        const connected = signedIn    

        const networkStatus = await Network.getStatus();

        /*if(!networkStatus.connected) {//test if network is NOT connected
            myAccountContent.innerHTML = `
                <div>
                    <ion-icon name="cloud-offline-outline" color="medium" style="font-size: 128px;"></ion-icon>
                    <div>Vous n'êtes pas connecté(e) à Internet!</div>
                </div>
            `
        }
        else */if(connected) {//test if user is connected   
            switch(session.userType) {
                case "1": 
                    if(myAccountContent.classList.contains("notConnected")) {//first load
                        myAccountContent.classList.remove("notConnected") 
        
                        myAccountContent.innerHTML = sellerFormTemplate.content
        
                        sellerFormTemplate.logic(session)
                    }
        
                    await navigation.popToRoot()//important!!!
        
                    if(signOutBtn.classList.contains("ion-hide")) signOutBtn.classList.remove("ion-hide")
                    break;

                case "2":
                    if(myAccountContent.classList.contains("notConnected")) {//first load
                        myAccountContent.classList.remove("notConnected") 
        
                        myAccountContent.innerHTML = /*html*/`
                            <div>Welcome ${session.name}.</div>
                            <div>Ah! you are a finder</div>
                        `
                    }
        
                    await navigation.popToRoot()//important!!!
        
                    if(signOutBtn.classList.contains("ion-hide")) signOutBtn.classList.remove("ion-hide")
                    break;

                default:
                    await self.logic(false)
                    break;
            }
        }
        else {
            await navigation.popToRoot()//important!!!

            if(!signOutBtn.classList.contains("ion-hide")) signOutBtn.classList.add("ion-hide") 

            if(!myAccountContent.classList.contains("notConnected")) myAccountContent.classList.add("notConnected") 
            
            // await navigation.push('sign-in-or-sign-up')                     

            myAccountContent.innerHTML = /*html*/`
                <div>
                    <h3>Vous êtes : </h3>
                    <ion-radio-group id="user-type" allow-empty-selection="true">
                        <ion-radio value="1" label-placement="end">Seller (vendeur)</ion-radio><br />
                        <ion-radio value="2" label-placement="end">Finder (client)</ion-radio>
                    </ion-radio-group>
                    <br>
                    <br>
                    <hr>
                    <br>
                    <h3>Que voulez-vous faire ?</h3>
                    <ion-button id="signInBis" disabled="true" expand="full">Se connecter</ion-button>    
                    <ion-text>-</ion-text>
                    <ion-button id="signUpBis" disabled="true" expand="full">S'inscrire</ion-button>
                </div>
            `

            const userType = myAccountContent.querySelector("ion-radio-group#user-type")

            const signInBis = document.querySelector("#signInBis")
            const signUpBis = document.querySelector("#signUpBis")

            userType.addEventListener("ionChange", () => {
                switch(true) {
                    case (typeof(userType.value) != "undefined"): 
                        signInBis.setAttribute("disabled", "false")
                        signUpBis.setAttribute("disabled", "false")
                        break

                    default:
                        signInBis.setAttribute("disabled", "true")
                        signUpBis.setAttribute("disabled", "true")
                        break
                }
            })                    

            signInBis.addEventListener("click", async () => {
                await navigation.push('sign-in', { userType: userType.value })
                // await self.logic(true)
            })

            signUpBis.addEventListener("click", async () => {
                await navigation.push('sign-up')
            })
        }        
    }
}

export { myAccountTemplate }