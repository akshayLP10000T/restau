import { z } from 'zod';

export const itemFormSchema = z.object({
    itemName: z.string().min(1, {message: "Item name is required"}),
    description: z.string().min(1, { message: "Description is required" }),
    price: z.number().min(0, { message: "Price cannot be negative" }),
    itemImage: z.instanceof(File).optional().refine((file)=> file?.size !== 0, {message: "Image file is required"}),
});

export type ItemFormSchema = z.infer<typeof itemFormSchema>;