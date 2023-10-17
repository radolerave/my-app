// Import the Cloudinary class.
import {Cloudinary} from "@cloudinary/url-gen";

// Import any actions required for transformations.
import {fill} from "@cloudinary/url-gen/actions/resize";

let sellerMediaManagement = {
  name: "seller-media-management",
  content: /*html*/`
    <ion-header>
      <ion-toolbar>
          <ion-buttons slot="start">
              <ion-back-button></ion-back-button>
          </ion-buttons>

          <ion-title>Seller media management</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding ion-text-center">
      <button id="upload_widget" class="cloudinary-button">Upload files</button>
      <div id="sellerMediaManagementContent">This is the content for my Seller media management.</div>
    </ion-content>

    <style>
      #sellerMediaManagementContent {
        margin-top: 15px;
        /*border: solid red 1px;*/
        text-align: center;
      }

      #sellerMediaManagementContent img {
        margin: 10px;
        border: solid grey 1px;
        border-radius: 5px;
      }
    </style>
  `,
  logic: async (args) => {
    const myCloudName = "dtu8h2u98"
    const theTagName = "fs"
    const myUploadPreset = "ml_default"

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

    let renderMedia = async (myCloudName, theTagName) => {
      let data = await fetch(`https://res.cloudinary.com/${myCloudName}/image/list/${theTagName}.json`)
      data = await data.json()
      console.log(data)

      document.querySelector("#sellerMediaManagementContent").innerHTML = ``

      let mediaList = data.resources

      console.log(mediaList)

      for(let i=0; i<mediaList.length; i++) {
        // Instantiate a CloudinaryImage object for the image with the public ID, 'cld-sample-5'.
        const myImage = cld.image(mediaList[i].public_id); 

        // Resize to 250 x 250 pixels using the 'fill' crop mode.
        myImage.resize(fill().width(150).height(267));

        // Render the image in an 'img' element.
        const imgElement = document.createElement('img');

        document.querySelector("#sellerMediaManagementContent").appendChild(imgElement)

        imgElement.src = myImage.toURL();
      }  
    }

    // Create a Cloudinary instance and set your cloud name.    
    const cld = new Cloudinary({
      cloud: {
        cloudName: myCloudName
      }
    });    

    await renderMedia(myCloudName, theTagName)
  }
}

  export { sellerMediaManagement }