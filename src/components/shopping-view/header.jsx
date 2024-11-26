import React, { useState, useEffect } from "react";
import {
  HousePlug,
  LogInIcon,
  LogOut,
  Menu,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import UserCartWrapper from "./cart-wrapper";

const ShoppingHeader = () => {
  const [categories, setCategories] = useState([]); // State to store categories
  const [open, setOpen] = useState(false);
  const [openCartSheet, setOpenCartSheet] = useState(false);

  const users = true; // Replace this with actual user state logic
  const navigate = useNavigate();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/category");
        const data = await response.json();
        if (data && data.data) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-muted/10">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to={"/shop/home"} className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium"
                  to={`/shop/category/${category._id}`} // Assuming categories have unique IDs
                >
                  {category.name}
                </Link>
              ))}
              {users ? (
                <div className="flex lg:items-center lg:flex-row flex-col gap-4">
                  <Sheet
                    open={openCartSheet}
                    onOpenChange={() => setOpenCartSheet(false)}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setOpenCartSheet(true)}
                    >
                      <ShoppingCart className="w-6 h-6" />
                      <span className="sr-only">User cart</span>
                    </Button>
                    <UserCartWrapper />
                  </Sheet>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar className="bg-black">
                        <AvatarFallback className="bg-black text-white font-extrabold">
                          {/* UserName[0].toUpperCase  */}T
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" className="w-56">
                      <DropdownMenuLabel>
                        Logged in as userName
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {
                          navigate("/shop/account");
                          setOpen(false);
                        }}
                      >
                        <UserCog className="mr-2 h-4 w-4" />
                        Account
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <span className="bg-muted/30 hover:bg-muted/40 font-bold text-sm rounded-full h-10 w-20 items-center justify-center flex gap-1 cursor-pointer">
                  <LogInIcon size={17} /> <span>Login</span>
                </span>
              )}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
            <Link className="text-sm font-medium" to={"/shop/listing"}>
              Store
            </Link>
            {categories.map((category) => (
              <Link
                key={category._id}
                className="text-sm font-medium"
                to={`/shop/listing`}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden lg:block">
          {users ? (
            <div className="flex lg:items-center lg:flex-row flex-col gap-4">
              <Sheet
                open={openCartSheet}
                onOpenChange={() => setOpenCartSheet(false)}
              >
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setOpenCartSheet(true)}
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span className="sr-only">User cart</span>
                </Button>
                <UserCartWrapper />
              </Sheet>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="bg-black">
                    <AvatarFallback className="bg-black text-white font-extrabold">
                      {/* UserName[0].toUpperCase  */}T
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-56">
                  <DropdownMenuLabel>Logged in as userName</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate("/shop/account")}
                  >
                    <UserCog className="mr-2 h-4 w-4" />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <span className="bg-muted/30 hover:bg-muted/40 font-bold text-sm rounded-full h-10 w-20 items-center justify-center flex gap-1 cursor-pointer">
              <LogInIcon size={17} /> <span>Login</span>
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
