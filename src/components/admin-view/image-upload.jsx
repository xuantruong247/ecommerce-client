import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CloudUploadIcon } from "lucide-react";

const ImageUpload = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Label>
        Upload Image
        <Input
          id="image-upload"
          type="file"
          className="cursor-pointer hidden"
        />
        <div className="flex justify-center items-center flex-col w-full bg-muted/20 h-24 rounded-sm cursor-pointer">
          <CloudUploadIcon size={30} />
          <p> Drag & drog or click to upload image</p>
        </div>
      </Label>
    </div>
  );
};

export default ImageUpload;
