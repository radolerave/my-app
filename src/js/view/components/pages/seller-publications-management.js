import { mediaActionsTemplate } from './../templates/media-actions-template.js'
import { fsConfig } from './../../../config/fsConfig.js';

// Import the Cloudinary class.
import {Cloudinary} from "@cloudinary/url-gen";

// Import any actions required for transformations.
import {fill} from "@cloudinary/url-gen/actions/resize";

import "lightgallery/css/lightGallery-bundle.css"

import lightGallery from 'lightgallery';

// Plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgVideo from 'lightgallery/plugins/video'

let sellerPublicationsManagement = {
  name: "seller-publications-management",
  content: /*html*/`
    <ion-header>
      <ion-toolbar>
          <ion-buttons slot="start">
              <ion-back-button></ion-back-button>
          </ion-buttons>

          <ion-title>Publications management</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-text-center">
      <div>
        <ion-button id="newPublication">
          + Nouvelle publication
        </ion-button>
      </div>

      <div id="sellerPublicationsManagementContent">This is the content for my Seller publications management.</div>
    </ion-content>

    <style>

    </style>
  `,
  logic: async () => {
    const newPublicationBtn = document.querySelector("#newPublication")
    const navigation = document.querySelector("ion-app ion-nav#navigation")

    newPublicationBtn.addEventListener("click", async () => {
      fsGlobalVariable.textToPublish = [{ insert: '\n' }]
      await navigation.push("media-publication")
    })
  }
}

  export { sellerPublicationsManagement }