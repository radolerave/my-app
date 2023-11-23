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

          <ion-buttons slot="end">
              <ion-button id="publish" fill="outline" color="primary" class="ion-hide"><ion-icon name="share-outline"></ion-icon> Publier</ion-button>
          </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content id="media-publication-content" class="ion-text-center">${mediaPublicationTemplate.content}</ion-content>

    <style>
      media-publication media {
        display: inline-block;
        margin: 2.5%;
        border: solid grey 1px;
        border-radius: 5px;
        max-width: 45%;
      }

      media-publication media img {
        border: solid transparent 1px;
        border-radius: 5px;
      }

      media-publication media video {
        border: solid transparent 1px;
        width: 100%;
        border-radius: 5px;
      }  
    </style>
  `,
  logic: async () => {
    const myCloudName = fsConfig.cloudinary.cloudName
    const theTagName = fsConfig.cloudinary.defaultTag
    const myUploadPreset = fsConfig.cloudinary.uploadPreset   

    const navigation = document.querySelector("ion-app ion-nav#navigation")

    const listener = async () => {
      let currentPage = await navigation.getActive()

      console.log(currentPage)

      if(currentPage.component == "media-publication") {
        mediaPublicationTemplate.logic({"currentPage": currentPage, "listener": listener})
      }
    }        

    navigation.addEventListener('ionNavDidChange', listener)
  }
}

export { mediaPublication }