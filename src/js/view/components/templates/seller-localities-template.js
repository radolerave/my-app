import { sellerInformationsItemTemplate } from './seller-informations-item-template.js'
import { itemTemplate } from './item-template.js'
import { mapModalTemplate } from './map-modal-template.js'

let sellerLocalitiesTemplate = {
  name: "seller-localities-template",
  content: /*html*/`
      <ion-button expand="block" id="xou">Map</ion-button>

      <div id="localities"></div>
  `,
  logic: async (args) => {
    document.querySelector("#xou").addEventListener("click", () => {
      mapModalTemplate.logic().openModal()
    })

    let data = args
    const navigation = document.querySelector("ion-nav#navigation")
    let currentPage = await navigation.getActive()
    const componentName = currentPage.component
    
    let theSellerLocalities = ""

    let localities = data.localities

    const dictionary = (key, val, onClick = () => {}) => {
      let dict = {
        locality : {
          title : "Nom de l'emplacement",
          iconName : "business-outline"
        },
        city : {
          title : "ville",
          iconName : "pin"
        },
        neighborhood : {
          title : "quartier",
          iconName : "footsteps"
        },
        address : {
          title : "adresse",
          iconName : "locate"
        },
        mapAddress : {
          title : "adresse Map",
          iconName : "map",
          isButton : true,
          onClick : onClick
        },
        mapAddressWording : {
          title : "adresse Map",
          iconName : "map"
        },
        description : {
          title : "description",
          iconName : "text"
        },
      }

      let ret = {}

      switch(key) {
        case "mapAddress": //put here the map link operation
          break

        default:
          break
      }

      ret[key] = dict[key]
      ret[key]["value"] = val

      // console.log(ret)

      return ret[key]
    }

    for(let i = 0; i < localities.length; i++) {      
      const location = localities[i]
      console.table(i, location)

      theSellerLocalities += `<ion-card><ion-card-content>`

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

        if(typeof val == "string" && val.length > 0 && key != "mapAddressWording" && key != "mapAddress") {
          theSellerLocalities += itemTemplate.logic(dictionary(key, val))
        }

        if(typeof val == "string" && val.length > 0 && key == "mapAddress") {
          theSellerLocalities += itemTemplate.logic(dictionary(key, val, mapModalTemplate.logic().openModal))
        }
      }

      theSellerLocalities += `</ion-card-content></ion-card>`
         
    }
    document.querySelector(`${componentName} #localities`).innerHTML = theSellerLocalities
  }
}

export { sellerLocalitiesTemplate }