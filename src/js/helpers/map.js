import * as GeoSearch from 'leaflet-geosearch'

export default class MyMap {
  constructor() {
    this.name = "my-map"
    this.content = /*html*/`
      <div id="mapDescription" class="ion-hide">Appuyez sur un endroit pour récupérer ses coordonées géographiques.</div>
      <div id="map" class=""></div>
    `
    this.markers = []
    
    // Define a red marker icon
    this.redIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });  
  }

  logic(jsonEditorInstance) {    
    return {
      createMap : async () => { return await this.createMap(jsonEditorInstance) },
      removeMap : () => { 
        try { 
          this.map.remove() 
        }
        catch(err) {
          console.log("Map not yet initialized", err)
        }
      },
      locateTheCurrentMapAddress : () => {
        try {
          if(parseInt(this.index) != -1) {
            let latitudeAndLongitude = JSON.parse(jsonEditorInstance.getEditor(`root.localities.${this.index}.locality_details.mapAddress`).getValue())
      
            latitudeAndLongitude = L.latLng(latitudeAndLongitude.lat, latitudeAndLongitude.lng)
            
            this.map.setView(latitudeAndLongitude, 16)
      
            // if (this.map && this.marker) {
            //   this.map.removeLayer(this.marker)
            // }
      
            this.removeAllMarkers()
      
            this.marker = L.marker(latitudeAndLongitude, { icon: this.redIcon }).addTo(this.map)
            this.markers.push(this.marker);
          }
          else {
            this.map.locate({setView: true, maxZoom: 16})
          }
        }
        catch(err) {
          console.log("map error", /*err*/)

          this.removeAllMarkers()
          this.map.locate({setView: true, maxZoom: 16})
        }
      }
    }
  }

  addMarker(latlng, icon = undefined) {
    this.marker = icon == undefined ? L.marker(latlng).addTo(this.map) : L.marker(latlng, { icon: icon }).addTo(this.map);
    this.markers.push(this.marker);
  }

  removeAllMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      this.map.removeLayer(this.markers[i]);
    }
    this.markers = []; // Clear the markers array
  }

  async createMap(jsonEditorInstance) {
    return new Promise((resolve, reject) => {
      this.map = L.map('map').fitWorld();

      const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);

      let onLocationFound = (e) => {
        const radius = e.accuracy / 2;

        this.removeAllMarkers()

        const locationMarker = L.marker(e.latlng).addTo(this.map)
        // .bindPopup(`You are within ${radius} meters from this point`).openPopup();

        const locationCircle = L.circle(e.latlng, radius).addTo(this.map);        

        // this.index = document.querySelector('div[data-schemapath="root.localities"]').getAttribute("the-concerned-locality-index")

        // if(this.index != -1) { 
        //   jsonEditorInstance.getEditor(`root.localities.${this.index}.locality_details.mapAddress`).setValue(JSON.stringify(e.latlng))
        // }

        this.markers.push(locationMarker);
        this.markers.push(locationCircle);
      }

      let onLocationError = (e) => {
        alert(e.message);
      }                    

      this.index = document.querySelector('div[data-schemapath="root.localities"]').getAttribute("the-concerned-locality-index")

      this.logic(jsonEditorInstance).locateTheCurrentMapAddress()

      let addRedMarker = (e) => {                  
        console.log(e.latlng)

        // if (this.map && this.marker) {
        //   this.map.removeLayer(this.marker);
        // }

        this.removeAllMarkers()

        this.marker = L.marker(e.latlng, { icon: this.redIcon }).addTo(this.map);
        this.markers.push(this.marker);

        this.index = document.querySelector('div[data-schemapath="root.localities"]').getAttribute("the-concerned-locality-index")

        if(this.index != -1) { 
          jsonEditorInstance.getEditor(`root.localities.${this.index}.locality_details.mapAddress`).setValue(JSON.stringify(e.latlng))
        }
      }

      this.map.on('locationfound', onLocationFound);
      this.map.on('locationerror', onLocationError);
      this.map.on('click', addRedMarker)                

      const search = new GeoSearch.GeoSearchControl({
        provider: new GeoSearch.OpenStreetMapProvider(),
        style: 'bar',
      });

      this.map.addControl(search);

      // Create a custom control with a button
      let customControl = L.Control.extend({
        options: {
          position: 'topright' // Adjust the position as needed (topright, topleft, bottomright, bottomleft)
        },

        onAdd: () => {
          let container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
          let button = L.DomUtil.create('a', 'custom-button', container);

          button.innerHTML = '<ion-icon name="locate" size="large"></ion-icon>';

          // Add a click event handler to the button
          L.DomEvent.on(button, 'click', (e) => {
            // e.preventDefault()
            e.stopPropagation()
            
            this.map.locate({setView: true, maxZoom: 16})
          });

          return container;
        }
      });

      this.map.addControl(new customControl)

      if(this.map) {
        resolve(this.map)
      }
      else {
        reject("Erreur Map")
      }
    })
  }
}