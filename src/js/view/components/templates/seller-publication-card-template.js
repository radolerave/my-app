import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { fsConfig } from './../../../config/fsConfig.js';
import Formatter from './../../../helpers/formatter.js';

// Import the Cloudinary class.
import {Cloudinary} from "@cloudinary/url-gen";

// Import any actions required for transformations.
import {fill} from "@cloudinary/url-gen/actions/resize";

let sellerPublicationCardTemplate = {
    name: "seller-publication-card-template",
    content: /*html*/`

    `,
    logic: async (args, sellerName = undefined) => {
        let data = args
        const myCloudName = fsConfig.cloudinary.cloudName
        let myFormatter = new Formatter()   
        
        let theSellerName = ""

        switch(true) {            
            case (sellerName != undefined):
                theSellerName = sellerName
                break
            
            case (typeof data.name != "undefined"):
                theSellerName = data.name
                break
            
            case (typeof fsGlobalVariable.sellerInfos != "undefined"):
                theSellerName = fsGlobalVariable.sellerInfos.name
                break            

            default:
                break
        }

        let cfg = {};

        let converter = new QuillDeltaToHtmlConverter(data.publication.textToPublish.ops, cfg);

        let textToPublish = converter.convert(); 

        let selectedMedias = data.publication.selectedMedias

        let mediasToPublish = ""

        selectedMedias.forEach(async (value, key) => {
            const nbr = selectedMedias.length
            const hideOrNot = (key > 3) ? "ion-hide" : ""

            try {
                switch(value.mediaType) {
                    case "image": 
                        mediasToPublish += /*html*/`
                            <media class="fs-media ${hideOrNot}" data-src="${value.src}" public_id="${value.publicId}" media-type="${value.mediaType}" format="${value.format}">
                                <img src="${value.src}" />
                                ${(key == 3 && nbr > 4) ? "<span class='publication-card-more-medias'>+" + (nbr - (key + 1)) + " autres...</span>" : ""}
                            </media>
                        `                        
                        break

                    case "video": 
                        mediasToPublish += /*html*/`
                            <media class="fs-media" public_id="${value.publicId}"  media-type="${value.mediaType}" format="${value.format}" data-video=${
                                JSON.stringify(
                                    {
                                        "source": [{
                                            "src": value.src,
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
                                    <source src="${value.src}"></source>
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

        let seeMoreBtn, shortText 

        if(myFormatter.htmlStripTag(textToPublish).length <= 100) {
            seeMoreBtn = "<ion-button class='see-more-btn ion-hide'  size='small' fill='clear'>Voir plus</ion-button>"    
            shortText = textToPublish        
        }
        else {
            seeMoreBtn = `<ion-button class='see-more-btn'  size='small' fill='clear'>Voir plus</ion-button>`
            shortText = myFormatter.htmlStripTag(textToPublish, " ").substring(0, 100) + "..."
        }

        return {
            html: /*html*/`
                <ion-card class="publication">
                    <ion-card-header>
                        <ion-card-title>
                            <button class="link-to-seller-details" style="background-color: inherit; font-weight: bold;">${theSellerName}</button>

                            <ion-button class="fsPublicationMoreOptions" color="dark" fill="none">
                                <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                            </ion-button>
                        </ion-card-title>

                        <ion-card-subtitle>${myFormatter.dateFormatter(data.date_add, fsConfig.formats.dateFormat)}</ion-card-subtitle>

                        <ion-popover class="fsPublicationMoreOptionsPopover">
                            <ion-content class="ion-padding">
                                <ion-item button class="fsPublicationMoreOptionsEdit">
                                    <ion-icon name="pencil-outline" slot="start"></ion-icon>
                                    <ion-label>Modifier</ion-label>
                                </ion-item>
                                <ion-item button class="fsPublicationMoreOptionsDelete">
                                    <ion-icon name="trash-outline" slot="start"></ion-icon>
                                    <ion-label>Supprimer</ion-label>
                                </ion-item>
                                <ion-item button disabled="true" class="fsPublicationMoreOptionsPublish">
                                    <ion-icon name="share-outline" slot="start"></ion-icon>
                                    <ion-label>Publier</ion-label>
                                </ion-item>
                                <ion-item button disabled="true" class="fsPublicationMoreOptionsUnpublish">
                                    <ion-icon name="contract-outline" slot="start"></ion-icon>
                                    <ion-label>Dé-publier</ion-label>
                                </ion-item>
                                <ion-item button class="fsPublicationMoreOptionsAddValidity">
                                    <ion-icon name="hourglass-outline" slot="start"></ion-icon>
                                    <ion-label>Validité suppl.</ion-label>
                                </ion-item>
                                <ion-item button class="fsPublicationMoreOptionsInformations">
                                    <ion-icon name="information-outline" slot="start"></ion-icon>
                                    <ion-label>Informations</ion-label>
                                </ion-item>
                            </ion-content>
                        </ion-popover>

                        <ion-popover class="fsPublicationSellerDetailsPopover">
                            <ion-content class="ion-padding">
                                <ion-item button class="fsPublicationSellerDetailsView">
                                    <ion-icon name="reader-outline" slot="start"></ion-icon>
                                    <ion-label>Détails</ion-label>
                                </ion-item>
                                <ion-item button class="fsPublicationSellerDetailsManage ion-hide" disabled="true">
                                    <ion-icon name="create-outline" slot="start"></ion-icon>
                                    <ion-label>Gérer</ion-label>
                                </ion-item>
                            </ion-content>
                        </ion-popover>
                    </ion-card-header>
                
                    <ion-card-content class="ion-no-margin ion-no-padding">
                        <div class="fsPublicationText ion-margin-start ion-margin-end">
                            <ion-text color="dark">${shortText}</ion-text>
                        </div>

                        ${seeMoreBtn}
                        
                        <div class="fsMediasList">
                            ${mediasToPublish}
                        </div>
                    </ion-card-content>
                
                    <ion-grid class="fsUsersInterations ion-hide">
                        <ion-row>
                            <ion-col class="ion-text-left" size="5">Interaction1</ion-col>
                            <ion-col class="ion-text-center" size="2"></ion-col>
                            <ion-col class="ion-text-right" size="5">Interaction2</ion-col>
                        </ion-row>
                    </ion-grid>

                    <ion-grid class="fsUsersActions ion-hide">
                        <ion-row>
                            <ion-col class="ion-text-left" size="5">
                                <ion-button class="fsPublicationAction1" fill="clear">Action 1</ion-button>
                            </ion-col>
                            <ion-col class="ion-text-center" size="2"></ion-col>
                            <ion-col class="ion-text-right" size="5">
                                <ion-button class="fsPublicationAction2" fill="clear">Action 2</ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-card>
            `,
            textToPublish: data.publication.textToPublish,
            shortText: shortText,
            selectedMedias: data.publication.selectedMedias,
            publicationId: data.id,
            sellerId: data.seller_id,
            publicationType: data.type,
            publicationValidity: data.validity,
            modified_x_times: data.modified_x_times,
        }
    }
}

export { sellerPublicationCardTemplate }