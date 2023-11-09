import { createGesture } from "@ionic/core" 

import "lightgallery/css/lightGallery-bundle.css"

import lightGallery from 'lightgallery';

import { fsConfig } from './../../../config/fsConfig.js';

// Plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgVideo from 'lightgallery/plugins/video'

let mediaActionsTemplate = {
    name: "media-actions-template",
    content: /*html*/`
        <div id="media-actions">
            <ion-button id="upload_widget" size="small" color="dark" fill="outline">+<ion-icon name="images-outline"></ion-icon></ion-button>

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
            seller-media-management #media-actions {
                border-bottom: solid grey 1px;
                box-shadow: 0 0 0.5em grey;
                border-width: 0;
                padding: 10px 0 10px 0;
                position: fixed;
                float: inline-end;
                width: 100%;
                background-color: white;
            }

            seller-media-management #media_manipulation_instructions {
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

            seller-media-management #media-actions ion-badge {
                font-size: 0.8em;
            }
        </style>
    `,
    logic: async (args) => {
        const navigation = document.querySelector("ion-app ion-nav#navigation")

        const myCloudName = args.myCloudName
        const theTagName = args.theTagName
        const myUploadPreset = args.myUploadPreset
        let allMylightGalleries = args.allMylightGalleries
        let lightGalleryForImages, lightGalleryForVideos

        const mediaUploadWidgetBtn = document.querySelector("#upload_widget")
        const mediaPublishBtn = document.querySelector("#prePublish")
        const mediaDeleteBtn = document.querySelector("#media_delete")
        const mediaDeselectAllBtn = document.querySelector("#media_deselect_all")
        const mediaReduceBtn = document.querySelector("#media_reduce")
        const mediaHelpBtn = document.querySelector("#media_help")
        const mediaManipulationInstructions = document.querySelector("#media_manipulation_instructions")        
        let myMedias = document.querySelectorAll("seller-media-management #sellerMediaManagementContent media")
        let longPressActivated = false
        let numberOfSelectedMedias = 0
        let previousNumberOfSelectedMedias = 0        

        let selectedMediasDetails = () => {
            return document.querySelectorAll("seller-media-management #sellerMediaManagementContent media.media-selected")
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
                    try {
                        allMylightGalleries.forEach((el, index) => {
                            el.destroy()
                        })
                    }
                    catch(err) {
                        console.log("lightGallery already destroyed!!!!")
                    }
                    
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

        let myWidget = window.cloudinary.createUploadWidget({
            cloudName: myCloudName, 
            uploadPreset: myUploadPreset,
            prepareUploadParams: (cb, params) => {
                params = { tags : [theTagName] }
    
                cb(params)
            },
            cropping: true
        }, 
            async (error, result) => { 
              if (!error && result && result.event === "success") { 
                console.log('Done! Here is the media info: ', result.info);
                setTimeout(async () => {
                  await renderMedia(myCloudName, theTagName) 
                }, 3000);
              }
            }
        )
          
        mediaUploadWidgetBtn.addEventListener("click", function(){
          myWidget.open();
        }, false);                

        mediaManipulationInstructions.addEventListener("click", () => {
            mediaHelpBtn.click()
        })

        mediaPublishBtn.addEventListener("click", async () => {
            await navigation.push('media-publication', { selectedMedias: selectedMediasDetails() })        
        })    

        mediaDeleteBtn.addEventListener("click", () => {
            numberOfSelectedMedias = countSelectedMedias()
            alert(numberOfSelectedMedias)
        })
        
        mediaDeselectAllBtn.addEventListener("click", () => {
            const selectedMedias = document.querySelectorAll("seller-media-management #sellerMediaManagementContent media.media-selected")

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

                if(plusImagesBtn.getAttribute("show-all") == "true") { 
                    plusImagesBtn.click()            
                }

                if(plusVideosBtn.getAttribute("show-all") == "true") { 
                    plusVideosBtn.click()            
                }
            }
            else {
                icon.setAttribute("name", "chevron-collapse-outline")

                if(plusImagesBtn.getAttribute("show-all") == "false") { 
                    plusImagesBtn.click()            
                }

                if(plusVideosBtn.getAttribute("show-all") == "false") { 
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
                                
                                try {
                                    allMylightGalleries.forEach((el, index) => {
                                        el.destroy()
                                    })
                                }
                                catch(err) {
                                    console.log("lightGallery already destroyed!!!!")
                                }
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
    }
}

export { mediaActionsTemplate }