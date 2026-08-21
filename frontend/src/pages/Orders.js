import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'

const Orders = () => {
  const [allOrders, setAllOrders] = useState([])

  const getAllOrders = async () => {
    const response = await fetch(SummaryApi.getOrders.url, {
      method: SummaryApi.getOrders.method,
      credentials: "include",
    })
    const dataResponse = await response.json()
    setAllOrders(dataResponse?.data || [])
  }

  useEffect(() => {
    getAllOrders()
  }, [])

  return (
    <div className="w-full bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">🛍️ My Orders</h1>

        {allOrders.length === 0 ? (
          <p className="text-center text-gray-600">No Order Found...!</p>
        ) : (
          <div className="space-y-8">
            {allOrders.map(order => (
              <div key={order._id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b flex flex-col md:flex-row md:justify-between gap-2 text-sm text-gray-700">
                  <div><span className="font-medium">Order ID:</span> {order._id}</div>
                  <div><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleString()}</div>
                  <div><span className="font-medium">Phone:</span> {order.phoneNumber}</div>
                  <div><span className="font-medium">Address:</span> {order.address}</div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="px-6 py-3 font-medium">Product Image</th>
                        <th className="px-6 py-3 font-medium">Product Name</th>
                        <th className="px-6 py-3 font-medium">Customer Name</th>
                        <th className="px-6 py-3 font-medium">Quantity</th>
                        <th className="px-6 py-3 font-medium">Price</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.products.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-6 py-3">
                            {item.productId?.productImage?.[0] ? (
                              <img
                                src={item.productId.productImage[0]}
                                alt="ürün"
                                className="w-16 h-16 object-cover rounded"
                              />
                            ) : (
                              <div className="text-gray-400 italic">no img</div>
                            )}
                          </td>
                          <td className="px-6 py-3">{item.productId?.productName || "deleted product"}</td>
                          <td className="px-6 py-3">{order.customerName}</td>
                          <td className="px-6 py-3">{item.quantity}</td>
                          <td className="px-6 py-3">{item.productId?.sellingPrice ?? "-"} TL</td>
                          <td className="px-6 py-3 text-green-700 font-bold">{order.status}</td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
