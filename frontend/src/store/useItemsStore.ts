import axios from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useRestaurentStore } from './useRestaurentStore';

const API_END_POINT = "http://localhost:8080/api/v1/item";
axios.defaults.withCredentials = true;

type MenuState = {
    loading: boolean;
    menu: null,
    createMenu: (formData: FormData) => Promise<void>;
    editMenu: (menuId: string, formData: FormData) => Promise<void>;
}

export const useItemsStore = create<MenuState>()(persist((set) => ({

    loading: false,
    menu: null,
    createMenu: async (formData: FormData) => {
        try {

            set({ loading: true });

            const res = await axios.post(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                toast.success(res.data.message);
                set({ menu: res.data.item });
            }

            useRestaurentStore.getState().addItemToRestaurent(res.data.item);

        } catch (error: any) {

            toast.error(error.response.data.message);

        }
        finally {
            set({ loading: false });
        }
    },
    editMenu: async (menuId: string, formData: FormData) => {
        try {

            set({ loading: true });

            const res = await axios.put(`${API_END_POINT}/${menuId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                toast.success(res.data.message);
                set({ menu: res.data.item });
            }

            useRestaurentStore.getState().updateItemToRestaurent(res.data.item);

        } catch (error: any) {

            toast.error(error.response.data.message);

        }
        finally {
            set({ loading: false });
        }
    }

}), {
    name: 'items-name',
    storage: createJSONStorage(() => localStorage)
}))