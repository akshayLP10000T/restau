import mongoose from 'mongoose'
import { Document } from 'mongoose';

interface DelieveryDetails{
    email: string;
    name: string;
    address: string;
    city: string;
};

interface CartItems{
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
};

export interface IOrder extends Document{
    user: mongoose.Schema.Types.ObjectId;
    restaurent: mongoose.Schema.Types.ObjectId;
    delieveryDetails: DelieveryDetails;
    cartItems: CartItems;
    totalAmount: number;
    status: "pending" | "confirmed" | "preparing" | "out for delievery";
};

const orderSchema = new mongoose.Schema<IOrder>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    restaurent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurent",
        required: true,
    },
    delieveryDetails: {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
    },
    cartItems: [
        {
            menuId: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    status: {
        type: String,
        enum: ["pending", "confirmed", "preparing", "out for delievery"],
        required: true,
    },

}, {timestamps: true});

export const Order = mongoose.model("Order", orderSchema);