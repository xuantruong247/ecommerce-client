import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const AuthRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState(""); // Thêm state cho address
  const [phone, setPhone] = useState(""); // Thêm state cho phone
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // Hook điều hướng

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            address, // Gửi address
            phone, // Gửi phone
            role: "user", // Role mặc định là "user"
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Register successful:", data);
        setSuccessMessage(
          "Account created successfully! Redirecting to login..."
        );
        setTimeout(() => {
          navigate("/auth/login"); // Chuyển đến trang đăng nhập sau khi đăng ký thành công
        }, 2000);
      } else {
        setError(data.message || "Registration failed!");
      }
    } catch (err) {
      setError("An error occurred while registering.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link className="font-medium ml-2 hover:underline" to={"/auth/login"}>
            Login
          </Link>
        </p>
      </div>
      <form onSubmit={handleRegister}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            name="address"
            id="address"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="text"
            name="phone"
            id="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm mt-2">{successMessage}</p>
        )}
        <div className="flex items-center justify-center mt-5">
          <Button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthRegister;
