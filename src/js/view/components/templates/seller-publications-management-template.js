import { sellerPublicationCardTemplate } from './../templates/seller-publication-card-template.js'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { fsConfig } from './../../../config/fsConfig.js';

import "lightgallery/css/lightGallery-bundle.css"

import lightGallery from 'lightgallery';

// Plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgVideo from 'lightgallery/plugins/video'

let sellerPublicationsManagementTemplate = {
    name: "seller-publications-management-template",
    content: /*html*/`       
        <div id="publicationsList">
            This is the content for my Seller publications management.
        </div>
    `,  
    logic: async (args) => {
        let response = args
        console.log(response)
        
        const publicationsList = document.querySelector("#publicationsList")
        const navigation = document.querySelector("ion-app ion-nav#navigation")        

        if(response.ok) {
            publicationsList.innerHTML = ""
            const records = response.records

            for(let i=0; i<records.length; i++) {
                const value = records[i]

                const card = document.createElement("div")

                const data = await sellerPublicationCardTemplate.logic(value)

                card.innerHTML = data.html

                publicationsList.appendChild(card)

                lightGallery(card, {
                    selector: ".fs-media",
                    plugins: [lgVideo, lgZoom, lgThumbnail],
                    licenseKey: fsConfig.lightGallery.licenseKey,
                    videojs: true,
                    videojsOptions: {
                        muted: false,
                    },
                    speed: 500,
                })

                try {
                    card.querySelector(".see-more-btn").addEventListener("click", () => {
                        let converter = new QuillDeltaToHtmlConverter(data.textToPublish.ops, {});

                        let htmlTextToPublish = converter.convert(); 

                        card.querySelector(".fsPublicationText").innerHTML = `
                            <ion-text color="dark">
                                ${htmlTextToPublish}
                            </ion-text>
                        `
                    })
                }
                catch(err) {
                    //do nothing :p
                }
            }            
        }
        else {
            await Dialog.alert({
                "title": `Erreur`,
                "message": `${response.errorText}`
            })
        }
    }
}

export { sellerPublicationsManagementTemplate }