import { Dexie } from 'dexie'
import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { sellerSearchTemplate } from './../templates/seller-search-template.js'

let sellerSearch = {
    name: "seller-search",
    content: /*html*/`
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>

                <ion-title>Rechercher</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <div id="sellerSearchContent">This is the content for seller search.</div>
        </ion-content>
    `,
    logic: async () => {
        let myFs = new Fs(FsDb, Dexie)
        console.log(myFs)

        let args = {}
        args["myFs"] = myFs

        const sellerSearchContent = document.querySelector("#sellerSearchContent")

        sellerSearchContent.innerHTML = sellerSearchTemplate.content

        sellerSearchTemplate.logic(args)
    }
}

export { sellerSearch }