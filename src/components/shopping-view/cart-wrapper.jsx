import React, { useState, useEffect } from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-item-content";
import { useNavigate } from "react-router-dom";

const UserCartWrapper = ({ setOpenCartSheet }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false); // Trạng thái để điều khiển modal
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái modal
  const navigate = useNavigate();

  // Gọi API để lấy dữ liệu giỏ hàng
  useEffect(() => {
    const fetchCartData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found!");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/v1/order", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }

        const result = await response.json();
        const items = result.data || [];
        setCartItems(items);

      } catch (error) {
        console.error("Error fetching cart data:", error.message);
      }
    };

    fetchCartData();
  }, [navigate]);

  const totalAmount = cartItems.reduce((total, item) => total + (item.total || 0), 0);

  const handleUpdateOrderInfo = async (orderId) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token not found!");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/order/infor/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ address, phone, recipientName }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order info");
      }

      console.log("Order info updated successfully");

      // Sau khi cập nhật thông tin, cập nhật trạng thái đơn hàng
      await updateOrderStatus(orderId);
    } catch (error) {
      console.error("Error updating order info:", error.message);
    }
  };

  const updateOrderStatus = async (orderId) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token not found!");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/order/status/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status: "completed" }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      console.log("Order status updated successfully");
      
      // Refresh trang sau khi cập nhật thành công
      window.location.reload(); // Làm mới trang

    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  };

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        <UserCartItemsContent cartItems={cartItems} />
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">{totalAmount} vnd</span>
        </div>
      </div>
      <Button
        onClick={() => setIsModalOpen(true)} // Mở modal khi bấm Checkout
        className="w-full mt-5"
      >
        Checkout
      </Button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Update Order Information</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const orderId = cartItems[0]?._id; 
                if (orderId) {
                  handleUpdateOrderInfo(orderId);
                  setIsModalOpen(false); // Đóng modal sau khi submit
                }
              }}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block font-bold">Address</label>
                  <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block font-bold">Phone</label>
                  <input
                    id="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="recipientName" className="block font-bold">Recipient Name</label>
                  <input
                    id="recipientName"
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <Button type="submit" className="w-full mt-5">
                  Submit Information
                </Button>
              </div>
            </form>
            <Button
              onClick={() => setIsModalOpen(false)} // Đóng modal khi nhấn hủy
              className="w-full mt-3 bg-gray-500"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </SheetContent>
  );
};

export default UserCartWrapper;
