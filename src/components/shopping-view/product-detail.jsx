import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";

const ShoppingProductDetail = ({ open, setOpen, productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Gọi API khi mở modal
  useEffect(() => {
    if (open) {
      const fetchProductDetail = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/v1/product/${productId}`);
          const data = await response.json();
          
          if (data.statusCode === 200) {
            setProduct(data.data); // Lưu thông tin sản phẩm vào state
          } else {
            console.error("Không tìm thấy sản phẩm.");
          }
        } catch (error) {
          console.error("Có lỗi xảy ra khi gọi API:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProductDetail();
    }
  }, [open, productId]);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (!product) {
    return <div>Không có dữ liệu sản phẩm.</div>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={product.img}
            alt={product.name}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="grid gap-6">
          <div>
            <h1 className="text-3xl font-extrabold">{product.name}</h1>
            <p className="text-muted">{product.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">{product.price} VND</p>
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Đóng
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShoppingProductDetail;
