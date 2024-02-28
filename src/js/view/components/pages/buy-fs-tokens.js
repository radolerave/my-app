import { Maskito, maskitoTransform } from '@maskito/core';
import { maskitoNumberOptionsGenerator, maskitoParseNumber } from '@maskito/kit';

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

    <ion-content class="ion-text-center">        
      <ion-card id="purchase-parameters">
        <ion-card-content>
            <ion-item class="ion-margin-bottom">
                <ion-input id="fst-purchase-quantity" label="Quantité : " placeholder="10" value="10"></ion-input>&nbsp;FST
            </ion-item>

            <h2>Moyen de paiement : </h2>
            <ion-radio-group id="means-of-payment" allow-empty-selection="true">
              <ion-radio value="1">
                <ion-item lines="none">
                  <ion-icon name="phone-portrait-outline"></ion-icon>
                  <ion-label>&nbsp;Mobile money</ion-label>
                </ion-item>
              </ion-radio>

              <ion-radio value="2">
                <ion-item lines="none">
                  <ion-icon name="card-outline"></ion-icon>
                  <ion-label>&nbsp;Carte bancaire</ion-label>
                </ion-item>
              </ion-radio>
              
              <ion-radio value="3">
                <ion-item lines="none">
                  <ion-icon name="cash-outline"></ion-icon>
                  <ion-label>&nbsp;En espèces</ion-label>
                </ion-item>
              </ion-radio>                
            </ion-radio-group>
        </ion-card-content>
      </ion-card>   

      <ion-button id="submit-purchase-parameters" disabled="true">Continuer</ion-button>
    </ion-content>

    <style>
      #means-of-payment {
        /* border: solid red 1px; */
        display: block;
      }

      #means-of-payment ion-radio {
        /* border-bottom: solid grey 1px; */
        display: block;
      }
    </style>
  `,
  logic: async () => {
    const navigation = fsGlobalVariable.navigation;

    const fstPurchaseQuantity = document.querySelector("#fst-purchase-quantity")

    const fstPurchaseQuantityNativeEl = await fstPurchaseQuantity.getInputElement()

    new Maskito(fstPurchaseQuantityNativeEl, maskitoNumberOptionsGenerator({
      decimalSeparator: '.',
      thousandSeparator: ' ',
      precision: 0,
      max: 3650,
      min: 10,
    }))

    const meansOfPayment = document.querySelector("#means-of-payment")
    const submitPurchaseParameters = document.querySelector("#submit-purchase-parameters")

    meansOfPayment.addEventListener("ionChange", () => {
      if(typeof meansOfPayment.value != "undefined") {
        submitPurchaseParameters.setAttribute("disabled", "false")
      }
      else {
        submitPurchaseParameters.setAttribute("disabled", "true")
      }
    })

    function paymentProcess() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true)
        }, 2000);
      })
    }

    submitPurchaseParameters.addEventListener("click", async () => {
      const purchaseDetails = {
        quantity: maskitoParseNumber(fstPurchaseQuantity.value, '.'),
        means: parseInt(meansOfPayment.value),
        // session: fsGlobalVariable.session,
      }

      const test = await paymentProcess()

      alert(test)
    })
  }
}

  export { buyFsTokens }