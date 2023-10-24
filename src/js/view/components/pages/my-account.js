import { sellerForm } from './../templates/seller-form.js'

let myAccount = {
    name: "my-account",
    content: /*html*/`
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>

                <ion-title>My account</ion-title>

                <ion-buttons slot="end">
                    <ion-button id="editMyAccountData" fill="outline" class="ion-hide">Modifier</ion-button>
                    <ion-button id="saveMyAccountData" fill="outline" class="ion-hide">Enregistrer</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <div id="myAccountContent">This is the content for my account.</div>
        </ion-content>
    `,
    logic: async () => {
        let hasSignedIn = false
        const myAccountContent = document.querySelector("#myAccountContent")

        const promesse = () => {
            return new Promise((resolve, reject) => {
                myAccountContent.innerHTML = hasSignedIn ? "You are connected" : "You are not logged in, you will be redirected to the sign in page."
    
                setTimeout(() => {
                    myAccountContent.innerHTML = ""
                    resolve(hasSignedIn)
                }, 2000);
            })
        }

        console.log(myAccountContent.innerHTML)

        const navigation = document.querySelector("ion-app ion-nav#navigation")
        
        const connected = await promesse()

        if(connected) {
            myAccountContent.innerHTML = sellerForm.content

            sellerForm.logic()
        }
        else {
            navigation.push('sign-in-or-sign-up')
        }        
    }
}

export { myAccount }