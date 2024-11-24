import React from "react";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const CardProduct = () => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src="https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-16-pro_1.png"
            alt="iphone 16"
            className="w-full h-[400px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl mb-2">Iphone 16</h2>
          <div className="text-lg text-red-500 font-bold ">30.000.000vnd</div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button>Edit</Button>
          <Button className="bg-red-500 hover:bg-red-600">Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default CardProduct;
