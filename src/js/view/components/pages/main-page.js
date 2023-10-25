// import { JSONEditor } from '@json-editor/json-editor'
import { Grid } from 'ag-grid-community';
import { Dexie } from 'dexie'
import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { leftMenuTemplate } from './../templates/left-menu-template.js'
import { rightMenuTemplate } from './../templates/right-menu-template.js'
import { sellerSearchTemplate } from './../templates/seller-search-template.js'
import { landingPageTemplate } from './../templates/landing-page-template.js'
import { advertisementTemplate } from './../templates/advertisement-template.js'
import { myAccountTemplate } from './../templates/my-account-template.js';

let mainPage = {
  name: "main-page",
  content: /*html*/`
    <style>
        #main-content ion-tabs ion-tab-button {
            border-top: solid transparent 2px;
        }

        #main-content ion-tabs ion-tab-button.tab-selected {
            border-top: solid var(--ion-tab-bar-color-selected, var(--ion-color-primary, #3880ff)) 2px;
        }

        #landing-page-content {
            background-color: #C1C3CB;
        }        

        #my-account-content {
            /* border: solid green 1px; */
            /*display: flex;
            justify-content: center;
            align-items: center; */
            height: 100%;
        }
    </style>

    ${leftMenuTemplate.content}
    ${rightMenuTemplate.content}    

    <div class="ion-page" id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button menu="menu"></ion-menu-button>
          </ion-buttons>

          <ion-buttons slot="end">
            <ion-button id="notification">
                <ion-icon name="notifications-outline"></ion-icon>
                <ion-badge color="danger">7</ion-badge>
            </ion-button> 

            <ion-menu-button menu="menu2">
              <ion-icon name="ellipsis-vertical-outline"></ion-icon>
            </ion-menu-button>              
          </ion-buttons>
          
          <ion-title>Find Seller</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">          
        <ion-tabs id="main-page-tab">
            <ion-tab tab="landing">
                <ion-nav id="landing-nav"></ion-nav>
                <div id="landing-page">
                    <ion-content>
                        <div id="landing-page-content" class="">${landingPageTemplate.content}</div>
                    </ion-content>
                </div>
            </ion-tab>

            <ion-tab tab="advertisement">
                <ion-nav id="advertisement-nav"></ion-nav>
                <div id="advertisement-page">
                    <ion-content>
                        <div id="advertisement-page-content" class="">${advertisementTemplate.content}</div>
                    </ion-content>
                </div>
            </ion-tab>

            <ion-tab tab="seller-search">
                <ion-nav id="seller-search-nav"></ion-nav>
                <div id="seller-search-page">
                    <ion-content>
                        <div id="seller-search-content" class="ion-padding">${sellerSearchTemplate.content}</div>
                    </ion-content>
                </div>
            </ion-tab> 

            <ion-tab tab="my-account">
                <ion-nav id="my-account-nav"></ion-nav>
                <div id="my-account-page">
                    <ion-content>
                        <div id="my-account-content" class="">${myAccountTemplate.content}</div>
                    </ion-content>
                </div>
            </ion-tab>                     

            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="landing">
                    <ion-icon name="newspaper"></ion-icon>
                    Quoi de neuf ?
                </ion-tab-button>                

                <ion-tab-button tab="advertisement">
                    <ion-icon name="megaphone"></ion-icon>
                    Annonces
                </ion-tab-button>

                <ion-tab-button tab="seller-search">
                    <ion-icon name="search-circle"></ion-icon>
                    Recherche
                </ion-tab-button>

                <ion-tab-button tab="my-account">
                    <ion-icon name="people-circle-outline"></ion-icon>
                    Mon compte
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
      </ion-content>
    </div>
    `,
  logic: async () => {    
    let myFs = new Fs(FsDb, Dexie)
    console.log(myFs)

    let args = {}
    args["myFs"] = myFs

    leftMenuTemplate.logic()    

    rightMenuTemplate.logic(args)

    const landingNav = document.querySelector('#landing-nav');
    const landingP = document.querySelector('#landing-page');
    landingNav.root = landingP;
    
    const advertisementNav = document.querySelector('#advertisement-nav');
    const advertisementPage = document.querySelector('#advertisement-page');
    advertisementNav.root = advertisementPage;

    const sellerSearchNav = document.querySelector('#seller-search-nav');
    const sellerSearchPage = document.querySelector('#seller-search-page');
    sellerSearchNav.root = sellerSearchPage;

    const myAccountNav = document.querySelector('#my-account-nav');
    const myAccountPage = document.querySelector('#my-account-page');
    myAccountNav.root = myAccountPage;

    landingPageTemplate.logic()
    sellerSearchTemplate.logic(args)

    const tab = document.querySelector("main-page ion-tabs#main-page-tab")

    tab.addEventListener('ionTabsDidChange', async () => {
      let currentTab = await tab.getSelected()

      if(currentTab == "my-account") {
        await myAccountTemplate.logic(false)
      }
    })
  }
}

  export { mainPage }