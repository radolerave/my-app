let buyFsTokens = {
  name: "buy-fs-tokens",
  content: /*html*/`
    <ion-header>
      <ion-toolbar>
          <ion-buttons slot="start">
              <ion-back-button></ion-back-button>
          </ion-buttons>

          <ion-title>Achat de crédits</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>        
        Buying FST       
    </ion-content>

    <style>
    </style>
  `,
  logic: async () => {
    const navigation = document.querySelector("ion-app ion-nav#navigation")

    
  }
}

  export { buyFsTokens }