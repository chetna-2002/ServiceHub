"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { useToast } from "../ui/use-toast"
import BookingRequestCard from "../common/BookingRequestCard"
import { getCurrencySymbol } from "../../utils/locationData"
import { createService, getMyServices, updateService, deleteService } from "../../routes/API.service"

export default function ProviderDashboard({ user }) {
  const [profiles, setProfiles] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [profile, setProfile] = useState({
    serviceTitle: "",
    bio: "",
    skills: "",
    hourlyRate: "",
    alternatePhone: "",
  })
  const [bookingRequests, setBookingRequests] = useState([])

  const { toast } = useToast()
  const currencySymbol = getCurrencySymbol(user.country)

  // Load services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const myServices = await getMyServices()
        setProfiles(myServices)
      } catch (err) {
        toast({
          title: "Error",
          description: err.message || "Failed to load services",
          variant: "destructive",
        })
      }
    }
    fetchServices()

    // Bookings from localStorage (temporary)
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    const providerBookings = allBookings.filter((b) => b.providerPhone === user.phone)
    setBookingRequests(providerBookings)
  }, [toast, user.phone])

  // Save (create/update)
  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing && editIndex !== null && profiles[editIndex]) {
        const updated = await updateService(profiles[editIndex]._id, profile)
        const updatedProfiles = [...profiles]
        updatedProfiles[editIndex] = updated
        setProfiles(updatedProfiles)
        toast({ title: "Profile updated successfully ✅" })
      } else {
        const newService = await createService(profile)
        setProfiles([...profiles, newService.service])
        toast({ title: "Profile created successfully 🎉" })
      }

      // reset form
      setIsEditing(false)
      setEditIndex(null)
      setProfile({ serviceTitle: "", bio: "", skills: "", hourlyRate: "", alternatePhone: "" })
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong!",
        variant: "destructive",
      })
    }
  }

  // Input handler
  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  // Delete Profile
  const handleDeleteProfile = async (index, id) => {
    if (!confirm("Are you sure you want to delete this profile?")) return
    try {
      await deleteService(id)
      const updated = profiles.filter((_, i) => i !== index)
      setProfiles(updated)
      toast({ title: "Profile deleted successfully 🗑️" })
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to delete service",
        variant: "destructive",
      })
    }
  }

  // Booking action
  const handleBookingAction = (bookingId, action) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    const updatedBookings = allBookings.map((b) =>
      b.id === bookingId ? { ...b, status: action } : b
    )
    localStorage.setItem("bookings", JSON.stringify(updatedBookings))
    const providerBookings = updatedBookings.filter((b) => b.providerPhone === user.phone)
    setBookingRequests(providerBookings)
  }

  // Profile form
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
          placeholder="e.g., Math Tutor, Electrician"
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
          placeholder="Tell customers about yourself"
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
          placeholder="List your skills"
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
          placeholder="Enter hourly rate"
        />
      </div>
      <div>
        <Label htmlFor="alternatePhone">Alternate Phone</Label>
        <Input
          id="alternatePhone"
          name="alternatePhone"
          value={profile.alternatePhone}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex justify-end gap-4">
        {isEditing && profiles.length > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setIsEditing(false)
              setEditIndex(null)
            }}
          >
            Cancel
          </Button>
        )}
        <Button type="submit">
          {isEditing && profiles.length > 0 ? "Update Profile" : "Create Profile"}
        </Button>
      </div>
    </form>
  )

  // Form rendering
  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>{editIndex !== null ? "Edit Profile" : "Create New Profile"}</CardTitle>
          </CardHeader>
          <CardContent>{renderProfileForm()}</CardContent>
        </Card>
      </div>
    )
  }

  // Dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Provider Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome back, {user.name}! Manage your services & bookings.</p>

      {/* Profiles */}
      {profiles.length === 0 ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>No Profile Yet</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsEditing(true)} className="w-full">
              Create Your Profile
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {profiles.map((p, index) => (
            <Card key={p._id} className="mb-6">
              <CardHeader className="flex justify-between items-center">
                <CardTitle>{p.serviceTitle}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(true)
                      setEditIndex(index)
                      setProfile(p)
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteProfile(index, p._id)}>
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{p.bio}</p>
                <p className="text-sm text-gray-500 mt-1"><strong>Skills:</strong> {p.skills}</p>
                <p className="text-green-600 font-semibold mt-2">{currencySymbol}{p.hourlyRate}/hr</p>
                {p.alternatePhone && <p className="text-sm text-gray-600">Alternate: {p.alternatePhone}</p>}
              </CardContent>
            </Card>
          ))}
          <div className="flex justify-center mb-8">
            <Button onClick={() => setIsEditing(true)}>Add Another Profile</Button>
          </div>
        </>
      )}

      {/* Booking Requests */}
      <Card>
        <CardHeader><CardTitle>Booking Requests</CardTitle></CardHeader>
        <CardContent>
          {bookingRequests.length === 0 ? (
            <p className="text-gray-500">No booking requests yet.</p>
          ) : (
            bookingRequests.map((req) => (
              <BookingRequestCard key={req.id} request={req} onAction={handleBookingAction} />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
