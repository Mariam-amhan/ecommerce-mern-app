import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayTurCurrency from "../helpers/DisplayCurrency";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImage, setZoomImage] = useState(false);
  const {fetchUserAddToCart} = useContext(Context)
  const navigate = useNavigate()

  const handleAddToCart = async(e,id) => {
   await addToCart(e,id)
   await fetchUserAddToCart()
  }
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });

  const fetchProductDetails = async () => {
    setLoading(true);

    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });

    setLoading(false);
    const dataResponse = await response.json();

    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
  };


  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }


const handleBuyProduct = async () => {
  await addToCart(null, data?._id);
  await fetchUserAddToCart();
  navigate("/cart");
};

  return (
    <div className=" container mx-auto p-4">
      <div className=" min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/** product image */}
        <div className=" h-96 flex flex-col lg:flex-row-reverse gap-4 justify-center items-center">
          <div className=" lg:h-96 lg:w-96 h-[300px] w-[400px] bg-slate-200 relative ">
            <img
              src={activeImage}
              className=" h-full w-full object-scale-down mix-blend-multiply "
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />
            {/** produc image zoom */}

            {zoomImage && (
              <div className=" hidden lg:block absolute min-w-[400px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[410px] top-0">
                <div
                  className=" w-full h-full mix-blend-multiply min-h-[400px] min-w-[400px] "
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className=" h-full">
            {loading ? (
              <div className=" flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el) => {
                  return (
                    <div
                      className=" h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={"loadingImage"}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className=" flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgURL, index) => {
                  return (
                    <div
                      className=" h-20 w-20 bg-slate-200 rounded p-1"
                      key={imgURL}
                    >
                      <img
                        src={imgURL}
                        className=" h-full w-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/** product details */}
        <div className=" flex flex-col gap-1">
          <p className=" bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
            {data?.brandName}
          </p>
          <h2 className=" text-2xl font-medium">{data?.productName}</h2>
          <p className=" capitalize text-slate-400">{data?.category}</p>

          <div className=" text-red-600 flex items-center gap-1">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
          </div>

          <div className=" flex items-center gap-2 text-xl font-medium my-1">
            <p className=" text-slate-400 line-through">
              {displayTurCurrency(data?.price)}
            </p>
            <p className=" text-red-600">
              {displayTurCurrency(data?.sellingPrice)}
            </p>
          </div>

          <div className=" flex items-center gap-2">
            <button onClick={handleBuyProduct} className=" rounded  border-2 p-2 border-red-600 text-red-500 min-w-[150px] hover:bg-red-700 transition-all hover:text-white">
              Buy
            </button>
            <button
            onClick={(e)=>handleAddToCart(e,data?._id)}
             className=" rounded  border-2 bg-red-600 font-medium  border-red-600 p-2 text-white min-w-[150px] hover:bg-red-700 transition-all hover:text-white">
              Add To Cart
            </button>
          </div>

          <div>
            <p className=" text-slate-600 font-medium my-1">description : </p>
            <p>{data?.description}</p>
          </div>
        </div>
      </div>


      {
        data.category && (

          <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Product"} />
        )
      }


    </div>



  );
};

export default ProductDetails;
