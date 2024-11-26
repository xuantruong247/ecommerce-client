import React from "react";
import Imag from "../../assets/imgFllow.jpg";
import Address from "./../../components/shopping-view/address";
import UserCartItemsContent from "../../components/shopping-view/cart-item-content";

const ShoppingCheckout = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src={Imag}
          alt="img"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 m-5">
        <Address />
        <div className=" flex flex-col gap-4">
          <UserCartItemsContent />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
