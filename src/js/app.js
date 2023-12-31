import { SplashScreen } from '@capacitor/splash-screen'
import { Camera } from '@capacitor/camera'
import { App } from '@capacitor/app';

import { Dexie } from 'dexie'
import FsDb from './model/model.js'
import FsView from './view/view.js'
import Fs from './controller/controller.js'

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import 'leaflet-geosearch/dist/geosearch.css';

let lastBackButonTimerMs = Date.now()
let myFsView = new FsView()
window.addEventListener("load", async (event) => {
    myFsView.generateView()
    // console.log("version : ", myFs.getVersion())
    // document.querySelector('ion-nav').addEventListener('ionNavWillChange', (ev) => {
    //     console.log(ev)
    // })

    // document.querySelector('ion-nav').addEventListener('ionNavDidChange', (ev) => {
    //     console.log(ev)
    // })

    // console.log(await document.querySelector('ion-nav').canGoBack())
})

document.addEventListener('ionBackButton', (ev) => {
    let timer = (Date.now() - lastBackButonTimerMs)
    const navigation = document.querySelector("ion-nav#navigation")
    
    if(timer < 500)
    {
        // if(this.appConf.doubleTapHardwareBackButtonToQuit)
        App.exitApp();	
    } 
    else if(navigation.canGoBack()) {
        navigation.pop()
    }
    else 
    {
        window.history.back();
    }

    lastBackButonTimerMs = Date.now()
})
  
