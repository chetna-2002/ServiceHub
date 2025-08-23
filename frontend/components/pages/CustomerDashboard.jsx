"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import ServiceCard from "../common/ServiceCard"
import { mockServices } from "../../data/mockData"

export default function CustomerDashboard({ user }) {
  const [services, setServices] = useState([])
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    setServices(mockServices)
    // Load existing bookings from localStorage
    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    setBookings(existingBookings)
  }, [])

  const handleBookService = (service) => {
    const newBooking = {
      id: Date.now(),
      serviceId: service.id,
      serviceName: service.title,
      providerName: service.providerName,
      providerPhone: service.phone,
      customerName: user.name,
      customerPhone: user.phone,
      status: "pending",
      bookedAt: new Date().toISOString(),
    }

    const updatedBookings = [...bookings, newBooking]
    setBookings(updatedBookings)
    localStorage.setItem("bookings", JSON.stringify(updatedBookings))
    alert("Service booked successfully!")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}! Browse and book services below.</p>
      </div>

      {/* My Bookings Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>My Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <p className="text-gray-500">No bookings yet. Book a service to get started!</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{booking.serviceName}</h3>
                      <p className="text-sm text-gray-600">Provider: {booking.providerName}</p>
                      <p className="text-sm text-gray-600">Phone: {booking.providerPhone}</p>
                      <p className="text-sm text-gray-500">Booked: {new Date(booking.bookedAt).toLocaleDateString()}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : booking.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Services Section */}
      <Card>
        <CardHeader>
          <CardTitle>Available Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={handleBookService}
                showBookButton={true}
                userCountry={user.country}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
