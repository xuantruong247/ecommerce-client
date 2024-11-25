import {
  HousePlug,
  LogInIcon,
  LogOut,
  Menu,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import React, { useState } from "react";
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

const ShoppingHeader = () => {
  const users = true;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
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
              <Link
                onClick={() => setOpen(false)}
                className="text-sm font-medium"
                to=""
              >
                Category 1
              </Link>
              <Link
                onClick={() => setOpen(false)}
                className="text-sm font-medium"
                to=""
              >
                Category 2
              </Link>
              <Link
                onClick={() => setOpen(false)}
                className="text-sm font-medium"
                to=""
              >
                Category 3
              </Link>
              <Link
                onClick={() => setOpen(false)}
                className="text-sm font-medium"
                to=""
              >
                Category 4
              </Link>
              <Link
                onClick={() => setOpen(false)}
                className="text-sm font-medium"
                to=""
              >
                Category 5
              </Link>
              {users ? (
                <div className="flex lg:items-center lg:flex-row flex-col gap-4">
                  <Button variant="outline" size="icon">
                    <ShoppingCart className="w-6 h-6" />
                    <span className="sr-only">User cart</span>
                  </Button>
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
            <Link className="text-sm font-medium" to="">
              Category 1
            </Link>
            <Link className="text-sm font-medium" to="">
              Category 2
            </Link>
            <Link className="text-sm font-medium" to="">
              Category 3
            </Link>
            <Link className="text-sm font-medium" to="">
              Category 4
            </Link>
            <Link className="text-sm font-medium" to="">
              Category 5
            </Link>
          </nav>
        </div>
        <div className="hidden lg:block">
          {users ? (
            <div className="flex lg:items-center lg:flex-row flex-col gap-4">
              <Button variant="outline" size="icon">
                <ShoppingCart className="w-6 h-6" />
                <span className="sr-only">User cart</span>
              </Button>
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
