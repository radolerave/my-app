// Import the Cloudinary class.
import {Cloudinary} from "@cloudinary/url-gen";

// Import any actions required for transformations.
import {fill} from "@cloudinary/url-gen/actions/resize";

import { mediaPublicationTemplate } from "./../templates/media-publication-template.js";
import { fsConfig } from './../../../config/fsConfig.js';

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

    <ion-content id="media-publication-content" class="ion-text-center">${mediaPublicationTemplate.content}</ion-content>
  `,
  logic: async () => {
    const myCloudName = fsConfig.cloudinary.cloudName
    const theTagName = fsConfig.cloudinary.defaultTag
    const myUploadPreset = fsConfig.cloudinary.uploadPreset   

    mediaPublicationTemplate.logic()
  }
}

export { mediaPublication }