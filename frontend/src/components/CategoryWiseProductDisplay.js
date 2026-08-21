import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayTurCurrency from "../helpers/DisplayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";
import Context from "../context";
import scrollTop from "../helpers/scrollTop";

const  CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const LoadingList = new Array(13).fill(null);
  const {fetchUserAddToCart} = useContext(Context)

  const handleAddToCart = async(e,id) => {
   await addToCart(e,id)
   await fetchUserAddToCart()
  }



  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className=" container mx-auto px-4 my-6 relative">
      <h2 className="  font-semibold text-2xl py-4">{heading}</h2>

      <div className=" grid grid-cols-[repeat(auto-fit,minmax(300px,320px))]  md:gap-6  overflow-x-scroll scrollbar-none  transition-all" >
       
        {data.map((product, index) => {
          return (
            <Link
            to={"/product/"+product?._id}
              key={index}
              onClick={scrollTop}
              className=" w-full min-w-[300px] md:min-w-[335px] bg-white rounded-sm shadow-md  max-w-[280px] md:max-w-[320px] "
            >
              <div className=" p-4 bg-slate-200 h-48 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                <img
                  src={product.productImage[0]}
                  className=" object-scale-down h-full hover:scale-110 transition-all cursor-pointer mix-blend-multiply"
                />
              </div>
              <div className="p-4 grid  gap-3 ">
                <h2
                  className=" font-medium text-base text-ellipsis
             line-clamp-1 md:text-lg text-black "
                >
                  {product?.productName}
                </h2>
                <p className=" capitalize text-slate-500">
                  {product?.category}
                </p>
                <div className=" flex gap-3">
                  <p className=" text-slate-500 line-through">
                    {displayTurCurrency(product?.price)}
                  </p>
                  <p className=" text-red-600 font-bold ">
                    {displayTurCurrency(product?.sellingPrice)}
                  </p>
                </div>

                <button
                 onClick={(e)=>handleAddToCart(e,product?._id)}
                 className=" text-sm text-white bg-red-600 hover:bg-red-700 transition-all px-3 py-1.5 mt-2  rounded-full ">
                  Add To Cart
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
