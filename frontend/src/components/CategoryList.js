import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";
import LoadingGif from '../assets/loadingGif/loading.gif'

const CategoryList = ({heading}) => {
  const [categoryProduct, setCategoryProdcut] = useState([]);

  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProdcut(dataResponse.data);
  };
  useEffect(() => {
    fetchCategoryProduct();
  }, []);
  return (
    <div className=" container mx-auto p-4">
      <h2 className="  font-semibold text-2xl py-4">{heading}</h2>
      <div className=" flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  className=" h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 flex justify-center items-center"
                  key={"categoryLoading" + index}
                ><img 
                src={LoadingGif}
                className="   w-10 h-15  mix-blend-multiply " 
              /></div>
              );
            })
          : categoryProduct.map((product, index) => {
              return (
                <Link
                  to={"/product-category?category=" + product?.category}
                  className=" cursor-pointer"
                  key={product?.category}
                >
                  <div className=" p-4 bg-slate-200 w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden  flex items-center justify-center">
                    <img
                      src={product?.productImage[0]}
                      alt={product?.category}
                      className="mix-blend-multiply h-full object-scale-down hover:scale-125 transition-all"
                    />
                  </div>
                  <p className=" text-sm md:text-base text-center capitalize">
                    {product?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
