import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { itemFormSchema, ItemFormSchema } from "@/schema/item";
import { useItemsStore } from "@/store/useItemsStore";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddItemDialog = (props: Props) => {
    const { loading, createMenu } = useItemsStore();

    const [errors, setErrors] = useState<Partial<ItemFormSchema>>({})
    const [input, setInput] = useState<ItemFormSchema>({
        itemName: "",
        description: "",
        price: 0,
        itemImage: undefined
    });

    const formData = new FormData();
    formData.append("name", input.itemName);
    formData.append("description", input.description);
    formData.append("price", input.price.toString());

    if(input.itemImage){
        formData.append("image", input.itemImage);
    }

    const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInput({...input, [e.target.name]: e.target.type === 'number' ? Number(e.target.value): e.target.value});
    }
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const result = itemFormSchema.safeParse(input);
        if(!result.success){
            const errors = result.error.formErrors.fieldErrors;
            setErrors(errors as Partial<ItemFormSchema>);
            return;
        }

        await createMenu(formData);
    }

    return (
        <Dialog open={props.open} onOpenChange={props.setOpen}>
            <DialogTrigger >
                <Button className="bg-primaryColor hover:bg-hoverPrimaryColor"><Plus size={22} className="mr-2" />Add Item</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">
                        Add a new item
                    </DialogTitle>
                    <DialogDescription>
                        Add a new item in your menu to get more orders and stand out among everyone.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-2" onSubmit={submitHandler}>
                    <div>
                        <Label className="text-lg">
                            Name
                        </Label>
                        <Input
                            type="text"
                            name="itemName"
                            placeholder="Enter item name"
                            onChange={valueChangeHandler}
                            value={input.itemName}
                        />
                        {errors && <span className="text-sm text-red-700 font-medium">{errors.itemName}</span>}
                    </div>
                    <div>
                        <Label className="text-lg">
                            Description
                        </Label>
                        <Input
                            type="text"
                            name="description"
                            placeholder="Enter item description"
                            onChange={valueChangeHandler}
                            value={input.description}
                        />
                        {errors && <span className="text-sm text-red-700 font-medium">{errors.description}</span>}
                    </div>
                    <div>
                        <Label className="text-lg">
                            Price (In Rupees)
                        </Label>
                        <Input
                            type="number"
                            name="price"
                            placeholder="Price"
                            onChange={valueChangeHandler}
                            value={input.price}
                        />
                        {errors && <span className="text-sm text-red-700 font-medium">{errors.price}</span>}
                    </div>
                    <div>
                        <Label className="text-lg">
                            Item image
                        </Label>
                        <Input
                            type="file"
                            name="itemImage"
                            accept="image/*"
                            onChange={(e)=>setInput({...input, itemImage: e.target.files?.[0] || undefined})}
                        />
                        {errors && <span className="text-sm text-red-700 font-medium">{errors.itemImage?.name}</span>}
                    </div>
                    <DialogFooter>
                        {
                            loading ?
                                <Button disabled className="bg-primaryColor w-full hover:bg-hoverPrimaryColor mt-3"><Loader2 className="mr-2 animate-spin" />Please Wait...</Button> :
                                <Button type="submit" className="bg-primaryColor w-full hover:bg-hoverPrimaryColor mt-3">Submit</Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddItemDialog