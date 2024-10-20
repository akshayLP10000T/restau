import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useCartStore = create<any>()(persist((set) => ({
    cart: [],
    addToCart: (item: any) => {
        set((state: any) => {
            const existingItem = state.cart.find((cartItem: any) => cartItem._id === item._id);

            if (existingItem) {
                return {
                    cart: state.cart.map((cartItem: any) => cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
                }
            }
            else {
                return {
                    cart: [...state.cart, { ...item, quantity: 1 }]
                }
            }
        })
    },
    clearCart: ()=>{
        set({cart: []})
    },
    removeFromCart: (id: string)=>{
        set((state: any)=>({
            cart: state.cart.filter((item: any)=>{
                return item._id !== id;
            })
        }));
    },
    incrementQuantity: (id: string)=>[
        set((state: any)=>({
            cart: state.cart.map((item: any)=> item._id === id ? {...item, quantity: item.quantity + 1} : item)
        }))
    ],
    decrementQuantity: (id: string)=>{
        set((state: any)=>({
            cart: state.cart.map((item: any)=> (item._id === id && item.quantity > 1) ? {...item, quantity: item.quantity - 1} : item)
        }));
    }
}),
    {
        name: 'cart-name',
        storage: createJSONStorage(() => localStorage)
    }
));