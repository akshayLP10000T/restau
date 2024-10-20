import { z } from 'zod';

export const restaurentFormSchema = z.object({
    restaurentName: z.string().min(1, {message: "Restaurent name is required"}),
    city: z.string().min(1, { message: "City is required" }),
    country: z.string().min(1, {message: "Country is required"}),
    deliveryTime: z.number().min(0, { message: "Delievery time cannot be negative" }),
    cuisines: z.array(z.string()),
    imageFile: z.instanceof(File).optional().refine((file)=> file?.size !== 0, {message: "Image file is required"}),
});

export type RestaurentFormSchema = z.infer<typeof restaurentFormSchema>;