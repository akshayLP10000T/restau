import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IItem{
    name: string;
    description: string;
    price: number;
    image: string;
};

export interface IItemDocument extends IItem, Document{
    createdAt: Date;
    updatedAt: Date;
};

const itemSchema = new mongoose.Schema<IItemDocument>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, {timestamps: true});

export const Item = mongoose.model("Items", itemSchema);