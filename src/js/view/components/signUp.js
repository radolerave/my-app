let signUp = {
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
                    <ion-input type="text" label="Nom : " required="true"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-input type="email" label="Email : " required="true"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-input type="password" label="Mot de passe : " required="true"></ion-input>
                </ion-item>
            </ion-list>

            <ion-button id="goSignUp">S'inscrire</ion-button>
        </ion-content>
    `,
    logic: () => {}
}

export { signUp }