import React, { useState } from "react";
import ProductFilter from "../../components/shopping-view/filter";
import ShoppingProductTitle from "./../../components/shopping-view/product-tile";

const ShoppingListing = () => {
  const [selectedCategories, setSelectedCategories] = useState([]); // State to store selected categories

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
          <ShoppingProductTitle selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
