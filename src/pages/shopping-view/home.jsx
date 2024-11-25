import React, { useEffect, useState } from "react";
import bannerOne from "../../assets/bannerOne.webp";
import bannerTwo from "../../assets/bannerTwo.jpg";
import bannerThree from "../../assets/bannerThree.avif";
import { Button } from "../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { filterByCategory } from "../../components/config/index";
import { Card, CardContent } from "../../components/ui/card";

const ShoppingHome = () => {
  const slide = [bannerThree, bannerOne, bannerTwo];
  const [currentSlide, setCurrenSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrenSlide((prevSlide) => (prevSlide + 1) % slide.length);
    }, 2000);
    return ()=> clearInterval(timer)
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
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
          onClick={() => (prevSlide) =>
            (prevSlide - 1 + slide.length) % slide.length}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          onClick={() => (prevSlide) => (prevSlide + 1) % slide.length}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center">Shop by category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filterByCategory.map((item) => (
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent
                  key={item.id}
                  className="flex flex-col items-center justify-center p-6"
                >
                  <span className="font-bold">{item.label}</span>
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
