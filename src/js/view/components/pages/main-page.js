// import { JSONEditor } from '@json-editor/json-editor'
import { Grid } from 'ag-grid-community';
import { Dexie } from 'dexie'
import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { leftMenu } from './../templates/left-menu.js'
import { rightMenu } from './../templates/right-menu.js'
import { sellerSearch } from './../templates/seller-search-template.js'

let mainPage = {
  name: "main-page",
  content: /*html*/`
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
          <!-- <ion-searchbar placeholder="Recherche" id="search" debounce="250" color="light"></ion-searchbar>
          <ion-button class="ion-hide" id="additionalSearchBtn" size="small">Ou</ion-button>
          <ion-searchbar class="ion-hide" id="additionalSearch" placeholder="Recherche supplémentaire" debounce="250" color="light"></ion-searchbar> -->
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">          
        <ion-tabs>
            <ion-tab tab="landing">
                <ion-nav id="landing-nav"></ion-nav>
                <div id="landing-page">
                    <ion-content>
                        <div id="landing-page-content">Landing Page</div>
                    </ion-content>
                </div>
            </ion-tab>
            <ion-tab tab="seller-search">
                <ion-nav id="seller-search-nav"></ion-nav>
                <div id="seller-search-page">
                    <ion-content>
                        <div id="seller-search-content">${sellerSearch.content}</div>
                    </ion-content>
                </div>
            </ion-tab>        

            <ion-tab-bar slot="top">
                <ion-tab-button tab="landing">
                    <ion-icon name="play-circle" size="large"></ion-icon>
                </ion-tab-button>
                <ion-tab-button tab="seller-search">
                    <ion-icon name="search-circle-outline" size="large"></ion-icon>
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
    const landingPage = document.querySelector('#landing-page');
    landingNav.root = landingPage;

    const sellerSearchNav = document.querySelector('#seller-search-nav');
    const sellerSearchPage = document.querySelector('#seller-search-page');
    sellerSearchNav.root = sellerSearchPage;

    sellerSearch.logic(args)
  }
}

  export { mainPage }