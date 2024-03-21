import { sellerPublicationsManagementTemplate } from './../templates/seller-publications-management-template.js'
import { Dexie } from 'dexie'
import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
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

          <ion-buttons slot="end">
            <ion-button id="newPublication" fill="outline" color="primary">
              + <ion-icon name="share-outline"></ion-icon>
            </ion-button>
          </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="">
      <div id="sellerPublicationsManagementContent">      
        ${sellerPublicationsManagementTemplate.content}
      </div>
    </ion-content>

    <style>

    </style>
  `,
  logic: async () => {
    const apiUrl = fsConfig.apiUrl
    let myFs = new Fs(FsDb, Dexie)    

    const navigation = fsGlobalVariable.navigation
    const newPublicationBtn = document.querySelector("#newPublication")

    newPublicationBtn.addEventListener("click", async () => {      
      await navigation.push("media-publication")
    })

    let response = await myFs.getPublications(apiUrl, {
      sellerId : fsGlobalVariable.session.seller_id
    })

    sellerPublicationsManagementTemplate.logic(response, "#sellerPublicationsManagementContent")
  }
}

  export { sellerPublicationsManagement }