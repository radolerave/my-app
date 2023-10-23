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

                <ion-title>
                    <ion-label>
                        <h2 id="title"></h2>
                        <p id="tab-title"></p>
                    </ion-label>
                </ion-title>                      
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <div id="sellerDetailsContent">This is the content for seller details.</div>
        </ion-content>
    `,
    logic: async () => {
        const navigation = document.querySelector("ion-app ion-nav#navigation")
        const sellerDetailsContent = document.querySelector("#sellerDetailsContent")

        sellerDetailsContent.innerHTML = sellerDetailsTemplate.content

        navigation.addEventListener('ionNavDidChange', async () => {
            let currentPage = await navigation.getActive()

            // console.log(currentPage)

            if(currentPage.component == "seller-details") {
                sellerDetailsTemplate.logic(currentPage)
            }
        })
    }
}

export { sellerDetails }