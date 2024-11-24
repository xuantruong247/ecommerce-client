import { ChartNoAxesCombined } from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { adminSidebarMenuItems } from "../config/index";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div>
            <SheetHeader className="border-b">
              <SheetTitle className="flex justify-center items-center gap-2 mb-2">
                <ChartNoAxesCombined size={30} />
                Admin Panel
              </SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-2 cursor-pointer">
              {adminSidebarMenuItems.map((menuItem) => (
                <div
                  key={menuItem.id}
                  onClick={() => {
                    navigate(menuItem.path);
                    setOpen ? setOpen(false) : null;
                  }}
                  className="flex items-center gap-2 rounded-md px-3 py-2 hover:font-extrabold  hover:bg-muted"
                >
                  {menuItem.icons} <span>{menuItem.label}</span>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r p-6 lg:flex ">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 "
        >
          <ChartNoAxesCombined />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <div className="mt-8 flex flex-col gap-2 cursor-pointer">
          {adminSidebarMenuItems.map((menuItem) => (
            <div
              key={menuItem.id}
              onClick={() => navigate(menuItem.path)}
              className="flex items-center gap-2 rounded-md px-3 py-2 hover:font-extrabold  hover:bg-muted"
            >
              {menuItem.icons} <span>{menuItem.label}</span>
            </div>
          ))}
        </div>
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
