import React, { useState } from "react";
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
import AdminOderDetail from "../../pages/admin-view/order-detail";
const AdminOrdersCpn = () => {
  const [openDetail, setOpenDetail] = useState(false);
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
            <TableRow>
              <TableCell>123456</TableCell>
              <TableCell>26/11/2024</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>30.000.000vnd</TableCell>
              <TableCell>
                <Dialog open={openDetail} onOpenChange={setOpenDetail}>
                  <Button onClick={() => setOpenDetail(true)}>
                    View Details
                  </Button>
                  <AdminOderpDetail />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrdersCpn;
