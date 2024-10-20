import { Request, Response } from 'express';
import { Multer } from 'multer';
import uploadImageOnCloudinary from '../utils/imageUpload';
import { Item } from '../models/item';
import { Restaurent } from '../models/restaurent';
import mongoose from 'mongoose';

export const addItem = async (req: Request, res: Response)=>{
    try {

        const { name, description, price } = req.body;
        const file = req.file;

        if(!file){
            return res.status(400).json({
                success: false,
                message: "Food image is required",
            });
        }

        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        const item = await Item.create({
            name,
            description,
            price,
            image: imageUrl,
        });

        const restaurent = await Restaurent.findOne({user: req.id});

        if(!restaurent){
            return res.status(404).json({
                success: false,
                message: "You didn't make a restaurent make it first to add items",
            });
        }
        if(restaurent){
            restaurent.items.push(item._id as mongoose.Schema.Types.ObjectId);
        }

        restaurent.save();

        return res.status(200).json({
            success: true,
            message: "Item added",
            item,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });

    }
}

export const editItem = async (req: Request, res: Response)=>{
    try {

        const { id } = req.params;
        const { name, description, price } = req.body;
        const file = req.file;
        
        const item = await Item.findById(id);

        if(!item){
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        if(name) item.name = name;
        if(description) item.description = description;
        if(price) item.price = price;
        if(file){
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            item.image = imageUrl;
        }

        await item.save();

        return res.status(200).json({
            success: true,
            message: "Item updated",
            item,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });

    }
}