import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import AdminOrderDetail from "../../pages/admin-view/order-detail";

const AdminOrdersCpn = () => {
  const [openDetail, setOpenDetail] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Access token not found in localStorage");
      return;
    }

    fetch("http://localhost:3000/api/v1/order", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setOrders(data.data);
        } else {
          console.error("Error fetching orders:", data.message);
        }
      })
      .catch((error) => console.error("Error fetching orders:", error));
  };

  useEffect(() => {
    fetchOrders(); // Gọi API lấy danh sách đơn hàng
  }, []);

  const handleViewDetails = (orderId) => {
    setSelectedOrder(orderId);
    setOpenDetail(true);
  };

  const handleStatusUpdate = () => {
    fetchOrders(); // Cập nhật lại danh sách đơn hàng sau khi cập nhật trạng thái
    setOpenDetail(false); // Đóng dialog sau khi cập nhật
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{order.status || "N/A"}</TableCell>
                <TableCell>{order.total.toLocaleString()} VND</TableCell>
                <TableCell>
                  <Button onClick={() => handleViewDetails(order._id)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Dialog open={openDetail} onOpenChange={setOpenDetail}>
        {selectedOrder && (
          <AdminOrderDetail
            orderId={selectedOrder}
            onStatusUpdate={handleStatusUpdate}
          />
        )}
      </Dialog>
    </Card>
  );
};

export default AdminOrdersCpn;
