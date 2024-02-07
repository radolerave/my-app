import { Dexie } from 'dexie'
import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'
import { fsConfig } from './../../../config/fsConfig.js'
import FsHelper from "../../../helpers/fsHelper.js"

import { Maskito, maskitoTransform } from '@maskito/core';
import { maskitoNumberOptionsGenerator, maskitoParseNumber } from '@maskito/kit';

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
                    <ion-input id="publication-validity-period" label="Validité : " min="1" placeholder="1" value="1"></ion-input>&nbsp;jours
                </ion-item>

                <ion-item>
                    <ion-text>Coût : <span id="cost-of-publication">1 FST</span></ion-text>
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
        const serverUrl = fsConfig.serverUrl
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

        const publicationValidityPeriodNativeEl = await publicationValidityPeriod.getInputElement()

        new Maskito(publicationValidityPeriodNativeEl, maskitoNumberOptionsGenerator({
            decimalSeparator: '.',
            thousandSeparator: ' ',
            precision: 0,
            max: 3650,
            min: 0,//will be valued as 1 in the cost calculation
        }))

        // Call this function when the element is detached from DOM
	    // maskedInput.destroy();

        const publicationRateInfos = await myFs.getPublicationRate(apiUrl)
        const costs = publicationRateInfos.publicationRate

        console.log(costs)

        function costCalculation() {
            let validity = publicationValidityPeriod.value

            validity = maskitoParseNumber(validity, '.')

            console.log(validity)

            if(isNaN(validity) || validity <= 0) {
                validity = 1
            }
            else {
                validity = parseInt(validity)
            }
            
            const rate = costs.find(element => element.id === parseInt(publicationType.value))
            const unitPrice = rate.unit_price
            const cost = unitPrice * validity

            costOfPublication.textContent = maskitoTransform((cost).toString(), maskitoNumberOptionsGenerator({ 
                decimalSeparator: '.',
                thousandSeparator: ' ',
                decimalZeroPadding: true,
                precision: 2, 
                postfix: ' FST',
            }))

            return cost
        }

        publicationType.addEventListener("ionChange", (e) => {
            costCalculation()
        })

        publicationValidityPeriod.addEventListener("ionInput", (e) => {
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

        async function publishFn() {
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
                throw new Error(response.errorText)                
            }
        }

        async function rollBack(paymentDetails) {//set credit_tokens to the previous value
            const resp = await myFs.getCreditTokensValue(apiUrl, fsGlobalVariable.session.seller_id)

            // console.log(resp)

            if(parseFloat(resp.creditTokens) != parseFloat(paymentDetails.credit)) {
                let finalData = {
                    credentials: {
                        "sellerId" : fsGlobalVariable.session.seller_id,
                        "email": fsGlobalVariable.session.email,
                        "password": fsGlobalVariable.session.password,
                        "accountId": fsGlobalVariable.session.id
                    },
                    updatedData: {
                        credit_tokens: paymentDetails.credit
                    }
                }                
    
                // console.log(finalData)            
    
                const response = await myFs.accountInfosUpdate(apiUrl, finalData) 
                
                if(!response.ok) {
                    await Dialog.alert({
                        "title": `Erreur`,
                        "message": `${response.errorText}`
                    })
                }
            }                        
        }

        async function backendPaymentOperation(paymentDetails) {
            console.log(paymentDetails)
            
            let paymentOk = false

            let formData = new FormData()

            formData.append("payment_details", JSON.stringify({
                "supposed_credit_tokens_value": paymentDetails.credit,
                "pub_cost": paymentDetails.pubCost,
                "id": fsGlobalVariable.session.seller_id
            }))
            
            try {
                const response = await fetch(`${serverUrl}/payment.php`, {
                    method: "POST",
                    body: formData,
                });

                if(response.ok) {
                    // console.log(response)
                    const result = await response.json();
                    // console.log(result);

                    if(result.ok) {
                        paymentOk = true
                    }
                    else {
                        throw new Error(result.message)
                    }
                }
                else {
                    throw new Error(response.message)
                }                                    
            } catch (error) {
                throw new Error(error)
            }

            return paymentOk
        }

        publish.addEventListener("click", async () => {
            publish.classList.add("ion-hide")

            const ct = await myFs.getCreditTokensValue(apiUrl, fsGlobalVariable.session.seller_id)
            let myCreditTokens = undefined

            if(typeof ct.creditTokens == "number") {
                myCreditTokens = ct.creditTokens
            }

            const cost = costCalculation()

            const paymentDetails = {
                "credit" : myCreditTokens,
                "pubCost" : cost
            }         
            
            if(operationType != "update") {//new publication
                if(parseFloat(myCreditTokens) < parseFloat(cost)) {
                    await Dialog.alert({
                        title: "Avertissement",
                        message: "Vous n'avez pas assez de crédits pour cette publication."
                    }) 
    
                    publish.classList.remove("ion-hide")
                }
                else {
                    const confirmation = await Dialog.confirm({
                        title: 'Confirmation de paiement',
                        message: `Le coût de cette publication est de : ${paymentDetails.pubCost} FST.\nVotre solde de crédit est de : ${paymentDetails.credit} FST\n\nVoulez-vous confirmer cette action ?`,
                        okButtonTitle: "oui",
                        cancelButtonTitle: "non",
                    })
        
                    if(confirmation.value) {
                        try {
                            if(await backendPaymentOperation(paymentDetails)) {
                                try {
                                    await publishFn()
                                }
                                catch(err) {
                                    //rollback ......
                                    await rollBack(paymentDetails)
                                    
                                    await Dialog.alert({
                                        title: "Erreur",
                                        message: "Une erreur s'est produite!\nLe paiement a été annulé."
                                    })                                    
                                }
                            }
                            else {
                                await Dialog.alert({
                                    title: "Erreur",
                                    message: "Une erreur s'est produite!\nLa publication est annulée."
                                })                                
                            }
                        }
                        catch(err) {
                            await Dialog.alert({
                                title: "Erreur",
                                message: err
                            }) 
                        }
                    }
                    else {
                        publish.classList.remove("ion-hide")
                        
                        await Toast.show({
                            text: `Action annulée!`
                        })
                    }
                }
            }
            else {                
                const confirmation = await Dialog.confirm({
                    title: 'Modification',
                    message: `Voulez-vous confirmer cette action ?`,
                    okButtonTitle: "oui",
                    cancelButtonTitle: "non",
                })
    
                if(confirmation.value) {
                    try {
                        await publishFn()
                    }
                    catch(err) {//no need to rollback
                        await Dialog.alert({
                            title: "Erreur",
                            message: err
                        }) 
                    }
                }
                else {
                    publish.classList.remove("ion-hide")
                }            
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