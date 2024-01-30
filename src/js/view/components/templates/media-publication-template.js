import { Dexie } from 'dexie'
import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { fsConfig } from './../../../config/fsConfig.js'
import FsHelper from "../../../helpers/fsHelper.js"

import { Dialog } from '@capacitor/dialog';
import { Toast } from '@capacitor/toast'

let mediaPublicationTemplate = {
    name: "media-publication-template",
    content: /*html*/`
        <ion-card id="publication-settings" disabled="true">
            <ion-card-content>
                <ion-radio-group id="publication-type" value="1">
                    <ion-grid class="">
                        <ion-row>
                            <ion-col class="ion-text-left" size="4">
                                <ion-radio value="1" label-placement="end">Publication</ion-radio>
                            </ion-col>
                            <ion-col class="ion-text-center" size="4">
                                <ion-radio value="2" label-placement="end">Annonce</ion-radio>
                            </ion-col>
                            <ion-col class="ion-text-right" size="4">
                                <ion-radio value="3" label-placement="end">Actualité</ion-radio>
                            </ion-col>
                        </ion-row>
                    </ion-grid>                    
                </ion-radio-group>

                <ion-item>
                    <ion-input id="publication-validity-period" label="Validité : " type="number" min="1" placeholder="1" value="1"></ion-input>&nbsp;jours
                </ion-item>

                <ion-item>
                    <ion-text>Coût : <span id="cost-of-publication">1</span> FST</ion-text>
                </ion-item>
            </ion-card-content>
        </ion-card>

        <div id="text-editor"></div>

        <div id="addMedias">
            <ion-button id="addMediasBtn" expand="block">
                [<ion-icon name="add-circle-outline"></ion-icon> Ajouter | <ion-icon name="close-circle-outline"></ion-icon> enlever] médias
            </ion-button>
        </div>
        
        <div id="media-list"></div>        

        <style>
            #text-editor {
                border: solid grey 1px;
                height: 40vh;
            }
        </style>
    `,  
    logic: async (args) => {
        const apiUrl = fsConfig.apiUrl
        let myFs = new Fs(FsDb, Dexie)
        let myFsHelper = new FsHelper()

        console.log(args)    

        const navigation = document.querySelector("ion-app ion-nav#navigation")
        navigation.removeEventListener("ionNavDidChange", args.listener)
        
        const publish = document.querySelector("media-publication #publish")
        const publicationSettings = document.querySelector("#publication-settings")
        const publicationType = document.querySelector("#publication-type")
        const publicationValidityPeriod = document.querySelector("#publication-validity-period")
        const costOfPublication = document.querySelector("#cost-of-publication")

        const publicationRateInfos = await myFs.getPublicationRate(apiUrl)
        const costs = publicationRateInfos.publicationRate

        console.log(costs)

        function costCalculation() {
            let validity = parseInt(publicationValidityPeriod.value)

            if(isNaN(parseInt(validity)) || parseInt(validity) <= 0) {
                validity = 1
            }
            
            const rate = costs.find(element => element.id === parseInt(publicationType.value))
            const cost = rate.unit_price

            costOfPublication.textContent = cost * validity
        }

        publicationType.addEventListener("ionChange", (e) => {
            costCalculation()
        })

        publicationValidityPeriod.addEventListener("ionInput", () => {
            costCalculation()
        })

        let toolbarOptions = [
            [{ 'header': 1 }, { 'header': 2 }], // custom button values
            [{ 'align': [] }],
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],              
            ['blockquote', 'code-block'],                                                                      
            // [{ 'direction': 'rtl' }],                         // text direction          
            // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],          
            // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            // [{ 'font': [] }],                      
            ['clean']                                         // remove formatting button
        ]

        fsGlobalVariable.quill = new Quill('#text-editor', {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        })

        if(typeof args.currentPage.params == "undefined") {
            args.currentPage.params = {}
            args.currentPage.params.selectedMedias = []
        }

        fsGlobalVariable.selectedMedias = args.currentPage.params.selectedMedias
        const publicationId = typeof args.currentPage.params.publicationId != "undefined" ? args.currentPage.params.publicationId : ""
        const operationType = typeof args.currentPage.params.operationType != "undefined" ? args.currentPage.params.operationType : ""
        const publicationTypeValue = typeof args.currentPage.params.publicationType != "undefined" ? args.currentPage.params.publicationType : 1
        const publicationValidityValue = typeof args.currentPage.params.publicationValidity != "undefined" ? args.currentPage.params.publicationValidity : 0
        let selectedMedias = fsGlobalVariable.selectedMedias
        const mediaList = document.querySelector("#media-list")
        let nbrOfSelectedMedias = selectedMedias.length

        if(operationType == "update") {
            publicationType.setAttribute("value", publicationTypeValue)
            publicationValidityPeriod.setAttribute("value", publicationValidityValue)
            
            costCalculation()

            console.log(publicationTypeValue)
        }
        else {
            publicationSettings.removeAttribute("disabled")
        }

        selectedMedias.forEach((element, key) => {
            const copyOfTheElement = document.importNode(element, true)

            const deleteBtn = document.createElement("ion-button")
            deleteBtn.innerHTML = `<ion-icon name="close-outline"></ion-icon> enlever`
            deleteBtn.setAttribute("color", "warning")
            copyOfTheElement.appendChild(deleteBtn)

            deleteBtn.addEventListener("click", () => {
                try {
                    document.querySelector(`seller-medias-management #sellerMediaManagementContent media[uid="${copyOfTheElement.getAttribute("uid")}"]`).classList.remove("media-selected")
                    nbrOfSelectedMedias -= 1
                    document.querySelector("#number-of-selected-media").textContent = nbrOfSelectedMedias                    
                }
                catch(err) {
                    // console.log(err)
                }

                deleteBtn.parentElement.remove()

                fsGlobalVariable.selectedMedias = document.querySelectorAll("media-publication #media-publication-content #media-list media")

                console.log(fsGlobalVariable)

                showHidePublishBtn()
            })

            mediaList.appendChild(copyOfTheElement)
        })        

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

        publish.addEventListener("click", async () => {
            alert("confirmer coût avant validation")

            publish.classList.add("ion-hide")
            
            let sMedias = []

            fsGlobalVariable.selectedMedias.forEach((element, index) => {
                sMedias.push({
                    mediaType: element.getAttribute("media-type"),
                    publicId: element.getAttribute("public_id"),
                    src: element.getAttribute("public_id"),
                    format: element.getAttribute("format")
                })
            })

            let finalData = {
                credentials: {
                    "sellerId" : fsGlobalVariable.session.seller_id,
                    "email": fsGlobalVariable.session.email,
                    "password": fsGlobalVariable.session.password,
                    "accountId": fsGlobalVariable.session.id
                },
                updatedData: {
                    seller_id: fsGlobalVariable.session.seller_id,
                    publication: JSON.stringify({
                        textToPublish: fsGlobalVariable.textToPublish,
                        selectedMedias: sMedias
                    }),
                    type: publicationType.value,
                    validity: publicationValidityPeriod.value
                },
                publicationId: publicationId
            }

            console.log(finalData)

            // console.log(fsGlobalVariable)

            let response

            switch(operationType) {
                case "update":
                    delete finalData.updatedData.type//will not be considered
                    delete finalData.updatedData.validity//will not be considered

                    response = await myFs.updatePublication(apiUrl, finalData)
                    break;

                default:
                    response = await myFs.newPublication(apiUrl, finalData)
                    break;
            }

            if(response.ok) {
                await navigation.popToRoot()
                await navigation.push("seller-publications-management")
            }
            else {
                await Dialog.alert({
                    "title": `Erreur`,
                    "message": `${response.errorText}`
                })
            }
        })

        fsGlobalVariable.quill.setContents(fsGlobalVariable.textToPublish)

        if(operationType != "update") { showHidePublishBtn() }

        fsGlobalVariable.quill.on('editor-change', function(eventName, ...args) {
            // if (eventName === 'text-change') {
            //   console.log('text-change', args)
            // } else if (eventName === 'selection-change') {
            //     console.log('selection-change', args)
            // }

            const content = fsGlobalVariable.quill.getContents()            

            if(eventName === 'text-change') { 
                console.log(content)
                fsGlobalVariable.textToPublish = content
                showHidePublishBtn() 
            }
        })

        const addMediasBtn = document.querySelector("#addMediasBtn")

        addMediasBtn.addEventListener("click", async () => {
            const previousPage = await navigation.getPrevious()

            console.log(previousPage)

            if(previousPage.component == "seller-medias-management") {
                await navigation.pop()
            }
            else {
                await navigation.push("seller-medias-management")
            }            
        })
    }
}

export { mediaPublicationTemplate }