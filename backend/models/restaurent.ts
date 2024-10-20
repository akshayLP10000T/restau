import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IRestaurent{
    user: mongoose.Schema.Types.ObjectId;
    restaurentName: string;
    city: string;
    country: string;
    deliveryTime: number;
    cuisines: string[];
    imageUrl: string;
    items: mongoose.Schema.Types.ObjectId[];
};

export interface IRestaurentDocument extends IRestaurent, Document{
    createdAt: Date;
    updatedAt: Date;
}

const restaurentSchema = new mongoose.Schema<IRestaurentDocument>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    restaurentName: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    deliveryTime: {
        type: Number,
        required: true
    },
    cuisines: [
        {
            type: String,
            required: true
        }
    ],
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Items"
        }
    ],
    imageUrl: {
        type: String,
        required: true
    },
}, {timestamps: true});

export const Restaurent = mongoose.model("Restaurent", restaurentSchema);