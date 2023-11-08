import { Toast } from '@capacitor/toast'
import { Dialog } from '@capacitor/dialog';
import { myAccountTemplate } from './my-account-template.js';
import Formatter from "../../../helpers/formatter.js"

let rightMenuTemplate = {
  name: "right-menu-template",
  content: /*html*/`
    <ion-menu content-id="main-content" menu-id="menu2" side="end" swipe-gesture="false">
      <ion-header>
        <ion-toolbar>
          <ion-title>Plus d'options</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-text class="ion-float-right" color="medium">
          <sup id="lastSync"></sup>
        </ion-text>
        <br>
        <ion-list>
          <ion-item button id="updateLocalDatabase" class="ion-no-padding">     
            <ion-grid class="ion-no-padding ion-padding-bottom ion-padding-top">
              <ion-row class="ion-align-items-center">
                <ion-col size="auto">
                  <ion-icon name="sync-outline"></ion-icon>
                </ion-col>
                <ion-col class="ion-padding-start">
                  <ion-label class="ion-text-wrap">
                    <h2>Télécharger les données à jour</h2>
                    <p>Mise à jour de la base de données de l'application</p>
                  </ion-label>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
          <ion-progress-bar id="syncProgressBidirectional"></ion-progress-bar>
        </ion-list>          
        
        <ion-item-divider></ion-item-divider>

        <ion-item button id="signOut" class="ion-margin-top ion-padding">
          <ion-grid class="ion-no-padding ion-padding-bottom ion-padding-top">
            <ion-row class="ion-align-items-center">
              <ion-col size="auto">
                <ion-icon name="log-out-outline"></ion-icon>
              </ion-col>
              <ion-col class="ion-padding-start">
                <ion-label class="ion-text-wrap">
                  <h2>Se déconnecter</h2>
                </ion-label>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
      </ion-content>

      <ion-footer>
        <ion-toolbar class="ion-text-right">
          <ion-button id="help" fill="clear" color="primary"><ion-icon name="help-circle-outline"></ion-icon>&nbsp;<ion-text>Aide</ion-text></ion-button>
        </ion-toolbar>
      </ion-footer>
    </ion-menu>
  `,
  logic: async (args) => {
    const navigation = document.querySelector("ion-app ion-nav#navigation")
    const menu = document.querySelector('ion-menu[menu-id="menu2"]')
    let myFs = args.myFs
    let myFormatter = new Formatter()

    let text = ""

    try {
      const sellersListLastSyncDate = myFormatter.dateFormatter(await myFs.getSellersListLastSyncDate(), true)
      if(typeof sellersListLastSyncDate != "undefined") {
        text = `<ion-icon name="sync-outline"></ion-icon> ${sellersListLastSyncDate}`
      }
    }
    catch(err) {
      console.log(err)
    }

    document.querySelector("#lastSync").innerHTML = text

    document.querySelector("#updateLocalDatabase").addEventListener("click", async () => {
      const result = await Dialog.confirm({
        title: 'Confirm',
        message: `Votre base de données locale va être mise à jour. Voulez-vous continuer ?`,
        okButtonTitle: "oui",
        cancelButtonTitle: "non"
      })

      console.log(result)

      if(result.value) {
        let response = await myFs.populateData()

        if(response.ok) {
          console.log(response)

          const lastSync = response.date

          document.querySelector("#lastSync").innerHTML = `<ion-icon name="sync-outline"></ion-icon> ${String(lastSync.getDate()).padStart(2, '0')}/${String(lastSync.getMonth() + 1).padStart(2, '0')}/${lastSync.getFullYear()} ${String(lastSync.getHours()).padStart(2, '0')}:${String(lastSync.getMinutes()).padStart(2, '0')}:${String(lastSync.getSeconds()).padStart(2, '0')}`

          await Toast.show({
            text: "Base de données téléchargée avec succès sur votre appareil.",
            duration: "short",
            position: "bottom"
          })
        }
        else {
          await Toast.show({
            text: "Erreur lors du téléchargement des données.",
            duration: "long",
            position: "bottom"
          })
        }
      }
    })

    document.querySelector("#signOut").addEventListener("click", async () => {
      const result = await Dialog.confirm({
        title: 'Confirm',
        message: `Déconnexion ?`,
        okButtonTitle: "oui",
        cancelButtonTitle: "non"
      })

      console.log(result)

      if(result.value) {
        if(await myFs.signOut()) {
          await Toast.show({
            text: "Déconnecté(e) avec succès",
            position: "bottom"
          })

          await menu.close()

          // await navigation.popToRoot()          
        }
        else {
          await Toast.show({
            text: "Erreur lors de la déconnexion!",
            position: "bottom"
          })
        }
      }
    })

    menu.addEventListener("ionWillOpen", async () => {//important!!!
      const session = await myFs.getLocalCredentials()
      await myAccountTemplate.logic(session)
    })

    menu.addEventListener("ionWillClose", async () => {//important!!!
      const session = await myFs.getLocalCredentials()
      await myAccountTemplate.logic(session)
    })
  }
}

export { rightMenuTemplate }