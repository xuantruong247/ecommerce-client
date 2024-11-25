import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const ProductFilter = ({ selectedCategories, setSelectedCategories }) => {
  const [categories, setCategories] = useState([]); // Lưu danh mục từ API

  // Gọi API để lấy danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/category");
        const data = await response.json();
        if (data && data.data) {
          setCategories(data.data); // Gán danh mục từ API
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []); // Chỉ gọi API 1 lần khi component mount

  // Xử lý khi checkbox thay đổi
  const handleCheckboxChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      // Nếu đã chọn, bỏ khỏi danh sách
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      // Nếu chưa chọn, thêm vào danh sách
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className="bg-muted/5 rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        <Label>Category</Label>
        {categories.map((item) => (
          <div key={item.name}>
            <Label className="flex items-center gap-2 font-medium">
              {/* Hiển thị trạng thái checkbox */}
              <input
                type="checkbox"
                checked={selectedCategories.includes(item.name)} // Kiểm tra xem danh mục đã được chọn chưa
                onChange={() => handleCheckboxChange(item.name)} // Cập nhật danh sách khi thay đổi
              />
              {item.name}
            </Label>
          </div>
        ))}
      </div>
      <Separator />
    </div>
  );
};

export default ProductFilter;
