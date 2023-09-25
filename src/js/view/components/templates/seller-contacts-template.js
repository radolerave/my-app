import { sellerInformationsItemTemplate } from './seller-informations-item-template.js'

let sellerContactsTemplate = {
  name: "seller-medias-template",
  content: /*html*/`
    <ion-card>
      <ion-card-header>
        <ion-card-title>Contacts</ion-card-title>
        <!--<ion-card-subtitle>Informations sur les contacts</ion-card-subtitle>-->
      </ion-card-header>

      <ion-card-content>
        <ion-list>
          ${sellerInformationsItemTemplate.logic({
            title : "Contacts",
            property : "contacts",
          })}
        </ion-list>
      </ion-card-content>
    </ion-card>
  `,
  logic: async (args) => {
    let data = args
    const navigation = document.querySelector("ion-nav#navigation")
    let currentPage = await navigation.getActive()
    const componentName = currentPage.component
    
    let theSellerContacts = ""

    let contactsKeys = Object.keys(data.contacts)

    for(let i = 0; i < contactsKeys.length; i++) {
      const contactType = contactsKeys[i]
      const contactTypeData = data.contacts[contactType]
      console.table(contactType, contactTypeData)

      if(contactTypeData.length > 0) {
        theSellerContacts += `<ion-item><ion-label>`

        theSellerContacts += `<h2>${contactType}</h2>`
      
        contactTypeData.forEach(element => {
          theSellerContacts += `<p>`

          if(typeof element.wording != "undefined" && element.wording.length > 0) {
            theSellerContacts += `<h3>${element.wording}</h3>`
          }

          switch(contactType) {
            case "phones":
              if(typeof element.phone != "undefined" && element.phone.length > 0) {
                theSellerContacts += `<p>${element.phone}</p>`
              }
              break

            case "emails":
              if(typeof element.email != "undefined" && element.email.length > 0) {
                theSellerContacts += `<p>${element.email}</p>`
              }
              break

            case "links":
              if(typeof element.link != "undefined" && element.link.length > 0) {
                theSellerContacts += `<p>${element.link}</p>`
              }
              break

            default: 
              break
          }          

          theSellerContacts += `</p>`
        });

        theSellerContacts += `</ion-label></ion-item>`
      }            
    }
    document.querySelector(`${componentName} #contacts`).innerHTML = theSellerContacts
  }
}

export { sellerContactsTemplate }