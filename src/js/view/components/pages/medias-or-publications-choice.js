import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import XHR from '@uppy/xhr-upload';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

let mediasOrPublicationsChoice = {
  name: "medias-or-publications-choice",
  content: /*html*/`
    <ion-header>
      <ion-toolbar>
          <ion-buttons slot="start">
              <ion-back-button></ion-back-button>
          </ion-buttons>

          <ion-title>Que voulez-vous faire ?</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>        
        <div id="uppy-dashboard" class="ion-hide">
          <ion-button id="close-uppy" expand="full">Fermer</ion-button>

          <div id="uppy-dashboard-content"></div>
        </div>
        
        <div id="medias-or-publications-choice-content">
          <div>            
            <ion-button id="uppyBtn" expand="block">Uppy</ion-button>
            <ion-text>-</ion-text>
            <ion-button id="mediasManagementBtn" expand="block">Gestion des médias</ion-button>
            <ion-text>-</ion-text>
            <ion-button id="publicationsManagementBtn" expand="block">Gestion des publications</ion-button>       
          </div>
        </div>         
    </ion-content>

    <style>
      #medias-or-publications-choice-content {
        text-align: center;
        /* border: solid red 1px; */
        display: flex;
        justify-content: center;
        align-items: center;
        /* width: 100%; */
        height: 100%;
      }
    </style>
  `,
  logic: async () => {
    const navigation = document.querySelector("ion-app ion-nav#navigation")

    const mediasManagementBtn = document.querySelector("#mediasManagementBtn")
    const publicationsManagementBtn = document.querySelector("#publicationsManagementBtn")
    const uppyBtn = document.querySelector("#uppyBtn")
    const uppyDashboard = document.querySelector("#uppy-dashboard")
    const uppyDashboardContent = document.querySelector("#uppy-dashboard-content")
    const uppyCloseBtn = document.querySelector("#close-uppy")

    mediasManagementBtn.addEventListener("click", async () => {
      fsGlobalVariable.textToPublish = [{ insert: '\n' }]
      await navigation.push("seller-medias-management")
    })

    publicationsManagementBtn.addEventListener("click", async () => {
      fsGlobalVariable.textToPublish = [{ insert: '\n' }]
      await navigation.push("seller-publications-management")
    })

    uppyBtn.addEventListener("click", async () => {
      if(uppyDashboard.classList.contains("ion-hide")) {
        uppyDashboard.classList.remove("ion-hide")
      }
      else {
        uppyDashboard.classList.add("ion-hide")
      }

      uppyDashboardContent.innerHTML = ""

      let uppy = new Uppy()
        .use(Dashboard, { inline: true, target: '#uppy-dashboard-content', height: 0 })
        .use(XHR, { 
          endpoint: 'https://localhost/findseller/upload.php',
          fieldName: 'my_fs_file',
        });      

      uppy.setMeta({
        seller_id: "xou",
      });
    })

    uppyCloseBtn.addEventListener("click", () => {
      uppyDashboardContent.innerHTML = ""

      if(!uppyDashboard.classList.contains("ion-hide")) {
        uppyDashboard.classList.add("ion-hide")
      }
    })
  }
}

  export { mediasOrPublicationsChoice }