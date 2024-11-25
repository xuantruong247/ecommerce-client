import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";

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
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">Iphone 16</h1>
            <p className="text-muted text-2xl  mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              illum a dolores vero. Culpa repellendus dicta repellat placeat.
              Laborum sit deleniti incidunt sunt eveniet alias vitae repudiandae
              sapiente architecto voluptatibus!
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold ">30.000.000vnd</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-yellow-400" />
              <StarIcon className="w-5 h-5 fill-yellow-400" />
              <StarIcon className="w-5 h-5 fill-yellow-400" />
              <StarIcon className="w-5 h-5 fill-yellow-400" />
              <StarIcon className="w-5 h-5 fill-yellow-400" />
            </div>
            <p className="text-muted">(4.5)</p>
          </div>
          <Button className="w-full">Add to cart</Button>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 border">
                  <AvatarFallback>TN</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Nguyen Xuan Truong</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-yellow-400" />
                    <StarIcon className="w-5 h-5 fill-yellow-400" />
                    <StarIcon className="w-5 h-5 fill-yellow-400" />
                    <StarIcon className="w-5 h-5 fill-yellow-400" />
                    <StarIcon className="w-5 h-5 fill-yellow-400" />
                  </div>
                  <p className="text-muted">This is an awesome product</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 border">
                  <AvatarFallback>TN</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Nguyen Xuan Truong</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-yellow-400" />
                    <StarIcon className="w-5 h-5 fill-yellow-400" />
                    <StarIcon className="w-5 h-5 fill-yellow-400" />
                    <StarIcon className="w-5 h-5 fill-yellow-400" />
                    <StarIcon className="w-5 h-5 fill-yellow-400" />
                  </div>
                  <p className="text-muted">This is an awesome product</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 border">
                  <AvatarFallback>TN</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Nguyen Xuan Truong</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-yellow-400" />
                    <StarIcon className="w-5 h-5 fill-yellow-400" />
                    <StarIcon className="w-5 h-5 fill-yellow-400" />
                    <StarIcon className="w-5 h-5 fill-yellow-400" />
                    <StarIcon className="w-5 h-5 fill-yellow-400" />
                  </div>
                  <p className="text-muted">This is an awesome product</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Input placeholder="Write a review..." />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShoppingProductDetail;
