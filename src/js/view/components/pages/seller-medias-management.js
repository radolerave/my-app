import { mediaActionsTemplate } from './../templates/media-actions-template.js'
import { fsConfig } from './../../../config/fsConfig.js';
import FileTypeIdentifier from './../../../helpers/fileTypeIdentifier.js'
import FsImageManipulations from './../../../helpers/imageManipulations.js'

import "lightgallery/css/lightGallery-bundle.css"

import lightGallery from 'lightgallery';

// Plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgVideo from 'lightgallery/plugins/video'

let sellerMediasManagement = {
  name: "seller-medias-management",
  content: /*html*/`
    <ion-header>
      <ion-toolbar>
          <ion-buttons slot="start">
              <ion-back-button></ion-back-button>
          </ion-buttons>

          <ion-title>Medias management</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-text-center">
      <div id="uppy-dashboard" class="ion-hide">
        <ion-button id="close-uppy" expand="full">Fermer</ion-button>

        <div id="uppy-dashboard-content"></div>
      </div>

      ${mediaActionsTemplate.content}

      <div id="sellerMediaManagementContent">This is the content for my Seller media management. Wait a moment please ...</div>
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
        vertical-align: top;
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
  logic: async () => {
    let fileTypeIdentifier = new FileTypeIdentifier()
    // let fsImageManipulations = new FsImageManipulations()    
    
    // console.log(fsGlobalVariable)
    let lightGalleryForImages, lightGalleryForVideos

    let renderMedia = async () => {
      let imageList = [], videoList = []

      try {        
        let files = await fetch(`https://server2.atria.local/findseller/dirTree.php?dirname=.\\files\\${fsGlobalVariable.session.seller_id}`)
        files = await files.json()
  
        console.log(files)
  
        for(let i=0; i<files.length; i++) {
          let file = files[i]
          file.infos.format = file.infos.extension
  
          switch(fileTypeIdentifier.identify(file.infos.mime_type)) {
            case "image": imageList.push(file)
              break;
  
            case "video": videoList.push(file)
              break;
  
            default://other files
              break;
          }
        }
  
        console.log(imageList, videoList)
      }
      catch(err) {
        console.log(err)
      }

      document.querySelector("#sellerMediaManagementContent").innerHTML = `` 
      
      let imageCount = 0
      let videoCount = 0

      const imagesContainer = document.createElement('div')      
      imagesContainer.setAttribute("id", "images-container")

      const videosContainer = document.createElement('div')      
      videosContainer.setAttribute("id", "videos-container")

      for(let i=0; i<imageList.length; i++) {            
        const format = imageList[i].infos.format

        if(["jpg", "jpeg", "png", "bmp"].includes(format)) {
          imageCount++

          const media = document.createElement('media')
          media.setAttribute("media-type", "image")
          media.setAttribute("format", format)
          media.setAttribute("uid", `i${i}`)
          media.setAttribute("public_id", imageList[i].infos.url)
          media.setAttribute("basename", imageList[i].infos.basename)

          imagesContainer.appendChild(media)

          if(imageCount > 2) {
            media.classList.add("ion-hide")
          }



          media.setAttribute("data-src", imageList[i].infos.url)                        
          
          // Render the image in an 'img' element.
          const imgElement = document.createElement('img');

          // const virtualImgElement = document.createElement('img');
          // virtualImgElement.src = await fsImageManipulations.loadImageFromBlob(imageList[i].infos.url)
          

          imgElement.setAttribute("public_id", imageList[i].infos.url)
          imgElement.setAttribute("format", imageList[i].infos.format)

          media.appendChild(imgElement)

          document.querySelector("#sellerMediaManagementContent").appendChild(imagesContainer)

          // const resizedImage = await fsImageManipulations.resizeImage(virtualImgElement, 250)  
          // imgElement.src = resizedImage;

          imgElement.src = imageList[i].infos.url;
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
        licenseKey: fsConfig.lightGallery.licenseKey,
        speed: 500
      })

      for(let i=0; i<videoList.length; i++) {        
        const format = videoList[i].infos.format        

        if(["webm", "ogg", "mp4"].includes(format)) {
          videoCount++

          const media = document.createElement('media')
          media.setAttribute("media-type", "video")
          media.setAttribute("format", format)
          media.setAttribute("uid", `v${i}`)
          media.setAttribute("public_id", videoList[i].infos.url)
          media.setAttribute("basename", videoList[i].infos.basename)

          videosContainer.appendChild(media)

          if(videoCount > 2) {
            media.classList.add("ion-hide")
          }

          media.setAttribute("data-video", JSON.stringify(
            {
              "source": [{
                "src": videoList[i].infos.url,
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
          videoElement.setAttribute("public_id", videoList[i].infos.url)
          videoElement.setAttribute("format", format)
          // videoElement.setAttribute("controls", "true")

          const source = document.createElement("source")

          videoElement.appendChild(source)

          media.appendChild(videoElement)

          document.querySelector("#sellerMediaManagementContent").appendChild(videosContainer)

          source.src = videoList[i].infos.url;
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
        licenseKey: fsConfig.lightGallery.licenseKey,
        videojs: true,
        videojsOptions: {
            muted: false,
        },
      })

      let plusImagesBtn = document.querySelector("#plusImages")

      if(plusImagesBtn != null) {
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
      }

      let plusVideosBtn = document.querySelector("#plusVideos")

      if(plusVideosBtn != null) {
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
    } 

    try {
      await renderMedia()
    }
    catch(err) {
      console.log(err)
    }

    mediaActionsTemplate.logic({
      allMylightGalleries: [lightGalleryForImages, lightGalleryForVideos],
      renderMedia: async () => {
        try {
          await renderMedia()
        }
        catch(err) {
          console.log(err)
        }
      }
    })
  }
}

  export { sellerMediasManagement }