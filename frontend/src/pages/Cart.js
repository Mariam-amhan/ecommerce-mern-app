import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayTurCurrency from "../helpers/DisplayCurrency";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import {useNavigate } from "react-router-dom";


const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const navigate = useNavigate()
  const fetchData = async () => {
    const response = await fetch(SummaryApi.AddToCartProductView.url, {
      method: SummaryApi.AddToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, [context.cartProductCount]);

  const incraseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
    }
  };
  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
      }
    }
  };
  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const responseData = await response.json();
    if (responseData) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };
  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );
  const handleCreateOrder = async () => {
  if (!address || !phoneNumber || !customerName) {
    alert("Please fill in all information");
    return;
  }
  const orderData = {
    orderItems: data.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.sellingPrice,
    })),
    shippingAddress: address,
    phoneNumber,
    customerName,
  };
  const response = await fetch(SummaryApi.createOrder.url, {
    method: SummaryApi.createOrder.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  const responseData = await response.json();
  if (responseData.success) {
    toast.success(responseData.message)
    navigate("/my-order")
    
    context.fetchUserAddToCart();
  } else {
    alert("Order could not be created");
  }
};


  return (
    <div className=" container mx-auto">
      <div className=" text-center text-lg my-3 ">
        {data.length === 0 && !loading && (
          <p className=" bg-white py-5">No product added to cart</p>
        )}
      </div>

      <div className=" flex flex-col lg:flex-row gap-10 lg:justify-between lg:mr-5">
        {/** view product */}
        <div className=" w-full max-w-3xl">
          {loading
            ? loadingCart.map((el) => {
                return (
                  <div
                    key={el + "add to cart loading"}
                    className=" my-2 w-full bg-slate-300 h-32 ml-3 border border-slate-400 animate-pulse"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "add to cart loading"}
                    className=" my-2 w-full bg-white h-32 ml-3 border items-center border-slate-400 rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className=" w-32 h-32 bg-slate-200 ">
                      <img
                        src={product?.productId?.productImage[0]}
                        className=" h-full w-full object-scale-down mix-blend-multiply"
                      />
                    </div>

                    <div className=" px-4 py-2 relative">
                      {/** delete prouct */}

                      <div
                        onClick={() => deleteCartProduct(product?._id)}
                        className=" absolute right-0 cursor-pointer transition-all text-xl  text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white "
                      >
                        <MdDelete />
                      </div>
                      <h2 className=" text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className=" capitalize text-slate-500">
                        {product?.productId?.category}
                      </p>

                      <div className=" flex items-center justify-between">
                        <p className=" text-red-600 font-medium text-lg">
                          {displayTurCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className=" text-slate-600  font-semibold text-lg">
                          {displayTurCurrency(
                            product?.productId.sellingPrice * product.quantity
                          )}
                        </p>
                      </div>

                      <div className=" flex items-center gap-3 mt-2">
                        <button
                          onClick={() =>
                            decraseQty(product?._id, product?.quantity)
                          }
                          className=" flex justify-center items-center rounded border border-red-600 text-red-600 w-6 h-6  hover:bg-red-600 hover:text-white  transition-all"
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          onClick={() =>
                            incraseQty(product?._id, product?.quantity)
                          }
                          className=" flex justify-center items-center rounded border border-red-600 text-red-600 w-6 h-6 hover:bg-red-600 hover:text-white transition-all"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/** summary  */}

        <div className=" mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className=" h-36 bg-slate-200 border-slate-300 animate-pulse"></div>
          ) : (
            <div className=" h-[330px] bg-white border-slate-300 ">
              <h2 className=" text-white bg-red-600 px-4 py-1 ">Order Summary</h2>
              <div className=" flex items-center justify-between px-4 gap-2">
                <p className=" font-bold">Quantity :</p>
                <p className=" font-bold text-red-600 text-lg">{totalQty}</p>
              </div>

              <div className=" flex items-center justify-between px-4 gap-2">
                <p className=" font-bold">Total Price :</p>
                <p className=" font-bold text-red-600 text-lg">
                  {displayTurCurrency(totalPrice)}
                </p>
              </div>

              <div className="flex flex-col gap-2 px-4 py-2">
  <input
    type="text"
    placeholder="Name"
    value={customerName}
    onChange={(e) => setCustomerName(e.target.value)}
    className="border p-2 rounded"
  />
  <input
    type="text"
    placeholder="Phone Number"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    className="border p-2 rounded"
  />
  <textarea
    placeholder="Address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    className="border p-2 rounded resize-none"
    rows={2}
  ></textarea>
</div>

<div className="flex w-full justify-end">
  <button
    className={`bg-blue-600 p-2 w-32 mt-2 mr-1 text-white h-10 rounded-md transition-opacity 
      ${
        totalPrice === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"
      }`}
    onClick={handleCreateOrder}
    disabled={totalPrice === 0}
  >
    Order
  </button>
</div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
