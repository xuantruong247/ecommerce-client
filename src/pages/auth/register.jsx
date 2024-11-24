import React from "react";
import { Link } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const AuthRegister = () => {
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Create new account</h1>
        <p className="mt-2">
          Already have an account
          <Link className="font-medium ml-2 hover:underline" to={"/auth/login"}>
            Login
          </Link>
        </p>
      </div>
      <form>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input placeholder="Enter your email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input placeholder="Enter your password" />
        </div>
        <div className="flex items-center justify-center mt-5">
          <Button className="">Register</Button>
        </div>
      </form>
    </div>
  );
};

export default AuthRegister;
