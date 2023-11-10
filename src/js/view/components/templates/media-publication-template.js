import { Dexie } from 'dexie'
import FsDb from './../../../model/model.js'
import Fs from './../../../controller/controller.js'

let mediaPublicationTemplate = {
    name: "media-publication-template",
    content: /*html*/`
        <div id="text-editor"></div>

        <div id="addMedias">
            <ion-button id="addMediasBtn" expand="block">
                <ion-icon name="add-outline"></ion-icon> Ajouter médias
            </ion-button>
        </div>
        
        <div id="media-list"></div>        

        <style>

        </style>
    `,  
    logic: async (args) => {
        let myFs = new Fs(FsDb, Dexie)

        console.log(args)    

        const navigation = document.querySelector("ion-app ion-nav#navigation")
        navigation.removeEventListener("ionNavDidChange", args.listener)

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

        let quill = new Quill('#text-editor', {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        })

        if(typeof args.currentPage.params == "undefined") {
            args.currentPage.params = {}
            args.currentPage.params.selectedMedias = []
        }

        const selectedMedias = args.currentPage.params.selectedMedias

        selectedMedias.forEach((element, key) => {
            const copyOfTheElement = document.importNode(element, true)
            document.querySelector("#media-list").appendChild(copyOfTheElement)
        });

        const publish = document.querySelector("media-publication #publish")

        if(selectedMedias.length > 0) {
            if(publish.classList.contains("ion-hide")) {
                publish.classList.remove("ion-hide")
            }
        }

        publish.addEventListener("click", () => {
            alert('xou')
        })

        quill.on('editor-change', function(eventName, ...args) {
            // if (eventName === 'text-change') {
            //   console.log('text-change', args)
            // } else if (eventName === 'selection-change') {
            //     console.log('selection-change', args)
            // }

            // const content = quill.getContents()

            // console.log(content)

            if(quill.getText() === "\n" && quill.getLength() == 1 && selectedMedias.length == 0) {
                if(!publish.classList.contains("ion-hide")) {
                    publish.classList.add("ion-hide")
                }
            }
            else {
                if(publish.classList.contains("ion-hide")) {
                    publish.classList.remove("ion-hide")
                }
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