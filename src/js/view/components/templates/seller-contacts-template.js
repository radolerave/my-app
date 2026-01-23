import { sellerInformationsItemTemplate } from './seller-informations-item-template.js'
import { enums } from "../../../helpers/enums-for-json-editor.js"
import { Capacitor } from '@capacitor/core'
import { Clipboard } from '@capacitor/clipboard'
import { Browser } from '@capacitor/browser'
import { Dialog } from '@capacitor/dialog';
import { Toast } from '@capacitor/toast'

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
        theSellerContacts += `<div contact-type="${contactType}" class="ion-padding-top">`

        let obj = {
          "phones": {
            "title": "Téléphones",
            "icon": "call-outline",
          },
          "emails": {
            "title": "Emails",
            "icon": "mail-outline",
          },
          "links": {
            "title": "Liens",
            "icon": "link-outline",
          },
        }

        theSellerContacts += `
          <ion-chip>
            <ion-icon name="${obj[contactType]["icon"]}" size="large"></ion-icon>
            <ion-label><b>${obj[contactType]["title"]}</b></ion-label>
          </ion-chip>
        `
      
        contactTypeData.forEach(element => {
          let icon, title, property, propertyValue, iconTab, nextSiblingContent = ""

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

                let actions = [
                  /*html*/`
                    <ion-item class="ion-no-padding copy" button="true" phone-number="${propertyValue.replace(/\s/g, "")}">
                      <ion-icon slot="end" name="copy-outline"></ion-icon>
                      <ion-label>Copier</ion-label>
                    </ion-item>
                  `,
                  /*html*/`
                      <ion-item class="ion-no-padding call" button="true" phone-number="${propertyValue.replace(/\s/g, "")}">
                      <ion-icon slot="end" name="call-outline"></ion-icon>
                      <ion-label>Appeler</ion-label>
                    </ion-item>
                  `
                ]
                
                nextSiblingContent = /*html*/`
                  <ion-popover>
                    <ion-content class="ion-padding">
                      <h3>
                        <ion-icon slot="start" name="${icon}"></ion-icon>
                        ${title}
                      </h3>

                      <a href="tel:${propertyValue.replace(/\s/g, "")}">${propertyValue}</a>
                      
                      <div class="actions">${actions.join("\n")}</div>
                    </ion-content>
                  </ion-popover>
                `
              }
              break

            case "emails":
              if(typeof element.email != "undefined" && element.email.length > 0) {
                propertyValue = element.email
                icon = "at-outline"

                let actions = [
                  /*html*/`
                    <ion-item class="ion-no-padding copy" button="true" email-address="${propertyValue}">
                      <ion-icon slot="end" name="copy-outline"></ion-icon>
                      <ion-label>Copier</ion-label>
                    </ion-item>
                  `,
                  /*html*/`
                      <ion-item class="ion-no-padding email" button="true" email-address="${propertyValue}">
                      <ion-icon slot="end" name="send-outline"></ion-icon>
                      <ion-label>Envoyer un email</ion-label>
                    </ion-item>
                  `
                ]
                
                nextSiblingContent = /*html*/`
                  <ion-popover>
                    <ion-content class="ion-padding">
                      <h3>
                        <ion-icon slot="start" name="${icon}"></ion-icon>
                        ${title}
                      </h3>

                      <a href="mailto:${propertyValue}">${propertyValue}</a>
                      
                      <div class="actions">${actions.join("\n")}</div>
                    </ion-content>
                  </ion-popover>
                `
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

                if(!/^(http:\/\/)|(https:\/\/)|(ftp:\/\/)|(ftps:\/\/)/.test(propertyValue)) {
                  propertyValue = "https://" + propertyValue
                }

                let actions = [
                  /*html*/`
                    <ion-item class="ion-no-padding copy" button="true" link-address="${propertyValue}">
                      <ion-icon slot="end" name="copy-outline"></ion-icon>
                      <ion-label>Copier</ion-label>
                    </ion-item>
                  `,
                  /*html*/`
                      <ion-item class="ion-no-padding link" button="true" link-address="${propertyValue}">
                      <ion-icon slot="end" name="open-outline"></ion-icon>
                      <ion-label>Ouvrir le lien</ion-label>
                    </ion-item>
                  `
                ]                
                
                nextSiblingContent = /*html*/`
                  <ion-popover>
                    <ion-content class="ion-padding">
                      <h3>
                        <ion-icon slot="start" name="${icon}"></ion-icon>
                        ${title}
                      </h3>

                      <a href="${propertyValue}">${propertyValue}</a>
                      
                      <div class="actions">${actions.join("\n")}</div>
                    </ion-content>
                  </ion-popover>
                `
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
            button: true,
            nextSiblingContent: nextSiblingContent
          })

          theSellerContacts += template
        });
            
        theSellerContacts += `</div>`
      }            
    }

    document.querySelector(`${componentName} #contacts`).innerHTML = theSellerContacts

    async function copyTextToClipboard(text) {
      try {
        if(Capacitor.getPlatform() == "web") {
          await navigator.clipboard.writeText(text)              
        }
        else {
          await Clipboard.write({
            string: text
          })
        }
        
        Toast.show({
          text: 'Text copied to clipboard: ' + text
        })
      }
      catch(err) {
        Toast.show({
          text: 'Error: ' + err
        })
      }
    }

    document.querySelectorAll(`${componentName} #contacts > div`).forEach((value, index) => {
      const contactType = value.getAttribute("contact-type")

      switch(contactType) {
        case "phones": 
          const phonesList = value.children

          // console.log(phonesList)
          
          for(let i=0; i<phonesList.length; i++) {
            const val = phonesList[i]

            // console.log(val.tagName)

            if(val.tagName == "ION-ITEM") {
              const popover = val.nextElementSibling
              val.addEventListener("click", (e) => {
                popover.event = e
                popover.isOpen = true
              })

              popover.addEventListener('didDismiss', () => (popover.isOpen = false))
            }

            if(val.tagName == "ION-POPOVER") {
              const actions = val.querySelectorAll("ion-item[button='true']")

              actions.forEach((va, key) => {
                switch(true) {
                  case (va.classList.contains("copy")): 
                    va.addEventListener("click", async () => {
                      const text = va.getAttribute("phone-number")

                      await copyTextToClipboard(text)
                    })
                    break
                  
                  case (va.classList.contains("call")): 
                    va.addEventListener("click", () => {
                      va.closest("div.actions").previousElementSibling.click()
                    })
                    break

                  default:
                    break
                }
              })
            }
          }
          break
                
        case "emails": 
          const emailsList = value.children

          // console.log(emailsList)
          
          for(let i=0; i<emailsList.length; i++) {
            const val = emailsList[i]

            // console.log(val.tagName)

            if(val.tagName == "ION-ITEM") {
              const popover = val.nextElementSibling
              val.addEventListener("click", (e) => {
                popover.event = e
                popover.isOpen = true
              })

              popover.addEventListener('didDismiss', () => (popover.isOpen = false))
            }

            if(val.tagName == "ION-POPOVER") {
              const actions = val.querySelectorAll("ion-item[button='true']")

              actions.forEach((va, key) => {
                switch(true) {
                  case (va.classList.contains("copy")): 
                    va.addEventListener("click", async () => {
                      const text = va.getAttribute("email-address")

                      await copyTextToClipboard(text)
                    })
                    break
                  
                  case (va.classList.contains("email")): 
                    va.addEventListener("click", () => {
                      va.closest("div.actions").previousElementSibling.click()
                    })
                    break

                  default:
                    break
                }
              })
            }
          }
          break

        case "links": 
          const linksList = value.children

          // console.log(linksList)
          
          for(let i=0; i<linksList.length; i++) {
            const val = linksList[i]

            // console.log(val.tagName)

            if(val.tagName == "ION-ITEM") {
              const popover = val.nextElementSibling
              val.addEventListener("click", (e) => {
                popover.event = e
                popover.isOpen = true
              })

              popover.addEventListener('didDismiss', () => (popover.isOpen = false))
            }

            if(val.tagName == "ION-POPOVER") {
              const actions = val.querySelectorAll("ion-item[button='true']")

              actions.forEach((va, key) => {
                switch(true) {
                  case (va.classList.contains("copy")): 
                    va.addEventListener("click", async () => {
                      const text = va.getAttribute("link-address")

                      await copyTextToClipboard(text)
                    })
                    break
                  
                  case (va.classList.contains("link")): 
                    va.addEventListener("click", async () => {
                      // va.closest("div.actions").previousElementSibling.click()

                      let link = va.getAttribute("link-address")

                      await Browser.open({ url: `${link}`})
                    })
                    break

                  default:
                    break
                }
              })
            }
          }
          break

        default:
          break
      }
    })
  }
}

export { sellerContactsTemplate }