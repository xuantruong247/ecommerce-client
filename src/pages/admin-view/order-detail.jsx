import React from "react";
import { DialogContent } from "../../components/ui/dialog";
import { Separator } from "../../components/ui/separator";
import { Label } from "../../components/ui/label";
import { Status } from "../../components/config";
import { Button } from "../../components/ui/button";

const AdminOderDetail = () => {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label htmlFor="">123456</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label htmlFor="">26/11/2024</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label htmlFor="">30.000.000vnd</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label htmlFor="">In Pending</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Iphone 16</span>
                <span>30.000.000vnd</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted">
              <span>Truong Nguyen</span>
              <span>688/57 CC Osimi,P.15,Q.GV,TPHCM</span>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <Label>Status</Label>
          <select id="status" className="w-full border p-2 rounded">
            <option value="">Select a status</option>
            {Status.map((statusItem) => (
              <option value={statusItem.id} key={statusItem.id}>
                {statusItem.label}
              </option>
            ))}
          </select>
        </div>
        <Button className="w-full">
            Update Order Status
        </Button>
      </div>
    </DialogContent>
  );
};

export default AdminOderDetail;
