<#macro about>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js" charset="utf-8"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/js/all.min.js" charset="utf-8"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"
            charset="utf-8"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">
    <link rel="stylesheet" href="style.css">
    <style>

        .box1 {

            width: 80%; /* Ширина блока */
            padding: 0px; /* Поля */

        }

        body1 {
            background: #e8e8e8;
            min-height: 100vh;
            display: flex;
            align-items: center;
        }


        .services-section {
            width: 80%;
        }

        .inner-width {
            max-width: 50%;
            max-height: 30%;
            margin-bottom: 20%;
            margin-left: 32%;
            margin-top: 10%;
            padding: 20 20px;
        }

        .services-section h1 {
            text-align: center;
            font-size: 3%;
            font-weight: 20;
            margin-bottom: 15%;
        }

        .services-section h1 strong {
            color: dodgerblue;
        }

        .service {
            text-align: center;
            margin: 20px 0;
        }

        .service-icon {
            width: 60px;
            height: 60px;
            margin: auto;
            background: #ecf6ff;
            border-radius: 100%;
            color: dodgerblue;
            line-height: 60px;
            font-size: 25px;
        }

        .service-name {
            font-weight: 500;
            font-size: 18px;
            margin: 5px 0;
        }

        .service-desc {
            max-width: 300px;
            margin-bottom: -5%;
            color: #333;
            font-size: 14px;
        }

        .owl-dots {
            text-align: center;
            margin-top: 40px;
        }

        .owl-dot {
            width: 14px;
            height: 14px;
            background: #808080 !important;
            margin: 0 6px;
            border-radius: 14px;
            outline: none;
            transition: .3s linear;
        }

        .owl-dot.active {
            width: 36px;
            background: dodgerblue !important;
        }

        .owl-dot:hover {
            width: 36px;
            background: #0366d6 !important;
        }

        #footer {
            position: absolute; /* Фиксированное положение */
            bottom: -30%; /* Левый нижний угол */
            left: 0%;


        }

    </style>
    <section class="services-section" width="20" id="footer">
        <div class="inner-width">
            <h1><strong> </strong></h1>
            <div class="services owl-carousel">

                <div class="service">
                    <div class="service-icon">
                        <i class="fas fa-database  fa-xs"></i>
                    </div>
                    <div class="service-name"> Database</div>
                    <div class="service-desc"> PostgresSql, Spring Jpa</div>
                </div>

                <div class="service">
                    <div class="service-icon service-sm">
                        <i class="fas fa-code  fa-xs"></i>
                    </div>
                    <div class="service-name">Framework</div>
                    <div class="service-desc"> Spring Boot</div>
                </div>


                <div class="service">
                    <div class="service-icon">
                        <i class="fas fa-paint-brush fa-xs"></i>
                    </div>
                    <div class="service-name">Design</div>
                    <div class="service-desc"> Bootstrap, JS, HTML CSS</div>
                </div>


                <div class="service">
                    <div class="service-icon">
                        <i class="fas fa-envelope  fa-xs"></i>
                    </div>
                    <div class="service-name">Contact Info</div>
                    <div class="service-desc">myEmail@gmail.com</div>
                </div>

                <div class="service">
                    <div class="service-icon">
                        <i class="fas fa-brain  fa-xs"></i>
                    </div>
                    <div class="service-name">Director</div>
                    <div class="service-desc"> My Brain</div>
                </div>

                <div class="service">
                    <div class="service-icon">
                        <i class="fas fa-clock  fa-xs"></i>
                    </div>
                    <div class="service-name">Time</div>
                    <div class="service-desc">WorldTime API</div>
                </div>
            </div>
        </div>
    </section>

    <script>
        $(".services").owlCarousel({
            margin: 0,

            loop: true,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });
    </script>





</#macro>