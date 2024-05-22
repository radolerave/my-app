import { Dexie } from 'dexie'
import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { fsConfig } from './../../../config/fsConfig.js';

import "lightgallery/css/lightGallery-bundle.css"

import lightGallery from 'lightgallery';

// Plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgVideo from 'lightgallery/plugins/video'

import { Dialog } from '@capacitor/dialog';
import { Toast } from '@capacitor/toast'


let allVarobobaTemplate = {
    name: "all-varoboba-template",
    content: /*html*/`
        <div id="varoboba"></div>

        <style>
            all-varoboba #varoboba {
                text-align: center;
            }

            all-varoboba .one-varoboba {      
                display: inline-block;        
                vertical-align: bottom;
                width: 100px;
                height: 100px;
                /* border: solid red 1px; */
                margin: 10px 5px;
            }

            all-varoboba media img, all-varoboba media video {
                display: block;
                object-fit: cover;
                border: solid grey 1px;
                border-radius: 5px;
                width: 100%;
                height: 100%;
            }

            all-varoboba .varoboba-seller-name {
                position: absolute; 
                width: 100px;
                height: 15px;
                overflow: hidden;
                /* bottom:0;  */
                /* left:0;  */
                /* margin: 5px;  */
                font-size: 0.7em; 
                color: black;
                -webkit-text-stroke: 1px transparent;
                text-shadow: 0px 1px 4px grey;
            }
        </style>
    `,
    logic: async (args) => {        
        let myFs = new Fs(FsDb, Dexie)

        const varoboba = document.querySelector("all-varoboba #varoboba")
        
        const navigation = fsGlobalVariable.navigation
        navigation.removeEventListener("ionNavDidChange", args.listener)
        const publicationsList = args.currentPage.params.publicationsList

        console.log(publicationsList)
        
        for(let i=0; i<publicationsList.length; i++) {
            let sellerName = publicationsList[i].name
            let file = publicationsList[i].publication.selectedMedias[0]
            let media    

            // Render the image in an 'img' element.
            const oneVaroboba = document.createElement('div')
            oneVaroboba.classList.add("one-varoboba")
            // oneVaroboba.setAttribute("href", file.src)

            // Render the seller details in sub html
            const captions = document.createElement('div')
            const captionId = "caption" + i
            captions.setAttribute("id", captionId)
            captions.classList.add("ion-hide")                     

            const sellerDetails = document.createElement("div")
            sellerDetails.setAttribute("seller-id", publicationsList[i].seller_id)
            sellerDetails.setAttribute("seller-name", publicationsList[i].name)
            captions.appendChild(sellerDetails)

            switch(file.mediaType) {
                case "image": 
                    media = /*html*/`
                        <media class="fs-media" data-src="${file.src}" media-type="image" format="${file.format}" data-sub-html="#${captionId}">
                            <img src="${file.src}" />
                            <div class="varoboba-seller-name">${sellerName}</div>
                        </media>
                    `                        
                    break

                case "video": 
                    media = /*html*/`
                        <media class="fs-media" media-type="video" format="${file.format}"  data-sub-html="#${captionId}" data-video=${
                            JSON.stringify(
                                {
                                    "source": [{
                                        "src": file.src,
                                        "type": `video/${file.format}`
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
                                <source src="${file.src}"></source>
                            </video>
                            <div class="varoboba-seller-name">${sellerName}</div>
                        </media>
                    `
                    break

                default:
                    break
            }

            oneVaroboba.innerHTML = media
            oneVaroboba.appendChild(captions)

            varoboba.appendChild(oneVaroboba)            
        }                      

        const customButton = `<div><button id="seller-details-btn" class="lg-custom-button" style="padding: 0 5px; background: none; color: white; text-align: left; display: block; max-width: 100%; height: 20px; overflow: hidden; -webkit-text-stroke: 1px transparent; text-shadow: 0px 1px 4px black;">Seller details</button></div>`;

        varoboba.addEventListener("lgInit", (event) => {
            const pluginInstance = event.detail.instance;

            // Note append and find are not jQuery methods
            // These are utility methods provided by lightGallery
            const $toolbar = pluginInstance.outer.find(".lg-toolbar");
            $toolbar.append(customButton);

            console.log(pluginInstance.outer.find("#seller-details-btn").firstElement);

            pluginInstance.outer.find("#seller-details-btn").firstElement.addEventListener("click", async (e) => {
                // alert(e.target.getAttribute("seller-id"))

                const sellerId = e.target.getAttribute("seller-id")

                try {
                    const upToDateSellerInfos = await myFs.getSellerInfos(fsConfig.apiUrl, sellerId)

                    upToDateSellerInfos.sellerInfos.id = sellerId//important!!!
                
                    console.log(upToDateSellerInfos)
                
                    if(upToDateSellerInfos.ok) {
                        plugin1.closeGallery()

                        await navigation.push('seller-details', { data: upToDateSellerInfos.sellerInfos }) 
                    }
                    else {
                        await Toast.show({
                            text: `Impossible de récupérer des informations venant du serveur.`,
                        })
                    }
                }
                catch(err) {
                    console.error(err)
                    await Dialog.alert({
                        title: 'Erreur',
                        message: `Impossible de récupérer des informations venant du serveur.`,
                    })
                }
            });
        });        
            
        const plugin1 = lightGallery(varoboba, {
            selector: ".fs-media",
            plugins: [lgVideo, lgZoom, lgThumbnail],
            licenseKey: fsConfig.lightGallery.licenseKey,
            videojs: true,
            videojsOptions: {
                muted: false,
            },
            speed: 500,
        });        

        varoboba.addEventListener("lgBeforeOpen", () => {
            fsGlobalVariable.ionBackButtonHandler.canProcessNextHandler = false
            fsGlobalVariable.ionBackButtonHandler.fn = async () => {
                plugin1.closeGallery()
            }
        })

        varoboba.addEventListener("lgAfterAppendSubHtml", (event) =>{
            const sellerDetails = plugin1.outer.find(".lg-sub-html div[seller-id]")
            const sellerId = sellerDetails.firstElement.getAttribute("seller-id")
            const sellerName = sellerDetails.firstElement.getAttribute("seller-name")
            console.log(sellerId)

            plugin1.outer.find("#seller-details-btn").firstElement.setAttribute("seller-id", sellerId)
            plugin1.outer.find("#seller-details-btn").firstElement.innerHTML = sellerName
        })
    }
}

export { allVarobobaTemplate }