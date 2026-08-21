const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    customerName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const orderModel = mongoose.model("order", orderSchema)


module.exports = orderModel;
