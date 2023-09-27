import { sellerInformationsItemTemplate } from './seller-informations-item-template.js'

let sellerEventsTemplate = {
  name: "seller-events-template",
  content: /*html*/`
    <div id="calendar"></div>
  `,
  logic: async (args) => {
    let data = args
    const navigation = document.querySelector("ion-nav#navigation")
    let currentPage = await navigation.getActive()
    const componentName = currentPage.component
    
    let theSellerEvents = ""

    let eventsKeys = Object.keys(data.calendar)

    for(let i = 0; i < eventsKeys.length; i++) {
      const key = eventsKeys[i]
      const event = data.calendar[key]
      // console.table(key, event)

      theSellerEvents += `<ion-card><ion-card-content><ion-item class="ion-no-padding"><ion-icon class="ion-no-padding ion-margin-end" aria-hidden="true" name="calendar" slot="end"></ion-icon><ion-label>`

      theSellerEvents += `<h3>Evènement n° ${parseInt(key) + 1}</h3>`
    
      theSellerEvents += `<p>`

      if(typeof event.date != "undefined" && event.date.length > 0) {
        theSellerEvents += `<ion-text>${event.date}</ion-text>`
      }

      if(typeof event.description != "undefined" && event.description.length > 0) {
        theSellerEvents += `<ion-text> : ${event.description}</ion-text>`
      }

      theSellerEvents += `</p>`
    

      theSellerEvents += `</ion-label></ion-item></ion-card></ion-card-content>`
         
    }
    document.querySelector(`${componentName} #calendar`).innerHTML = theSellerEvents
  }
}

export { sellerEventsTemplate }