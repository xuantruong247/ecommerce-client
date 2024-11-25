import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";

const ShoppingProductDetail = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src="https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-16-pro_1.png"
            alt="iphone 16"
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="grid gap-6">
          <div>
            <h1 className="text-3xl font-extrabold">Iphone 16</h1>
            <p className="text-muted">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              illum a dolores vero. Culpa repellendus dicta repellat placeat.
              Laborum sit deleniti incidunt sunt eveniet alias vitae repudiandae
              sapiente architecto voluptatibus!
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold ">30.000.000vnd</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShoppingProductDetail;
