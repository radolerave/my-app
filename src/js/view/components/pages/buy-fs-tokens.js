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
      <ion-card id="purchase-parameters">
        <ion-card-content>
            <ion-item>
                <ion-input id="fst-purchase-quantity" label="Quantité : " placeholder="10" value="10"></ion-input>&nbsp;FST
            </ion-item>

            <hr>

            <h2>Moyen de paiement : </h2>
            <ion-list>
              <ion-radio-group id="means-of-payment" value="1">
                <ion-item>
                  <ion-radio value="1" label-placement="end">Mobile money</ion-radio>
                </ion-item>

                <ion-item>
                  <ion-radio value="2" label-placement="end">Carte bancaire</ion-radio>
                </ion-item>

                <ion-item>
                  <ion-radio value="3" label-placement="end">En espèces</ion-radio>
                  </ion-item>                 
              </ion-radio-group>
            </ion-list>
        </ion-card-content>
      </ion-card>   
    </ion-content>

    <style>
    </style>
  `,
  logic: async () => {
    const navigation = fsGlobalVariable.navigation;

    
  }
}

  export { buyFsTokens }