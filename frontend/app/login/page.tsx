"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { toast } from "react-hot-toast"
import { login } from "../../routes/API.auth"
import { useAuth } from "../../Authcontext"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const { setUser } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await login(formData) // { token, user }

      localStorage.setItem("user", JSON.stringify(res.user))
      localStorage.setItem("token", res.token)

      setUser(res.user)

      toast.success(`Welcome back, ${res.user.name || "User"}!`)

      if (res.user.role === "customer") {
        router.push("/customer-dashboard")
      } else if (res.user.role === "provider") {
        router.push("/provider-dashboard")
      } else {
        router.push("/")
      }
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials")
    }
  }

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
                onClick={() => router.push("/signup")}
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
