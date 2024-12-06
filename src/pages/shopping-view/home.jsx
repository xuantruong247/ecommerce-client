import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bannerOne from "../../assets/bannerOne.webp";
import bannerTwo from "../../assets/bannerTwo.jpg";
import bannerThree from "../../assets/bannerThree.avif";
import { Card, CardContent } from "../../components/ui/card";
import ShoppingProductTitle from "../../components/shopping-view/product-tile"; 
import ShoppingProductDetail from "../../components/shopping-view/product-detail"; 

const ShoppingHome = () => {
  const navigate = useNavigate();
  const slide = [bannerThree, bannerOne, bannerTwo];
  const [currentSlide, setCurrenSlide] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [openDetail, setOpenDetail] = useState(false); 

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:3000/api/v1/category", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        if (data && data.data) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const query = new URLSearchParams({
        limit: 12,
        hot: true,
        ...(searchKeyword && { name: searchKeyword }), 
      }).toString();

      const response = await fetch(`http://localhost:3000/api/v1/product?${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        console.error("Unauthorized! Token expired or invalid.");
        return;
      }

      const data = await response.json();
      if (data && data.data && data.data.items) {
        setProducts(data.data.items);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 500); 

    return () => clearTimeout(timeoutId);
  }, [searchKeyword]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrenSlide((prevSlide) => (prevSlide + 1) % slide.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Navigate to category listing
  const handleCategoryClick = (category) => {
    navigate(`/shop/listing?category=${category}`);
  };

  // Open product detail
  const handleProductDetail = (productId) => {
    setCurrentProductId(productId);
    setOpenDetail(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Slide Banner */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {slide.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${index === currentSlide ? "opacity-100" : "opacity-0"
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
                onClick={() => handleCategoryClick(item.name)}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <span className="font-bold">{item.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="container mx-auto px-4 my-4">
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Search for products..."
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Products Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ShoppingProductTitle
                key={product._id}
                product={product}
                productByDetail={handleProductDetail}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {openDetail && (
        <ShoppingProductDetail
          open={openDetail}
          setOpen={setOpenDetail}
          product={products.find((product) => product._id === currentProductId)}
        />
      )}
    </div>
  );
};

export default ShoppingHome;
