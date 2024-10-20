import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import axios from 'axios';
import { FormDataLogin, FormDataRegister } from '@/schema/user';
import { toast } from 'sonner';

const API_END_POINT = "http://localhost:8080/api/v1/user"
axios.defaults.withCredentials = true;

type User = {
    fullName: string;
    email: string;
    contact: number;
    address: string;
    city: string;
    country: string;
    profilePicture: string;
    admin: boolean;
    isVerified: boolean;
}

type UserState = {
    user: null | User;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    loading: boolean;
    signup: (formData: FormDataRegister)=> Promise<void>;
    verify: (verificationCode: string)=> Promise<void>;
    login: (formData: FormDataLogin)=> Promise<void>;
    checkAuthentication: ()=> Promise<void>;
    logout: ()=> Promise<void>;
    forgotPassword: (email: string)=> Promise<void>;
    resetPassword: (token: string, newPassword: string)=> Promise<void>;
    updateProfile: (data: any)=> Promise<void>;
}

export const useUserStore = create<UserState>()(persist((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    loading: false,

    signup: async (formData: FormDataRegister) => {
        try {
            set({ loading: true });
            const res = await axios.post(`${API_END_POINT}/signup`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.data.success) {
                console.log(res.data);
                set({ user: res.data.user, isAuthenticated: true });
                toast.success(res.data.message);
            }

        } catch (error: any) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ loading: false })
        }
    },
    verify: async (verificationCode: string) => {
        try {

            set({ loading: true });
            const res = await axios.post(`${API_END_POINT}/verify-email`, { verificationCode }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.data.success) {
                set({ loading: false, user: res.data.user, isAuthenticated: true });
                toast.success(res.data.message);
            }

            return res.data;

        } catch (error: any) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ loading: false });
        }
    },
    login: async (formData: FormDataLogin) => {
        try {

            set({ loading: true });

            const res = await axios.post(`${API_END_POINT}/login`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.data.success) {
                set({ user: res.data.user, isAuthenticated: true });
                toast.success(res.data.message);
            }

        } catch (error: any) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ loading: false });
        }
    },
    checkAuthentication: async () => {
        try {

            set({ isCheckingAuth: true });

            const res = await axios.get(`${API_END_POINT}/check-auth`);
            if (res.data.success) {
                set({ user: res.data.user, isAuthenticated: true, isCheckingAuth: false });
            }

        } catch (error) {
            console.log(error);
            set({ isAuthenticated: false, isCheckingAuth: false });
        }
    },
    logout: async () => {
        try {

            set({ loading: true });
            const res = await axios.post(`${API_END_POINT}/logout`);

            if (res.data.success) {
                toast.success(res.data.message);
                set({ isAuthenticated: false, user: null });
            }

        } catch (error) {
            console.log(error);
        }
        finally {
            set({ loading: false });
        }
    },
    forgotPassword: async (email: string) => {
        try {

            set({ loading: true });

            const res = await axios.post(`${API_END_POINT}/forgot-password`, { email });
            if (res.data.success) {
                toast.success(res.data.message);

            }

        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally {
            set({ loading: false });
        }
    },
    resetPassword: async (token: string, newPassword: string) => {
        try {

            set({ loading: true });

            const res = await axios.post(`${API_END_POINT}/reset-password/${token}`, { newPassword });
            if (res.data.success) {
                toast.success(res.data.message);
            }

        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message);

        }
        finally {
            set({ loading: false });
        }
    },
    updateProfile: async (data: any) => {
        try {

            set({ loading: true });
            const res = await axios.put(`${API_END_POINT}/profile/update`, data, {
                headers: {
                    'Content-Type': "application/json"
                }
            });

            if (res.data.success) {
                toast.success(res.data.message);
                set({user: res.data.user, isAuthenticated: true});
            }


        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message);

        }
        finally {
            set({ loading: false });
        }
    }
}),
    {
        name: 'user-name',
        storage: createJSONStorage(() => localStorage)
    }
));