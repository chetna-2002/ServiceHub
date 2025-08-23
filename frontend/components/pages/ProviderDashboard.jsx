"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import BookingRequestCard from "../common/BookingRequestCard"
import { getCurrencySymbol } from "../../utils/locationData"

export default function ProviderDashboard({ user }) {
  const [hasProfile, setHasProfile] = useState(false)
  const [profile, setProfile] = useState({
    bio: "",
    skills: "",
    hourlyRate: "",
    alternatePhone: "",
    serviceTitle: "",
  })
  const [bookingRequests, setBookingRequests] = useState([])

  const currencySymbol = getCurrencySymbol(user.country)

  useEffect(() => {
    // Check if provider has a profile
    const existingProfile = localStorage.getItem(`profile_${user.phone}`)
    if (existingProfile) {
      setProfile(JSON.parse(existingProfile))
      setHasProfile(true)
    }

    // Load booking requests for this provider
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    const providerBookings = allBookings.filter((booking) => booking.providerPhone === user.phone)
    setBookingRequests(providerBookings)
  }, [user.phone])

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem(`profile_${user.phone}`, JSON.stringify(profile))
    setHasProfile(true)
    alert("Profile created successfully!")
  }

  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    })
  }

  const handleBookingAction = (bookingId, action) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    const updatedBookings = allBookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: action } : booking,
    )
    localStorage.setItem("bookings", JSON.stringify(updatedBookings))

    const providerBookings = updatedBookings.filter((booking) => booking.providerPhone === user.phone)
    setBookingRequests(providerBookings)
  }

  if (!hasProfile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Create Your Service Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <Label htmlFor="serviceTitle">Service Title *</Label>
                <Input
                  id="serviceTitle"
                  name="serviceTitle"
                  required
                  value={profile.serviceTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Professional Electrician, Math Tutor"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio *</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  required
                  value={profile.bio}
                  onChange={handleInputChange}
                  placeholder="Tell customers about yourself and your experience"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="skills">Skills *</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  required
                  value={profile.skills}
                  onChange={handleInputChange}
                  placeholder="List your skills and specializations"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="hourlyRate">Hourly Rate ({currencySymbol}) *</Label>
                <Input
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  required
                  value={profile.hourlyRate}
                  onChange={handleInputChange}
                  placeholder="Enter your hourly rate"
                />
              </div>

              <div>
                <Label htmlFor="alternatePhone">Alternate Phone Number</Label>
                <Input
                  id="alternatePhone"
                  name="alternatePhone"
                  type="tel"
                  value={profile.alternatePhone}
                  onChange={handleInputChange}
                  placeholder="Enter alternate contact number"
                />
              </div>

              <Button type="submit" className="w-full">
                Create Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Provider Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}! Manage your services and bookings.</p>
      </div>

      {/* Profile Summary */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg">{profile.serviceTitle}</h3>
              <p className="text-gray-600 mt-2">{profile.bio}</p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Skills:</strong> {profile.skills}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold text-green-600">
                {currencySymbol}
                {profile.hourlyRate}/hour
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Primary:</strong> {user.phone}
              </p>
              {profile.alternatePhone && (
                <p className="text-sm text-gray-600">
                  <strong>Alternate:</strong> {profile.alternatePhone}
                </p>
              )}
              <p className="text-sm text-gray-600">
                <strong>Location:</strong> {user.city}, {user.state}, {user.country}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {bookingRequests.length === 0 ? (
            <p className="text-gray-500">No booking requests yet.</p>
          ) : (
            <div className="space-y-4">
              {bookingRequests.map((request) => (
                <BookingRequestCard key={request.id} request={request} onAction={handleBookingAction} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
