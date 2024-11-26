import React, { useState, useEffect } from "react";
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
import ShoppingOrderDetail from "./order-detail";

const ShoppingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Gọi API để lấy danh sách đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found!");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/v1/order", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const result = await response.json();
        setOrders(result.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
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
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{order.status }</TableCell>
                <TableCell>{order.total} vnd</TableCell>
                <TableCell>
                  <Dialog open={openDetail} onOpenChange={setOpenDetail}>
                    <Button
                      onClick={() => {
                        setSelectedOrder(order);
                        setOpenDetail(true);
                      }}
                    >
                      View Details
                    </Button>
                    {selectedOrder && selectedOrder._id === order._id && (
                      <ShoppingOrderDetail
                        setOpenDetail={setOpenDetail}
                        order={selectedOrder}
                      />
                    )}
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
