import React, { useState, useEffect } from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-item-content";
import { useNavigate } from "react-router-dom";

const UserCartWrapper = ({ setOpenCartSheet }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Gọi API để lấy dữ liệu giỏ hàng
  useEffect(() => {
    const fetchCartData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found!");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/v1/order", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }

        const result = await response.json();
        const items = result.data || [];
        setCartItems(items);

      } catch (error) {
        console.error("Error fetching cart data:", error.message);
      }
    };

    fetchCartData();
  }, []);

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        <UserCartItemsContent cartItems={cartItems} />
      </div>
      <div className="mt-8 space-y-4">
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">{item.total} vnd</span>
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-5"
      >
        Checkout
      </Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
