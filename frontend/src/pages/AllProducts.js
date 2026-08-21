import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();
    setAllProduct(dataResponse?.data || []);
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);
  return (
    <div>
      <div className="bg-white py-3 px-4 flex justify-between items-center">
        <h2 className=" font-bold text-lg">All Products</h2>
        <button
          className=" py-1 border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all   text-red-600 px-4 rounded-full "
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload New Product
        </button>
      </div>
      {allProduct.length > 0 ? (
        <div className="flex items-start flex-wrap gap-3 py-4">
          {allProduct.map((product, index) => (
            <AdminProductCard
              data={product}
              fetchdata={fetchAllProduct}
              key={index + "allproducts"}
            />
          ))}
        </div>
      ) : (
        <p className=" mt-5 text-center text-gray-500">No Product Found..!</p>
      )}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchdata={fetchAllProduct}
        />
      )}
    </div>
  );
};
export default AllProducts;
