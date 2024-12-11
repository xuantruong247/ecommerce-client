import React, { Fragment, useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import AdminProductTitle from "../../components/admin-view/product-title";

const AdminProducts = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [price, setPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/category");
        const data = await response.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 0) {
      setPrice(Number(value));
    }
  };

  const uploadImage = async (file) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found.");
      return null;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/product/upload-image",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        return data.data;
      } else {
        console.error("Error uploading image:", data.message);
      }
    } catch (err) {
      console.error("An error occurred while uploading the image:", err);
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !description || !selectedCategory || !selectedFile || !price) {
      alert("Please fill in all required fields.");
      return;
    }

    const imageUrl = await uploadImage(selectedFile);
    if (!imageUrl) {
      alert("Image upload failed.");
      return;
    }

    const productData = {
      name: productName,
      category: selectedCategory,
      description,
      img: imageUrl,
      price: Number(price),
    };

    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch("http://localhost:3000/api/v1/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Product created successfully:", data);
        setOpenCreateProductDialog(false);
        setProductName("");
        setDescription("");
        setSelectedCategory("");
        setSelectedFile(null);
        setPrice("");
      } else {
        console.error("Error creating product:", data.message);
      }
    } catch (err) {
      console.error("An error occurred while creating the product:", err);
    }
  };

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add new product
        </Button>
      </div>
      <div>
        <AdminProductTitle />
        <Sheet
          open={openCreateProductDialog}
          onOpenChange={setOpenCreateProductDialog}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add new Product</SheetTitle>
            </SheetHeader>
            <div className="py-6">
              <form onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    placeholder="Enter your product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    placeholder="Enter your product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={handlePriceChange}
                    placeholder="Enter your price"
                    className="w-full border p-2 rounded"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="file">Upload File</Label>
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div className="flex items-center justify-center mt-5">
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  );
};

export default AdminProducts;
