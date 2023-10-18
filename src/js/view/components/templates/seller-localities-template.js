import { sellerInformationsItemTemplate } from './seller-informations-item-template.js'
import { itemTemplate } from './item-template.js'
import { mapModalTemplate } from './map-modal-template.js'

let sellerLocalitiesTemplate = {
  name: "seller-localities-template",
  content: /*html*/`
      <div id="localities"></div>
  `,
  logic: async (args) => {
    let data = args
    const navigation = document.querySelector("ion-nav#navigation")
    let currentPage = await navigation.getActive()
    const componentName = currentPage.component
    
    let theSellerLocalities = ""

    let localities = data.localities

    const dictionary = (key, val) => {
      let dict = {
        locality : {
          title : "Nom de l'emplacement",
          iconName : "business-outline"
        },
        city : {
          title : "Ville",
          iconName : "pin"
        },
        neighborhood : {
          title : "Quartier",
          iconName : "footsteps"
        },
        address : {
          title : "Adresse",
          iconName : "locate"
        },
        mapAddress : {
          title : "Sur la carte",
          iconName : "map",
          iconColor : "primary",
          itemClass : "mapButton",
          isButton : true
        },
        mapAddressWording : {
          title : "Adresse Map",
          iconName : "map"
        },
        description : {
          title : "Description",
          iconName : "text"
        },
      }

      let ret = {}

      ret[key] = dict[key]
      ret[key]["value"] = val

      // console.log(ret)

      return ret[key]
    }

    for(let i = 0; i < localities.length; i++) {      
      const location = localities[i]
      console.table(i, location)

      theSellerLocalities += `<ion-card data-id=${i}><ion-card-content>`

      theSellerLocalities += `<h3 class="ion-padding-top">Localité n° ${parseInt(i) + 1}</h3>`
   
      if(typeof location.locality != "undefined" && location.locality.length > 0) {
        theSellerLocalities += itemTemplate.logic(dictionary("locality", location.locality))
      }

      let locality_details = location.locality_details

      let localityDetailsKeys = Object.keys(locality_details)

      for(let i = 0; i < localityDetailsKeys.length; i++) {
        const key = localityDetailsKeys[i]
        const val = locality_details[key]
        console.table(key, val)

        if(typeof val == "string" && val.length > 0 && key != "mapAddressWording") {
          theSellerLocalities += itemTemplate.logic(dictionary(key, val))
        }
      }

      theSellerLocalities += `</ion-card-content></ion-card>`
         
    }
    document.querySelector(`${componentName} #localities`).innerHTML = theSellerLocalities

    function findClosestParent(element, selector) {
      while (element) {
        if (element.parentElement && element.parentElement.matches(selector)) {
          // Return the closest parent's parent (the direct parent) that matches the selector
          return element.parentElement;
        }
        // Move up to the parent element
        element = element.parentElement;
      }
      // If no matching parent is found, return null
      return null;
    }

    document.querySelectorAll("ion-item.mapButton").forEach((value, index) => {
      const item = value

      const closestIonCardParent = findClosestParent(item, 'ion-card[data-id]')
      const dataId = parseInt(closestIonCardParent.getAttribute("data-id"))

      item.addEventListener("click", async () => {
        await mapModalTemplate.logic().openModal({
          location : localities[dataId]
        })
      })
    })
  }
}

export { sellerLocalitiesTemplate }