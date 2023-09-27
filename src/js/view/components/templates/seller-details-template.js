import { sellerInformationsTemplate } from './seller-informations-template.js'
import { sellerContactsTemplate } from './seller-contacts-template.js'
import { sellerEventsTemplate } from './seller-events-template.js'
import { sellerMediasTemplate } from './seller-medias-template.js'
import { sellerLocalitiesTemplate } from './seller-localities-template.js'

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
          
        </ion-tab-button>
        <ion-tab-button tab="contacts">
          <ion-icon name="call" size="large"></ion-icon>
          
        </ion-tab-button>
        <ion-tab-button tab="events">
          <ion-icon name="calendar" size="large"></ion-icon>
          
        </ion-tab-button>
        <ion-tab-button tab="medias">
          <ion-icon name="images" size="large"></ion-icon>
          
        </ion-tab-button>
        <ion-tab-button tab="localities">
          <ion-icon name="map" size="large"></ion-icon>
          
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
  logic: async (args) => {
    console.log(args)    

    const data = args.params.data

    document.querySelector("seller-details ion-title #title").innerHTML = data.name

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
        "medias" : "Médias",
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
    })
  }
}

export { sellerDetailsTemplate }