import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductFilter from "../../components/shopping-view/filter";
import ShoppingProductTitle from "./../../components/shopping-view/product-tile";
import axios from "axios";
import ShoppingProductDetail from "../../components/shopping-view/product-detail";
import ShoppingFooter from "../../components/shopping-view/footer";


const ShoppingPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const productByDetail = (id) => {
    setOpenDetail(true);
    setCurrentProductId(id);
    // Fetch product details logic here
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Nội dung chính */}
      <div className="flex flex-1">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6 w-full">
          {/* Sidebar: Bộ lọc sản phẩm */}
          <ProductFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />

          {/* Nội dung sản phẩm */}
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

            {/* Danh sách sản phẩm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {loading ? (
                <div>Loading products...</div> // Hiển thị khi đang tải sản phẩm
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
        </div>

        {/* Chi tiết sản phẩm */}
        {openDetail && (
          <ShoppingProductDetail
            open={openDetail}
            setOpen={setOpenDetail}
            product={currentProductId}
          />
        )}

        {/* Hiển thị loading khi đang tải chi tiết sản phẩm */}
        {loadingDetail && <div>Loading product details...</div>}
      </div>

      {/* Footer nằm ngoài nội dung chính */}
      <ShoppingFooter />
    </div>
  );
};

export default ShoppingPage;
