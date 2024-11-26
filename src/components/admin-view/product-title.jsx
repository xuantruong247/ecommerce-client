import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

const AdminProductTitle = () => {
  const [products, setProducts] = useState([]); // Khởi tạo state để lưu trữ sản phẩm
  const [loading, setLoading] = useState(true); // State để kiểm tra trạng thái tải dữ liệu
  const [error, setError] = useState(null); // State để lưu lỗi khi fetch dữ liệu

  // Gọi API để lấy dữ liệu sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Bắt đầu tải dữ liệu
        const res = await fetch("http://localhost:3000/api/v1/product");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data.data.items); // Cập nhật state với dữ liệu sản phẩm từ data.items
        setLoading(false); // Dữ liệu đã được tải xong
      } catch (error) {
        setError(error.message); // Lưu lỗi vào state
        setLoading(false); // Kết thúc quá trình tải dữ liệu
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(); // Gọi hàm fetchProducts khi component render
  }, []); // Chạy một lần khi component được mount

  // Nếu đang tải dữ liệu, hiển thị loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Nếu có lỗi khi tải dữ liệu, hiển thị thông báo lỗi
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Hàm xử lý khi bấm nút delete
  const handleDelete = async (id) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("No access token found!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/v1/product/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      const updatedProducts = products.filter(product => product._id !== id);
      setProducts(updatedProducts); // Cập nhật lại danh sách sản phẩm sau khi xóa
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product ID</TableHead>
              <TableHead>Product Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Product Price</TableHead>
              <TableHead>
                <span className="sr-only">Action</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product._id}</TableCell>
                  <TableCell>
                    <img
                      src={product.img}
                      alt={product.name}
                      width="80"
                      height="80"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price} VND</TableCell>
                  <TableCell className="flex flex-col gap-2">
                    <Button>Edit</Button>
                    <Button onClick={() => handleDelete(product._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No products found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminProductTitle;
