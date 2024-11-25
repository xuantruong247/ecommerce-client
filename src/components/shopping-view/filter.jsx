import React from "react";
import { filterByCategory } from "../config/index";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {Separator} from "../ui/separator"

const ProductFilter = () => {
  return (
    <div className="bg-muted/5 rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        <Label>Category</Label>
        {filterByCategory.map((item) => (
          <div key={item.id}>
            <Label className="flex items-center gap-2 font-medium">
              <Checkbox />
              {item.label}
            </Label>
          </div>
        ))}
      </div>
      <Separator/>
    </div>
  );
};

export default ProductFilter;
