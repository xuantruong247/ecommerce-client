import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bannerOne from "../../assets/bannerOne.webp";
import bannerTwo from "../../assets/bannerTwo.jpg";
import bannerThree from "../../assets/bannerThree.avif";
import { Card, CardContent } from "../../components/ui/card";

const ShoppingHome = () => {
  const navigate = useNavigate();
  const slide = [bannerThree, bannerOne, bannerTwo];
  const [currentSlide, setCurrenSlide] = useState(0);
  const [categories, setCategories] = useState([]);

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

  // Xử lý tự động chuyển slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrenSlide((prevSlide) => (prevSlide + 1) % slide.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Chuyển hướng đến trang shop/listing với category đã chọn
  const handleCategoryClick = (category) => {
    navigate(`/shop/listing?category=${category}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Slide Banner */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {slide.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant={"outline"}
          size={"icon"}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrenSlide((prevSlide) => (prevSlide - 1 + slide.length) % slide.length)
          }
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrenSlide((prevSlide) => (prevSlide + 1) % slide.length)
          }
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center">Shop by category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((item) => (
              <Card
                key={item._id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleCategoryClick(item.name)} // Chuyển hướng khi bấm vào danh mục
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <span className="font-bold">{item.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingHome;
