// Import the Cloudinary class.
import {Cloudinary} from "@cloudinary/url-gen";

// Import any actions required for transformations.
import {fill} from "@cloudinary/url-gen/actions/resize";

let mediaPublication = {
  name: "media-publication",
  content: /*html*/`
    <ion-header>
      <ion-toolbar>
          <ion-buttons slot="start">
              <ion-back-button></ion-back-button>
          </ion-buttons>

          <ion-title>Publication</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-text-center"></ion-content>
  `,
  logic: async (args) => {
    const myCloudName = "dtu8h2u98"
    const theTagName = "fs"
    const myUploadPreset = "ml_default"    

    
  }
}

export { mediaPublication }