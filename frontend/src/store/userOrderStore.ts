import axios from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const API_END_POINT = "http://localhost:8080/api/v1/order";
axios.defaults.withCredentials = true;

export const useOrderStore = create<any>()(persist((set)=>({

    loading: false,
    orders: [],
    createCheckoutSession: async (checkoutSession: any)=>{
        try {
            
            set({loading: true});
            const res = await axios.post(`${API_END_POINT}/checkout/create-checkout-session`, checkoutSession, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            window.location.href = res.data.session.url;

            set({loading: false})

        } catch (error: any) {
            toast.error(error.response.data.message);
            set({loading: false});
        }
    },
    getOrderDetails: async ()=>{

    }

}), {
    name: 'order-name',
    storage: createJSONStorage(()=> localStorage)
}));