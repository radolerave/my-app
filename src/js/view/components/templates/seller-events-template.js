import { sellerInformationsItemTemplate } from './seller-informations-item-template.js'
import { Calendar } from '@awesome-cordova-plugins/calendar'

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
      let when, startDate, endDate, startEnd, startDateInMilliseconds, endDateInMilliseconds

      switch(true) {
        case (typeof event.date == "string" && event.date.length > 0): 
          when = event.date
          startDate = when
          startDateInMilliseconds = new Date(startDate).getTime()
          endDate = undefined
          endDateInMilliseconds = undefined
          break
        
        case (typeof event.dateRange == "string" && event.dateRange.length > 0): 
          when = event.dateRange
          startEnd = when.split(" to ")
          startDate = startEnd[0]
          startDateInMilliseconds = new Date(startDate).getTime()
          endDate = startEnd[1]
          endDateInMilliseconds = new Date(endDate).getTime()
          break

        case (typeof event.dateTime == "string" && event.dateTime.length > 0): 
          when = event.dateTime
          startDate = when
          startDateInMilliseconds = new Date(startDate).getTime()
          endDate = undefined
          endDateInMilliseconds = undefined
          break
        
        case (typeof event.dateTimeRange == "string" && event.dateTimeRange.length > 0): 
          when = event.dateTimeRange
          startEnd = when.split(" to ")
          startDate = startEnd[0]
          startDateInMilliseconds = new Date(startDate).getTime()
          endDate = startEnd[1]
          endDateInMilliseconds = new Date(endDate).getTime()
          break

        default: when = ""
          break
      }

      theSellerEvents += `<ion-card><ion-card-content><ion-item button="true" class="ion-no-padding fs-event" start-date-in-milliseconds="${startDateInMilliseconds}" end-date-in-milliseconds="${endDateInMilliseconds}" description="${typeof event.description == "string" ? event.description : ""}"><ion-icon class="ion-no-padding ion-margin-end" aria-hidden="true" name="calendar" slot="end"></ion-icon><ion-label>`

      theSellerEvents += `<h3>Evènement n° ${parseInt(key) + 1}</h3>`
    
      theSellerEvents += `<p>`

      if(typeof when == "string" && when.length > 0) {
        theSellerEvents += `<ion-text class="ion-text-wrap">${when}</ion-text>`
      }

      if(typeof event.description == "string" && event.description.length > 0) {
        theSellerEvents += `<ion-text class="ion-text-wrap"> : ${event.description}</ion-text>`
      }

      theSellerEvents += `</p>`
    

      theSellerEvents += `</ion-label></ion-item></ion-card></ion-card-content>`
         
    }
    document.querySelector(`${componentName} #calendar`).innerHTML = theSellerEvents

    document.querySelectorAll(".fs-event").forEach((element, key) => {
      element.addEventListener("click", async () => {
        async function checkPermission() {
          const result = await Calendar.hasReadWritePermission();
          if (result === false) {
            // alert("aucune autorisation sur native calendar")
            await Calendar.requestReadWritePermission();
          }
        }

        await checkPermission()

        

        Calendar.createEventInteractively(
          'My Hero Event', // title
          'Hero Garden', // location
          element.getAttribute("description"), // notes
          new Date(parseInt(element.getAttribute("start-date-in-milliseconds"))), // start date
          parseInt(element.getAttribute("end-date-in-milliseconds")) != NaN ? new Date(parseInt(element.getAttribute("end-date-in-milliseconds"))) : undefined // end date
        );
      })
    })
  }
}

export { sellerEventsTemplate }