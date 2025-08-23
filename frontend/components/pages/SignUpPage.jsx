"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import LocationSelector from "../common/LocationSelector"

export default function SignUpPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
    city: "",
    role: "customer",
  })

  const [passwordError, setPasswordError] = useState("")

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

    if (e.target.name === "password" || e.target.name === "confirmPassword") {
      setPasswordError("")
    }
  }

  const handleLocationChange = (location) => {
    setFormData({
      ...formData,
      ...location,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 8 characters long")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    localStorage.setItem("userData", JSON.stringify(formData))
    onNavigate("login")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Join ServiceHub</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address (Optional)</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password (min 6 characters)"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
              />
            </div>

            {passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}

            <LocationSelector onLocationChange={handleLocationChange} />

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

            <Button type="submit" className="w-full">
              Sign Up
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => onNavigate("login")}
                className="text-sm text-primary hover:underline"
              >
                Already have an account? Login
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
