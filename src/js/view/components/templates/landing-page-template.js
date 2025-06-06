import { Dexie } from 'dexie'
import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { fsConfig } from './../../../config/fsConfig.js';
import FileTypeIdentifier from './../../../helpers/fileTypeIdentifier.js'
// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';

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

import { Dialog } from '@capacitor/dialog';
import { Toast } from '@capacitor/toast'


let landingPageTemplate = {
    name: "landing-page-template",
    content: /*html*/`
        <style>
            #main-content .swiper {
                /*width: 100%;*/
                /*height: 25vh;*/
                /*border: solid green 1px;*/
            }

            #main-content .swiper-slide {
                text-align: center;
                font-size: 18px;
                background: #fff;
                display: flex;
                justify-content: center;
                align-items: center;   
                height: 25vh;             
            }

            #main-content .swiper-slide media {                
                width: 100%;
                height: 100%;
            }

            #main-content .swiper-slide img, #main-content .swiper-slide video {
                display: block;
                object-fit: cover;
                border: solid grey 1px;
                border-radius: 5px;
                width: 100%;
                height: 100%;
            }

            #main-content .fs-slide {  
                /*border: solid red 1px;*/
                margin-bottom: 5px;
                padding: 10px 5px;
                background-color: white;
            }

            #main-content .varoboba-seller-name {
                position: absolute; 
                text-align: left;
                width: 130px;
                height: 15px;
                overflow: hidden;
                bottom:0; 
                left:0; 
                margin: 5px; 
                font-size: 0.7em; 
                color: white;
                -webkit-text-stroke: 1px transparent;
	            text-shadow: 0px 1px 4px black;
            }
        </style>

        <div id="fs-varoboba-slide" class="fs-slide">
            <ion-grid class="ion-no-padding">
                <ion-row class="ion-align-items-center">
                    <ion-col size="10">
                        <h5>Varoboba</h5>
                    </ion-col>

                    <ion-col size="2">
                        <ion-button id="all-varoboba" class="ion-no-margin" fill="clear" expand="block">
                            <ion-icon name="arrow-forward-outline" color="dark"></ion-icon>
                        </ion-button>
                    </ion-col>
                </ion-row>
                
            </ion-grid>
            
            <!-- Swiper -->
            <div class="swiper mySwiper">
                <div class="swiper-wrapper" id="swiper-wrapper-varoboba"></div>
            </div>
        </div>

        <ion-content>
            <div class="ion-margin">
                Bienvenue sur Find Seller !
            </div>
        </ion-content>
    `,
    logic: async () => {        
        let myFs = new Fs(FsDb, Dexie)
        let fileTypeIdentifier = new FileTypeIdentifier()
        const navigation = fsGlobalVariable.navigation

        const varoboba = document.querySelector("#swiper-wrapper-varoboba")

        const swiper = new Swiper(".mySwiper", {
            slidesPerView: (document.querySelector("#main-content").offsetWidth/150),
            spaceBetween: 5,
            freeMode: true,
        });

        // let files = await fetch(`https://server2.atria.local/findseller/dirTree.php?dirname=.\\files\\varoboba`)
        // files = await files.json()
  
        // console.log(files)    

        let formData = new FormData()

        formData.append("params", JSON.stringify({
            where: {
                enabled: 1,
                published: 1,
                type: 4//varoboba
            }
        }))

        let publicationsList = await fetch(`https://server2.atria.local/findseller/get_publications.php`, {
            method: 'POST',
            body: formData,
        })

        publicationsList = await publicationsList.json()
        publicationsList = publicationsList.records

        console.log(publicationsList)

        for(let i=0; i<publicationsList.length; i++) {
            let sellerName = publicationsList[i].name
            let file = publicationsList[i].publication.selectedMedias[0]
            let media    

            // Render the image in an 'img' element.
            const swiperSlide = document.createElement('a')
            swiperSlide.classList.add("swiper-slide")
            swiperSlide.setAttribute("href", file.src)

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

            swiperSlide.innerHTML = media
            swiperSlide.appendChild(captions)

            varoboba.appendChild(swiperSlide)            
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

        document.querySelector("#all-varoboba").addEventListener("click", async () => {
            await navigation.push("all-varoboba",  {
                publicationsList: publicationsList
            })
        })
    }
}

export { landingPageTemplate }