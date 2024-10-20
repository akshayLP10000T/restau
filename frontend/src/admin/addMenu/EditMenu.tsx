import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
// import { itemFormSchema } from "@/schema/item";
import { useItemsStore } from "@/store/useItemsStore";
import { useRestaurentStore } from "@/store/useRestaurentStore";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMenu: any;
};

const EditMenu = (props: Props) => {
  // const [errors, setErrors] = useState<Partial<ItemFormSchema>>({});

  const { loading, editMenu } = useItemsStore();
  const { getRestaurent } = useRestaurentStore();

  const [input, setInput] = useState<any>({
    name: "",
    description: "",
    price: 0,
    itemImage: undefined,
  });

  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name); // Updated from itemName to name
    formData.append("description", input.description);
    formData.append("price", input.price.toString());

    if (input.itemImage) {
      formData.append("image", input.itemImage);
    }

    // const result = itemFormSchema.safeParse({
    //   name: input.name,
    //   description: input.description,
    //   price: input.price,
    // });
    // if (!result.success) {
    //   const errors = result.error.formErrors.fieldErrors;
    //   setErrors(errors as Partial<ItemFormSchema>);
    //   return;
    // }
    
    await editMenu(props.selectedMenu._id, formData);
    await getRestaurent();
  };

  useEffect(() => {
    // Ensure selectedMenu data is properly updated
    setInput({
      name: props.selectedMenu?.name || "",
      description: props.selectedMenu?.description || "",
      price: props.selectedMenu?.price || 10,
    });
  }, [props.selectedMenu]);

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>Edit the menu details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div>
            <Label className="text-lg">Item Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Item Name"
              onChange={valueChangeHandler}
              value={input.name}
            />
            {/* {errors.itemName && (
              <span className="text-sm text-red-700 font-medium">
                {errors.itemName}
              </span>
            )} */}
          </div>
          <div>
            <Label className="text-lg">Description</Label>
            <Input
              type="text"
              name="description"
              placeholder="Description"
              onChange={valueChangeHandler}
              value={input.description}
            />
            {/* {errors.description && (
              <span className="text-sm text-red-700 font-medium">
                {errors.description}
              </span>
            )} */}
          </div>
          <div>
            <Label className="text-lg">Price (In Rupees)</Label>
            <Input
              type="number"
              name="price"
              placeholder="Price"
              onChange={valueChangeHandler}
              value={input.price}
            />
            {/* {errors.price && (
              <span className="text-sm text-red-700 font-medium">
                {errors.price}
              </span>
            )} */}
          </div>
          <div>
            <Label className="text-lg">Item Image</Label>
            <Input
              type="file"
              name="itemImage"
              accept="image/*"
              onChange={(e) =>
                setInput({
                  ...input,
                  itemImage: e.target.files?.[0] || undefined,
                })
              }
            />
            {/* {errors.itemImage && (
              <span className="text-sm text-red-700 font-medium">
                {errors.itemImage?.name}
              </span>
            )} */}
          </div>
          <DialogFooter>
            {loading ? (
              <Button
                disabled
                className="bg-primaryColor w-full hover:bg-hoverPrimaryColor mt-3"
              >
                <Loader2 className="mr-2 animate-spin" />
                Please Wait...
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-primaryColor w-full hover:bg-hoverPrimaryColor mt-3"
              >
                Submit
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;
