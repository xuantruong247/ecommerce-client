import React, { useEffect, useState } from "react";
import { DialogContent } from "../../components/ui/dialog";
import { Separator } from "../../components/ui/separator";
import { Label } from "../../components/ui/label";
import { Status } from "../../components/config";
import { Button } from "../../components/ui/button";
const   AdminOrderDetail = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Access token not found in localStorage");
      setError("Access token is required.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/api/v1/order/${orderId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setOrderDetails(data.data);
        } else {
          setError(data.message || "Failed to fetch order details.");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("An error occurred while fetching the order details.");
        setLoading(false);
      });
  }, [orderId]);

  const handleUpdateStatus = async () => {
    if (isUpdating) return;
    
    if (!selectedStatus) {
      alert("Please select a status before updating.");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Access token not found in localStorage");
      setError("Access token is required.");
      return;
    }

    setIsUpdating(true);

    try {
      const response = await fetch(`http://localhost:3000/api/v1/order/confirm-payment/${orderId}?status=${selectedStatus}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json();
      
      if (data.statusCode === 200) {
        alert("Order status updated successfully!");
        window.location.href = "/admin/orders";
        window.location.reload();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred while updating the order status.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!orderDetails) {
    return <div>No order details found</div>;
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label htmlFor="">{orderDetails._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label htmlFor="">{new Date(orderDetails.createdAt).toLocaleDateString()}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label htmlFor="">{orderDetails.total.toLocaleString()} VND</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label htmlFor="">{orderDetails.status || "N/A"}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Address</p>
            <Label htmlFor="">{orderDetails.address || "N/A"}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Phone</p>
            <Label htmlFor="">{orderDetails.phone || "N/A"}</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails.productDetails.map((item, index) => (
                <li className="flex items-center justify-between" key={index}>
                  <span>{item.product.name}</span>
                  <span>{(item.product.price * item.quantity).toLocaleString()} VND</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted">
              <span>{orderDetails.shippingInfo?.name || "N/A"}</span>
              <span>{orderDetails.shippingInfo?.address || "N/A"}</span>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <Label>Status</Label>
          <select 
            id="status" 
            className="w-full border p-2 rounded"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Select a status</option>
            {Status.map((statusItem) => (
              <option value={statusItem.id} key={statusItem.id}>
                {statusItem.label}
              </option>
            ))}
          </select>
        </div>
        <Button 
          className="w-full" 
          onClick={handleUpdateStatus}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Order Status"}
        </Button>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetail;