import { sellerInformationsTemplate } from './seller-informations-template.js'
import { sellerContactsTemplate } from './seller-contacts-template.js'
import { sellerEventsTemplate } from './seller-events-template.js'
import { sellerMediasTemplate } from './seller-medias-template.js'
import { sellerLocalitiesTemplate } from './seller-localities-template.js'
import Formatter from "../../../helpers/formatter.js"
import { Dexie } from 'dexie'
import { Dialog } from '@capacitor/dialog';
import { Toast } from '@capacitor/toast'
import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { fsConfig } from './../../../config/fsConfig.js';
import { sellerDetailsTemplate as self } from './seller-details-template.js'

let sellerDetailsTemplate = {
  name: "seller-details-template",
  content: /*html*/`
    <ion-tabs id="sellerDetailsTab">
      <ion-tab tab="seller-informations">
        <ion-nav id="seller-informations-nav"></ion-nav>
        <div id="seller-informations-page">      
          <ion-content>
            <div id="informationsDetails"></div>
          </ion-content>
        </div>
      </ion-tab>
      <ion-tab tab="contacts">
        <ion-nav id="contacts-nav"></ion-nav>
        <div id="contacts-page">      
          <ion-content>
            <div id="contactsDetails"></div>
          </ion-content>
        </div>
      </ion-tab>
      <ion-tab tab="events">
        <ion-nav id="events-nav"></ion-nav>
        <div id="events-page">      
          <ion-content>
            <div id="eventsDetails"></div>
          </ion-content>
        </div>
      </ion-tab>
      <ion-tab tab="medias">
        <ion-nav id="medias-nav"></ion-nav>
        <div id="medias-page">      
          <ion-content>
            <div id="mediasDetails"></div>
          </ion-content>
        </div>
      </ion-tab>
      <ion-tab tab="localities">
        <ion-nav id="localities-nav"></ion-nav>
        <div id="localities-page">      
          <ion-content>
            <div id="localitiesDetails"></div>
          </ion-content>
        </div>
      </ion-tab>
      
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="seller-informations">
          <ion-icon name="information-circle" size="large"></ion-icon>
          Infos
        </ion-tab-button>
        <ion-tab-button tab="contacts">
          <ion-icon name="call" size="large"></ion-icon>
          Contacts
        </ion-tab-button>
        <ion-tab-button tab="events">
          <ion-icon name="calendar" size="large"></ion-icon>
          Events
        </ion-tab-button>
        <ion-tab-button tab="medias">
          <ion-icon name="images" size="large"></ion-icon>
          Médias
        </ion-tab-button>
        <ion-tab-button tab="localities">
          <ion-icon name="map" size="large"></ion-icon>
          Localisations
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>

    <ion-fab vertical="top" horizontal="end" class="ion-hide">
        <ion-fab-button id="updateLocalSellerInfos">
            <ion-icon name="cloud-download-outline"></ion-icon>
        </ion-fab-button>
    </ion-fab>

    <style>      
      #warn-last-edit {
        color: red;
      }

      #local-last-edit.notice {
        color: red;
      }

      #up-to-date-last-edit {
        color: green
      }
    </style>
  `,
  logic: async (args) => {
    let myFs = new Fs(FsDb, Dexie)

    console.log(args)    

    const navigation = document.querySelector("ion-app ion-nav#navigation")
    navigation.removeEventListener("ionNavDidChange", args.listener)

    const data = args.currentPage.params.data
    let myFormatter = new Formatter()

    document.querySelector("seller-details ion-title #title").innerHTML = data.name
    document.querySelector("seller-details #seller-details-last-edit").innerHTML = /*html*/`
      <div id="warn-last-edit" class="ion-hide">
        <ion-icon name="warning-outline"></ion-icon>
      </div>
      <span id="local-last-edit">
        ${myFormatter.dateFormatter(data.last_edit, true)} <ion-icon name="time-outline"></ion-icon>
      </span>
      <br>
      <span id="up-to-date-last-edit"></span>
    `

    try {
      // const session = await myFs.getLocalCredentials()
      const upToDateSellerInfos = await myFs.getSellerInfos(fsConfig.apiUrl, data.id)

      console.log(upToDateSellerInfos)

      if(upToDateSellerInfos.ok) {
        if(upToDateSellerInfos.sellerInfos.last_edit != data.last_edit) {
          document.querySelector("#up-to-date-last-edit").innerHTML = /*html*/`
            ${myFormatter.dateFormatter(upToDateSellerInfos.sellerInfos.last_edit, true)} <ion-icon name="alarm-outline"></ion-icon>
          `

          if(!document.querySelector("#local-last-edit").classList.contains("notice")) {
            document.querySelector("#local-last-edit").classList.add("notice")
          }

          if(document.querySelector("#warn-last-edit").classList.contains("ion-hide")) {
            document.querySelector("#warn-last-edit").classList.remove("ion-hide")
          }

          await Dialog.alert({
            title: 'Alert',
            message: `Une nouvelle version des données de "${data.name}" est disponible. Vous pouvez télécharger ces informations ici. Vous pouvez aussi mettre à jour la totalité de la base de données dans "Plus d'options / Télécharger les données à jour".`,
          })

          document.querySelector("#updateLocalSellerInfos").parentElement.classList.remove("ion-hide")

          document.querySelector("#updateLocalSellerInfos").addEventListener("click", async () => {
            const { value } = await Dialog.confirm({
              title: "confirmation",
              message: `Voulez-vous télécharger les informations à jour pour "${data.name}" ?`,
              okButtonTitle: "oui",
              cancelButtonTitle: "non"
            })

            if(value) {
              const response = await myFs.updateLocalSellerInfos(upToDateSellerInfos.sellerInfos, data.id)

              console.log(response)

              if(response.ok) {
                args.currentPage.params.data = upToDateSellerInfos.sellerInfos
              
                const sellerDetailsContent = document.querySelector("#sellerDetailsContent")

                sellerDetailsContent.innerHTML = self.content

                self.logic(args)

                document.querySelector("#resetCriteria").click()
              }
              else {
                await Toast.show({
                  text: `Erreur : Aucune modification n'a été apportée.`
                })
              }
            }
          })
        }
        else {
          if(document.querySelector("#local-last-edit").classList.contains("notice")) {
            document.querySelector("#local-last-edit").classList.remove("notice")
          }

          if(!document.querySelector("#warn-last-edit").classList.contains("ion-hide")) {
            document.querySelector("#warn-last-edit").classList.add("ion-hide")
          }

          if(!document.querySelector("#updateLocalSellerInfos").parentElement.classList.contains("ion-hide")) {
            document.querySelector("#updateLocalSellerInfos").parentElement.classList.add("ion-hide")
          }
        }
      }
      else {
        // await Dialog.alert({
        //   title: 'Erreur',
        //   message: `Impossible de récupérer des informations venant du serveur.`,
        // })

        await Toast.show({
          text: `Impossible de récupérer des informations venant du serveur.`,
        })
      }
    }
    catch(err) {
      await Dialog.alert({
        title: 'Erreur',
        message: `Impossible de récupérer des informations venant du serveur.`,
      })
    }

    const sellerInformationsNav = document.querySelector('#seller-informations-nav');
    const sellerInformationsPage = document.querySelector('#seller-informations-page');
    sellerInformationsNav.root = sellerInformationsPage;
  
    const contactsNav = document.querySelector('#contacts-nav');
    const contactsPage = document.querySelector('#contacts-page');
    contactsNav.root = contactsPage;

    const eventsNav = document.querySelector('#events-nav');
    const eventsPage = document.querySelector('#events-page');
    eventsNav.root = eventsPage;

    const mediasNav = document.querySelector('#medias-nav');
    const mediasPage = document.querySelector('#medias-page');
    mediasNav.root = mediasPage;
  
    const localitiesNav = document.querySelector('#localities-nav');
    const localitiesPage = document.querySelector('#localities-page');
    localitiesNav.root = localitiesPage;

    document.querySelector("#informationsDetails").innerHTML = sellerInformationsTemplate.content
    sellerInformationsTemplate.logic(data)

    document.querySelector("#contactsDetails").innerHTML = sellerContactsTemplate.content
    sellerContactsTemplate.logic(data)

    document.querySelector("#eventsDetails").innerHTML = sellerEventsTemplate.content
    sellerEventsTemplate.logic(data)

    document.querySelector("#mediasDetails").innerHTML = sellerMediasTemplate.content
    sellerMediasTemplate.logic(data)

    document.querySelector("#localitiesDetails").innerHTML = sellerLocalitiesTemplate.content
    sellerLocalitiesTemplate.logic(data)    

    const generatTabTitle = (tabName) => {
      const tabeTitleDict = {
        "seller-informations" : "Informations",
        "contacts" : "Contacts",
        "events" : "Evènements",
        "medias" : "Médias & publications",
        "localities" : "Localisations"
      }

      document.querySelector("seller-details ion-title #tab-title").innerHTML = tabeTitleDict[tabName]
    }

    const tab = document.querySelector("ion-tabs#sellerDetailsTab")

    const firstSelectedTab = await tab.getSelected()
    generatTabTitle(firstSelectedTab)

    tab.addEventListener('ionTabsDidChange', async () => {
      let currentTab = await tab.getSelected()

      // console.log(currentTab)

      generatTabTitle(currentTab)

      /*It is especially for cloudinary product gallery widget which doesn't work when the container of the element or the element is display: none*/
      if(currentTab == "medias") {
        if(document.querySelector("#my-gallery").innerHTML == "") {
          sellerMediasTemplate.logic().showMediaGallery()
        }
      }
    })
  }
}

export { sellerDetailsTemplate }