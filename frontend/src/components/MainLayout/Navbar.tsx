import {
  HandPlatter,
  Loader2,
  Menu,
  Moon,
  PackageIcon,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";


const Navbar = () => {
  const { logout, user, loading } = useUserStore();
  const navigate = useNavigate();
  const { cart } = useCartStore();

  return (
    <nav className="flex items-center justify-between md:px-9 px-4 md:py-7 py-3 w-full">
      <div className="flex items-center justify-between w-full h-14">
        <Link to={"/"}>
          <h1 className="font-bold md:font-extrabold text-2xl">EatYourMeal</h1>
        </Link>

        <div className="hidden md:flex items-center lg:gap-10 gap-3">
          <div className="hidden md:flex items-center lg:gap-6 gap-2">
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            <Link to={"/order/status"}>Order</Link>
          </div>
          <div>
            {user?.admin && (
              <Menubar className="cursor-pointer">
                <MenubarMenu>
                  <MenubarTrigger className="cursor-pointer">
                    Dashboard
                  </MenubarTrigger>
                  <MenubarContent>
                    <Link to={"/admin/restaurent"}>
                      <MenubarItem className="cursor-pointer">
                        Restaurent
                      </MenubarItem>
                    </Link>
                    <Link to={"/admin/menu"}>
                      <MenubarItem className="cursor-pointer">Menu</MenubarItem>
                    </Link>
                    <Link to={"/admin/orders"}>
                      <MenubarItem className="cursor-pointer">
                        Orders
                      </MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Link to={"/cart"} className="relative cursor-pointer">
            <ShoppingCart />
            <Button
              size={"icon"}
              className="absolute -inset-y-3 left-2 text-xs rounded-full h-4 w-4 bg-red-500 hover:bg-red-700"
            >
              {cart.length}
            </Button>
          </Link>
          <div>
            <Avatar>
              <AvatarImage />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
          </div>
          <div>
            {loading ? (
              <Button className="bg-primaryColor hover:bg-hoverPrimaryColor">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button
                className="bg-primaryColor hover:bg-hoverPrimaryColor"
                onClick={async ()=>{
                  await logout();
                  navigate("/login", {replace: true});
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
        <div className="md:hidden lg:hidden">
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const { logout, user, loading } = useUserStore();
  const navigate = useNavigate();
  const { cart } = useCartStore();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full bg-gray-200 text-black hover:bg-gray-300"
          variant={"outline"}
        >
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle className="font-bold">EatYourMeal</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                Light
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator className="my-2" />
        <SheetDescription className="flex-1">
          <Link
            to={"/profile"}
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <User />
            <span>Profile</span>
          </Link>
          <Link
            to={"/profile"}
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <HandPlatter />
            <span>Order</span>
          </Link>
          <Link
            to={"/profile"}
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <ShoppingCart />
            <span>Cart ({cart.length})</span>
          </Link>
          {user?.admin && (
            <>
              <Link
                to={"/admin/menu"}
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <SquareMenu />
                <span>Menu</span>
              </Link>
              <Link
                to={"/admin/restaurent"}
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <UtensilsCrossed />
                <span>Restaurent</span>
              </Link>
              <Link
                to={"/admin/orders"}
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <PackageIcon />
                <span>Restaurent Orders</span>
              </Link>
            </>
          )}
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-4">
        <div className="flex items-center flex-row gap-2">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
          <h1 className="font-bold">Akshay Sharma</h1>
        </div>
        <SheetClose asChild>
          {loading ? (
            <Button
              type="submit"
              className="hover:bg-hoverPrimaryColor bg-primaryColor"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="hover:bg-hoverPrimaryColor bg-primaryColor"
              onClick={async ()=>{
                await logout();
                navigate("/login", {replace: true});
              }}
            >
              Logout
            </Button>
          )}
        </SheetClose>
      </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
