import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { FaUpload } from "react-icons/fa6";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDeleteForever } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AdminEditProdcut = ({onClose,productData,fetchdata}) => {

    const [data, setData] = useState({
      ...productData,
      productName: productData?.productName,
      brandName: productData?.brandName,
      category: productData?.category,
      productImage: productData?.productImage ||  [],
      description: productData?.description,
      price: productData?.price,
      sellingPrice: productData?.sellingPrice,
    });

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);

    const [fullScreenImage, setFullScreenImage] = useState("");

    const handleOnChange = (e) => {
      const { name, value } = e.target;
      setData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    };

    const handleUploadProduct = async (e) => {
      const file = e.target.files[0];
      const uploadImageCloudinary = await uploadImage(file);

      setData((prev) => {
        return {
          ...prev,
          productImage: [...prev.productImage, uploadImageCloudinary.url],
        };
      });
    };

    const handleDeleteProductImage = async (index) => {

      const newProductImage = [...data.productImage];
      newProductImage.splice(index, 1);
      setData((prev) => {
        return {
          ...prev,
          productImage: [...newProductImage],
        };
      });
    };

    {
      /** upload product */
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      const response = await fetch(SummaryApi.updateProduct.url, {
        method: SummaryApi.updateProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData?.message);
        onClose();
        fetchdata()
      }

      if (responseData.error) {
        toast.success(responseData?.message);
      }
  };
  return (
    <div className=" fixed bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-full z-10">
      <div className=" bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden ">
        <div className=" flex justify-between items-center pb-3">
          <h2 className=" font-bold text-lg">Edit product</h2>
          <div
            className=" w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>

        <form
          className=" grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name :</label>
          <input
            className=" p-2 bg-slate-100 border rounded "
            type="text"
            id="productName"
            placeholder="enter product name"
            value={data.productName}
            onChange={handleOnChange}
            name="productName"
            required
          />

          <label className=" mt-3" htmlFor="brandName">
            Brand Name :
          </label>
          <input
            className=" p-2 bg-slate-100 border rounded "
            type="text"
            id="brandName"
            placeholder="enter Brand name"
            value={data.brandName}
            onChange={handleOnChange}
            name="brandName"
            required
          />

          <label className=" mt-3" htmlFor="category">
            Category :
          </label>

          <select
            className=" p-2 bg-slate-100 border rounded "
            value={data.category}
            name="category"
            onChange={handleOnChange}
            required
          >
            <option value="">Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label className=" mt-3" htmlFor="productImage">
            Product Image :
          </label>
          <label htmlFor="uploadImageInput" className="cursor-pointer">
            <div className=" p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center">
              <div className=" text-slate-500 flex justify-center items-center flex-col">
                <span className="text-2xl">
                  <FaUpload />
                </span>
                <p className=" text-sm">Upload Product Image</p>
                <input
                  className="hidden"
                  type="file"
                  id="uploadImageInput"
                  onChange={handleUploadProduct}
                  
                />
              </div>
            </div>
          </label>

          <div>
            {data?.productImage[0] ? (
              <div className=" flex items-center gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div className=" relative group">
                      <img
                        src={el}
                        alt="el"
                        width={80}
                        height={80}
                        className=" bg-slate-100 border rounded cursor-pointer "
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />

                      <div
                        className=" absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDeleteForever />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className=" text-red-600 text-xs">
                *Please Upload Product image
              </p>
            )}
          </div>

          <label className=" mt-3" htmlFor="price">
            Price :
          </label>
          <input
            className=" p-2 bg-slate-100 border rounded "
            type="number"
            id="prince"
            placeholder="enter price"
            value={data.price}
            onChange={handleOnChange}
            name="price"
            required
          />

          <label className=" mt-3" htmlFor="sellingPrice">
            Selling Price :
          </label>
          <input
            className=" p-2 bg-slate-100 border rounded "
            type="number"
            id="sellingPrice"
            placeholder="enter price"
            value={data.sellingPrice}
            onChange={handleOnChange}
            name="sellingPrice"
            required
          />

          <label className=" mt-3" htmlFor="sellingPrice">
            Description :
          </label>

          <textarea
            name="description"
            className=" h-28 bg-slate-100 border resize-none"
            placeholder="Enter product description"
            rows={3}
            onChange={handleOnChange}
            required
            value={data.description}
          ></textarea>

          <button className=" px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700 ">
            Update Product
          </button>
        </form>
      </div>

      {/** display image full screen */}

      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default AdminEditProdcut;
