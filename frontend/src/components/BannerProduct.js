import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

import image1 from "../assets/banner/img1.webp";
import image2 from "../assets/banner/img2.webp";
import image3 from "../assets/banner/img3.jpg";
import image4 from "../assets/banner/img4.jpg";
import image5 from "../assets/banner/img5.webp";

import image1Mobile from "../assets/banner/img1_mobile.jpg";
import image2Mobile from "../assets/banner/img2_mobile.webp";
import image3Mobile from "../assets/banner/img3_mobile.jpg";
import image4Mobile from "../assets/banner/img4_mobile.jpg";
import image5Mobile from "../assets/banner/img5_mobile.png";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1, image2, image3, image4, image5];
  const mobailImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const nextImage = () => {
    if(desktopImages.length -1 > currentImage ){
      
      setCurrentImage((preve) => preve + 1);
    }
  };


  const preveImage = () => {
    if(currentImage !=0 ){
      
      setCurrentImage((preve) => preve - 1);
    }
  };


  useEffect(()=> {
    const interval = setInterval(() => {

      if(desktopImages.length -1 > currentImage ){
      
       nextImage()
      }else{
        setCurrentImage(0)
      }
      
    }, 5000);

    return() => clearInterval(interval)
  },[currentImage])


  return (
    <div className=" container mx-auto px-4 rounded mt-7 ">
      <div className=" h-60 md:h-72 w-full bg-slate-200 relative ">
        <div className=" absolute z-10 w-full h-full md:flex items-center hidden">
          <div className=" flex justify-between w-full text-3xl ">
            <button
            onClick={preveImage}
             className=" bg-white shadow-md rounded-full p-1 ">
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className=" bg-white shadow-md rounded-full p-1 "
            >
              <FaAngleRight />
            </button>
          </div>
        </div>



    {/** desktop and tablet version */}
        <div className="hidden md:flex h-full w-full overflow-hidden ">
          {desktopImages.map((imageURL, index) => {
            return (
              <div
                className=" w-full h-full min-w-full min-h-full transition-all   "
                key={imageURL}
                style={{
                  transform: `translateX(-${currentImage * 100}%)`,
                }}
              >
                <img src={imageURL} className=" w-full h-full" />
              </div>
            );
          })}
        </div>


          {/** mobile version */}

          <div className="flex h-full w-full overflow-hidden md:hidden ">
          {mobailImages.map((imageURL, index) => {
            return (
              <div
                className=" w-full h-full min-w-full min-h-full transition-all "
                key={imageURL}
                style={{
                  transform: `translateX(-${currentImage * 100}%)`,
                }}
              >
                <img src={imageURL} className=" w-full h-full" />
              </div>
            );
          })}
        </div>



      </div>
    </div>
  );
};

export default BannerProduct;
