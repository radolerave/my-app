import { createGesture } from "@ionic/core" 

let mediaActionsTemplate = {
    name: "media-actions-template",
    content: /*html*/`
        <div id="media-actions">
            <ion-button id="upload_widget" color="dark" fill="outline"><ion-icon name="images-outline"></ion-icon></ion-button>

            <ion-button id="publish" color="tertiary" fill="outline" disabled="true"><ion-icon name="share-outline"></ion-icon></ion-button>

            <ion-button id="media_delete" color="danger" fill="outline" disabled="true"><ion-icon name="trash-outline"></ion-icon></ion-button>

            <ion-button id="media_help" color="secondary" fill="outline"><ion-icon name="help-outline"></ion-icon></ion-button>

            <ion-text id="media_manipulation_instructions" class="ion-hide">Sélectionnez le(s) média(s) en appuyant dessus de manière prolongée. <ion-icon name="caret-up-outline"></ion-icon></ion-text>
        </div>

        <style>
            seller-media-management #media-actions {
                border-bottom: solid grey 1px;
                box-shadow: 0 0 0.5em grey;
                border-width: 0;
                padding: 10px 10px;
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
            }
        </style>
    `,
    logic: async (args) => {
        const myCloudName = args.myCloudName
        const theTagName = args.theTagName
        const myUploadPreset = args.myUploadPreset
        const allMylightGalleries = args.allMylightGalleries

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
          
        document.getElementById("upload_widget").addEventListener("click", function(){
          myWidget.open();
        }, false);

        const mediaHelpBtn = document.querySelector("#media_help")
        const mediaManipilationInstructions = document.querySelector("#media_manipulation_instructions")

        mediaHelpBtn.addEventListener("click", () => {
            mediaManipilationInstructions.classList.toggle("ion-hide")

            if(!mediaManipilationInstructions.classList.contains("ion-hide")) {
                setTimeout(() => {
                    mediaManipilationInstructions.classList.add("ion-hide")
                }, 5000);
            }
        })

        mediaManipilationInstructions.addEventListener("click", () => {
            mediaHelpBtn.click()
        })

        let myMedias = document.querySelectorAll("seller-media-management #sellerMediaManagementContent media")

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

						if(myTimer < CONSIDER_AS_LONG_PRESS_IF_DURATION_IS_MORE_THAN) {//click
                            const numberOfSelectedMedias = document.querySelectorAll("seller-media-management #sellerMediaManagementContent media").length

                            if(numberOfSelectedMedias == 0) {
                                allMylightGalleries.forEach((el, index) => {
                                    el
                                })
                            }                            
                            else {
                                element.classList.toggle("media-selected")
                            }
                        }
                        else {//long press                            
                            const numberOfSelectedMedias = document.querySelectorAll("seller-media-management #sellerMediaManagementContent media").length

                            if(numberOfSelectedMedias == 0) {
                                allMylightGalleries.forEach((el, index) => {
                                    el
                                })
                            }                            
                            else {
                                try {
                                    allMylightGalleries.forEach((el, index) => {
                                        el.destroy()
                                    })
                                }
                                catch(err) {
                                    console.log("lightGallery already destroyed!!!!")
                                }
                                
                                element.classList.toggle("media-selected")
                            }
                        }
                    }
                }
            })

            gesture.enable();
        })
    }
}

export { mediaActionsTemplate }