import React, { useEffect, useState } from "react";
import ProductFilter from "../../components/shopping-view/filter";
import ShoppingProductTitle from "./../../components/shopping-view/product-tile";
import axios from "axios";
import ShoppingProductDetail from "../../components/shopping-view/product-detail";

const ShoppingListing = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);



  const fetchGetProduct = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/product");
      if (response.data?.data?.items) {
        setProducts(response.data.data.items);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };


  const productByDetail = async (productId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/product/${productId}`
      );
      setCurrentProductId(response?.data?.data)
      setOpenDetail(true)
      
    } catch (error) {
      console.error("Có lỗi xảy ra khi gọi API:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGetProduct();
  }, []);


  const filteredProducts = selectedCategories.length
    ? products.filter((product) =>
        selectedCategories.includes(product.category)
      )
    : products;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">

      <ProductFilter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      <div className="w-full rounded-lg shadow-sm bg-muted/5">
        <div className="p-4 border-b">
          <h2 className="text-lg font-extrabold">All Products</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filteredProducts.map((product) => (
            <ShoppingProductTitle
              key={product._id}
              product={product}
              productByDetail={(id) => productByDetail(id)}
            />
          ))}
        </div>
      </div>
      <ShoppingProductDetail
        open={openDetail}
        setOpen={setOpenDetail}
        product={currentProductId}
      />
    </div>
  );
};

export default ShoppingListing;
