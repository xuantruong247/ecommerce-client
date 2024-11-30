import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

const AdminProductTitle = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [categories, setCategories] = useState([]); // State to store categories
  const [loading, setLoading] = useState(true); // State to check loading status
  const [error, setError] = useState(null); // State to store error if any
  const [openEditDialog, setOpenEditDialog] = useState(false); // State to open/close edit dialog
  const [editProduct, setEditProduct] = useState(null); // State to store the product being edited

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading data
        const res = await fetch("http://localhost:3000/api/v1/product");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data.data.items); // Update state with fetched product data
        setLoading(false); // End loading
      } catch (error) {
        setError(error.message); // Store the error message
        setLoading(false); // End loading
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/category");
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await res.json();
        setCategories(data.data); // Update state with categories
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []); // Run only once when the component is mounted

  // If loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there is an error, show the error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]; // Lấy file được chọn
    if (file) {
      try {
        // Tạo FormData để gửi tệp lên API
        const formData = new FormData();
        formData.append("image", file);
  
        // Gửi yêu cầu POST tới API upload hình ảnh
        const res = await fetch("http://localhost:3000/api/v1/product/upload-image", {
          method: "POST",
          body: formData,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Nếu cần Authorization
          },
        });
  
        if (!res.ok) {
          throw new Error("Failed to upload image");
        }
  
        const responseData = await res.json(); // Đọc dữ liệu phản hồi dưới dạng JSON
        const imageUrl = responseData.data; // Lấy đường dẫn hình ảnh từ trường 'data'
        setEditProduct({ ...editProduct, img: imageUrl }); // Cập nhật trạng thái với URL hình ảnh
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image");
      }
    }
  };
  


  // Delete product handler
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

      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts); // Update product list after deletion
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  // Edit button click handler
  const handleEdit = (product) => {
    setEditProduct(product); // Set the selected product in the state
    setOpenEditDialog(true); // Open the edit modal
  };

  // Update product handler
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
  
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("No access token found!");
      return;
    }
  
    try {
      // Remove unwanted fields, e.g., "hot"
      const { _id, createdAt, updatedAt, __v, hot, ...updatedProductWithoutUnwantedFields } = editProduct;
  
      // Ensure price is a number
      const updatedProduct = {
        ...updatedProductWithoutUnwantedFields,
        price: Number(updatedProductWithoutUnwantedFields.price),
      };
  
      console.log("Payload being sent:", updatedProduct); // Log the payload to check
  
      const res = await fetch(`http://localhost:3000/api/v1/product/${editProduct._id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct), // Send the payload without unwanted fields
      });
  
      if (!res.ok) {
        throw new Error("Failed to update product");
      }
  
      const updatedProductData = await res.json();
  
      // Cập nhật lại sản phẩm trong state
      setProducts(
        products.map((product) =>
          product._id === updatedProductData.data._id ? updatedProductData.data : product
        )
      );
  
      // Reload lại danh sách sản phẩm từ API sau khi cập nhật
      const reloadProducts = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/v1/product");
          const data = await response.json();
          setProducts(data.data.items); // Cập nhật lại danh sách sản phẩm
        } catch (error) {
          console.error("Error fetching products after update:", error);
        }
      };
  
      await reloadProducts(); // Gọi lại API để reload danh sách sản phẩm
  
      setOpenEditDialog(false); // Đóng modal
      alert("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };
  
  

  return (
    <>
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
                      <Button onClick={() => handleEdit(product)}>Edit</Button>
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

      {/* Edit Product Modal */}
      <Sheet open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Edit Product</SheetTitle>
          </SheetHeader>
          {editProduct && (
            <form onSubmit={handleUpdateProduct}>
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={editProduct.name}
                  onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={editProduct.category}
                  onValueChange={(value) => setEditProduct({ ...editProduct, category: value })}
                >
                  <SelectTrigger>
                    <span>{editProduct.category || "Select Category"}</span>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editProduct.description}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="img">Chọn hình ảnh</Label>
                <Input
                  id="img"
                  type="file"
                  onChange={handleImageChange}
                />
              </div>

              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  id="price"
                  value={editProduct.price}
                  onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                />
              </div>
              <Button type="submit">Update Product</Button>
            </form>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProductTitle;
