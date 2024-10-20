import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import CheckoutConfirmPage from "./CheckoutConfirmPage";
import { useCartStore } from "@/store/useCartStore";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { cart, incrementQuantity, decrementQuantity, removeFromCart } = useCartStore();

  let totalAmout = cart.reduce((acc: any, element: any)=> {
    return acc + element.price*element.quantity;
  }, 0)

  return (
    <div className="w-full h-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item: any) => (
            <TableRow>
              <TableCell>
                <Avatar>
                  <AvatarImage src={item.image} alt="img" />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>
                <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                  <Button
                  onClick={()=>{
                    decrementQuantity(item._id);
                  }}
                    className="rounded-full bg-gray-400 opacity-60 hover:bg-gray-600 text-white"
                    size={"icon"}
                    variant={"outline"}
                  >
                    <Minus />
                  </Button>
                  <Button
                    disabled
                    variant={"outline"}
                    size={"icon"}
                    className="font-bold rounded-full border-none"
                  >
                    {item.quantity}
                  </Button>
                  <Button
                  onClick={()=>{
                    incrementQuantity(item._id);
                  }}
                    className="rounded-full bg-primaryColor hover:bg-hoverPrimaryColor text-white"
                    size={"icon"}
                    variant={"outline"}
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{item.price * item.quantity}</TableCell>
              <TableCell className="text-end">
                <Button
                onClick={()=>{
                    removeFromCart(item._id)
                }}
                  size={"sm"}
                  className="bg-primaryColor hover:bg-hoverPrimaryColor"
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="text-2xl font-bold">
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-end">{totalAmout}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <Button
          onClick={() => setOpen(true)}
          className="bg-primaryColor hover:bg-hoverPrimaryColor"
        >
          Proceed to checkout
        </Button>
      </div>

      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
