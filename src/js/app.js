import { SplashScreen } from '@capacitor/splash-screen'
import { Camera } from '@capacitor/camera'

import { Dexie } from 'dexie'
import FsDb from './model/model.js'
import FsView from './view/view.js'
import Fs from './controller/controller.js'

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';



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
