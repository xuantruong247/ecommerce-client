import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const ShoppingProductTitle = ({ product,productByDetail }) => {
  const { img, name, category, price, hot, _id } = product;


  const handleAddToCart = async () => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("You need to log in first.");
        return;
      }

      // Gọi API để thêm sản phẩm vào giỏ hàng
      const response = await fetch(`http://localhost:3000/api/v1/order?productID=${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Truyền token vào header
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert("Product added to cart successfully!");
      } else {
        console.error("Failed to add product to cart:", data.message);
        alert(data.message || "Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="relative" onClick={()=>productByDetail(_id)}>
        
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
        <Button className="w-full" onClick={handleAddToCart}>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTitle;
