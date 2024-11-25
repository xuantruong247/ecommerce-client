import React, { useState } from "react";
import ProductFilter from "../../components/shopping-view/filter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { sortByCategory } from "../../components/config";
import ShoppingProductTitle from "./../../components/shopping-view/product-tile";
import ShoppingProductDetail from "../../components/shopping-view/product-detail";

const ShoppingListing = () => {
  const [openDetailDialog, setOpenDetailDialog] = useState(false)
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter />
      <div className="w-full rounded-lg shadow-sm bg-muted/5">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-4">
            <span className="text-muted ">10 Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup>
                  {sortByCategory.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      className="cursor-pointer"
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <ShoppingProductTitle />
        </div>
      </div>
      <button onClick={()=>setOpenDetailDialog(true)}> click
      <ShoppingProductDetail open={openDetailDialog} setOpen={setOpenDetailDialog} />
      </button>
    </div>
  );
};

export default ShoppingListing;
