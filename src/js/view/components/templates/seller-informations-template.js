import { sellerInformationsItemTemplate } from './seller-informations-item-template.js'

let sellerInformationsTemplate = {
  name: "seller-informations-template",
  content: /*html*/`
    <ion-card>
      <ion-card-header>
        <ion-card-title>Détails</ion-card-title>
        <!--<ion-card-subtitle>Informations détaillées</ion-card-subtitle>-->
      </ion-card-header>

      <ion-card-content>
        <ion-list>
          ${sellerInformationsItemTemplate.logic({
            title : "Nom / Raison sociale",
            property : "name",
          })}

          ${sellerInformationsItemTemplate.logic({
            title : "Nom Commercial",
            property : "tradeName",
          })}

          ${sellerInformationsItemTemplate.logic({
            title : "Pays",
            property : "country",
          })}

          ${sellerInformationsItemTemplate.logic({
            title : "Société ou individu ?",
            property : "who_what",
          })}

          ${sellerInformationsItemTemplate.logic({
            title : "NIF",
            property : "nif",
          })}

          ${sellerInformationsItemTemplate.logic({
            title : "STAT",
            property : "stat",
          })}

          ${sellerInformationsItemTemplate.logic({
            title : "RCS",
            property : "rcs",
          })}

          ${sellerInformationsItemTemplate.logic({
            title : "CIN",
            property : "cin",
          })}
        </ion-list>
      </ion-card-content>
    </ion-card>

    <ion-card>
      <ion-card-header>
        <ion-card-title>Activités</ion-card-title>
        <!--<ion-card-subtitle>Informations sur les activités</ion-card-subtitle>-->
      </ion-card-header>

      <ion-card-content>
        <ion-list>
          ${sellerInformationsItemTemplate.logic({
            title : "Activités",
            property : "activities",
          })}
        </ion-list>
      </ion-card-content>
    </ion-card>

    <ion-card>
      <ion-card-header>
        <ion-card-title>Secteurs d'activités</ion-card-title>
        <!--<ion-card-subtitle>Informations sur les secteurs d'activités</ion-card-subtitle>-->
      </ion-card-header>

      <ion-card-content>
        <ion-list>
          ${sellerInformationsItemTemplate.logic({
            title : "Secteurs",
            property : "sectors",
          })}
        </ion-list>
      </ion-card-content>
    </ion-card>

    <ion-card>
      <ion-card-header>
        <ion-card-title>Horaires d'ouverture</ion-card-title>
        <!--<ion-card-subtitle>Informations sur les horaires d'ouverture</ion-card-subtitle>-->
      </ion-card-header>

      <ion-card-content>
        <ion-list>
          ${sellerInformationsItemTemplate.logic({
            title : "Horaires",
            property : "hourly",
          })}
        </ion-list>
      </ion-card-content>
    </ion-card>
  `,
  logic: async (args = {}) => {
    let data = args
    const navigation = document.querySelector("ion-nav#navigation")
    let currentPage = await navigation.getActive()
    const componentName = currentPage.component

    document.querySelector(`${componentName} #name`).innerHTML = data.name
    document.querySelector(`${componentName} #tradeName`).innerHTML = data.tradeName
    document.querySelector(`${componentName} #country`).innerHTML = data.country
    document.querySelector(`${componentName} #who_what`).innerHTML = data.who_what
    document.querySelector(`${componentName} #nif`).innerHTML = data.nif
    document.querySelector(`${componentName} #stat`).innerHTML = data.stat
    document.querySelector(`${componentName} #rcs`).innerHTML = data.rcs
    typeof data.cin != "undefined" ? document.querySelector(`${componentName} #cin`).innerHTML = data.cin : ""

    let theSellerActivities = ""
    for(let i = 0; i < data.activities.length; i++) {
      theSellerActivities += `<ion-text class="d-block">${data.activities[i].activity}</ion-text>`
    }
    document.querySelector(`${componentName} #activities`).innerHTML = theSellerActivities

    let theSellerSectors = ""
    for(let i = 0; i < data.sectors.length; i++) {
      theSellerSectors += `<ion-text class="d-block">${data.sectors[i].sector}</ion-text>`
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
            theSellerHourly += `<ion-text>De ${element.from}</ion-text>`
          }

          if(typeof element.to != "undefined" && element.to.length > 0) {
            theSellerHourly += `<ion-text> à ${element.to}</ion-text>`
          }

          theSellerHourly += `</p>`
        });        

        theSellerHourly += `</ion-label></ion-item>`
      }            
    }
    document.querySelector(`${componentName} #hourly`).innerHTML = theSellerHourly
  }
}

export { sellerInformationsTemplate }