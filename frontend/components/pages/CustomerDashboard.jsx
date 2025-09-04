"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import ServiceCard from "../common/ServiceCard";
import { toast } from "react-hot-toast";
import { getService } from "../../routes/API.service";
import { logout } from "../../routes/API.auth";
import {
  createBooking,
  getMyBookings,
  cancelBooking,
} from "../../routes/API.booking";

export default function CustomerDashboard({ user }) {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  //  Fetch available services + my bookings on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Get all services
        const serviceData = await getService("/allservices");
        setServices(serviceData.services || []);
        // console.log(serviceData," service data in customer ")

        // Get my bookings
        const bookingData = await getMyBookings();
        setBookings(bookingData.bookings || []);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //  Book a service
  const handleBookService = async (service) => {
    try {
      setBookingLoading(true);
      await createBooking(service._id);

      toast.success("Service booked successfully!");

      // Update bookings after new booking
      const bookingData = await getMyBookings();
      setBookings(bookingData.bookings || []);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || "Failed to book service");
    } finally {
      setBookingLoading(false);
    }
  };

  //  Cancel booking
  const handleCancelBooking = async (id) => {
    try {
      await cancelBooking(id);
      toast.success("Booking cancelled");

      // Remove from UI
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Cancel error:", error);
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Customer Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {user.name}! Browse and book services below.
          </p>
        </div>
        <Button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Logout
        </Button>
      </div>

      {/* My Bookings Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>My Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <p className="text-gray-500">
              No bookings yet. Book a service to get started!
            </p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">
                      {booking.serviceId?.serviceTitle}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Provider: {booking.serviceId?.userId?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Phone: {booking.serviceId?.userId?.phone}
                    </p>
                    
                    {/* <p className="text-sm text-gray-600">
                     Location: {booking.serviceId?.country}, {booking.serviceId?.state},{booking.serviceId?.city}

                    </p> */}

                    <p className="text-sm text-gray-500">
                      <span>
                        {new Date(booking.bookingDate).toLocaleDateString('en-IN')}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`px-3 py-1 rounded-full text-sm mb-2 ${
                        booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : booking.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                    {booking.status === "pending" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelBooking(booking._id)}
                      >
                        Cancel
                      </Button>
                    )}
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
          {loading ? (
            <p className="text-gray-500">Loading services...</p>
          ) : services.length === 0 ? (
            <p className="text-gray-500">
              No services available in your area yet.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <ServiceCard
                  key={service._id || index}
                  service={service}
                  onBook={handleBookService}
                  showBookButton={true}
                  userCountry={user.country}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
