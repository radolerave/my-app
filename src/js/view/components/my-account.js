let myAccount = {
    content: /*html*/`
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>

                <ion-title>My account</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <div id="myAccountContent">This is the content for my account.</div>
        </ion-content>
    `,
    logic: () => {
        console.log(document.querySelector("#myAccountContent").innerHTML)

        const navigation = document.querySelector("ion-nav#navigation")

        navigation.push('sign-in-or-sign-up')
    }
}

export { myAccount }