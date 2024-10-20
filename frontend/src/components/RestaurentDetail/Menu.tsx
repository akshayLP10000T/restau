import { IndianRupee } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router-dom";

type Props = {
  data: any;
};

const Menu = (props: Props) => {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  return (
    <div className="w-full h-full">
      <h1 className="font-extrabold mt-6 text-2xl">Available Menus</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 space-y-4 md:space-y-4 space-x-3 w-full">
        {props.data.map((item: any, idx: number) => (
          <Card
            key={idx}
            className="shadow-lg rounded-lg overflow-hidden mt-4 w-full flex flex-col"
          >
            <img
              className="w-full h-40 object-cover"
              src={item.image}
              alt="img"
            />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {item.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              <h3 className="flex gap-2 items-center">
                Price:{" "}
                <span className="text-primaryColor flex items-center">
                  <IndianRupee size={20} />
                  {item.price}
                </span>
              </h3>
            </CardContent>
            <CardFooter className="p-2 align-bottom flex-1 flex">
              <Button
                onClick={() => {
                  addToCart(item)
                  navigate("/cart")
                }}
                className="bg-primaryColor hover:bg-hoverPrimaryColor w-full mt-auto"
              >
                Add to cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Menu;
