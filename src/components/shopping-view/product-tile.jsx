import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const ShoppingProductTitle = ({ selectedCategories }) => {
  const [products, setProducts] = useState([]);

  // Gọi API để lấy danh sách sản phẩm với các category đã chọn
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoryQuery = selectedCategories.length
          ? `?category=${selectedCategories.join("&category=")}`
          : ""; // Nếu có các category đã chọn, gắn chúng vào query string

        const response = await fetch(`http://localhost:3000/api/v1/product${categoryQuery}`);
        const data = await response.json();
        if (data?.statusCode === 200) {
          setProducts(data.data.items || []);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [selectedCategories]); // Gọi lại API mỗi khi selectedCategories thay đổi

  return (
    <div className="w-full flex flex-wrap max-w-sm mx-auto">
      {products.map((product) => (
        <Card key={product._id} className="w-full max-w-sm mx-auto">
          <div>
            <div className="relative">
              <img
                src={product.img || "https://via.placeholder.com/400"}
                alt={product.name || "Product"}
                className="w-full h-[400px] object-cover rounded-t-lg"
              />
              {product.hot > 0 && (
                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                  Sale
                </Badge>
              )}
            </div>
            <CardContent>
              <h2 className="text-xl">{product.name}</h2>
              <h2 className="text-sm text-muted">
                Category: <span>{product.category || "Uncategorized"}</span>
              </h2>
              <div className="text-lg text-red-500 font-bold">
                {product.price.toLocaleString()} VND
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add to cart</Button>
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ShoppingProductTitle;
