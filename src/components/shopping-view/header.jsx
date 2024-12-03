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
  const [openMenu, setOpenMenu] = useState(false); // For mobile menu
  const [openCartSheet, setOpenCartSheet] = useState(false); // For cart
  const navigate = useNavigate();

  const users = true; // Replace this with actual user state logic

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/category");
        const data = await response.json();
        if (data?.data) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Logout function
  const onLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/auth/login');  // Navigate to login page after logout
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-muted/10">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>

        {/* Mobile menu */}
        <Sheet open={openMenu} onOpenChange={setOpenMenu}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <nav className="flex flex-col gap-6">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  onClick={() => setOpenMenu(false)}
                  className="text-sm font-medium"
                  to={`/shop/category/${category._id}`}
                >
                  {category.name}
                </Link>
              ))}
              {users ? (
                <UserActions
                  onCartOpen={() => setOpenCartSheet(true)}
                  onLogout={onLogout}  // Pass onLogout here
                  navigate={navigate}
                />
              ) : (
                <GuestLogin />
              )}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop menu */}
        <div className="hidden lg:flex lg:items-center lg:gap-6">
          <Link className="text-sm font-medium" to="/shop/listing">
            Store
          </Link>
          {categories.map((category) => (
            <Link
              key={category._id}
              className="text-sm font-medium"
              to={`/shop/category/${category._id}`}
            >
              {category.name}
            </Link>
          ))}
          {users ? (
            <UserActions
              onCartOpen={() => setOpenCartSheet(true)}
              onLogout={onLogout}  // Pass onLogout here
              navigate={navigate}
            />
          ) : (
            <GuestLogin />
          )}
        </div>

        {/* Cart Sheet */}
        <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
          <SheetContent side="right" className="p-0">
            <UserCartWrapper />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

const UserActions = ({ onCartOpen, onLogout, navigate }) => (
  <div className="flex items-center gap-4">
    <Button variant="outline" size="icon" onClick={onCartOpen}>
      <ShoppingCart className="w-6 h-6" />
      <span className="sr-only">User cart</span>
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="bg-black">
          <AvatarFallback className="bg-black text-white font-extrabold">T</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-56">
        <DropdownMenuLabel>Logged in as UserName</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/shop/account")}>
          <UserCog className="mr-2 h-4 w-4" />
          Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>  {/* Call onLogout */}
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

// Component for guest login
const GuestLogin = () => (
  <span className="bg-muted/30 hover:bg-muted/40 font-bold text-sm rounded-full h-10 w-20 items-center justify-center flex gap-1 cursor-pointer">
    <LogInIcon size={17} />
    <span>Login</span>
  </span>
);

export default ShoppingHeader;
