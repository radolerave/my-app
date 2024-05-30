import MyMap from "../../../helpers/map.js"
import { sellerDetailsTemplate } from './../templates/seller-details-template.js'

let sellerDetails = {
    name: "seller-details",
    content: /*html*/`
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>

                <ion-thumbnail id="photo-id" slot="start">
                    <img alt="Seller photo id" src="">
                </ion-thumbnail>

                <ion-title class="ion-no-padding ion-padding-start">
                    <ion-label>
                        <h2 id="title"></h2>
                        <p id="tab-title"></p>
                        
                    </ion-label>
                </ion-title>

                <ion-text id="seller-details-last-edit" slot="end" class="ion-margin"></ion-text>              
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <div id="sellerDetailsContent">This is the content for seller details.</div>                    
        </ion-content>

        <style>
            seller-details #seller-details-last-edit {
                /* border: solid red 1px; */
                font-size: 0.6em;
                /* position: absolute; */
            }

            seller-details ion-title #title {
                color: black;
                font-weight: bold;
            }

            seller-details ion-title #tab-title {
                /* border: solid red 1px; */
                font-size: 0.6em;
                /* position: absolute; */
            }
        </style>
    `,
    logic: async () => {
        const navigation = fsGlobalVariable.navigation
        const sellerDetailsContent = document.querySelector("#sellerDetailsContent")

        sellerDetailsContent.innerHTML = sellerDetailsTemplate.content

        const listener = async () => {
            let currentPage = await navigation.getActive()

            // console.log(currentPage)

            if(currentPage.component == "seller-details") {
                sellerDetailsTemplate.logic({"currentPage": currentPage, "listener": listener})
            }
        }        

        navigation.addEventListener('ionNavDidChange', listener)
    }
}

export { sellerDetails }