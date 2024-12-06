import React from "react";

import { LocateIcon, Mail, Phone } from "lucide-react";

const ShoppingFooter = () => {
    return (
        <div className="w-full">
            <div className="h-[400px]  bg-gray-800 flex flex-col items-center justify-center text-white text-[13px]">
                <div className="w-[1202px] flex items-start justify-between h-[350px] py-[80px]">
                    <div className="flex-5 flex flex-col gap-2">
                        <h3 className="mb-[20px] text-[15px] font-medium border-l border-main pl-[15px]">
                            ABOUT US
                        </h3>
                        <span className="flex gap-2">
                            <span className="flex gap-2">
                                <LocateIcon size={15} /> Address:
                            </span>
                            <span className="opacity-50">Example</span>
                        </span>
                        <span className="flex gap-2">
                            <span className="flex gap-2">
                                <Phone /> Phone:
                            </span>
                            <span className="opacity-50">(0856) 93 2222</span>
                        </span>
                        <span className="flex gap-2">
                            <span className="flex gap-2">
                                <Mail />
                                Mail:
                            </span>
                            <span className="opacity-50">example@fpt.edu.vn</span>
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="mb-[20px] text-[15px] font-medium border-l border-main pl-[15px]">
                            INFORMATION
                        </h3>

                        <span className="hover:text-gray-500 cursor-pointer">
                            Typogramphy
                        </span>

                        <span className="hover:text-gray-500 cursor-pointer">Gallery</span>

                        <span className="hover:text-gray-500 cursor-pointer">
                            Store Location
                        </span>

                        <span className="hover:text-gray-500 cursor-pointer">
                            Today's Deals
                        </span>

                        <span className="hover:text-gray-500 cursor-pointer">Contact</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="mb-[20px] text-[15px] font-medium border-l border-main pl-[15px]">
                            INFORMATION
                        </h3>
                        <span className="hover:text-gray-500 cursor-pointer">Help</span>

                        <span className="hover:text-gray-500 cursor-pointer">
                            Free Shipping
                        </span>
                        <span className="hover:text-gray-500 cursor-pointer">FAQs</span>

                        <span className="hover:text-gray-500 cursor-pointer">
                            Return & Exchange
                        </span>

                        <span className="hover:text-gray-500 cursor-pointer">
                            Testimonials
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="mb-[20px] text-[15px] font-medium border-l border-main pl-[15px]">
                            #ECOMMERCE
                        </h3>
                    </div>
                </div>
                <span className="border-b border-main w-main "></span>
                <div className="text-[15px] text-gray-300 pt-[10px] ">
                    Copyright developed by Example. All rights reserved
                </div>
            </div>
        </div>
    );
};

export default ShoppingFooter;