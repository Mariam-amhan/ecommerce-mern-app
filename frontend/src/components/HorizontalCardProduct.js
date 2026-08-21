import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayTurCurrency from "../helpers/DisplayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const LoadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    await fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

return (
  <div className="container mx-auto px-4 my-6 relative">
    <h2 className="font-semibold text-2xl py-4">{heading}</h2>

    {loading ? (
      <div
        className="flex items-center gap-4 md:gap-8 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
        {LoadingList.map((_, index) => (
          <div
            key={index}
            className="w-full min-w-[300px] md:min-w-[335px] h-36 bg-white rounded-sm shadow-md max-w-[280px] md:max-w-[320px] flex"
          >
            <div className="p-4 bg-slate-200 h-full min-w-[120px] md:min-w-[145px] animate-pulse"></div>
            <div className="p-4 grid w-full gap-2">
              <h2 className="font-medium text-base text-ellipsis line-clamp-1 md:text-lg text-black p-1 bg-slate-200 animate-pulse rounded-full"></h2>
              <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
              <div className="flex gap-3 w-full">
                <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                <p className="text-red-600 font-bold p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
              </div>
              <button className="text-sm text-white transition-all px-3 py-0.5 mt-2 w-full bg-slate-200 animate-pulse rounded-full"></button>
            </div>
          </div>
        ))}
      </div>
    ) : data.length === 0 ? (
      <p className="bg-white py-5">No product found</p>
    ) : (
      <div
        className="flex items-center gap-4 md:gap-8 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
        {data.map((product, index) => (
          <Link
            to={"product/" + product?._id}
            key={index}
            className="w-full min-w-[300px] md:min-w-[335px] h-36 bg-white rounded-sm shadow-md max-w-[280px] md:max-w-[320px] flex"
          >
            <div className="p-4 bg-slate-200 h-full min-w-[120px] md:min-w-[145px]">
              <img
                src={product.productImage[0]}
                className="object-scale-down h-full hover:scale-110 transition-all cursor-pointer"
              />
            </div>
            <div className="p-4 grid">
              <h2 className="font-medium text-base text-ellipsis line-clamp-1 md:text-lg text-black">
                {product?.productName}
              </h2>
              <p className="capitalize text-slate-500">{product?.category}</p>
              <div className="flex gap-3">
                <p className="text-slate-500 line-through">
                  {displayTurCurrency(product?.price)}
                </p>
                <p className="text-red-600 font-bold">
                  {displayTurCurrency(product?.sellingPrice)}
                </p>
              </div>
              <button
                onClick={(e) => handleAddToCart(e, product?._id)}
                className="text-sm text-white bg-red-600 hover:bg-red-700 transition-all px-3 py-0.5 mt-2 rounded-full"
              >
                Add To Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>
);
};

export default HorizontalCardProduct;
