// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';

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

        <div id="fs-varoboba-slide" class="fs-slide">
            <ion-grid class="ion-no-padding">
                <ion-row class="ion-align-items-center">
                    <ion-col size="10"><h5>Varoboba</h5></ion-col>
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

        <div id="fs-en-vogue-slide" class="fs-slide">
            <ion-grid class="ion-no-padding">
                <ion-row class="ion-align-items-center">
                    <ion-col size="10"><h5>En vogue</h5></ion-col>
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
    logic: () => {
        const swiper = new Swiper(".mySwiper", {
            slidesPerView: 3,
            spaceBetween: 5,
            freeMode: true,
        });

    }
}

export { landingPage }