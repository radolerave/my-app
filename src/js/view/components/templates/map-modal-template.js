import { modalController } from '@ionic/core'
import { Capacitor } from '@capacitor/core'
import { Clipboard } from '@capacitor/clipboard'
import { Browser } from '@capacitor/browser'

let mapModalTemplate = {
    name: "map-modal-template",
    content: /*html*/`
      <ion-header>
        <ion-toolbar>
          <ion-button id="close-map-modal" slot="start" fill="none" size="small"><ion-icon slot="icon-only" name="arrow-back"></ion-icon></ion-button>
          <ion-title>Sur la carte</ion-title>
          <ion-button id="copy-map-address" slot="end" fill="outline" size="small">Copier</ion-button>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-no-padding">
        <div id="client-side-map" class=""></div>
        <div id="client-side-map-details" class=""></div>
      </ion-content>
    `,
    logic: function (args = {}) {
      let content = this.content    
      
      // Define a red marker icon
      let redIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      let markers = []

      return {
        openModal: async (params = args) => {
          console.log(params)
          const div = document.createElement('div');
          div.innerHTML = content
      
          const modal = await modalController.create({
            component: div,
            breakpoints: [0, 0.25, 0.5, 0.75, 1],
            initialBreakpoint: 0.75
          });
      
          await modal.present();

          let map = L.map('client-side-map').fitWorld();

          const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);

          const locationData = params.location

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

              console.log('Text copied to clipboard: ' + text);

              document.querySelector("#copy-map-address").innerHTML = "Adresse Map Copiée !"

              setTimeout(() => {
                document.querySelector("#copy-map-address").innerHTML = "Copier"
              }, 2000)
            }
            catch(err) {
                console.error('Error copying text: ', err)
                alert("Error copying text")
            }
          }

          try {
            let latitudeAndLongitude = JSON.parse(locationData.locality_details.mapAddress)
      
            latitudeAndLongitude = L.latLng(latitudeAndLongitude.lat, latitudeAndLongitude.lng)
            
            map.setView(latitudeAndLongitude, 16)
            L.marker(latitudeAndLongitude, { icon: redIcon }).addTo(map)     
            
            /***************/

            document.querySelector("#client-side-map-details").innerHTML = /*html*/`
              <ion-grid>
                <ion-row class="ion-align-items-center">
                  <ion-col size="4"><b>Nom de l'emplacement : </b></ion-col>
                  <ion-col size="8">${locationData.locality}</ion-col>
                </ion-row>

                <ion-row class="ion-align-items-center">
                  <ion-col size="4"><b>Adresse : </b></ion-col>
                  <ion-col size="8">${locationData.locality_details.address}</ion-col>
                </ion-row>

                <ion-row class="ion-align-items-center">
                  <ion-col size="4"><b>Google Maps : </b></ion-col>
                  <ion-col size="8"><ion-button id="open-with-google-map" style="width: 100%;" fill="outline">
                    <ion-icon name="location"></ion-icon> Ouvrir</ion-button>
                  </ion-col>
                </ion-row>

                <ion-row class="ion-align-items-center">
                  <ion-col size="4"><b>Description : </b></ion-col>
                  <ion-col size="8">${locationData.locality_details.description}</ion-col>
                </ion-row>
              </ion-grid>
            `

            document.querySelector("#client-side-map-details ion-grid #open-with-google-map").addEventListener("click", async () => {
              await Browser.open({ url: `https://www.google.com/maps?q=${latitudeAndLongitude.lat}%2C${latitudeAndLongitude.lng}&hl=fr&z=16&t=h`})
            })

            document.querySelector("#copy-map-address").addEventListener("click", async () => {
              await copyTextToClipboard(latitudeAndLongitude.lat + "," + latitudeAndLongitude.lng);
            })

            document.querySelector("#close-map-modal").addEventListener("click", () => {
              modalController.dismiss(null, 'close')
            })

            /***************************************/

            let removeAllMarkers = () => {
              for (let i = 0; i < markers.length; i++) {
                map.removeLayer(markers[i]);
              }
              markers = []; // Clear the markers array
            }

            let onLocationFound = (e) => {
              const radius = e.accuracy / 2;
      
              removeAllMarkers()
      
              const locationMarker = L.marker(e.latlng).addTo(map)
      
              const locationCircle = L.circle(e.latlng, radius).addTo(map)
      
              markers.push(locationMarker);
              markers.push(locationCircle);
            }
      
            let onLocationError = (e) => {
              alert(e.message);
            }

            map.on('locationfound', onLocationFound);
            map.on('locationerror', onLocationError);            

            // Create a custom control with a button
            let customControl = L.Control.extend({
              options: {
                position: 'topright' // Adjust the position as needed (topright, topleft, bottomright, bottomleft)
              },

              onAdd: () => {
                let container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
                let relocate = L.DomUtil.create('a', 'custom-button', container);

                relocate.innerHTML = '<ion-icon name="location" color="medium" style="font-size: 24px;"></ion-icon>';

                let myPosition = L.DomUtil.create('a', 'custom-button', container);

                myPosition.innerHTML = '<ion-icon name="locate" color="medium" style="font-size: 24px;"></ion-icon>';

                // Add a click event handler to the button
                L.DomEvent.on(relocate, 'click', (e) => {
                  // e.preventDefault()
                  e.stopPropagation()
                  
                  map.setView(latitudeAndLongitude, 16)
                });

                // Add a click event handler to the button
                L.DomEvent.on(myPosition, 'click', (e) => {
                  // e.preventDefault()
                  e.stopPropagation()
                  
                  map.locate({setView: true, maxZoom: 16})
                });

                return container;
              }
            });

            map.addControl(new customControl)
          }
          catch(err) {
            console.log(err)
          }          
      
          const { data, role } = await modal.onWillDismiss();
      
          if (role === 'confirm') {}
        }
      }
    }
  }
  
  export { mapModalTemplate }