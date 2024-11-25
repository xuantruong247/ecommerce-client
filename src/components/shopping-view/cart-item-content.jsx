import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";

const UserCartItemsContent = () => {
  return (
    <div className="flex items-center space-x-4">
      <img
        src="https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-16-pro_1.png"
        alt="iphone 16"
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">Iphone 16</h3>
        <div className="flex gap-2 items-center">
          <div className="flex items-center mt-1">
            <Button variant="outline" className="h-8 w-8" size="icon">
              <Minus className="w-4 h-4" />
            </Button>
          </div>
          <p>1</p>
          <div className="flex items-center mt-1">
            <Button variant="outline" className="h-8 w-8" size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold">30.000.000vnd</p>
          <Trash className="cursor-pointer mt-1" size={20}/>
        </div>
      </div>
    </div>
  );
};

export default UserCartItemsContent;
