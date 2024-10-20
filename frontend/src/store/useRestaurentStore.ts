import { RestaurentFormSchema } from '@/schema/restaurent';
import axios from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const API_END_POINT = `http://localhost:8080/api/v1/restaurent`;
axios.defaults.withCredentials = true;

export const useRestaurentStore = create<any>()(persist((set) => ({
    loading: false,
    restaurent: null,
    searchedRestaurent: null,
    appliedFilter: [],
    singleRestaurent: null,
    createRestaurent: async (formData: RestaurentFormSchema) => {
        try {

            set({ loading: true });

            const res = await axios.post(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (res.data.success) {
                set({restaurent: res.data.restaurent});
                toast.success(res.data.message);
            }

        } catch (error: any) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ loading: false });
        }
    },
    getRestaurent: async () => {
        try {

            set({ loading: true });

            const res = await axios.get(`${API_END_POINT}/`);
            if (res.data.success) {
                set({ restaurent: res.data.restaurent });
            }

        } catch (error: any) {
            if (error.response.status === 404) {
                set({ restaurent: null });
            }
        }
        finally {
            set({ loading: false });
        }
    },
    updateRestaurent: async (formData: RestaurentFormSchema) => {
        try {

            set({ loading: true });

            const res = await axios.put(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.data.success) {
                set({ restaurent: res.data.restaurent });
                toast.success(res.data.message);
            }

        } catch (error: any) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ loading: false });
        }
    },
    searchRestaurent: async (searchText: string, searchQuery: string, selectedCuisines: any) => {
        try {

            set({ loading: true });
            const params = new URLSearchParams();
            params.set('searchQuery', searchQuery);
            params.set('cuisines', selectedCuisines.join(","));

            const res = await axios.get(`${API_END_POINT}/search/${searchText}?${params.toString()}`);

            if (res.data.success) {
                set({ searchedRestaurent: res.data });
            }

        } catch (error: any) {
            console.log(error);
        }
        finally {
            set({ loading: false });
        }
    },
    addItemToRestaurent: (item: any) => {
        set((state: any) => ({
            restaurent: state.restaurent ? { ...state.restaurent, items: [...state.restaurent.items, item] } : null
        }));
    },
    updateItemToRestaurent: (updatedItem: any) => {
        set((state: any) => {
            if (state.restaurent) {
                const updatedItemsList = state.restaurent.items.map((menu: any) => {
                    menu._id === updatedItem._id ? updatedItem : menu;
                });

                return {restaurent: {
                    ...state.restaurent,
                    items: updatedItemsList,
                }};
            };
            return state;
        });
    },
    setAppliedFilters: (value: string)=>{
        set((state: any)=>{
            const isAlreadyApplied = state.appliedFilter.includes(value);

            const updatedFilter = isAlreadyApplied ? state.appliedFilter.filter((item: string)=> item !== value) : [...state.appliedFilter, value];

            return {appliedFilter: updatedFilter};
        })
    },
    resetFilter: ()=>{
        set({appliedFilter: []});
    },
    getSingleRestaurent: async(id: string)=>{
        try {

            set({loading: true});
            const res = await axios.get(`${API_END_POINT}/${id}`);

            if(res.data.success){
                set({singleRestaurent: res.data.restaurent});
            }
            
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
        finally{
            set({loading: false})
        }
    }

}), {
    name: 'restaurent',
    storage: createJSONStorage(() => localStorage)
}));