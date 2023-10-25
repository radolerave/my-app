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
    logic: async (signedIn) => {
        let hasSignedIn = signedIn
        const myAccountContent = document.querySelector("#my-account-template-content")

        const promesse = () => {
            return new Promise((resolve, reject) => {
                if(!hasSignedIn) {
                    myAccountContent.innerHTML = "You are not logged in, you will be redirected to the sign in page."

                    setTimeout(() => {
                        myAccountContent.innerHTML = ""   
                        resolve(hasSignedIn)                     
                    }, 2000);
                }    
                else {
                    resolve(hasSignedIn)
                }                                         
            })
        }

        // console.log(myAccountContent.innerHTML)

        const navigation = document.querySelector("ion-app ion-nav#navigation")
        
        const connected = await promesse()

        if(connected) {
            if(myAccountContent.classList.contains("notConnected")) {//first load
                myAccountContent.classList.remove("notConnected") 

                myAccountContent.innerHTML = sellerFormTemplate.content

                sellerFormTemplate.logic()
            }
        }
        else {
            if(!myAccountContent.classList.contains("notConnected")) myAccountContent.classList.add("notConnected") 
            
            await navigation.push('sign-in-or-sign-up')                     

            myAccountContent.innerHTML = /*html*/`
                <div>
                    <ion-button id="signInBis" expand="full">Se connecter</ion-button>    
                    <ion-text>ou</ion-text>
                    <ion-button id="signUpBis" expand="full">S'inscrire</ion-button>
                </div>
            `
            
            const signInBis = document.querySelector("#signInBis")
            const signUpBis = document.querySelector("#signUpBis")

            signInBis.addEventListener("click", async () => {
                // navigation.push('sign-in')
                await self.logic(true)
            })

            signUpBis.addEventListener("click", () => {
                navigation.push('sign-up')
            })
        }        
    }
}

export { myAccountTemplate }