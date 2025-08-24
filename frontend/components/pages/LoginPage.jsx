"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { toast } from "react-hot-toast"
import { login } from "../../routes/auth"

export default function LoginPage({ onNavigate, onLogin }) {
  const [formData, setFormData] = useState({
    identifier: "", // Can be email or phone
    password: "",
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    // Get stored user data (in real app, this would be an API call)
   
      // Simple validation - check if identifier matches email or phone
      try{
         const storedData = localStorage.getItem("userData")
    if (storedData) {
      const userData = JSON.parse(storedData)
        const res= await login(formData);
         if (userData.email === formData.identifier || userData.phone === formData.identifier) {
         toast.success(`Welcome back, ${userData.name || "User"} `)
        onLogin(userData)
      } 
    }}
    
    catch (err) {
      // 🔹 Step 2: Fallback to localStorage (old logic)
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        const userData = JSON.parse(storedData);
        if (
          (userData.email === formData.identifier ||
            userData.phone === formData.identifier) &&
          userData.password === formData.password
        ) {
          toast.success(`Welcome back, ${userData.name || "User"}!`);
          onLogin(userData);
          return;
        }
      
    }

      toast.error(err.response?.data?.msg || "Invalid credentials");
    }
  };
     
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login to ServiceHub</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="identifier">Email or Phone Number</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                required
                value={formData.identifier}
                onChange={handleInputChange}
                placeholder="Enter your email or phone number"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => onNavigate("signup")}
                className="text-sm text-primary hover:underline"
              >
                Don't have an account? Sign Up
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
