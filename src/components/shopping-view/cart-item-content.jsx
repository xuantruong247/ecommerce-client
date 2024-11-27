import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";

const UserCartItemsContent = () => {
  const [orderData, setOrderData] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [quantities, setQuantities] = useState({}); // Lưu trữ số lượng của từng sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái loading khi đang lấy dữ liệu

  useEffect(() => {
    const fetchOrderData = async () => {
      // Lấy userID từ accessToken trong LocalStorage
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          // Gọi API lấy dữ liệu order
          const response = await fetch("http://localhost:3000/api/v1/order", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = await response.json();
          if (data.statusCode === 200 && data.data.length > 0) {
            // Giả sử lấy dữ liệu đơn hàng đầu tiên trong danh sách
            const order = data.data[0];
            setProductDetails(order.productDetails);

            // Cập nhật số lượng cho từng sản phẩm
            const initialQuantities = order.productDetails.reduce((acc, item) => {
              acc[item.product._id] = item.quantity;
              return acc;
            }, {});
            setQuantities(initialQuantities); // Lưu trữ số lượng vào state
          }
        } catch (error) {
          console.error("Error fetching order data:", error);
          alert("Lỗi khi lấy dữ liệu, vui lòng thử lại!");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrderData();
  }, []); // Chỉ gọi khi component mount

  const handleIncrease = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  const handleDecrease = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] > 1 ? prevQuantities[productId] - 1 : 1,
    }));
  };

  const handleRemove = async (productId) => {
    const accessToken = localStorage.getItem("accessToken");
    
    if (accessToken) {
      try {
        // Gọi API để xóa sản phẩm khỏi giỏ hàng
        const response = await fetch(`http://localhost:3000/api/v1/order/dele-from-cart-ALL?productID=${productId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        
        if (response.status === 200 && data.statusCode === 200) {
          // Xóa sản phẩm khỏi state nếu xóa thành công
          setProductDetails((prevDetails) => prevDetails.filter(item => item.product._id !== productId));
          setQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities };
            delete newQuantities[productId];
            return newQuantities;
          });
          alert("Sản phẩm đã được xóa khỏi giỏ hàng");
        } else {
          alert("Có lỗi xảy ra khi xóa sản phẩm, vui lòng thử lại!");
        }
      } catch (error) {
        console.error("Error removing product from cart:", error);
        alert("Lỗi khi xóa sản phẩm, vui lòng thử lại!");
      }
    } else {
      alert("Vui lòng đăng nhập để thực hiện thao tác này!");
    }
  };

  const getTotalPrice = () => {
    return productDetails.reduce((total, item) => {
      return total + item.product.price * (quantities[item.product._id] || 1);
    }, 0);
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (!productDetails.length) {
    return <p>Giỏ hàng của bạn trống!</p>; // Nếu không có sản phẩm trong giỏ hàng
  }

  return (
    <div>
      {productDetails.map((item) => (
        <div key={item.product._id} className="flex items-center space-x-4">
          <img
            src={item.product.img || "https://via.placeholder.com/150"} // Cung cấp giá trị mặc định nếu không có ảnh
            alt={item.product.name}
            className="w-20 h-20 rounded object-cover"
          />
          <div className="flex-1">
            <h3 className="font-extrabold">{item.product.name}</h3>
            <div className="flex gap-2 items-center">
              <div className="flex items-center mt-1">
                <Button variant="outline" className="h-8 w-8" size="icon" onClick={() => handleDecrease(item.product._id)}>
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
              <p>{quantities[item.product._id]}</p> {/* Hiển thị số lượng từ state */}
              <div className="flex items-center mt-1">
                <Button variant="outline" className="h-8 w-8" size="icon" onClick={() => handleIncrease(item.product._id)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="font-semibold">{item.product.price * quantities[item.product._id]} vnd</p> {/* Tính tổng tiền */}
              <Trash className="cursor-pointer mt-1" size={20} onClick={() => handleRemove(item.product._id)} />
            </div>
          </div>
        </div>
      ))}
      {/* <div className="flex justify-end mt-4">
        <p className="font-semibold">Tổng tiền: {getTotalPrice()} vnd</p>
      </div> */}
    </div>
  );
};

export default UserCartItemsContent;
