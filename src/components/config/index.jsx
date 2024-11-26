import { BringToFront, LayoutDashboard, ShoppingBasket } from "lucide-react";

export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icons: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icons: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icons: <BringToFront />,
  },
];
export const filterByCategory = [
  {
    id: "category1",
    label: "Category 1",
  },
  {
    id: "category2",
    label: "Category 2",
  },
  {
    id: "category3",
    label: "Category 3",
  },
  {
    id: "category4",
    label: "Category 4",
  },
  {
    id: "category5",
    label: "Category 5",
  },
];

export const sortByCategory = [
  {
    id:"price-lowtohigh",
    label:"Price: Low to High"
  },
  {
    id:"price-hightolow",
    label:"Price: High to Low"
  },
  {
    id:"title-atoz",
    label:"Title: A to Z"
  },
  {
    id:"title-ztoa",
    label:"Title:Z to A"
  }
]

export const Status =[
  {
    id:"inProcess",
    label:"In Process"
  },
  {
    id:"inShipping",
    label:"In Shipping"
  },
  {
    id:"rejected",
    label:"Rejected"
  },
  {
    id:"accessories",
    label:"Accessories"
  },
  {
    id:"footwear",
    label:"Footwear"
  }
]