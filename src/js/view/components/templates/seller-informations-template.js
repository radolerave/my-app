import { sellerInformationsItemTemplate } from './seller-informations-item-template.js'
import { enums } from "../../../helpers/enums-for-json-editor.js"

let sellerInformationsTemplate = {
  name: "seller-informations-template",
  content: /*html*/`
    <ion-card>
      <ion-card-content>
        <ion-list>
          ${sellerInformationsItemTemplate.logic({
            title : "Nom / Raison sociale",
            property : "name",
            iconName : "finger-print-outline",
          })}

          ${sellerInformationsItemTemplate.logic({
            title : "Nom Commercial",
            property : "trade_name",
            iconName : "storefront-outline",
          })}

          ${sellerInformationsItemTemplate.logic({
            title : "Pays",
            property : "country",
            iconName : "earth-outline",
          })}

          ${sellerInformationsItemTemplate.logic({
            title : "Société ou individu ?",
            property : "who_what",
            iconName : "help-outline",
          })}

          ${sellerInformationsItemTemplate.logic({
            title : "NIF",
            property : "nif",
            iconName : "reader-outline",
          })}

          ${sellerInformationsItemTemplate.logic({
            title : "STAT",
            property : "stat",
            iconName : "reader-outline",
          })}

          ${sellerInformationsItemTemplate.logic({
            title : "RCS",
            property : "rcs",
            iconName : "reader-outline",
          })}

          ${sellerInformationsItemTemplate.logic({
            title : "CIN",
            property : "cin",
            iconName : "id-card-outline",
            itemId: "dadyCin"
          })}
        </ion-list>
      </ion-card-content>
    </ion-card>

    <ion-card>
      <ion-card-content>
        <ion-list>
          ${sellerInformationsItemTemplate.logic({
            title : "Activités",
            property : "activities",
            iconName : "magnet-outline",
          })}
        </ion-list>
      </ion-card-content>
    </ion-card>

    <ion-card>
      <ion-card-content>
        <ion-list>
          ${sellerInformationsItemTemplate.logic({
            title : "Secteurs",
            property : "sectors",
            iconName : "flag-outline",
          })}
        </ion-list>
      </ion-card-content>
    </ion-card>

    <ion-card>
      <ion-card-content>
        <ion-list>
          ${sellerInformationsItemTemplate.logic({
            title : "Horaires",
            property : "hourly",
            iconName : "time-outline",
          })}
        </ion-list>
      </ion-card-content>
    </ion-card>

    <ion-card>
      <ion-card-header>
        <ion-card-title>
          <ion-item class="ion-no-margin ion-no-padding">
            <ion-icon slot="start" class="ion-no-margin ion-margin-end" name="information-circle-outline"></ion-icon>
            <ion-label>&Agrave; propos</ion-label>
          </ion-item>
        </ion-card-title>
      </ion-card-header>

      <ion-card-content id="about" class="ion-padding" style="white-space: pre-wrap;"></ion-card-content>
    </ion-card>
  `,
  logic: async (args = {}) => {
    let data = args
    const navigation = fsGlobalVariable.navigation
    let currentPage = await navigation.getActive()
    const componentName = currentPage.component

    console.log(data)

    document.querySelector(`${componentName} #name`).innerHTML = data.name
    document.querySelector(`${componentName} #trade_name`).innerHTML = data.trade_name
    document.querySelector(`${componentName} #country`).innerHTML = enums.countriesList.obj[data.country]
    document.querySelector(`${componentName} #who_what`).innerHTML = enums.whoWhat.values[data.who_what]
    document.querySelector(`${componentName} #nif`).innerHTML = data.nif
    document.querySelector(`${componentName} #stat`).innerHTML = data.stat
    document.querySelector(`${componentName} #rcs`).innerHTML = data.rcs
    typeof data.cin != "undefined" && data.who_what == 2 ? document.querySelector(`${componentName} #cin`).innerHTML = data.cin : document.querySelector(`${componentName} #dadyCin`).classList.add("ion-hide")

    let theSellerActivities = ""
    for(let i = 0; i < data.activities.length; i++) {
      theSellerActivities += `<ion-text class="d-block">${data.activities[i].activity}</ion-text>`
    }
    document.querySelector(`${componentName} #activities`).innerHTML = theSellerActivities

    let theSellerSectors = ""
    for(let i = 0; i < data.sectors.length; i++) {
      theSellerSectors += `<ion-text class="d-block">${enums.sectors.values[data.sectors[i].sector]}</ion-text>`
    }
    document.querySelector(`${componentName} #sectors`).innerHTML = theSellerSectors

    let theSellerHourly = ""
    const firstDayOfTheWeek = "monday"

    let hourlyKeys = Object.keys(data.hourly)

    for(let i = 0; i < hourlyKeys.length; i++) {
      const day = hourlyKeys[i]
      const dayHourly = data.hourly[day]
      // console.table(day, dayHourly)

      if(dayHourly.length > 0) {
        theSellerHourly += `<ion-item><ion-label>`

        theSellerHourly += `<h3>${day}</h3>`
      
        dayHourly.forEach(element => {
          theSellerHourly += `<p>`

          if(typeof element.from != "undefined" && element.from.length > 0) {
            theSellerHourly += `<ion-text>${element.from}</ion-text>`
          }

          if(typeof element.to != "undefined" && element.to.length > 0) {
            theSellerHourly += `<ion-text> - ${element.to}</ion-text>`
          }

          if(typeof element.description != "undefined" && element.description.length > 0) {
            theSellerHourly += `<ion-text> (${element.description})</ion-text>`
          }

          theSellerHourly += `</p>`
        });        

        theSellerHourly += `</ion-label></ion-item>`
      }            
    }
    document.querySelector(`${componentName} #hourly`).innerHTML = theSellerHourly
    document.querySelector(`${componentName} #about`).innerHTML = data.about
  }
}

export { sellerInformationsTemplate }