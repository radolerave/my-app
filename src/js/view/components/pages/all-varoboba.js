import { allVarobobaTemplate } from './../templates/all-varoboba-template.js'

let varoboba = {
    name: "all-varoboba",
    content: /*html*/`
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>

                <ion-title>Varoboba</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            ${allVarobobaTemplate.content}
        </ion-content>
    `,
    logic: async () => {
        const navigation = fsGlobalVariable.navigation

        const listener = async () => {
            let currentPage = await navigation.getActive()

            // console.log(currentPage)

            if(currentPage.component == "all-varoboba") {
                await allVarobobaTemplate.logic({"currentPage": currentPage, "listener": listener})
            }
        }        

        navigation.addEventListener('ionNavDidChange', listener)
    }
}

export { varoboba }