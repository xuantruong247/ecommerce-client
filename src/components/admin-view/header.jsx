import React from "react";
import { Button } from "../ui/button";
import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ setOpen }) => {
  const navigate = useNavigate(); 

  const onLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/auth/login');  
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b">
      {/* Nút Menu cho mobile */}
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <Menu />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      
      {/* Nút Logout */}
      <div className="flex flex-1 justify-end">
        <Button
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
          onClick={onLogout}  
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
