import React from "react";
import Link from "next/link";



const PlantList = () => {

    let imgList = [
        "https://user-images.githubusercontent.com/64571546/91794251-8cfd3080-ec55-11ea-94ac-0327ad8e7342.png",
        "https://user-images.githubusercontent.com/64571546/91794333-bf0e9280-ec55-11ea-9c99-f64545be4439.png",
        "https://user-images.githubusercontent.com/64571546/91794376-d8174380-ec55-11ea-9c2b-c3c0c9cff517.png",
        "https://user-images.githubusercontent.com/64571546/91794454-0c8aff80-ec56-11ea-8fac-5781c97b639e.png",
        "https://user-images.githubusercontent.com/64571546/91794562-4e1baa80-ec56-11ea-834d-ea0185ab7875.png",
        "https://user-images.githubusercontent.com/64571546/91794251-8cfd3080-ec55-11ea-94ac-0327ad8e7342.png",
        "https://user-images.githubusercontent.com/64571546/91794333-bf0e9280-ec55-11ea-9c99-f64545be4439.png",
        "https://user-images.githubusercontent.com/64571546/91794376-d8174380-ec55-11ea-9c2b-c3c0c9cff517.png",
        "https://user-images.githubusercontent.com/64571546/91794454-0c8aff80-ec56-11ea-8fac-5781c97b639e.png",
        "https://user-images.githubusercontent.com/64571546/91794562-4e1baa80-ec56-11ea-834d-ea0185ab7875.png",
        "https://user-images.githubusercontent.com/64571546/91794251-8cfd3080-ec55-11ea-94ac-0327ad8e7342.png",
        "https://user-images.githubusercontent.com/64571546/91794333-bf0e9280-ec55-11ea-9c99-f64545be4439.png"
    ];
    let imgmapping = imgList.map((url) =>
        <Link href='plant'>
            <div className="list">
                <img className="list__photo" width="250px" height="250px" src={url}  ></img >
                <div className="list__description">
                    <h3 >혁이</h3>
                    <span>테크토닉</span>
                </div>
            </div>
        </Link>
    );

    return (
        <div>
            <div className="navbar"></div>
            <div className="button">
                <Link href="/plantAdd">
                    <button className="create__button">Create</button>
                </Link>

            </div>
            <div className="lists">
                {imgmapping}
            </div>
            <style jsx>{`
            body{
                margin:0;
            }
            .navbar {
                background-color: greenyellow;
                height: 100px;
                margin-bottom: 20px;
            }
.lists{
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
  }
  .list{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 280px;
    height:250px;
    margin: 4px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .list__photo{
    max-width: 100%;
     max-height: 100%;
  }
  .list__description{
    align-items: center;
    position:absolute ;
     background-color: black;
      display: flex;
     flex-direction: column;
     justify-content: center;
     width: 100%;
     height: 100%;
         top: 0;
     left: 0;
     opacity: 0;
    transform: translateY(10px);
     transition: all 300ms ease-in;
  }
  
  .list:hover .list__description{
    opacity: 0.8;
  transform: translateY(0px);
  }
  .list__description h3{
  color: white;
  }
  .list__description h3:after{
  content: '';
  display: block;
  position: relative;
  left: 50%;
  margin-left: -12px;
  margin-top: 8px;
  width: 25px;
  height: 2px;
  background-color: var(--color-dark-white);
  }
  button{
  background-color: transparent;
  cursor: pointer;
  border: none;
  outline: none;
  ;
  }
  
  .button{
    text-align:center;
  }
  .create__button {
    color : black;
    font-size: 25px;
    font-weight: 700;
    margin : 34px;
    padding : 15px 20px;
    border: 3px solid grey;
    border-radius: 10px;
  }
            
            `}
            </style>
        </div>
    )

}

export default PlantList;