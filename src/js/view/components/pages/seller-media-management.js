import { mediaActionsTemplate } from './../templates/media-actions-template.js'

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

    <ion-content class="ion-text-center">
      ${mediaActionsTemplate.content}

      <div id="sellerMediaManagementContent">This is the content for my Seller media management.</div>
    </ion-content>

    <style>
      #sellerMediaManagementContent {
        /*border: solid red 1px;*/
        text-align: center;
        margin-top: 70px;
      }

      #sellerMediaManagementContent media {
        display: inline-block;
        margin: 2.5%;
        border: solid grey 1px;
        border-radius: 5px;
        max-width: 45%;
      }

      #sellerMediaManagementContent media img {
        border: solid transparent 1px;
        border-radius: 5px;
      }

      #sellerMediaManagementContent media video {
        border: solid transparent 1px;
        width: 100%;
        border-radius: 5px;
      }
    </style>
  `,
  logic: async (args) => {
    const myCloudName = "dtu8h2u98"
    const theTagName = "fs"
    const myUploadPreset = "ml_default"    

    let lightGalleryForImages, lightGalleryForVideos

    let renderMedia = async (myCloudName, theTagName) => {
      let imageList, videoList
      imageList = await fetch(`https://res.cloudinary.com/${myCloudName}/image/list/${theTagName}.json`)
      imageList = await imageList.json()
      console.log(imageList)

      imageList = imageList.resources

      videoList = await fetch(`https://res.cloudinary.com/${myCloudName}/video/list/${theTagName}.json`)
      videoList = await videoList.json()
      console.log(videoList)      

      videoList = videoList.resources

      document.querySelector("#sellerMediaManagementContent").innerHTML = `` 
      
      let imageCount = 0
      let videoCount = 0

      const imagesContainer = document.createElement('div')      
      imagesContainer.setAttribute("id", "images-container")

      const videosContainer = document.createElement('div')      
      videosContainer.setAttribute("id", "videos-container")

      for(let i=0; i<imageList.length; i++) {            
        const format = imageList[i].format

        if(["jpg", "jpeg", "png", "bmp"].includes(format)) {
          imageCount++

          const media = document.createElement('media')
          media.setAttribute("media-type", "image")

          imagesContainer.appendChild(media)

          if(imageCount > 2) {
            media.classList.add("ion-hide")
          }

          // Instantiate a CloudinaryImage object for the image with the public ID, 'cld-sample-5'.
          const myImage = cld.image(imageList[i].public_id); 

          media.setAttribute("data-src", myImage.toURL())

          // Resize to 250 x 250 pixels using the 'fill' crop mode.
          myImage.resize(fill().width(250).height(250));          
          
          // Render the image in an 'img' element.
          const imgElement = document.createElement('img');
          imgElement.setAttribute("public_id", imageList[i].public_id)
          imgElement.setAttribute("format", imageList[i].format)

          media.appendChild(imgElement)

          document.querySelector("#sellerMediaManagementContent").appendChild(imagesContainer)

          imgElement.src = myImage.toURL();
        }
      }  

      if(imageCount > 2) {
        let plusImages = document.createElement("ion-button")
        plusImages.setAttribute("id", "plusImages")
        plusImages.setAttribute("show-all", "false")
        plusImages.setAttribute("fill", "clear")
        plusImages.setAttribute("expand", "full")
        plusImages.setAttribute("color", "primary")
        plusImages.textContent = "Plus d'images ..."
        document.querySelector("#sellerMediaManagementContent").appendChild(plusImages)

        document.querySelector("#sellerMediaManagementContent").appendChild(document.createElement("br"))
      }

      lightGalleryForImages = lightGallery(document.getElementById('images-container'), {
        plugins: [lgZoom, lgThumbnail],
        licenseKey: 'ABE7EA7B-5B1E-47FE-B473-F5F98AE41D9A',
        speed: 500
      })

      for(let i=0; i<videoList.length; i++) {        
        const format = videoList[i].format        

        if(["webm", "ogg", "mp4"].includes(format)) {
          videoCount++

          const media = document.createElement('media')
          media.setAttribute("media-type", "video")

          videosContainer.appendChild(media)

          if(videoCount > 2) {
            media.classList.add("ion-hide")
          }

          const myVideo = cld.video(videoList[i].public_id); 

          media.setAttribute("data-video", JSON.stringify(
            {
              "source": [{
                "src": myVideo.toURL(),
                "type": `video/${format}`
              }],
              "attributes": {
                "preload": false,
                "playsinline": true,
                "controls": true
              }              
            }
          ))

          // Render the video in an 'video' element.
          const videoElement = document.createElement('video');
          videoElement.setAttribute("public_id", videoList[i].public_id)
          videoElement.setAttribute("format", videoList[i].format)
          // videoElement.setAttribute("controls", "true")

          const source = document.createElement("source")

          videoElement.appendChild(source)

          media.appendChild(videoElement)

          document.querySelector("#sellerMediaManagementContent").appendChild(videosContainer)

          source.src = myVideo.toURL();
        }
      }

      if(videoCount > 2) {
        let plusVideos = document.createElement("ion-button")
        plusVideos.setAttribute("id", "plusVideos")
        plusVideos.setAttribute("show-all", "false")
        plusVideos.setAttribute("fill", "clear")
        plusVideos.setAttribute("expand", "full")
        plusVideos.setAttribute("color", "primary")
        plusVideos.textContent = "Plus de vidéos ..."
        document.querySelector("#sellerMediaManagementContent").appendChild(plusVideos)
      }

      lightGalleryForVideos = lightGallery(document.getElementById('videos-container'), {
        plugins: [lgVideo],
        licenseKey: 'ABE7EA7B-5B1E-47FE-B473-F5F98AE41D9A',
        videojs: true,
        videojsOptions: {
            muted: false,
        },
      })

      let plusImagesBtn = document.querySelector("#plusImages")

      plusImagesBtn.addEventListener("click", (ev) =>{
        if(plusImagesBtn.getAttribute("show-all") == "false") {
          let medias = document.querySelectorAll("#sellerMediaManagementContent media[media-type='image']")

          medias.forEach((element, key) => {
            if(element.classList.contains("ion-hide") && element.getAttribute("media-type") == "image") {
              element.classList.remove("ion-hide")
              plusImagesBtn.setAttribute("show-all", "true")
              plusImagesBtn.textContent = "Moins d'images"
            }
          })
        }
        else if(plusImagesBtn.getAttribute("show-all") == "true") {
          let medias = document.querySelectorAll("#sellerMediaManagementContent media[media-type='image']")

          medias.forEach((element, key) => {
            if(key > 1) {
              if(!element.classList.contains("ion-hide") && element.getAttribute("media-type") == "image") {
                element.classList.add("ion-hide")
                plusImagesBtn.setAttribute("show-all", "false")
                plusImagesBtn.textContent = "Plus d'images ..."
              }
            }
          })
        }
      })

      let plusVideosBtn = document.querySelector("#plusVideos")

      plusVideosBtn.addEventListener("click", (ev) =>{
        if(plusVideosBtn.getAttribute("show-all") == "false") {
          let medias = document.querySelectorAll("#sellerMediaManagementContent media[media-type='video']")

          medias.forEach((element, key) => {
            if(element.classList.contains("ion-hide") && element.getAttribute("media-type") == "video") {
              element.classList.remove("ion-hide")
              plusVideosBtn.setAttribute("show-all", "true")
              plusVideosBtn.textContent = "Moins de vidéos"
            }
          })
        }
        else if(plusVideosBtn.getAttribute("show-all") == "true") {
          let medias = document.querySelectorAll("#sellerMediaManagementContent media[media-type='video']")

          medias.forEach((element, key) => {
            if(key > 1) {
              if(!element.classList.contains("ion-hide") && element.getAttribute("media-type") == "video") {
                element.classList.add("ion-hide")
                plusVideosBtn.setAttribute("show-all", "false")
                plusVideosBtn.textContent = "Plus de vidéos ..."
              }
            }
          })
        }
      })
    }

    // Create a Cloudinary instance and set your cloud name.    
    const cld = new Cloudinary({
      cloud: {
        cloudName: myCloudName
      }
    });    

    await renderMedia(myCloudName, theTagName)

    mediaActionsTemplate.logic({
      myCloudName: myCloudName,
      theTagName: theTagName,
      myUploadPreset: myUploadPreset,
      allMylightGalleries: [lightGalleryForImages, lightGalleryForVideos]
    })
  }
}

  export { sellerMediaManagement }