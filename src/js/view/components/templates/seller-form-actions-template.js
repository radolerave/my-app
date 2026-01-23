
let sellerFormActionsTemplate = {
    name: "seller-form-actions-template",
    content: /*html*/`
        <div id="seller-form-actions" class="ion-text-center">
            <ion-button id="editMyAccountData" fill="outline" color="success" class="ion-hide" size="small"><ion-icon name="create-outline"></ion-icon></ion-button>
            <ion-button id="undoMyAccountData" fill="outline" color="success" class="ion-hide" size="small"><ion-icon name="arrow-undo-outline"></ion-icon></ion-button>
            <ion-button id="saveMyAccountData" fill="outline" color="primary" class="ion-hide" size="small"><ion-icon name="save-outline"></ion-icon></ion-button>
            <ion-button id="lockMyAccountData" fill="outline" color="primary" class="ion-hide" size="small"><ion-icon name="lock-closed-outline"></ion-icon></ion-button>
            <ion-button id="helpMyAccountData" fill="outline" color="secondary" class="" size="small"><ion-icon name="help-outline"></ion-icon></ion-button>

            <ion-text id="my_account_manipulation_instructions" class="ion-hide">
                <ion-text>Date de dernière modification : <span id="last_edit"></span></ion-text>
                <hr>
                <ion-icon name="create-outline"></ion-icon> pour activer la modification.<br>
                <ion-icon name="save-outline"></ion-icon> pour enregistrer les modifications.<br>
                <ion-icon name="arrow-undo-outline"></ion-icon> pour annuler toutes les modifications.<br>
                <ion-icon name="lock-closed-outline"></ion-icon> pour vérouiller la modification.<ion-icon name="caret-up-outline"></ion-icon>
            </ion-text>
        </div>

        <style>
            #my_account_manipulation_instructions {
                margin-top: 5px;
                display: block;
                border: solid blue 1px;
                border-width: 0;
                box-shadow: 0 0 0.5em grey;
                text-align: justify;
            }
        </style>
    `,  
    logic: async (args) => {
        const mediaHelpBtn = document.querySelector("#helpMyAccountData")
        const myAccountManipulationInstructions = document.querySelector("#my_account_manipulation_instructions")

        myAccountManipulationInstructions.addEventListener("click", () => {
            mediaHelpBtn.click()
        })

        mediaHelpBtn.addEventListener("click", () => {
            myAccountManipulationInstructions.classList.toggle("ion-hide")

            // if(!myAccountManipulationInstructions.classList.contains("ion-hide")) {
            //     setTimeout(() => {
            //         myAccountManipulationInstructions.classList.add("ion-hide")
            //     }, 10000);
            // }
        })
    }
}

export { sellerFormActionsTemplate }