// import { JSONEditor } from '@json-editor/json-editor'
import { Grid } from 'ag-grid-community';
import { Dexie } from 'dexie'
import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { leftMenu } from './../templates/left-menu.js'
import { rightMenu } from './../templates/right-menu.js'
import { sellerSearch } from './../templates/seller-search-template.js'
import { landingPage } from './../templates/landing-page-template.js'
import { advertisement } from './../templates/advertisement-template.js'

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
    </style>

    ${leftMenu.content}
    ${rightMenu.content}    

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
        <ion-tabs>
            <ion-tab tab="landing">
                <ion-nav id="landing-nav"></ion-nav>
                <div id="landing-page">
                    <ion-content>
                        <div id="landing-page-content" class="">${landingPage.content}</div>
                    </ion-content>
                </div>
            </ion-tab>

            <ion-tab tab="advertisement">
                <ion-nav id="advertisement-nav"></ion-nav>
                <div id="advertisement-page">
                    <ion-content>
                        <div id="advertisement-page-content" class="">${advertisement.content}</div>
                    </ion-content>
                </div>
            </ion-tab>

            <ion-tab tab="seller-search">
                <ion-nav id="seller-search-nav"></ion-nav>
                <div id="seller-search-page">
                    <ion-content>
                        <div id="seller-search-content" class="ion-padding">${sellerSearch.content}</div>
                    </ion-content>
                </div>
            </ion-tab>        

            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="landing">
                    <ion-icon name="newspaper" size="large"></ion-icon>
                    Quoi de neuf ?
                </ion-tab-button>

                <ion-tab-button tab="advertisement">
                    <ion-icon name="megaphone" size="large"></ion-icon>
                    Annonces
                </ion-tab-button>

                <ion-tab-button tab="seller-search">
                    <ion-icon name="search-circle" size="large"></ion-icon>
                    Recherche
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

    leftMenu.logic()    

    rightMenu.logic(args)

    const landingNav = document.querySelector('#landing-nav');
    const landingP = document.querySelector('#landing-page');
    landingNav.root = landingP;
    
    const advertisementNav = document.querySelector('#advertisement-nav');
    const advertisementPage = document.querySelector('#advertisement-page');
    advertisementNav.root = advertisementPage;

    const sellerSearchNav = document.querySelector('#seller-search-nav');
    const sellerSearchPage = document.querySelector('#seller-search-page');
    sellerSearchNav.root = sellerSearchPage;

    landingPage.logic()
    sellerSearch.logic(args)
  }
}

  export { mainPage }