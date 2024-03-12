import { createGesture } from "@ionic/core" 

import "lightgallery/css/lightGallery-bundle.css"

import lightGallery from 'lightgallery';

import { fsConfig } from './../../../config/fsConfig.js';

import { mediaActionsTemplate as self } from "./media-actions-template.js";

import { Dialog } from '@capacitor/dialog';
import { Toast } from '@capacitor/toast'

// Plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgVideo from 'lightgallery/plugins/video'

import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import ImageEditor from '@uppy/image-editor';
import XHR from '@uppy/xhr-upload';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';

let mediaActionsTemplate = {
    name: "media-actions-template",
    content: /*html*/`
        <div id="media-actions">
            <ion-button id="uppyBtn" size="small" color="dark" fill="outline">+<ion-icon name="images-outline"></ion-icon></ion-button>

            <ion-button id="prePublish" size="small" color="tertiary" fill="outline"><ion-icon name="share-outline"></ion-icon><ion-badge slot="end" id="number-of-selected-media"></ion-badge></ion-button>

            <ion-button id="media_delete" size="small" color="danger" fill="outline" disabled="true"><ion-icon name="trash-outline"></ion-icon></ion-button>

            <ion-button id="media_deselect_all" size="small" color="warning" fill="outline" disabled="true"><ion-icon name="remove-outline"></ion-icon></ion-button>

            <ion-button id="media_reduce" size="small" color="medium" fill="outline"><ion-icon name="chevron-expand-outline"></ion-icon></ion-button>

            <ion-button id="media_help" size="small" color="secondary" fill="outline"><ion-icon name="help-outline"></ion-icon></ion-button>

            <ion-text id="media_manipulation_instructions" class="ion-hide">
                Sélectionnez le(s) média(s) en appuyant dessus de manière prolongée avant de relâcher.<hr>
                <ion-icon name="images-outline"></ion-icon> pour ajouter un média.<br>
                <ion-icon name="share-outline"></ion-icon> pour publier les médias sélectionnés.<br>
                <ion-icon name="trash-outline"></ion-icon> pour supprimer les médias sélectionnés.<br>
                <ion-icon name="remove-outline"></ion-icon> pour annuler la sélection.<br>
                <ion-icon name="chevron-expand-outline"></ion-icon> pour développer et réduire la liste des médias.<ion-icon name="caret-up-outline"></ion-icon>
            </ion-text>
        </div>

        <style>
            seller-medias-management #media-actions {
                border-bottom: solid grey 1px;
                box-shadow: 0 0 0.5em grey;
                border-width: 0;
                padding: 10px 0 10px 0;
                position: fixed;
                float: inline-end;
                width: 100%;
                background-color: white;
            }

            seller-medias-management #media_manipulation_instructions {
                margin-top: 5px;
                display: block;
                border: solid blue 1px;
                border-width: 0;
                box-shadow: 0 0 0.5em grey;
                text-align: justify;
            }

            #sellerMediaManagementContent media.media-selected {
                border: solid blue 5px;
            }

            seller-medias-management #media-actions ion-badge {
                font-size: 0.8em;
            }
        </style>
    `,
    logic: async (args) => {
        const navigation = document.querySelector("ion-app ion-nav#navigation")
        const serverUrl = fsConfig.serverUrl

        let allMylightGalleries = args.allMylightGalleries
        let lightGalleryForImages, lightGalleryForVideos

        const uppyBtn = document.querySelector("#uppyBtn")
        const uppyDashboard = document.querySelector("#uppy-dashboard")
        const uppyDashboardContent = document.querySelector("#uppy-dashboard-content")
        const uppyCloseBtn = document.querySelector("#close-uppy")

        const mediaPublishBtn = document.querySelector("#prePublish")
        const mediaDeleteBtn = document.querySelector("#media_delete")
        const mediaDeselectAllBtn = document.querySelector("#media_deselect_all")
        const mediaReduceBtn = document.querySelector("#media_reduce")
        const mediaHelpBtn = document.querySelector("#media_help")
        const mediaManipulationInstructions = document.querySelector("#media_manipulation_instructions")        
        let myMedias = document.querySelectorAll("seller-medias-management #sellerMediaManagementContent media")
        let longPressActivated = false
        let numberOfSelectedMedias = 0
        let previousNumberOfSelectedMedias = 0        

        let selectedMediasDetails = () => {
            return document.querySelectorAll("seller-medias-management #sellerMediaManagementContent media.media-selected")
        }

        let countSelectedMedias = () => {
            const selectedMedias = selectedMediasDetails()

            const nbr = selectedMedias.length

            document.querySelector("#number-of-selected-media").textContent = nbr == 0 ? "" : nbr

            return nbr
        }        

        let disableOrEnableTheseBtns = (nbr, prevNbr) => {
            if(nbr <= 0) {
                longPressActivated = false

                // mediaPublishBtn.setAttribute("disabled", "true")
                mediaDeleteBtn.setAttribute("disabled", "true")
                mediaDeselectAllBtn.setAttribute("disabled", "true")
                
                try {
                    allMylightGalleries.forEach((el, index) => {
                        try {
                            el.destroy()
                        }
                        catch(err) {
                            console.log("lightGallery already destroyed!!!!")
                        }
                    })
                    
                    if(prevNbr == 0) {
                        lightGalleryForImages = lightGallery(document.getElementById('images-container'), {
                            plugins: [lgZoom, lgThumbnail],
                            licenseKey: fsConfig.lightGallery.licenseKey,
                            speed: 500
                        })

                        lightGalleryForVideos = lightGallery(document.getElementById('videos-container'), {
                            plugins: [lgVideo],
                            licenseKey: fsConfig.lightGallery.licenseKey,
                            videojs: true,
                            videojsOptions: {
                                muted: false,
                            },
                        })

                        allMylightGalleries = [lightGalleryForImages, lightGalleryForVideos]
                    }
                }
                catch(err) {
                    console.log("lightGallery might be already initialized!!!!", err)
                }
            }
            else {
                // mediaPublishBtn.setAttribute("disabled", "false")
                mediaDeleteBtn.setAttribute("disabled", "false")
                mediaDeselectAllBtn.setAttribute("disabled", "false")
            }
        }

                 
        uppyBtn.addEventListener("click", async () => {
            if(uppyDashboard.classList.contains("ion-hide")) {
                uppyDashboard.classList.remove("ion-hide")
            }
            else {
                uppyDashboard.classList.add("ion-hide")
            }

            uppyDashboardContent.innerHTML = ""

            let uppy = new Uppy({
                restrictions: {
                    allowedFileTypes: ["image/jpeg", "image/png", "image/bmp", "image/gif", "video/webm", "video/ogg", "video/mp4"],
                    maxTotalFileSize: 5242880,//5MB
                }
            })
            .use(Dashboard, { inline: true, target: '#uppy-dashboard-content'})
            .use(ImageEditor, { target: Dashboard })
            .use(XHR, { 
                endpoint: `${serverUrl}/upload.php`,
                fieldName: 'my_fs_file',
                validateStatus: (status, responseText, response) => {
                    // console.log(status)
                    // console.log(responseText)
                    // console.log(response)

                    try {
                        const resp = JSON.parse(responseText)
                        const ok = resp.ok

                        return ok
                    }
                    catch(err) {
                        return false
                    }
                }
            });      

            uppy.setMeta({
                seller_id: fsGlobalVariable.session.seller_id,
            });

            uppy.on('complete', async (result) => {
                console.log('successful files:', result.successful);
                console.log('failed files:', result.failed);

                await Toast.show({
                    text: `${result.successful.length} fichiers téléversés avec succès. ${result.failed.length} téléversements échoués.`,
                    position: "bottom"
                })
                
                await navigation.pop()
                await navigation.push("seller-medias-management")
            });

            uppy.on('upload-error', async (file, error, response) => {
                console.log(response);

                uppy.cancelAll()

                await Dialog.alert({
                    title: "Erreur",
                    message: `${response.body.message}`,
                })
            });
        })

        uppyCloseBtn.addEventListener("click", () => {
            uppyDashboardContent.innerHTML = ""

            if(!uppyDashboard.classList.contains("ion-hide")) {
                uppyDashboard.classList.add("ion-hide")
            }
        })              

        mediaManipulationInstructions.addEventListener("click", () => {
            mediaHelpBtn.click()
        })

        mediaPublishBtn.addEventListener("click", async () => {   
            const selectedMedias = selectedMediasDetails()
            const previousPage = await navigation.getPrevious()

            console.log(previousPage)

            if(previousPage.component == "media-publication") {
                await navigation.pop()

                const currentPage = await navigation.getActive()

                if(currentPage.component == "media-publication") {
                    const mediaList = document.querySelector("media-publication #media-publication-content #media-list")
                    const publish = document.querySelector("media-publication #publish")

                    selectedMedias.forEach((element, key) => {
                        const copyOfTheElement = document.importNode(element, true)
                        
                        const deleteBtn = document.createElement("ion-button")
                        deleteBtn.innerHTML = `<ion-icon name="close-outline"></ion-icon> enlever`
                        deleteBtn.setAttribute("color", "warning")
                        copyOfTheElement.appendChild(deleteBtn)

                        deleteBtn.addEventListener("click", () => {
                            deleteBtn.parentElement.remove()

                            fsGlobalVariable.selectedMedias = document.querySelectorAll("media-publication #media-publication-content #media-list media")

                            console.log(fsGlobalVariable)

                            showHidePublishBtn()
                        })

                        if(mediaList.querySelector(`media[uid="${copyOfTheElement.getAttribute("uid")}"]`) == null) {
                            mediaList.appendChild(copyOfTheElement)
                        }
                    })

                    fsGlobalVariable.selectedMedias = document.querySelectorAll("media-publication #media-publication-content #media-list media")

                    const showHidePublishBtn = () => {
                        if(fsGlobalVariable.quill.getText() === "\n" && fsGlobalVariable.quill.getLength() == 1 && fsGlobalVariable.selectedMedias.length == 0) {
                            if(!publish.classList.contains("ion-hide")) {
                                publish.classList.add("ion-hide")
                            }
                        }
                        else {
                            if(publish.classList.contains("ion-hide")) {
                                publish.classList.remove("ion-hide")
                            }
                        }
                    }

                    showHidePublishBtn()
                }
            }
            else {
                await navigation.push('media-publication', { 
                    selectedMedias: selectedMedias
                })    
            } 
        })    

        mediaDeleteBtn.addEventListener("click", async () => {
            const confirmation = await Dialog.confirm({
                title: 'Confirmation',
                message: `Voulez-vous vraiment supprimer ce(s) média(s) ?`,
                okButtonTitle: "oui",
                cancelButtonTitle: "non",
            })

            if(confirmation.value) {
                const selectedMedias = selectedMediasDetails()
                let filesToBeDeleted = []

                // console.log(selectedMedias)

                if(selectedMedias.length > 0) {
                    selectedMedias.forEach((el, key) => {
                        filesToBeDeleted.push(el.getAttribute("basename"))
                    })

                    let formData = new FormData()

                    formData.append("filesToBeDeleted", JSON.stringify(filesToBeDeleted))
                    formData.append("seller_id", fsGlobalVariable.session.seller_id)

                    try {
                        const response = await fetch(`${serverUrl}/delete.php`, {
                            method: "POST",
                            body: formData,
                        });

                        if(response.ok) {
                            // console.log(response)
                            const result = await response.json();
                            // console.log(result);

                            if(result.ok) {
                                await Toast.show({
                                    text: result.message,
                                    position: "bottom"
                                })

                                console.log("Success: ", result.message)
                            }
                            else {
                                await Toast.show({
                                    text: result.message,
                                    position: "bottom"
                                })

                                console.log("Error: ", result.message)
                            }
                        }
                        else {
                            console.log("Error:", response)
                        }                                    
                    } catch (error) {
                        console.error("Error:", error);
                    }

                    await navigation.pop()
                    await navigation.push("seller-medias-management")
                }
            }
        })
        
        mediaDeselectAllBtn.addEventListener("click", () => {
            const selectedMedias = selectedMediasDetails()

            selectedMedias.forEach((el, key) => {
                el.classList.remove("media-selected")
            })

            disableOrEnableTheseBtns(countSelectedMedias(), countSelectedMedias())
        })

        mediaReduceBtn.addEventListener("click", () => {
            let plusImagesBtn = document.querySelector("#plusImages")
            let plusVideosBtn = document.querySelector("#plusVideos")
            let icon = mediaReduceBtn.children[0]

            if(icon.getAttribute("name") == "chevron-collapse-outline") {
                icon.setAttribute("name", "chevron-expand-outline")

                if(plusImagesBtn != null && plusImagesBtn.getAttribute("show-all") == "true") { 
                    plusImagesBtn.click()            
                }

                if(plusVideosBtn != null && plusVideosBtn.getAttribute("show-all") == "true") { 
                    plusVideosBtn.click()            
                }
            }
            else {
                icon.setAttribute("name", "chevron-collapse-outline")

                if(plusImagesBtn != null && plusImagesBtn.getAttribute("show-all") == "false") { 
                    plusImagesBtn.click()            
                }

                if(plusVideosBtn != null && plusVideosBtn.getAttribute("show-all") == "false") { 
                    plusVideosBtn.click()            
                }
            }                                 
        })

        mediaHelpBtn.addEventListener("click", () => {
            mediaManipulationInstructions.classList.toggle("ion-hide")

            // if(!mediaManipulationInstructions.classList.contains("ion-hide")) {
            //     setTimeout(() => {
            //         mediaManipulationInstructions.classList.add("ion-hide")
            //     }, 10000);
            // }
        })

        myMedias.forEach((element, key) => {
            const CONSIDER_AS_LONG_PRESS_IF_DURATION_IS_MORE_THAN = 500

            const gesture = createGesture({
				el: element,
				threshold: 0,
				onMove: (detail) => { detail.data = "glisse" },
				onStart: (detail) => {
					detail.data = "click"
				},
				onEnd: (detail) => {     
                    if(detail.data == "click")
					{
						const myTimer = parseInt(parseFloat(detail.currentTime) - parseFloat(detail.startTime))

                        previousNumberOfSelectedMedias = countSelectedMedias()

						if(myTimer < CONSIDER_AS_LONG_PRESS_IF_DURATION_IS_MORE_THAN) {//click                            
                            if(longPressActivated) {     
                                element.classList.toggle("media-selected")
                            }

                            numberOfSelectedMedias = countSelectedMedias()

                            console.log(numberOfSelectedMedias)           
                        }
                        else {//long press   
                            if(!longPressActivated) {             
                                longPressActivated = true

                                allMylightGalleries.forEach((el, index) => {
                                    try {
                                        el.destroy()
                                    }
                                    catch(err) {
                                        console.log("lightGallery already destroyed!!!!")
                                    }
                                })                                
                            }
                            
                            element.classList.toggle("media-selected")
                            
                            numberOfSelectedMedias = countSelectedMedias()

                            console.log(numberOfSelectedMedias)
                        }                        

                        disableOrEnableTheseBtns(numberOfSelectedMedias, previousNumberOfSelectedMedias)
                    }
                }
            })

            gesture.enable();
        })
    },
    defer: async (args) => {
      return {
        get: async (params) => {
            return { 
                selectedMedias: document.querySelectorAll("seller-medias-management #sellerMediaManagementContent media.media-selected"),
                textToPublish: params.textToPublish
            }
        },
        set: async (params) => {
            return { 
                selectedMedias: document.querySelectorAll("media-publication #media-publication-content media.media-selected"),
                textToPublish: params.textToPublish
            }
        }
      }
    }
}

export { mediaActionsTemplate }