import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { fsConfig } from './../../../config/fsConfig.js';

// Import the Cloudinary class.
import {Cloudinary} from "@cloudinary/url-gen";

// Import any actions required for transformations.
import {fill} from "@cloudinary/url-gen/actions/resize";

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
                            <media class="fs-media" data-src="${myImage.toURL()}">
                                <img src="${myImage.resize(fill().width(250).height(250)).toURL()}" />
                            </media>
                        `                        
                        break

                    case "video": 
                        const myVideo = cld.video(value.publicId)

                        mediasToPublish += /*html*/`
                            <media class="fs-media" data-video=${
                                JSON.stringify(
                                    {
                                        "source": [{
                                            "src": myVideo.toURL(),
                                            "type": `video/${value.format}`
                                        }],
                                        "attributes": {
                                            "preload": false,
                                            "playsinline": true,
                                            "controls": true
                                        }              
                                    }
                                )
                            }>
                                <video>
                                    <source src="${myVideo.toURL()}"></source>
                                </video>
                            </media>
                        `
                        break

                    default:
                        break
                }
            }
            catch(err) {
                console.log(err)
            }
        })

        return {
            html: /*html*/`
                <ion-card class="publication">
                    <ion-card-header>
                        <ion-card-title>Card Title</ion-card-title>
                        <ion-card-subtitle>${data.date_add}</ion-card-subtitle>
                    </ion-card-header>
                
                    <ion-card-content class="ion-no-margin ion-no-padding">
                        <div class="fsPublicationText ion-margin-start ion-margin-end">
                            <ion-text color="dark">
                                ${
                                    textToPublish.length <= 100 ? textToPublish : textToPublish.substring(0, 100) + "... <ion-button class='see-more-btn'  size='small' fill='clear'>Voir plus</ion-button>"
                                }
                            </ion-text>
                        </div>

                        <div class="fsMediasList">
                            ${mediasToPublish}
                        </div>
                    </ion-card-content>
                
                    <ion-button fill="clear">Action 1</ion-button>
                    <ion-button fill="clear">Action 2</ion-button>
                </ion-card>
            `,
            textToPublish: data.publication.textToPublish,
            selectedMedias: data.publication.selectedMedias
        }
    }
}

export { sellerPublicationCardTemplate }