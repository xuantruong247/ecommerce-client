import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const ShoppingProductTitle = ({ product }) => {
  const { img, name, category, price, hot } = product;

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="relative">
        <img
          src={img || "https://via.placeholder.com/400"}
          alt={name || "Product"}
          className="w-full h-[400px] object-cover rounded-t-lg"
        />
        {hot > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            Sale
          </Badge>
        )}
      </div>
      <CardContent>
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-sm text-muted">
          Category: <span>{category || "Uncategorized"}</span>
        </p>
        <div className="text-lg text-red-500 font-bold">{price} VND</div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add to cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTitle;
