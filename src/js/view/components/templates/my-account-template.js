import { sellerFormTemplate } from './seller-form-template.js'

let myAccountTemplate = {
    name: "my-account-template",
    content: /*html*/`                
        <div id="my-account-template-content">This is the content for my account.</div>
    `,
    logic: async () => {
        let hasSignedIn = true
        const myAccountContent = document.querySelector("#my-account-template-content")

        const promesse = () => {
            return new Promise((resolve, reject) => {
                myAccountContent.innerHTML = hasSignedIn ? "You are connected" : "You are not logged in, you will be redirected to the sign in page."
    
                setTimeout(() => {
                    myAccountContent.innerHTML = ""
                    resolve(hasSignedIn)
                }, 2000);
            })
        }

        // console.log(myAccountContent.innerHTML)

        const navigation = document.querySelector("ion-app ion-nav#navigation")
        
        const connected = await promesse()

        if(connected) {
            if(myAccountContent.classList.contains("notConnected")) myAccountContent.classList.remove("notConnected") 

            myAccountContent.innerHTML = sellerFormTemplate.content

            sellerFormTemplate.logic()
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

            signInBis.addEventListener("click", () => {
                navigation.push('sign-in')
            })

            signUpBis.addEventListener("click", () => {
                navigation.push('sign-up')
            })
        }        
    }
}

export { myAccountTemplate }