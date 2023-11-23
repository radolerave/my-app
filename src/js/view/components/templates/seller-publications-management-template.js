import { sellerPublicationCardTemplate } from './../templates/seller-publication-card-template.js'

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
        
        const publicationsList = document.querySelector("#publicationsList")
        const navigation = document.querySelector("ion-app ion-nav#navigation")        

        if(response.ok) {
            publicationsList.innerHTML = ""

            response.records.forEach(async (value, key) => {
                const card = document.createElement("div")

                card.innerHTML = await sellerPublicationCardTemplate.logic(value)

                publicationsList.appendChild(card)
            })
        }
        else {
            await Dialog.alert({
                "title": `Erreur`,
                "message": `${response.errorText}`
            })
        }
    }
}

export { sellerPublicationsManagementTemplate }