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
      let eventType, when, startDate, endDate, startEnd, startDateInMilliseconds, endDateInMilliseconds

      switch(true) {
        case (typeof event.date == "string" && event.date.length > 0): 
          eventType = "date"
          when = event.date
          startDate = when.replace(/ /, "T")
          startDateInMilliseconds = new Date(startDate).getTime()
          endDate = undefined
          endDateInMilliseconds = undefined
          break
        
        case (typeof event.dateRange == "string" && event.dateRange.length > 0): 
          eventType = "dateRange"
          when = event.dateRange
          startEnd = when.split(" to ")
          startDate = startEnd[0].replace(/ /, "T")
          startDateInMilliseconds = new Date(startDate).getTime()
          endDate = startEnd[1].replace(/ /, "T")
          endDateInMilliseconds = new Date(endDate).getTime()
          break

        case (typeof event.dateTime == "string" && event.dateTime.length > 0): 
          eventType = "dateTime"
          when = event.dateTime
          startDate = when.replace(/ /, "T")
          startDateInMilliseconds = new Date(startDate).getTime()
          endDate = undefined
          endDateInMilliseconds = undefined
          break
        
        case (typeof event.dateTimeRange == "string" && event.dateTimeRange.length > 0): 
          eventType = "dateTimeRange"
          when = event.dateTimeRange
          startEnd = when.split(" to ")
          startDate = startEnd[0].replace(/ /, "T")
          startDateInMilliseconds = new Date(startDate).getTime()
          endDate = startEnd[1].replace(/ /, "T")
          endDateInMilliseconds = new Date(endDate).getTime()
          break

        default: when = ""
          break
      }

      theSellerEvents += `<ion-card><ion-card-content><ion-item button="true" class="ion-no-padding fs-event" title="${event.eventTitle}" location="${event.eventLocation}" start-date="${startDate}" end-date="${endDate}" description="${typeof event.description == "string" ? event.description : ""}" event-type="${eventType}"><ion-icon class="ion-no-padding ion-margin-end" aria-hidden="true" name="calendar" slot="end"></ion-icon><ion-label>`

      theSellerEvents += `<h3>Evènement n° ${parseInt(key) + 1} : <b>${event.eventTitle}</b></h3>`
    
      theSellerEvents += `<p>`

      if(typeof when == "string" && when.length > 0) {
        theSellerEvents += `<ion-text class="ion-text-wrap"><b>Date :</b> ${when}</ion-text><br>`
      }

      if(typeof event.description == "string" && event.description.length > 0) {
        theSellerEvents += `<ion-text class="ion-text-wrap"><b>Description :</b> ${event.description}</ion-text><br>`
      }

      if(typeof event.eventLocation == "string" && event.eventLocation.length > 0) {
        theSellerEvents += `<ion-text class="ion-text-wrap"><b>Lieux :</b> ${event.eventLocation}</ion-text>`
      }

      theSellerEvents += `</p>`
    

      theSellerEvents += `</ion-label></ion-item></ion-card></ion-card-content>`
         
    }
    document.querySelector(`${componentName} #calendar`).innerHTML = theSellerEvents

    function correctStartDate(startDate, endDate, eventType) {
      let date = new Date(startDate)

      switch(eventType) {
        case "date": 
          date.setDate(date.getDate())
          date.setHours(8, 0, 0, 0)
          break

        case "dateRange": 
          date.setDate(date.getDate())
          date.setHours(8, 0, 0, 0)
          break

        case "dateTime": 
          break

        case "dateTimeRange": 
          break

        default:
          break
      }
      
      return date;
    }

    function correctEndDate(startDate, endDate, eventType) {
      let date   

      switch(eventType) {
        case "date": 
          date = new Date(startDate)
          date.setDate(date.getDate())
          date.setHours(9, 0, 0, 0)
          break

        case "dateRange": 
          date = new Date(endDate)
          date.setHours(9, 0, 0, 0)
          break

        case "dateTime": 
          date = undefined
          break

        case "dateTimeRange": 
          date = new Date(endDate)          
          break

        default: 
          break
      }
      
      return date;
    }

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

        const elmStartDate = element.getAttribute("start-date")
        const elmEndDate = element.getAttribute("end-date")
        const eventType = element.getAttribute("event-type")

        try {
          Calendar.createEventInteractively(
            element.getAttribute("title"), // title
            element.getAttribute("location"), // location
            element.getAttribute("description"), // notes
            correctStartDate(elmStartDate, elmEndDate, eventType), // start date
            correctEndDate(elmStartDate, elmEndDate, eventType), // end date
          );
        }
        catch(err) {
          alert('misy error')
        }
      })
    })
  }
}

export { sellerEventsTemplate }