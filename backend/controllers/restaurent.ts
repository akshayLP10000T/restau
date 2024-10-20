import { Request, Response } from 'express';
import { Restaurent } from '../models/restaurent'
import { Multer } from 'multer';
import uploadImageOnCloudinary from '../utils/imageUpload';
import { Order } from '../models/orders';

export const createRestaurent = async (req: Request, res: Response) => {
    try {

        const { restaurentName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;

        const restaurent = await Restaurent.findOne({ user: req.id });
        if (restaurent) {
            return res.status(400).json({
                success: false,
                message: "You can only create one restaurent",
            });
        }

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Banner image is required",
            });
        }

        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

        await Restaurent.create({
            user: req.id,
            restaurentName: restaurentName,
            city,
            country,
            deliveryTime,
            cuisines: JSON.parse(cuisines),
            imageUrl: imageUrl,
        });

        return res.status(201).json({
            success: true,
            message: "Restaurent created successfully",
            restaurent,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });

    }
}

export const getRestaurent = async (req: Request, res: Response) => {
    try {

        const restaurent = await Restaurent.findOne({ user: req.id }).populate('items');
        if (!restaurent) {
            return res.status(404).json({
                success: false,
                restaurent: [],
                message: "Restaurent not found",
            });
        }

        return res.status(200).json({
            success: true,
            restaurent,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });

    }
}

export const updateRestaurent = async (req: Request, res: Response) => {
    try {

        const restaurent = await Restaurent.findOne({ user: req.id });
        if (!restaurent) {
            return res.status(404).json({
                success: false,
                message: "Restaurent not found",
            });
        };

        restaurent.restaurentName = req.body.restaurentName;
        restaurent.city = req.body.city;
        restaurent.country = req.body.country;
        restaurent.deliveryTime = req.body.deliveryTime;
        restaurent.cuisines = JSON.parse(req.body.cuisines);

        if (req.file) {
            const imageUrl = await uploadImageOnCloudinary(req.file as Express.Multer.File);
            restaurent.imageUrl = imageUrl;
        }

        await restaurent.save();
        return res.status(200).json({
            success: true,
            message: "Restaurent updated",
            restaurent,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });

    }
}

export const getRestaurentOrders = async (req: Request, res: Response) => {
    try {

        const restaurent = await Restaurent.findOne({ user: req.id });
        if (!restaurent) {
            return res.status(404).json({
                success: false,
                message: "Restaurent not found",
            });
        };

        const orders = await Order.find({ restaurent: restaurent._id }).populate('restaurent').populate('user');

        return res.status(200).json({
            success: true,
            orders,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });

    }
}

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {

        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findById({ orderId });
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        order.status = status;
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Status updated",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });

    }
}

export const searchRestaurent = async (req: Request, res: Response) => {
    try {

        const searchText = req.params.searchText || "";
        const searchQuery = req.query.searchQuery as string || "";
        const selectedCuisines = (req.query.selectedQuisines as string || "")
            .split(",")
            .filter(cuisine => cuisine);

        const query: any = {};

        if (searchText) {
            query.$or = [
                { restaurentName: { $regex: searchText, $options: 'i' } },
                { city: { $regex: searchText, $options: 'i' } },
                { country: { $regex: searchText, $options: 'i' } },
            ]
        }

        if (searchQuery) {
            query.$or = [
                { restaurentName: { $regex: searchQuery, $options: 'i' } },
                { cuisines: { $regex: searchQuery, $options: 'i' } }
            ]
        }

        if (selectedCuisines.length > 0) {
            query.cuisines = { $in: selectedCuisines }
        }

        const restaurents = await Restaurent.find(query);

        return res.status(200).json({
            success: true,
            restaurents,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });

    }
}

export const getSingleRestaurent = async (req: Request, res: Response) => {
    try {

        const restaurentId = req.params.restaurentId;
        const restaurent = await Restaurent.findById(restaurentId).populate({
            path: "items",
            options: { createdAt: -1 }
        });

        if(!restaurent){
            return res.status(404).json({
                success: false,
                message: "Some error occured, Restaurent not found",
            });
        }

        return res.status(200).json({
            success: true,
            restaurent,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });

    }
}