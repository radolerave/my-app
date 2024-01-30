import { sellerPublicationCardTemplate } from './../templates/seller-publication-card-template.js'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { Dexie } from 'dexie'
import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { fsConfig } from './../../../config/fsConfig.js';

import { DateTime } from "luxon"

import { Dialog } from '@capacitor/dialog';
import { Toast } from '@capacitor/toast'

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

        const apiUrl = fsConfig.apiUrl
        let myFs = new Fs(FsDb, Dexie)
        
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

                        card.querySelector(".see-more-btn").classList.add("ion-hide")

                        card.querySelector(".fsPublicationText").classList.add("canBeReduced")

                        const listener = () => {
                            card.querySelector(".fsPublicationText").innerHTML = `
                                <ion-text color="dark">
                                    ${data.shortText}
                                </ion-text>
                            `

                            card.querySelector(".see-more-btn").classList.remove("ion-hide")

                            card.querySelector(".fsPublicationText").classList.remove("canBeReduced")
                        }                        

                        card.querySelector(".canBeReduced").removeEventListener("click", listener)

                        card.querySelector(".canBeReduced").addEventListener("click", listener)
                    }) 

                    const fsPublicationMoreOptions = card.querySelector(".fsPublicationMoreOptions")
                    const fsPublicationMoreOptionsPopover = card.querySelector(".fsPublicationMoreOptionsPopover")
                    const fsPublicationMoreOptionsEdit = card.querySelector(".fsPublicationMoreOptionsEdit")
                    const fsPublicationMoreOptionsDelete = card.querySelector(".fsPublicationMoreOptionsDelete")
                    const fsPublicationMoreOptionsInformations = card.querySelector(".fsPublicationMoreOptionsInformations")
                    const fsPublicationMoreOptionsEnable = card.querySelector(".fsPublicationMoreOptionsEnable")
                    const fsPublicationMoreOptionsDisable = card.querySelector(".fsPublicationMoreOptionsDisable")
                    const fsPublicationAction1 = card.querySelector(".fsPublicationAction1")
                    const fsPublicationAction2 = card.querySelector(".fsPublicationAction2")

                    if(typeof response.noControls == "boolean" && response.noControls == true) {
                        fsPublicationMoreOptions.remove()
                        fsPublicationAction1.remove()
                        fsPublicationAction2.remove()
                    }
                    else {                        
                        if(value.enabled) {
                            fsPublicationMoreOptionsDisable.setAttribute("disabled", "false")
                            fsPublicationMoreOptionsEnable.setAttribute("disabled", "true")
                        }
                        else {
                            fsPublicationMoreOptionsDisable.setAttribute("disabled", "true")
                            fsPublicationMoreOptionsEnable.setAttribute("disabled", "false")
                        }
                        
                        fsPublicationMoreOptions.addEventListener("click", (e) => {
                            fsPublicationMoreOptionsPopover.event = e
                            fsPublicationMoreOptionsPopover.isOpen = true
                        })

                        fsPublicationMoreOptionsPopover.addEventListener('didDismiss', () => (fsPublicationMoreOptionsPopover.isOpen = false))

                        fsPublicationMoreOptionsEdit.addEventListener("click", async (ev) => {
                            fsPublicationMoreOptionsPopover.isOpen = false

                            fsGlobalVariable.textToPublish = data.textToPublish

                            await navigation.push("media-publication", {
                                selectedMedias: card.querySelectorAll("media"),
                                operationType: "update",
                                publicationId: data.publicationId,
                                publicationType: data.publicationType,
                                publicationValidity: data.publicationValidity
                            })

                            let currentPage = await navigation.getActive()

                            console.log(currentPage)
                        })

                        fsPublicationMoreOptionsDelete.addEventListener("click", async (ev) => {
                            const confirmation = await Dialog.confirm({
                                title: 'Confirmation',
                                message: `Voulez-vous vraiment supprimer cette publication ?`,
                                okButtonTitle: "oui",
                                cancelButtonTitle: "non",
                            })

                            if(confirmation.value) {
                                response = await myFs.deletePublication(apiUrl, data.publicationId)

                                if(response.ok) {
                                    fsPublicationMoreOptionsPopover.isOpen = false
                                    
                                    await navigation.popToRoot()
                                    await navigation.push("seller-publications-management")
                                }
                                else {
                                    await Dialog.alert({
                                        "title": `Erreur`,
                                        "message": `${response.errorText}`
                                    })
                                }
                            }
                            else {
                                fsPublicationMoreOptionsPopover.isOpen = false
                            }
                        })

                        fsPublicationMoreOptionsEnable.addEventListener("click", async () => {
                            const confirmation = await Dialog.confirm({
                                title: 'Confirmation',
                                message: `Voulez-vous vraiment activer cette publication ?`,
                                okButtonTitle: "oui",
                                cancelButtonTitle: "non",
                            })

                            if(confirmation.value) {
                                const response = await myFs.updatePublication(apiUrl, { 
                                    updatedData: {
                                        enabled: 1
                                    },
                                    publicationId: data.publicationId
                                })

                                if(response.ok) {
                                    fsPublicationMoreOptionsPopover.isOpen = false
                                    
                                    await navigation.popToRoot()
                                    await navigation.push("seller-publications-management")
                                }
                                else {
                                    await Dialog.alert({
                                        "title": `Erreur`,
                                        "message": `${response.errorText}`
                                    })
                                }
                            }
                            else {
                                fsPublicationMoreOptionsPopover.isOpen = false
                            }
                        })

                        fsPublicationMoreOptionsDisable.addEventListener("click", async () => {
                            const confirmation = await Dialog.confirm({
                                title: 'Confirmation',
                                message: `Voulez-vous vraiment désactiver cette publication ?`,
                                okButtonTitle: "oui",
                                cancelButtonTitle: "non",
                            })

                            if(confirmation.value) {
                                const response = await myFs.updatePublication(apiUrl, { 
                                    updatedData: {
                                        enabled: 0
                                    },
                                    publicationId: data.publicationId
                                })

                                if(response.ok) {
                                    fsPublicationMoreOptionsPopover.isOpen = false
                                    
                                    await navigation.popToRoot()
                                    await navigation.push("seller-publications-management")
                                }
                                else {
                                    await Dialog.alert({
                                        "title": `Erreur`,
                                        "message": `${response.errorText}`
                                    })
                                }
                            }
                            else {
                                fsPublicationMoreOptionsPopover.isOpen = false
                            }
                        })

                        fsPublicationMoreOptionsInformations.addEventListener("click", async () => {     
                            const dateAdd = new Date(value.date_add)      
                            const deadline = DateTime.fromJSDate(dateAdd).plus({ days: parseInt(value.validity) }).toFormat('yyyy-LL-dd HH:mm:ss');
                            
                            await Dialog.alert({
                                "title": `Informations`,
                                "message": `Cette publication est : ${value.enabled ? "activée" : "désactivée"}\nDate d'ajout : ${value.date_add}\nDate limite : ${deadline}\nDernière mise à jour : ${value.last_edit}`
                            })

                            fsPublicationMoreOptionsPopover.isOpen = false
                        })
                    }
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

            if(response.errorCode == 1) {
                const mainPageTab = document.querySelector("main-page ion-tabs#main-page-tab")

                await myFs.signOut()
                await navigation.popToRoot()
                await mainPageTab.select("landing")
            }            
        }
    }
}

export { sellerPublicationsManagementTemplate }