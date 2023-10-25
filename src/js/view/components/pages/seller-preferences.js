let sellerPreferences = {
    name: "seller-preferences",
    content: /*html*/`
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>

                <ion-title>Préférences</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            preferences
        </ion-content>
    `,
    logic: () => {}
}

export { sellerPreferences }