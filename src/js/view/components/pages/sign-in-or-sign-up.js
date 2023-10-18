let signInOrSignUp = {
    name: "sign-in-or-sign-up",
    content: /*html*/`
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>

                <ion-title>Connexion ou inscription</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-button id="signIn">Se connecter</ion-button>    
            <ion-text>Ou</ion-text>
            <ion-button id="signUp">S'inscrire</ion-button>    
        </ion-content>
    `,
    logic: async () => {
        const signIn = document.querySelector("#signIn")
        const signUp = document.querySelector("#signUp")
        const navigation = document.querySelector("ion-nav#navigation")      
        
        await navigation.removeIndex(1)//do not display the "my-account" component anymore  

        signIn.addEventListener("click", () => {
            navigation.push('sign-in')
        })

        signUp.addEventListener("click", () => {
            navigation.push('sign-up')
        })
    }
}

export { signInOrSignUp }