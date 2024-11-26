import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import AddressCard from "./address-card";

const Address = () => {
  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {<AddressCard />}
      </div>
      <div>Address list</div>
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Label>Addres</Label>
        <Input />
        <Button className="w-full">Add</Button>
      </CardContent>
    </Card>
  );
};

export default Address;
