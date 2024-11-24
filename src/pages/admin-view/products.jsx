import React, { Fragment, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import ImageUpload from "../../components/admin-view/image-upload";
import CardProduct from "./card-product";

const AdminProducts = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add new product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div>
          <CardProduct />
        </div>
        <Sheet
          open={openCreateProductDialog}
          onOpenChange={() => {
            setOpenCreateProductDialog(false);
          }}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add new Product</SheetTitle>
            </SheetHeader>
            <div className="py-6">
              <form className="flex flex-col gap-2">
                <div>
                  <Label htmlFor="name">Name product</Label>
                  <Input placeholder="Enter name product" />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input placeholder="Enter price product" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea placeholder="Enter description product" rows={7} />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input placeholder="Enter quantity product" />
                </div>
                <div>
                  <Label htmlFor="slaes">Sales</Label>
                  <Input placeholder="Enter product sales" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <ImageUpload />
                </div>
                <div className="flex items-center justify-center mt-5">
                  <Button className="w-full">Create new products</Button>
                </div>
              </form>
            </div>
          </SheetContent>
          ;
        </Sheet>
      </div>
    </Fragment>
  );
};

export default AdminProducts;
