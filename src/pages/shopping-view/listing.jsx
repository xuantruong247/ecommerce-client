import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductFilter from "../../components/shopping-view/filter";
import ShoppingProductTitle from "./../../components/shopping-view/product-tile";
import axios from "axios";
import ShoppingProductDetail from "../../components/shopping-view/product-detail";

const ShoppingListing = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const categoryFromUrl = params.get("category"); 

  const [selectedCategories, setSelectedCategories] = useState(
    categoryFromUrl ? [categoryFromUrl] : []
  );
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false); 
  const [searchKeyword, setSearchKeyword] = useState(""); 
  const fetchGetProduct = async () => {
    setLoading(true); 
    try {
      const query = new URLSearchParams({
        ...(searchKeyword && { name: searchKeyword }),
      }).toString();

      const response = await axios.get(
        `http://localhost:3000/api/v1/product?${query}`
      );

      if (response.data?.data?.items) {
        setProducts(response.data.data.items);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  const productByDetail = async (productId) => {
    setLoadingDetail(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/product/${productId}`
      );
      setCurrentProductId(response?.data?.data);
      setOpenDetail(true);
    } catch (error) {
      console.error("Có lỗi xảy ra khi gọi API:", error);
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchGetProduct();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [categoryFromUrl, searchKeyword]);

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
        {/* Thanh tìm kiếm */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Search for products..."
            className="border rounded-md p-2 w-1/2"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {loading ? ( // Hiển thị loading khi đang tải sản phẩm
            <div>Loading products...</div>
          ) : (
            filteredProducts.map((product) => (
              <ShoppingProductTitle
                key={product._id}
                product={product}
                productByDetail={(id) => productByDetail(id)}
              />
            ))
          )}
        </div>
      </div>

      {openDetail && (
        <ShoppingProductDetail
          open={openDetail}
          setOpen={setOpenDetail}
          product={currentProductId}
        />
      )}
      {loadingDetail && <div>Loading product details...</div>} {/* Hiển thị loading khi đang tải chi tiết sản phẩm */}
    </div>
  );
};

export default ShoppingListing;
