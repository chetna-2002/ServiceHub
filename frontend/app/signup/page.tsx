"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import Next.js router
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LocationSelector from "@/components/common/LocationSelector";
import { signup } from "@/routes/API.auth.jsx";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  country: string;
  state: string;
  city: string;
  role: "customer" | "provider";
}

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
    city: "",
    role: "customer",
  });

  const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "password" || e.target.name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const handleLocationChange = (location: Partial<FormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...location,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      toast.error("Password too short");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await signup(formData);

      if (res.message?.includes("success")) {
        localStorage.setItem("user", JSON.stringify(res.user));
        toast.success(res.message);
        setTimeout(() => router.push("/login"), 1000);
      } else {
        toast.error(res.message || "Signup failed");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Join ServiceHub</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>

            {passwordError && (
              <div className="text-red-500 text-sm">{passwordError}</div>
            )}

            {/* Location */}
            <LocationSelector onLocationChange={handleLocationChange} />

            {/* Role */}
            <div>
              <Label>Role *</Label>
              <div className="flex space-x-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={formData.role === "customer"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Customer
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="provider"
                    checked={formData.role === "provider"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Service Provider
                </label>
              </div>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full">
              Sign Up
            </Button>

            {/* Link to Login */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-sm text-primary hover:underline"
              >
                Already have an account? Login
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}