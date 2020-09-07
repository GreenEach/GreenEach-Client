import React from "react";
import Nav from "../components/nav";
import Link from "next/link";
import Head from 'next/head';

const Plant = () => {

    return (
        <div >
            <Head>
                <script type="text/javascript" src="../script/plant.js"></script>
            </Head>
            <div>
                <div>
                    <h2>Slideshow Gallery</h2>
                    <div class="container">
                        <div class="mySlides">
                            <div class="numbertext">1 / 6</div>
                            <img src="https://user-images.githubusercontent.com/64571546/91794251-8cfd3080-ec55-11ea-94ac-0327ad8e7342.png" />
                        </div>

                        <div class="mySlides">
                            <div class="numbertext">2 / 6</div>
                            <img src="https://user-images.githubusercontent.com/64571546/91794333-bf0e9280-ec55-11ea-9c99-f64545be4439.png" />
                        </div>

                        <div class="mySlides">
                            <div class="numbertext">3 / 6</div>
                            <img src="https://user-images.githubusercontent.com/64571546/91794376-d8174380-ec55-11ea-9c2b-c3c0c9cff517.png" />
                        </div>

                        <div class="mySlides">
                            <div class="numbertext">4 / 6</div>
                            <img src="https://user-images.githubusercontent.com/64571546/91794454-0c8aff80-ec56-11ea-8fac-5781c97b639e.png" />
                        </div>

                        <div class="mySlides">
                            <div class="numbertext">5 / 6</div>
                            <img src="https://user-images.githubusercontent.com/64571546/91794562-4e1baa80-ec56-11ea-834d-ea0185ab7875.png" />
                        </div>

                        <div class="mySlides">
                            <div class="numbertext">6 / 6</div>
                            <img src="https://user-images.githubusercontent.com/64571546/91794251-8cfd3080-ec55-11ea-94ac-0327ad8e7342.png" />
                        </div>

                        <a class="prev" onclick="plusSlides(-1)">❮</a>
                        <a class="next" onclick="plusSlides(1)">❯</a>

                        <div class="caption-container">
                            <p id="caption"></p>
                        </div>

                        <div class="row">
                            <div class="column">
                                <img class="demo cursor" src="https://user-images.githubusercontent.com/64571546/91794251-8cfd3080-ec55-11ea-94ac-0327ad8e7342.png" onclick="currentSlide(1)" alt="The Woods" />
                            </div>
                            <div class="column">
                                <img class="demo cursor" src="https://user-images.githubusercontent.com/64571546/91794333-bf0e9280-ec55-11ea-9c99-f64545be4439.png" onclick="currentSlide(2)" alt="Cinque Terre" />
                            </div>
                            <div class="column">
                                <img class="demo cursor" src="https://user-images.githubusercontent.com/64571546/91794376-d8174380-ec55-11ea-9c2b-c3c0c9cff517.png" onclick="currentSlide(3)" alt="Mountains and fjords" />
                            </div>
                            <div class="column">
                                <img class="demo cursor" src="https://user-images.githubusercontent.com/64571546/91794454-0c8aff80-ec56-11ea-8fac-5781c97b639e.png" onclick="currentSlide(4)" alt="Northern Lights" />
                            </div>
                            <div class="column">
                                <img class="demo cursor" src="https://user-images.githubusercontent.com/64571546/91794562-4e1baa80-ec56-11ea-834d-ea0185ab7875.png" onclick="currentSlide(5)" alt="Nature and sunrise" />
                            </div>
                            <div class="column">
                                <img class="demo cursor" src="https://user-images.githubusercontent.com/64571546/91794251-8cfd3080-ec55-11ea-94ac-0327ad8e7342.png" onclick="currentSlide(6)" alt="Snowy Mountains" />
                            </div>
                        </div>
                    </div>



                </div>
                <Link href="/plantAdd">
                    <button>수정</button>
                </Link>
                <button>삭제</button>
            </div>

            <div>
                <div>
                    <input type="text" placeholder="comment" autoFocus></input>
                </div>

                <div>
                    <div>id</div>
                    <div>작성날짜</div>
                    <div>댓글내용</div>
                    {/* <img>대표이미지</img> */}
                    <button>댓글 삭제버튼</button>

                </div>
            </div>

            <style jsx>{`
            <style>  
            * {
              box-sizing: border-box;
            }
            
            img {
              vertical-align: middle;
              width:180px;
              height:180px;
            }
            
            /* Position the image container (needed to position the left and right arrows) */
            .container {
              position: relative;
            }
            
            /* Hide the images by default */
            .mySlides {
              display: none;
            }
            
            /* Add a pointer when hovering over the thumbnail images */
            .cursor {
              cursor: pointer;
            }
            
            /* Next & previous buttons */
            .prev,
            .next {
              cursor: pointer;
              position: absolute;
              top: 40%;
              width: auto;
              padding: 16px;
              margin-top: -50px;
              color: white;
              font-weight: bold;
              font-size: 20px;
              border-radius: 0 3px 3px 0;
              user-select: none;
              -webkit-user-select: none;
            }
            
            /* Position the "next button" to the right */
            .next {
              right: 0;
              border-radius: 3px 0 0 3px;
            }
            
            /* On hover, add a black background color with a little bit see-through */
            .prev:hover,
            .next:hover {
              background-color: rgba(0, 0, 0, 0.8);
            }
            
            /* Number text (1/3 etc) */
            .numbertext {
              color: #f2f2f2;
              font-size: 12px;
              padding: 8px 12px;
              position: absolute;
              top: 0;
            }
            
            /* Container for image text */
            .caption-container {
              text-align: center;
              background-color: #222;
              padding: 2px 16px;
              color: white;
            }
            
            .row:after {
              content: "";
              display: table;
              clear: both;
            }
            
            /* Six columns side by side */
            .column {
              float: left;
              width: 16.66%;
            }
            
            /* Add a transparency effect for thumnbail images */
            .demo {
              opacity: 0.6;
            }
            
            .active,
            .demo:hover {
              opacity: 1;
            }
            </style>
            `}

            </style>

        </div >
    )

}

export default Plant;