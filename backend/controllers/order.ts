import { Request, Response } from "express"
import { Restaurent } from "../models/restaurent";
import { Order } from "../models/orders";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIP_SECRET_KEY!);

interface checkOutSessionRequest {
    cartItems: {
        menuId: string;
        name: string;
        image: string;
        price: number;
        quantity: number;
    }[],
    delieveryDetails: {
        name: string;
        email: string;
        address: string;
        city: string;
    },
    restaurentId: string,
}

interface menuItems {
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {

        const checkOutSessionRequest: checkOutSessionRequest = req.body;
        const restaurent = await Restaurent.findById(checkOutSessionRequest.restaurentId).populate('items');

        if (!restaurent) {
            return res.status(404).json({
                success: false,
                message: "Restaurent not found",
            });
        }

        const order: any = new Order({
            restaurent: restaurent._id,
            user: req.id,
            delieveryDetails: checkOutSessionRequest.delieveryDetails,
            cartItems: checkOutSessionRequest.cartItems,
            status: "pending",
        });

        const menuItems = restaurent.items;
        const lineItems = createLineItems(checkOutSessionRequest, menuItems);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['GB', 'US', 'CA'],
            },
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/order/status`,
            cancel_url: `${process.env.FRONTEND_URL}/cart`,
            metadata: {
                orderId: order._id.toString() ,
                images: JSON.stringify(menuItems.map((item: any)=>{
                    item.image
                })),
            }
        });

        if(!session.url){
            return res.status(400).json({
                success: false,
                message: "Couldn't able to make payment",
            });
        }

        await order.save();
        return res.status(200).json({
            session,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const createLineItems = (checkOutSessionRequest: checkOutSessionRequest, menuItems: any)=>{
    const lineItems = checkOutSessionRequest.cartItems.map((cartItem)=> {
        const menuItem = menuItems.find((item: any)=>(
            item._id.toString() === cartItem.menuId
        ))

        if(!menuItem) throw new Error(`Menu item id not found`);

        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: menuItem.name,
                    images: [menuItem.image],
                },
                unit_amount: menuItem.price * 100,
            },
            quantity: cartItem.quantity,
        }
    });

    return lineItems;
}

export const getOrders = async (req: Request, res: Response)=>{
    try {

        const orders = await Order.find({user: req.id}).populate('user').populate('restaurent');
        return res.status(200).json({
            success: true,
            orders
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}