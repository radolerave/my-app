import { Dexie } from 'dexie'
import FsDbTransaction from './../../../model/transaction-model.js'
import FsTransaction from './../../../controller/transaction-controller.js'
import { fsConfig } from './../../../config/fsConfig.js'
import FsHelper from "../../../helpers/fsHelper.js"
import { Maskito, maskitoTransform } from '@maskito/core';
import { maskitoNumberOptionsGenerator, maskitoParseNumber } from '@maskito/kit';
import { Dialog } from '@capacitor/dialog';
import { Toast } from '@capacitor/toast'

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
    const apiUrl = fsConfig.apiUrl
    const serverUrl = fsConfig.serverUrl
    let myFsTransaction = new FsTransaction(FsDbTransaction, Dexie)
    console.log(myFsTransaction)
    let myFsHelper = new FsHelper()

    const navigation = fsGlobalVariable.navigation;

    const fstPurchaseQuantity = document.querySelector("#fst-purchase-quantity")

    const fstPurchaseQuantityNativeEl = await fstPurchaseQuantity.getInputElement()

    new Maskito(fstPurchaseQuantityNativeEl, maskitoNumberOptionsGenerator({
      decimalSeparator: '.',
      thousandSeparator: ' ',
      precision: 0,
      max: 36500,
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

    function purchasingProcess(purchaseDetails) {
      let createTransaction = () => {
        return new Promise(async (resolve, reject) => {
          let response = await myFsTransaction.newTransaction(apiUrl, purchaseDetails)          

          if(response.ok) {
            resolve(response.pk)
          }
          else {
            reject(response.errorText)
          }   
        })
      }

      let payment = () => {
        return new Promise(async (resolve, reject) => {
          setTimeout(() => {
            resolve(true)
          }, 2000);
        })
      }

      let creditTheAccount = () => {
        return new Promise(async (resolve, reject) => {
          const resp = await myFsTransaction.getCreditTokensValue(apiUrl, fsGlobalVariable.session.seller_id)
          const currentCreditTokens = resp.creditTokens
          const newCreditTokensValue = currentCreditTokens + purchaseDetails.newData.amount_in_fst

          if(resp.ok) {
            const response = await myFsTransaction.accountInfosUpdate(apiUrl, {
              credentials: {
                "sellerId" : fsGlobalVariable.session.seller_id,
                "email": fsGlobalVariable.session.email,
                "password": fsGlobalVariable.session.password,
                "accountId": fsGlobalVariable.session.id
              },
              updatedData: {
                credit_tokens: newCreditTokensValue
              }
            }) 
                      
            if(response.ok) {
              resolve(newCreditTokensValue)
            }
            else {
              reject(response.errorText)              
            }
          }
          else {
            reject(resp.errorText) 
          }          
        })
      }

      let confirmTransaction = (pk, status) => {
        return new Promise(async (resolve, reject) => {
          let response = await myFsTransaction.updateTransaction(apiUrl, {
            transactionId: pk,
            updatedData: { status: status }
          })
                    
          if(response.ok) {
            resolve(response.nbrOfRows)
          }
          else {
            reject(response.errorText)
          }   
        })
      }

      return new Promise(async (resolve, reject) => {
        let ret = {}

        try {
          ret.createTransaction = await createTransaction()//initialize the transaction

          ret.payment = await payment()

          const pk = ret.createTransaction
          ret.statusOfTheTransaction = await confirmTransaction(pk, 2)//a pending transaction

          ret.creditTheAccount = await creditTheAccount()          

          ret.statusOfTheTransaction = await confirmTransaction(pk, 1)//a successfull transaction

          resolve(ret)
        }
        catch(err) {
          reject(err)
        }

        // createTransaction()
        // .then((value) => {
        //   ret.createTransaction = value

        //   payment()
        //   .then((value) => {
        //     ret.payment = value
            
        //     confirmTransaction(ret.createTransaction)
        //     .then((value) => {
        //       ret.statusOfTheTransaction = value
              
        //       resolve(ret)
        //     })
        //     .catch((err) => {
        //       reject(err)
        //     })
        //   })
        //   .catch((err) => {
        //     reject(err)
        //   })
        // })
        // .catch((err) => {
        //   reject(err)
        // })
      })
    }

    submitPurchaseParameters.addEventListener("click", async () => {      
      const purchaseQuantity = isNaN(maskitoParseNumber(fstPurchaseQuantity.value, '.')) ? 10 : maskitoParseNumber(fstPurchaseQuantity.value, '.')

      const tab = [
        "undefined", //0
        "Mobile money", //1
        "Carte bancaire", //2
        "En espèces", //3
      ]

      const confirmation = await Dialog.confirm({
        title: 'Achat de crédits',
        message: 
          `Résumé de votre achat :\n\nQuantité : ${purchaseQuantity.toLocaleString()} FST\nMoyen : ${tab[parseInt(meansOfPayment.value)]}\n\nVoulez-vous continuer ?`,
        okButtonTitle: "oui",
        cancelButtonTitle: "non",
      })

      if(confirmation.value) {
        showBackdrop()
        
        const purchaseDetails = {
          newData: {
              seller_id: fsGlobalVariable.session.seller_id,
              transaction_type: 1,
              amount_in_fst: purchaseQuantity,
              means_of_payment: parseInt(meansOfPayment.value),
          }
        }

        console.log(purchaseDetails)
        
        try {
          const test = await purchasingProcess(purchaseDetails)

          await Dialog.alert({
            "title": `Succès`,
            "message": JSON.stringify(test, null, "\t")
          })
        }
        catch(err) {
          await Dialog.alert({
            "title": `Erreur`,
            "message": err
          })
          // console.error(err)
        }
        finally {
          hideBackdrop()
        }
      }   
    })
  }
}

  export { buyFsTokens }