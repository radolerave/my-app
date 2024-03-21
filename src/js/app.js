import { SplashScreen } from '@capacitor/splash-screen'
import { Camera } from '@capacitor/camera'
import { Network } from '@capacitor/network';
import { App } from '@capacitor/app';

import { Dexie } from 'dexie'
import FsDb from './model/model.js'
import FsView from './view/view.js'
import Fs from './controller/controller.js'

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import 'leaflet-geosearch/dist/geosearch.css';

window.fsGlobalVariable = {
    navigation: document.querySelector("ion-app ion-nav#navigation"),
    ionBackButtonHandler: {
        canProcessNextHandler: true,
        fn: async () => {}
    },
    textToPublish: [{ insert: '\n' }],
    textToPublishDrat: [{ insert: '\n' }],
}

window.showBackdrop = () => {
    document.querySelector("#fs-backdrop").classList.remove("ion-hide")
}

window.hideBackdrop = () => {
    if(!document.querySelector("#fs-backdrop").classList.contains("ion-hide")) {
        document.querySelector("#fs-backdrop").classList.add("ion-hide")
    }
}

let lastBackButonTimerMs = Date.now()
let myFsView = new FsView()
window.addEventListener("load", async (event) => {
    myFsView.generateView()

    function toggleConnectionStatus(connected) {
        try {
            const networkStatus = document.querySelector("main-page #network-status")

            if(connected) {
                networkStatus.classList.add("connected")
                networkStatus.classList.remove("disconnected")
            }
            else {
                networkStatus.classList.add("disconnected")
                networkStatus.classList.remove("connected")
            }
        }
        catch(err) {
            setTimeout(() => {
                toggleConnectionStatus(connected)
            }, 3000);            
        }
    }

    Network.addListener('networkStatusChange', status => {
        console.log('Network status changed', status);
        toggleConnectionStatus(status.connected)
    });

    const logCurrentNetworkStatus = async () => {
        const status = await Network.getStatus();
      
        console.log('Network status:', status);
        toggleConnectionStatus(status.connected)
    };

    await logCurrentNetworkStatus()
})

document.addEventListener('ionBackButton', async (ev) => {
    ev.detail.register(100, async (processNextHandler) => {
        let timer = (Date.now() - lastBackButonTimerMs)
    
        const navigation = fsGlobalVariable.navigation
        const mainPageTab = document.querySelector("main-page ion-tabs#main-page-tab")

        if(timer < 500)
        {
            // if(this.appConf.doubleTapHardwareBackButtonToQuit)
            App.exitApp();	
        } 
        else {
            const activeNav = await navigation.getActive()
            const activeNavName = activeNav.component      

            switch(true) {
                case (await navigation.canGoBack()):
                    await navigation.pop()
                    break

                case (await document.querySelector("ion-menu[menu-id='menu']").isOpen()): 
                    await document.querySelector("ion-menu[menu-id='menu']").close()
                    break

                case (await document.querySelector("ion-menu[menu-id='menu2']").isOpen()): 
                    await document.querySelector("ion-menu[menu-id='menu2']").close()
                    break                            

                case (activeNavName == "main-page" && await mainPageTab.getSelected() != "landing"):
                    await mainPageTab.select("landing")
                    break

                default: 
                    processNextHandler()
                    break
            }
        }

        lastBackButonTimerMs = Date.now()  
        
        // processNextHandler()
    })    

    ev.detail.register(100, async (processNextHandler) => {
        const canProcessNextHandler = typeof fsGlobalVariable.ionBackButtonHandler.canProcessNextHandler != "undefined" ? fsGlobalVariable.ionBackButtonHandler.canProcessNextHandler : true

        try {
            if(typeof fsGlobalVariable.ionBackButtonHandler.fn == "function") {
                await fsGlobalVariable.ionBackButtonHandler.fn()
            }
        }
        catch(err) {
            console.log(err)
        }

        fsGlobalVariable.ionBackButtonHandler = {
            canProcessNextHandler: true,
            fn: async () => {}
        }

        if(canProcessNextHandler) {
            processNextHandler()
        }
    })
})
  
