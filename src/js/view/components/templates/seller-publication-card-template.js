import { sellerPublicationCardTemplate as self } from './seller-publication-card-template.js'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { fsConfig } from './../../../config/fsConfig.js';

// Import the Cloudinary class.
import {Cloudinary} from "@cloudinary/url-gen";

// Import any actions required for transformations.
import {fill} from "@cloudinary/url-gen/actions/resize";

import "lightgallery/css/lightGallery-bundle.css"

import lightGallery from 'lightgallery';

// Plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgVideo from 'lightgallery/plugins/video'

let sellerPublicationCardTemplate = {
    name: "seller-publication-card-template",
    content: /*html*/`

    `,
    logic: async (args) => {
        let data = args
        const myCloudName = fsConfig.cloudinary.cloudName

        // Create a Cloudinary instance and set your cloud name.    
        const cld = new Cloudinary({
            cloud: {
            cloudName: myCloudName
            }
        }); 

        let cfg = {};

        let converter = new QuillDeltaToHtmlConverter(data.publication.textToPublish.ops, cfg);

        let textToPublish = converter.convert(); 

        let selectedMedias = data.publication.selectedMedias

        let mediasToPublish = ""

        selectedMedias.forEach(async (value, key) => {
            try {
                switch(value.mediaType) {
                    case "image": 
                        const myImage = cld.image(value.publicId)

                        mediasToPublish += /*html*/`
                            <media data-src="${myImage.toURL()}">
                                <img src="${myImage.resize(fill().width(250).height(250)).toURL()}" />
                            </media>
                        `                        
                        break

                    case "video": 
                        break

                    default:
                        break
                }
            }
            catch(err) {
                console.log(err)
            }
        })

        return /*html*/`
            <ion-card>
                <ion-card-header>
                    <ion-card-title>Card Title</ion-card-title>
                    <ion-card-subtitle>${data.date_add}</ion-card-subtitle>
                </ion-card-header>
            
                <ion-card-content>
                    <div class="fsPublicationText">
                        ${textToPublish}
                    </div>

                    <div class="fsMediasList">
                        ${mediasToPublish}
                    </div>
                </ion-card-content>
            
                <ion-button fill="clear">Action 1</ion-button>
                <ion-button fill="clear">Action 2</ion-button>
            </ion-card>
        `
    }
}

export { sellerPublicationCardTemplate }