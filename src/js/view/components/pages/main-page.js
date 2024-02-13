// import { JSONEditor } from '@json-editor/json-editor'
import { Grid } from 'ag-grid-community';
import { Dexie } from 'dexie'
import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { leftMenuTemplate } from './../templates/left-menu-template.js'
import { rightMenuTemplate } from './../templates/right-menu-template.js'
import { sellerSearchTemplate } from './../templates/seller-search-template.js'
import { landingPageTemplate } from './../templates/landing-page-template.js'
import { advertisementsTemplate } from './../templates/advertisements-template.js'
import { newsTemplate } from './../templates/news-template.js'
import { myAccountTemplate } from './../templates/my-account-template.js';
import { fsConfig } from './../../../config/fsConfig.js'

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

        main-page #network-status {
          width: 0.6em;
          height: 0.6em;
          border-width: 0;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 5%;
          transform: translate(-50%, -50%);
          background-color: grey;
        }

        main-page #network-status.disconnected {
          border: solid red 1px;
          border-width: 0;
          background-color: red;
        }

        main-page #network-status.connected {
          border: solid rgb(12, 180, 12) 1px;
          border-width: 0;
          background-color: rgb(12, 180, 12);
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
            <ion-button id="search-seller">
              <ion-icon name="search-circle" size="large" color="primary"></ion-icon>
            </ion-button>

            <ion-button id="notification">
                <ion-icon name="notifications-outline"></ion-icon>
                <ion-badge color="danger">7</ion-badge>
            </ion-button> 

            <ion-menu-button menu="menu2">
              <ion-icon name="ellipsis-vertical-outline"></ion-icon>
            </ion-menu-button>              
          </ion-buttons>
          
          <ion-title>Find Seller<ion-text id="network-status"></ion-text></ion-title>
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
                        <div id="advertisement-page-content" class="">${advertisementsTemplate.content}</div>
                    </ion-content>
                </div>
            </ion-tab>

            <ion-tab tab="news">
                <ion-nav id="news-nav"></ion-nav>
                <div id="news-page">
                    <ion-content>
                        <div id="news-page-content" class="">${newsTemplate.content}</div>
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
                    <ion-icon name="home"></ion-icon>
                    Accueil
                </ion-tab-button>                

                <ion-tab-button tab="advertisement">
                    <ion-icon name="megaphone"></ion-icon>
                    Annonces
                </ion-tab-button>

                <ion-tab-button tab="news">
                    <ion-icon name="newspaper"></ion-icon>
                    Actualités
                </ion-tab-button>

                <ion-tab-button tab="my-account">
                  <ion-icon name="person-circle-outline"></ion-icon>
                    Compte
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
      </ion-content>
    </div>
    `,
  logic: async () => {
    const apiUrl = fsConfig.apiUrl
    let myFs = new Fs(FsDb, Dexie)
    console.log(myFs)

    let args = {}
    args["myFs"] = myFs

    const navigation = document.querySelector("ion-app ion-nav#navigation")

    leftMenuTemplate.logic()

    rightMenuTemplate.logic(args)

    const landingNav = document.querySelector('#landing-nav');
    const landingP = document.querySelector('#landing-page');
    landingNav.root = landingP;

    const advertisementNav = document.querySelector('#advertisement-nav');
    const advertisementPage = document.querySelector('#advertisement-page');
    advertisementNav.root = advertisementPage;

    const newsNav = document.querySelector('#news-nav');
    const newsPage = document.querySelector('#news-page');
    newsNav.root = newsPage;

    const myAccountNav = document.querySelector('#my-account-nav');
    const myAccountPage = document.querySelector('#my-account-page');
    myAccountNav.root = myAccountPage;

    landingPageTemplate.logic()
    // sellerSearchTemplate.logic(args)

    const tab = document.querySelector("main-page ion-tabs#main-page-tab")

    tab.addEventListener('ionTabsDidChange', async () => {
      const localCredentials = await myFs.getLocalCredentials()//signIn mode : device <=> localDb
        
      // console.log(localCredentials)

      fsGlobalVariable.session = localCredentials

      // console.log(fsGlobalVariable)

      let currentTab = await tab.getSelected()

      switch(currentTab) {
        case "my-account": 
          if(localCredentials != undefined) {                    
            await myAccountTemplate.logic(true)          
          }
          else {
            await myAccountTemplate.logic(false)
          }
          break
        
        case "advertisement": 
          await advertisementsTemplate.logic()  
          break

        case "news": 
          await newsTemplate.logic()  
          break

        default:
          break
      }
    })

    document.querySelector("#search-seller").addEventListener("click", async () => {
      await navigation.push("seller-search", args)
    })
  }
}

export { mainPage }