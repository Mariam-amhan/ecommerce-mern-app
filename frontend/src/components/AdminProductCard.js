import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import DisplayCurrency from "../helpers/DisplayCurrency";
import AdminEditProdcut from "./AdminEditProdcut";
import SummaryApi from "../common";
import { toast } from "react-toastify";


const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);


  
const handleDeleteProduct = async (id, fetchdata) => {
  const dataResponse = await fetch(SummaryApi.deleteProduct.url,{
    method: SummaryApi.deleteProduct.method,
    credentials: "include",
    headers: {
      "content-type" : "application/json"
    },
    body: JSON.stringify({_id: id})
  })

  const response = await dataResponse.json()

  if(response.success){
    toast.success(response.message)
    fetchdata()
    
  }
};

  return (
    <div className=" bg-white p-4 rounded relative">
      <div className=" w-40 mb-6  ">
        <div className=" w-32 h-32 flex justify-center items-center mx-auto">
          <img
            className=" object-fill h-full"
            alt="img"
            src={data?.productImage[0]}
          />
        </div>

        <h1 className=" text-ellipsis line-clamp-1">{data?.productName}</h1>

        <div>
          <p className=" font-semibold mb-1">
            {DisplayCurrency(data?.sellingPrice)}
          </p>
        </div>
        <hr className=" text-slate-500 h-[5px]" />
      </div>
      
      <div className=" ">
       
        <div
          onClick={() => setEditProduct(true)}
          className=" mb-1 absolute bottom-1 left-5 text-lg rounded-full bg-green-400 text-white p-1.5 cursor-pointer hover:bg-green-500"
        >
          <MdEdit />
        </div>

        <div
        onClick={()=>handleDeleteProduct(data?._id, fetchdata)}
        className=" mb-1 absolute bottom-1 right-5 text-lg rounded-full bg-red-500 text-white p-1.5 cursor-pointer hover:bg-red-700">
          <MdDeleteForever />
        </div>
      </div>

      {editProduct && (
        <AdminEditProdcut
          onClose={() => setEditProduct(false)}
          productData={data}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
