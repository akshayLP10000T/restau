import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/store/useCartStore";
import { useRestaurentStore } from "@/store/useRestaurentStore";
import { useOrderStore } from "@/store/userOrderStore";
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

interface FormData {
  fullName: string | undefined;
  email: string | undefined;
  phoneNumber: number | undefined;
  address: string | undefined;
  city: string | undefined;
  country: string | undefined;
}

const CheckoutConfirmPage = (props: Props) => {
  const { user } = useUserStore();
  const { cart } = useCartStore();
  const { restaurent } = useRestaurentStore();
  const { createCheckoutSession, loading } = useOrderStore();

  const [formData, setFormData] = useState<FormData>({
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.contact,
    address: user?.address,
    city: user?.city,
    country: user?.country,
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkOutHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const checkOutData = {
        cartItems: cart.map((cartItem: any) => ({
          menuId: cartItem._id,
          name: cartItem.name,
          image: cartItem.image,
          price: cartItem.price.toString(),
          quantity: cartItem.quantity.toString(),
          address: cartItem.address,
          city: cartItem.city,
        })),
        deliveryDetails: formData,
        restaurentId: restaurent?._id as string,
      };

      await createCheckoutSession(checkOutData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent>
        <DialogTitle>Check the details and confirm</DialogTitle>
        <DialogDescription>
          Ensure all the details below and hit confirm button to proceed
          furthur.
        </DialogDescription>
        <form className="space-y-2" onSubmit={checkOutHandler}>
          <div>
            <Label>Fullname</Label>
            <Input
              type="text"
              name="fullName"
              onChange={inputChangeHandler}
              value={formData.fullName}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              disabled
              type="text"
              name="email"
              onChange={inputChangeHandler}
              value={formData.email}
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              onChange={inputChangeHandler}
              value={formData.phoneNumber}
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              type="text"
              name="address"
              onChange={inputChangeHandler}
              value={formData.address}
            />
          </div>
          <div>
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              onChange={inputChangeHandler}
              value={formData.city}
            />
          </div>
          <div>
            <Label>Country</Label>
            <Input
              type="text"
              name="country"
              onChange={inputChangeHandler}
              value={formData.country}
            />
          </div>
          <DialogFooter>
            {!loading ? (
              <Button
                type="submit"
                className="bg-primaryColor hover:bg-hoverPrimaryColor mt-4 w-full"
              >
                Proceed to payment
              </Button>
            ) : (
              <Button
                disabled
                type="submit"
                className="bg-primaryColor hover:bg-hoverPrimaryColor mt-4 w-full"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait...
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutConfirmPage;
