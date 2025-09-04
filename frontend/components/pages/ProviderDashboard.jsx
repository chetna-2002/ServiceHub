"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import BookingRequestCard from "../common/BookingRequestCard";
import { getCurrencySymbol } from "../../utils/locationData";
import {
  createService,
  getService,
  getMyServices,
  updateService,
  deleteService,
} from "../../routes/API.service";
import { logout } from "../../routes/API.auth";
import {
  getProviderBookings,
  updateBookingStatus,
} from "../../routes/API.booking";

export default function ProviderDashboard({ user }) {
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(user.country);

  const [profiles, setProfiles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    serviceTitle: "",
    bio: "",

    skills: "",
    hourlyRate: "",
    _id: undefined,
  });
  const [bookingRequests, setBookingRequests] = useState([]);

  // Load services and provider bookings
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Services
        const serviceRes = await getMyServices();
        setProfiles(
          Array.isArray(serviceRes.services) ? serviceRes.services : []
        );

      
        const bookingRes = await getProviderBookings();
        setBookingRequests(
          Array.isArray(bookingRes.bookings) ? bookingRes.bookings : []
        );
      } catch (err) {
        toast({
          title: "Error",
          description: err.message || "Failed to load data",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, [toast]);
  

  // Handle input changes
  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Create or Update service
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      if (profile._id) {
        // Update
        const updatedRes = await updateService(profile._id, profile);
        const updatedProfile = updatedRes.service;
        setProfiles((prev) =>
          prev.map((p) => (p._id === updatedProfile._id ? updatedProfile : p))
        );
        toast({ title: "Profile updated successfully " });
      } else {
        // Create
        const createRes = await createService(profile);
        setProfiles((prev) => [...prev, createRes.service]);
        toast({ title: "Profile created successfully " });
      }

      setIsEditing(false);
      setProfile({
        serviceTitle: "",
        bio: "",
        skills: "",
        hourlyRate: "",
        _id: undefined,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  // Delete service
  const handleDeleteProfile = async (index, id) => {
    if (!confirm("Are you sure you want to delete this profile?")) return;
    try {
      await deleteService(id);
      setProfiles((prev) => prev.filter((_, i) => i !== index));
      toast({ title: "Profile deleted successfully 🗑️" });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to delete service",
        variant: "destructive",
      });
    }
  };

  // Booking action (Accept / Reject)
  const handleBookingAction = async (bookingId, action) => {
    try {
      await updateBookingStatus(bookingId, action); // Backend call
      setBookingRequests((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: action } : b))
      );
      toast({ title: `Booking ${action}` });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to update booking",
        variant: "destructive",
      });
    }
  };

  // Profile form component
  const renderProfileForm = () => (
    <form onSubmit={handleProfileSubmit} className="space-y-4">
      <div>
        <Label htmlFor="serviceTitle">Service Title *</Label>
        <Input
          id="serviceTitle"
          name="serviceTitle"
          required
          value={profile.serviceTitle}
          onChange={handleInputChange}
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
        />
      </div>
      <div className="flex justify-end gap-4">
        {isEditing && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setIsEditing(false);
              setProfile({
                serviceTitle: "",
                bio: "",
                skills: "",
                hourlyRate: "",
                _id: undefined,
              });
            }}
          >
            Cancel
          </Button>
        )}
        <Button type="submit">
          {profile._id ? "Update Profile" : "Create Profile"}
        </Button>
      </div>
    </form>
  );

  // Render dashboard
  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>
              {profile._id ? "Edit Profile" : "Create New Profile"}
            </CardTitle>
          </CardHeader>
          <CardContent>{renderProfileForm()}</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Provider Dashboard</h1>
      <Button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white"
      >
        Logout
      </Button>
      <p className="text-gray-600 mb-6">
        Welcome back, {user.name}! Manage your services & bookings.
      </p>

      {/* Profiles */}
      {profiles.length === 0 ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>No Profile Yet</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => {
                setIsEditing(true);
                setProfile({
                  serviceTitle: "",
                  bio: "",
                  skills: "",
                  hourlyRate: "",

                  _id: undefined,
                });
              }}
              className="w-full"
            >
              Create Your Profile
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div>
          {profiles.map((p, index) => (
            <Card key={p._id || index} className="mb-6">
              <CardHeader className="flex justify-between items-center">
                <CardTitle>{p.serviceTitle}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(true);
                      setProfile({ ...p });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteProfile(index, p._id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  <strong>bio:</strong> {p.bio}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  <strong>Skills:</strong> {p.skills}
                </p>
                <p className="text-green-600 font-semibold mt-2">
                  {currencySymbol}
                  {p.hourlyRate}/hr
                </p>
              </CardContent>
            </Card>
          ))}

          <div className="mt-5 mb-5 flex justify-center">
            <Button
              onClick={() => {
                setIsEditing(true);
                setProfile({
                  serviceTitle: "",
                  bio: "",
                  
                  skills: "",
                  hourlyRate: "",
                  _id: undefined,
                });
              }}
            >
              + Add Another Profile
            </Button>
          </div>
        </div>
      )}

      {/* Booking Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {bookingRequests.length === 0 ? (
            <p className="text-gray-500">No booking requests yet.</p>
          ) : (
            bookingRequests.map((req, index) => (
              <BookingRequestCard
                key={req._id || index}
                request={req}
                onAction={handleBookingAction}
              />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
