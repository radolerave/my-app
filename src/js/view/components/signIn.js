let signIn = {
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
                    <ion-input type="email" label="Email : "></ion-input>
                </ion-item>

                <ion-item>
                    <ion-input type="password" label="Mot de passe : "></ion-input>
                </ion-item>
            </ion-list>        

            <ion-button id="goSignIn">Se connecter</ion-button>
        </ion-content>
    `,
    logic: () => {}
}

export { signIn }