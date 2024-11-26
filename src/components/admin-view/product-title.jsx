import React from "react";
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
const AdminProductTitle = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Products ID</TableHead>
              <TableHead>Product Image</TableHead>
              <TableHead>Order Name</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Action</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>123456</TableCell>
              <TableCell><img src="https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-16-pro-max_1.png" alt="iphone" width={'80'} height={'80'}/></TableCell>
              <TableCell>Iphone 16</TableCell>
              <TableCell>30.000.000vnd</TableCell>
              <TableCell className="flex flex-col gap-2">
                <Button>Edit</Button>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminProductTitle;
