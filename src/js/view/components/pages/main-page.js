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

import { Dialog } from '@capacitor/dialog';
import { Toast } from '@capacitor/toast'
import { cat } from '@cloudinary/url-gen/qualifiers/focusOn';

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

        .ion-content-scroll-host {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    /*border: solid red 1px;*/
  }

  .ion-content-scroll-host::before,
  .ion-content-scroll-host::after {
    position: absolute;

    width: 1px;
    height: 1px;

    content: '';
  }

  .ion-content-scroll-host::before {
    bottom: -1px;
  }

  .ion-content-scroll-host::after {
    top: -1px;
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

            <ion-button id="newPublication" fill="outline" color="primary">
              + <ion-icon name="share-outline"></ion-icon>
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
      <ion-content class="ion-padding" scroll-y="false">              
        <div>
          <ion-tabs id="main-page-tab">
              <ion-tab tab="landing">
                  <ion-nav id="landing-nav"></ion-nav>
                  <div id="landing-page">
                      <ion-content>
                        <ion-refresher slot="fixed">
                          <ion-refresher-content></ion-refresher-content>
                        </ion-refresher>
                        
                        <div id="landing-page-content" class="ion-content-scroll-host">${landingPageTemplate.content}</div>
                      </ion-content>
                  </div>
              </ion-tab>

              <ion-tab tab="advertisement">
                  <ion-nav id="advertisement-nav"></ion-nav>
                  <div id="advertisement-page">
                      <ion-content>
                        <ion-refresher slot="fixed">
                          <ion-refresher-content></ion-refresher-content>
                        </ion-refresher>

                        <div id="advertisements-page-content" class="ion-content-scroll-host">${advertisementsTemplate.content}</div>
                      </ion-content>
                  </div>
              </ion-tab>

              <ion-tab tab="news">
                  <ion-nav id="news-nav"></ion-nav>
                  <div id="news-page">
                      <ion-content>
                        <ion-refresher slot="fixed">
                          <ion-refresher-content></ion-refresher-content>
                        </ion-refresher>
                        
                        <div id="news-page-content" class="ion-content-scroll-host">${newsTemplate.content}</div>
                      </ion-content>
                  </div>
              </ion-tab>

              <ion-tab tab="my-account">
                  <ion-nav id="my-account-nav"></ion-nav>
                  <div id="my-account-page">
                      <ion-content>
                        <ion-refresher slot="fixed">
                          <ion-refresher-content></ion-refresher-content>
                        </ion-refresher>
                        
                        <div id="my-account-content" class="ion-content-scroll-host">${myAccountTemplate.content}</div>
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
        </div>
      </ion-content>
    </div>
    `,
  logic: async () => {
    let args = {}
    let lastTimeDataRefresh = {
      landingPage: 0,
      advertisementPage: 0,
      newsPage: 0,
      myAccountPage: 0,
    }
    
    try {      
      showBackdrop()

      const apiUrl = fsConfig.apiUrl
      let myFs = new Fs(FsDb, Dexie)
      console.log(myFs)
      
      args["myFs"] = myFs

      const navigation = fsGlobalVariable.navigation
      const newPublicationBtn = document.querySelector("main-page #newPublication")
      const searchSeller = document.querySelector("#search-seller")
      const tab = document.querySelector("main-page ion-tabs#main-page-tab")

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

      const landingPRefresher = landingP.querySelector("ion-refresher")
      const advertisementPageRefresher = advertisementPage.querySelector("ion-refresher")
      const newsPageRefresher = newsPage.querySelector("ion-refresher")
      const myAccountPageRefresher = myAccountPage.querySelector("ion-refresher")

      const refresherFn = async (refresher) => {
        try {
          const localCredentials = await myFs.getLocalCredentials()//signIn mode : device <=> localDb
          
          // console.log(localCredentials)

          fsGlobalVariable.session = localCredentials

          // console.log(fsGlobalVariable)

          let currentTab = await tab.getSelected()

          switch(currentTab) {
            case "my-account": 
              document.querySelector("#my-account-content").innerHTML = myAccountTemplate.content

              if(localCredentials != undefined) {                    
                await myAccountTemplate.logic(true)          
              }
              else {
                await myAccountTemplate.logic(false)
              }
              break
            
            case "advertisement": 
              document.querySelector("#advertisements-page-content").innerHTML = advertisementsTemplate.content

              await advertisementsTemplate.logic()  
              break

            case "news": 
              document.querySelector("#news-page-content").innerHTML = newsTemplate.content

              await newsTemplate.logic()  
              break

            default:
              document.querySelector("#landing-page-content").innerHTML = landingPageTemplate.content

              await landingPageTemplate.logic()
              break
          }
        }
        catch(err) {
          console.log(err)
        }
        finally {
          refresher.complete();
        }
      }

      landingPRefresher.addEventListener('ionRefresh', async () => {        
        await refresherFn(landingPRefresher)
      });      

      advertisementPageRefresher.addEventListener('ionRefresh', async () => {        
        await refresherFn(advertisementPageRefresher)
      });

      newsPageRefresher.addEventListener('ionRefresh', async () => {        
        await refresherFn(newsPageRefresher)
      });

      myAccountPageRefresher.addEventListener('ionRefresh', async () => {        
        await refresherFn(myAccountPageRefresher)
      });

      searchSeller.addEventListener("click", async () => {
        await navigation.push("seller-search", args)
      })

      newPublicationBtn.addEventListener("click", async () => {     
        try {
          if(typeof fsGlobalVariable.sellerInfos == "undefined" || typeof fsGlobalVariable.session == "undefined" || !await myFs.silentSignIn(apiUrl)) {
            const isConnected = await myFs.silentSignIn(apiUrl)

            if(isConnected) {
              const localCredentials = await myFs.getLocalCredentials()

              if(localCredentials != undefined) {
                fsGlobalVariable.session = localCredentials

                const si = await myFs.getSellerInfos(apiUrl, localCredentials.seller_id)

                // console.log(si)

                if(si.ok) {
                  const sellerInfos = si.sellerInfos

                  fsGlobalVariable.sellerInfos = sellerInfos

                  await navigation.push("media-publication")
                }
                else {
                  await Toast.show({
                    text: "Impossible de récuperer les informations nécessaires à la publication."
                  })
                }
              }
              else {
                await Toast.show({
                  text: "Veuillez vous connecter!"
                })
              }          
            }
            else {
              await Toast.show({
                text: "Veuillez vous connecter!"
              })
            }
          }
          else {
            await navigation.push("media-publication")
          }
        }
        catch(err) {
          await Toast.show({
            text: err
          })
        }
      })            

      await landingPageTemplate.logic()
      // sellerSearchTemplate.logic(args)      

      tab.addEventListener('ionTabsDidChange', async () => {
        let currentTab = await tab.getSelected()
        const izao = Date.now()

        switch(currentTab) {
          case "my-account": 
            if(izao - lastTimeDataRefresh.myAccountPage > 300000) {//5 minutes
              lastTimeDataRefresh.myAccountPage = izao
              await refresherFn(myAccountPageRefresher)
            }            
            break
          
          case "advertisement": 
            if(izao - lastTimeDataRefresh.advertisementPage > 300000) {//5 minutes
              lastTimeDataRefresh.advertisementPage = izao
              await refresherFn(advertisementPageRefresher)
            }
            break

          case "news": 
            if(izao - lastTimeDataRefresh.newsPage > 300000) {//5 minutes
              lastTimeDataRefresh.newsPage = izao
              await refresherFn(newsPageRefresher)
            }
            break

          default: 
            if(izao - lastTimeDataRefresh.landingPage > 300000) {//5 minutes
              lastTimeDataRefresh.landingPage = izao
              await refresherFn(landingPRefresher)
            }
            break
        }
      })
    }
    catch(err) {
      console.log(err)
    }
    finally {
      await leftMenuTemplate.logic()
      await rightMenuTemplate.logic(args)

      hideBackdrop()
    }
  }
}

export { mainPage }