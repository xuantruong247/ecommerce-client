import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const ShoppingProductTitle = ({ product }) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src="https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-16-pro_1.png"
            alt="iphone 16"
            className="w-full h-[400px] object-cover rounded-t-lg"
          />
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            Sale
          </Badge>
        </div>
        <CardContent>
          <h2 className="text-xl">Iphone 16</h2>
          <h2 className="text-sm text-muted">
            Category: <span>Category 1</span>
          </h2>
          <div className="text-lg text-red-500 font-bold ">30.000.000vnd</div>
        </CardContent>
        <CardFooter>
            <Button className="w-full">
                Add to cart
            </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ShoppingProductTitle;
