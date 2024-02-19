import { sellerInformationsItemTemplate } from './seller-informations-item-template.js'
import { enums } from "../../../helpers/enums-for-json-editor.js"

let sellerContactsTemplate = {
  name: "seller-medias-template",
  content: /*html*/`
    <ion-card>
      <ion-card-content>
        <ion-list>
          ${sellerInformationsItemTemplate.logic({
            title : "Contacts",
            property : "contacts",
            noTitle : true
          })}
        </ion-list>
      </ion-card-content>
    </ion-card>
  `,
  logic: async (args) => {
    let data = args
    const navigation = fsGlobalVariable.navigation
    let currentPage = await navigation.getActive()
    const componentName = currentPage.component
    
    let theSellerContacts = ""

    let contactsKeys = Object.keys(data.contacts)

    for(let i = 0; i < contactsKeys.length; i++) {
      const contactType = contactsKeys[i]
      const contactTypeData = data.contacts[contactType]
      // console.table(contactType, contactTypeData)

      if(contactTypeData.length > 0) {
        theSellerContacts += `<div><ion-label>`

        theSellerContacts += `<h2>${contactType}</h2>`
      
        contactTypeData.forEach(element => {
          let icon, title, property, propertyValue, iconTab

          if(typeof element.wording != "undefined" && element.wording.length > 0) {
            title = element.wording
          }

          property = contactType

          switch(contactType) {
            case "phones":
              if(typeof element.phone != "undefined" && element.phone.length > 0) {
                propertyValue = element.phone

                iconTab = enums.phoneType.icons           
                
                if(typeof(element.phoneType) != "undefined") {
                  icon = iconTab[element.phoneType]
                }
                else {
                  icon = "help-outline"
                }
              }
              break

            case "emails":
              if(typeof element.email != "undefined" && element.email.length > 0) {
                propertyValue = element.email
                icon = "at-outline"
              }
              break

            case "links":
              if(typeof element.link != "undefined" && element.link.length > 0) {
                propertyValue = element.link
                
                iconTab = enums.linkType.icons
                
                if(typeof(element.linkType) != "undefined") {
                  icon = iconTab[element.linkType]
                }
                else {
                  icon = "help-outline"
                }
              }
              break

            default: 
              break
          }                            

          const template = sellerInformationsItemTemplate.logic({
            title : title,
            property : property,
            propertyValue : propertyValue,
            iconName: icon,
            button: true
          })

          theSellerContacts += template
        });
            
        theSellerContacts += `</ion-label></div>`
      }            
    }
    document.querySelector(`${componentName} #contacts`).innerHTML = theSellerContacts
  }
}

export { sellerContactsTemplate }