// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';

// Import the Cloudinary class.
import {Cloudinary} from "@cloudinary/url-gen";

// Import any actions required for transformations.
import {fill} from "@cloudinary/url-gen/actions/resize";

let landingPage = {
    name: "landing-page-template",
    content: /*html*/`
        <style>
            #main-content .swiper {
                width: 100%;
                height: 25vh;
                /*border: solid green 1px;*/
            }

            #main-content .swiper-slide {
                text-align: center;
                font-size: 18px;
                background: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                border: solid grey 1px;
                border-radius: 5px;
            }

            #main-content .swiper-slide img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            #main-content .fs-slide {  
                /*border: solid red 1px;*/
                margin-bottom: 5px;
                padding: 10px 5px;
                background-color: white;
            }
        </style>

<button id="upload_widget" class="cloudinary-button">Upload files</button>

        <div id="fs-varoboba-slide" class="fs-slide">
            <ion-grid class="ion-no-padding">
                <ion-row class="ion-align-items-center">
                    <ion-col size="10"><h5>Varoboba</h5></ion-col>
                    <ion-col size="2"><ion-button class="ion-no-margin" fill="clear" expand="block"><ion-icon name="arrow-forward-outline" color="dark"></ion-icon></ion-button></ion-col>
                </ion-row>
                
            </ion-grid>
            
            <!-- Swiper -->
            <div class="swiper mySwiper">
                <div class="swiper-wrapper" id="swiper-wrapper-varoboba"></div>
            </div>
        </div>

        <div id="fs-en-vogue-slide" class="fs-slide">
            <ion-grid class="ion-no-padding">
                <ion-row class="ion-align-items-center">
                    <ion-col size="10"><h5>En vogue</h5></ion-col>
                    <ion-col size="2"><ion-button class="ion-no-margin" fill="clear" expand="block"><ion-icon name="arrow-forward-outline" color="dark"></ion-icon></ion-button></ion-col>
                </ion-row>
                
            </ion-grid>
            
            <!-- Swiper -->
            <div class="swiper mySwiper">
                <div class="swiper-wrapper" id="swiper-wrapper-envogue"></div>
            </div>
        </div>

        <div id="fs-new-seller-slide" class="fs-slide">
            <ion-grid class="ion-no-padding">
                <ion-row class="ion-align-items-center">
                    <ion-col size="10"><h5>Nouveaux</h5></ion-col>
                    <ion-col size="2"><ion-button class="ion-no-margin" fill="clear" expand="block"><ion-icon name="arrow-forward-outline" color="dark"></ion-icon></ion-button></ion-col>
                </ion-row>
                
            </ion-grid>
            
            <!-- Swiper -->
            <div class="swiper mySwiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">Slide 1</div>
                    <div class="swiper-slide">Slide 2</div>
                    <div class="swiper-slide">Slide 3</div>
                    <div class="swiper-slide">Slide 4</div>
                    <div class="swiper-slide">Slide 5</div>
                    <div class="swiper-slide">Slide 6</div>
                    <div class="swiper-slide">Slide 7</div>
                    <div class="swiper-slide">Slide 8</div>
                    <div class="swiper-slide">Slide 9</div>
                </div>
            </div>
        </div>

        <div id="fs-recently-viewed-slide" class="fs-slide">
            <ion-grid class="ion-no-padding">
                <ion-row class="ion-align-items-center">
                    <ion-col size="10"><h5>Vu récemment</h5></ion-col>
                    <ion-col size="2"><ion-button class="ion-no-margin" fill="clear" expand="block"><ion-icon name="arrow-forward-outline" color="dark"></ion-icon></ion-button></ion-col>
                </ion-row>
                
            </ion-grid>
            
            <!-- Swiper -->
            <div class="swiper mySwiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">Slide 1</div>
                    <div class="swiper-slide">Slide 2</div>
                    <div class="swiper-slide">Slide 3</div>
                    <div class="swiper-slide">Slide 4</div>
                    <div class="swiper-slide">Slide 5</div>
                    <div class="swiper-slide">Slide 6</div>
                    <div class="swiper-slide">Slide 7</div>
                    <div class="swiper-slide">Slide 8</div>
                    <div class="swiper-slide">Slide 9</div>
                </div>
            </div>
        </div>
    `,
    logic: async () => {
        let myWidget = window.cloudinary.createUploadWidget({
            cloudName: 'dtu8h2u98', 
            uploadPreset: 'ml_default',
            prepareUploadParams: (cb, params) => {
                params = { tags : ["fs"] }

                cb(params)
            }
            // cropping: true
        }, 
            (error, result) => { 
              if (!error && result && result.event === "success") { 
                console.log('Done! Here is the media info: ', result.info); 
              }
            }
        )
          
          document.getElementById("upload_widget").addEventListener("click", function(){
              myWidget.open();
            }, false);


        const swiper = new Swiper(".mySwiper", {
            slidesPerView: 3,
            spaceBetween: 5,
            freeMode: true,
        });

        // Create a Cloudinary instance and set your cloud name.
        const cld = new Cloudinary({
            cloud: {
                cloudName: 'dtu8h2u98'
            }
        });

        for(let i=0; i<6; i++) {
            // Instantiate a CloudinaryImage object for the image with the public ID, 'cld-sample-5'.
            const myImage = cld.image('cld-sample-' + i); 

            // Resize to 250 x 250 pixels using the 'fill' crop mode.
            myImage.resize(fill().width(150).height(150));

            // Render the image in an 'img' element.
            const swiperSlide = document.createElement('div')
            swiperSlide.classList.add("swiper-slide")

            const imgElement = document.createElement('img');
            swiperSlide.appendChild(imgElement);

            document.querySelector("#swiper-wrapper-varoboba").appendChild(swiperSlide)

            imgElement.src = myImage.toURL();
        }       
        
        let data = await fetch("https://res.cloudinary.com/dtu8h2u98/image/list/fs.json")
        data = await data.json()
        // console.log(data)

        let mediaList = data.resources

        console.log(mediaList)

        for(let i=0; i<mediaList.length; i++) {
            // Instantiate a CloudinaryImage object for the image with the public ID, 'cld-sample-5'.
            const myImage = cld.image(mediaList[i].public_id); 

            // Resize to 250 x 250 pixels using the 'fill' crop mode.
            myImage.resize(fill().width(150).height(150));

            // Render the image in an 'img' element.
            const swiperSlide = document.createElement('div')
            swiperSlide.classList.add("swiper-slide")

            const imgElement = document.createElement('img');
            swiperSlide.appendChild(imgElement);

            document.querySelector("#swiper-wrapper-envogue").appendChild(swiperSlide)

            imgElement.src = myImage.toURL();
        }    
    }
}

export { landingPage }