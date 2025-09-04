
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavigationBar from "@/components/common/NavigationBar";
import { getService } from "@/routes/API.service";
import { getMyBookings } from "@/routes/API.booking";

export default function App() {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const router = useRouter();

  // ✅ Load services + bookings when user logs in
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const serviceData = await getService();
        setServices(serviceData.services || []);

        const bookingData = await getMyBookings();
        setBookings(bookingData.bookings || []);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      }
    };

    fetchData();
  }, [user]);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <div>
      <NavigationBar
        user={user}
        onLogout={handleLogout}
        onNavigate={(path) => router.push(path)} // 👈 replaced onNavigate
      />

      {/* 
        ❗ Instead of conditional rendering (home/login/signup),
        Next.js will render pages under app/ 
      */}
    </div>
  );
}

















// "use client"

// import React from "react"

// // Main App Component
// const { useState, useEffect } = React
// const ReactDOM = window.ReactDOM // Declare the ReactDOM variable

// // Mock data for countries, states, and cities
// const locationData = {
//   countries: {
//     USA: {
//       states: {
//         California: ["Los Angeles", "San Francisco", "San Diego"],
//         "New York": ["New York City", "Albany", "Buffalo"],
//         Texas: ["Houston", "Dallas", "Austin"],
//       },
//     },
//     India: {
//       states: {
//         Maharashtra: ["Mumbai", "Pune", "Nagpur"],
//         Karnataka: ["Bangalore", "Mysore", "Hubli"],
//         Delhi: ["New Delhi", "Delhi"],
//       },
//     },
//   },
// }



// // Navigation Bar Component
// function NavigationBar({ user, onLogout, onNavigate }) {
//   return (
//     <nav className="bg-primary text-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <h1 className="text-xl font-bold cursor-pointer" onClick={() => onNavigate("home")}>
//               ServiceHub
//             </h1>
//           </div>
//           <div className="flex items-center space-x-4">
//             {user ? (
//               <>
//                 <span className="text-sm">Hi, {user.name}</span>
//                 <button
//                   onClick={() => onNavigate(user.role === "customer" ? "customer-dashboard" : "provider-dashboard")}
//                   className="bg-secondary px-3 py-1 rounded text-sm hover:bg-blue-800"
//                 >
//                   Dashboard
//                 </button>
//                 <button onClick={onLogout} className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700">
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button
//                   onClick={() => onNavigate("login")}
//                   className="bg-secondary px-3 py-1 rounded text-sm hover:bg-blue-800"
//                 >
//                   Login
//                 </button>
//                 <button
//                   onClick={() => onNavigate("signup")}
//                   className="bg-accent px-3 py-1 rounded text-sm hover:bg-yellow-600"
//                 >
//                   Sign Up
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }

// // Home Page Component
// function HomePage({ onNavigate }) {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 py-16">
//         <div className="text-center">
//           <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to ServiceHub</h1>
//           <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//             Your trusted local service marketplace connecting customers with verified service providers. Find
//             electricians, plumbers, tutors, and more with easy booking, real-time updates, and secure profiles.
//           </p>
//           <p className="text-lg text-gray-500 mb-12">
//             Experience smooth and reliable service connections with our comprehensive review system and trusted provider
//             network.
//           </p>
//           <button
//             onClick={() => onNavigate("signup")}
//             className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-secondary transition-colors shadow-lg"
//           >
//             Explore Services
//           </button>
//         </div>

//         <div className="mt-16 grid md:grid-cols-3 gap-8">
//           <div className="text-center p-6 bg-white rounded-lg shadow-md">
//             <div className="text-3xl mb-4">🔧</div>
//             <h3 className="text-xl font-semibold mb-2">Trusted Providers</h3>
//             <p className="text-gray-600">Verified and reviewed service professionals</p>
//           </div>
//           <div className="text-center p-6 bg-white rounded-lg shadow-md">
//             <div className="text-3xl mb-4">📱</div>
//             <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
//             <p className="text-gray-600">Simple and quick service booking process</p>
//           </div>
//           <div className="text-center p-6 bg-white rounded-lg shadow-md">
//             <div className="text-3xl mb-4">⭐</div>
//             <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
//             <p className="text-gray-600">Real-time updates and quality reviews</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Location Selector Component
// function LocationSelector({ selectedCountry, selectedState, selectedCity, onLocationChange }) {
//   const countries = Object.keys(locationData.countries)
//   const states = selectedCountry ? Object.keys(locationData.countries[selectedCountry].states) : []
//   const cities = selectedCountry && selectedState ? locationData.countries[selectedCountry].states[selectedState] : []

//   return (
//     <div className="grid md:grid-cols-3 gap-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
//         <select
//           value={selectedCountry}
//           onChange={(e) => onLocationChange("country", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//           required
//         >
//           <option value="">Select Country</option>
//           {countries.map((country) => (
//             <option key={country} value={country}>
//               {country}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
//         <select
//           value={selectedState}
//           onChange={(e) => onLocationChange("state", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//           required
//           disabled={!selectedCountry}
//         >
//           <option value="">Select State</option>
//           {states.map((state) => (
//             <option key={state} value={state}>
//               {state}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//         <select
//           value={selectedCity}
//           onChange={(e) => onLocationChange("city", e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//           required
//           disabled={!selectedState}
//         >
//           <option value="">Select City</option>
//           {cities.map((city) => (
//             <option key={city} value={city}>
//               {city}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   )
// }

// // Sign Up Page Component
// function SignUpPage({ onNavigate, onSignUp }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     country: "",
//     state: "",
//     city: "",
//     role: "customer",
//     password: "",
//   })

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   const handleLocationChange = (type, value) => {
//     setFormData({
//       ...formData,
//       [type]: value,
//       ...(type === "country" && { state: "", city: "" }),
//       ...(type === "state" && { city: "" }),
//     })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (!formData.email && !formData.phone) {
//       alert("Please provide either email or phone number")
//       return
//     }
//     onSignUp(formData)
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
//         <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Sign Up for ServiceHub</h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
//             <LocationSelector
//               selectedCountry={formData.country}
//               selectedState={formData.state}
//               selectedCity={formData.city}
//               onLocationChange={handleLocationChange}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             >
//               <option value="customer">Customer</option>
//               <option value="provider">Service Provider</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors font-semibold"
//           >
//             Sign Up
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600">
//             Already have an account?{" "}
//             <button onClick={() => onNavigate("login")} className="text-primary hover:text-secondary font-semibold">
//               Login here
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Login Page Component
// function LoginPage({ onNavigate, onLogin }) {
//   const [formData, setFormData] = useState({
//     identifier: "", // Can be email or phone
//     password: "",
//   })

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     onLogin(formData)
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
//         <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Login to ServiceHub</h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email or Phone Number</label>
//             <input
//               type="text"
//               name="identifier"
//               value={formData.identifier}
//               onChange={handleInputChange}
//               placeholder="Enter your email or phone number"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors font-semibold"
//           >
//             Login
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600">
//             Don't have an account?{" "}
//             <button onClick={() => onNavigate("signup")} className="text-primary hover:text-secondary font-semibold">
//               Sign up here
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Service Card Component
// function ServiceCard({ service, onBook }) {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
//           <p className="text-gray-600">{service.category}</p>
//           <p className="text-sm text-gray-500">{service.location}</p>
//         </div>
//         <div className="text-right">
//           <p className="text-lg font-bold text-primary">${service.hourlyRate}/hr</p>
//           <div className="flex items-center mt-1">
//             <span className="text-yellow-400">⭐</span>
//             <span className="text-sm text-gray-600 ml-1">{service.rating}</span>
//           </div>
//         </div>
//       </div>

//       <p className="text-gray-700 mb-4">{service.bio}</p>

//       <div className="mb-4">
//         <p className="text-sm font-medium text-gray-700 mb-1">Skills:</p>
//         <div className="flex flex-wrap gap-2">
//           {service.skills.map((skill, index) => (
//             <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
//               {skill}
//             </span>
//           ))}
//         </div>
//       </div>

//       <div className="mb-4 text-sm text-gray-600">
//         <p>
//           <strong>Phone:</strong> {service.phone}
//         </p>
//         {service.alternateNumber && (
//           <p>
//             <strong>Alternate Phone:</strong> {service.alternateNumber}
//           </p>
//         )}
//         {service.email && (
//           <p>
//             <strong>Email:</strong> {service.email}
//           </p>
//         )}
//       </div>

//       <button
//         onClick={() => onBook(service)}
//         className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors font-semibold"
//       >
//         Book Service
//       </button>
//     </div>
//   )
// }

// // Customer Dashboard Component
// function CustomerDashboard({ user, services, onBook }) {
//   const [selectedCategory, setSelectedCategory] = useState("all")

//   const categories = ["all", ...new Set(services.map((service) => service.category))]
//   const filteredServices =
//     selectedCategory === "all" ? services : services.filter((service) => service.category === selectedCategory)

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
      
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {user.name}!</h1>
//           <p className="text-gray-600">Find and book trusted service providers in your area</p>
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category:</label>
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//           >
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 {category === "all" ? "All Categories" : category}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredServices.map((service) => (
//             <ServiceCard key={service.id} service={service} onBook={onBook} />
//           ))}
//         </div>

//         {filteredServices.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">No services found in this category.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// // Provider Profile Form Component
// function ProviderProfileForm({ user, onSaveProfile, existingProfile }) {
//   const [formData, setFormData] = useState({
//     bio: existingProfile?.bio || "",
//     skills: existingProfile?.skills?.join(", ") || "",
//     hourlyRate: existingProfile?.hourlyRate || "",
//     category: existingProfile?.category || "",
//     alternatePhone: existingProfile?.alternateNumber || "",
//     ...existingProfile,
//   })

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const profileData = {
//       ...formData,
//       skills: formData.skills
//         .split(",")
//         .map((skill) => skill.trim())
//         .filter((skill) => skill),
//       hourlyRate: Number.parseFloat(formData.hourlyRate),
//     }
//     onSaveProfile(profileData)
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">
//         {existingProfile ? "Update Your Profile" : "Create Your Profile"}
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Bio *</label>
//           <textarea
//             name="bio"
//             value={formData.bio}
//             onChange={handleInputChange}
//             rows="4"
//             placeholder="Tell customers about yourself and your services..."
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Service Category *</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="Home Repair">Home Repair</option>
//             <option value="Education">Education</option>
//             <option value="Home Services">Home Services</option>
//             <option value="Technology">Technology</option>
//             <option value="Health & Wellness">Health & Wellness</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Skills * (comma-separated)</label>
//           <input
//             type="text"
//             name="skills"
//             value={formData.skills}
//             onChange={handleInputChange}
//             placeholder="e.g., Electrical wiring, Circuit repair, Installation"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($) *</label>
//           <input
//             type="number"
//             name="hourlyRate"
//             value={formData.hourlyRate}
//             onChange={handleInputChange}
//             min="1"
//             step="0.01"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone Number</label>
//           <input
//             type="tel"
//             name="alternatePhone"
//             value={formData.alternateNumber}
//             onChange={handleInputChange}
//             placeholder="Additional contact number"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors font-semibold"
//         >
//           {existingProfile ? "Update Profile" : "Create Profile"}
//         </button>
//       </form>
//     </div>
//   )
// }

// // Booking Request Card Component
// function BookingRequestCard({ request, onUpdateStatus }) {
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800"
//       case "accepted":
//         return "bg-green-100 text-green-800"
//       case "rejected":
//         return "bg-red-100 text-red-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 mb-4">
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900">{request.customerName}</h3>
//           <p className="text-gray-600">{request.customerPhone}</p>
//           {request.customerEmail && <p className="text-gray-600">{request.customerEmail}</p>}
//         </div>
//         <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
//           {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
//         </span>
//       </div>

//       <p className="text-gray-700 mb-4">{request.message}</p>
//       <p className="text-sm text-gray-500 mb-4">Requested on: {request.date}</p>

//       {request.status === "pending" && (
//         <div className="flex space-x-3">
//           <button
//             onClick={() => onUpdateStatus(request.id, "accepted")}
//             className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
//           >
//             Accept
//           </button>
//           <button
//             onClick={() => onUpdateStatus(request.id, "rejected")}
//             className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
//           >
//             Reject
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

// // Provider Dashboard Component
// function ProviderDashboard({ user, providerProfile, onSaveProfile, bookingRequests, onUpdateBookingStatus }) {
//   const [activeTab, setActiveTab] = useState(providerProfile ? "requests" : "profile")

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Provider Dashboard</h1>
//           <p className="text-gray-600">Welcome, {user.name}!</p>
//         </div>

//         <div className="mb-6">
//           <nav className="flex space-x-4">
//             <button
//               onClick={() => setActiveTab("profile")}
//               className={`px-4 py-2 rounded-md font-medium ${
//                 activeTab === "profile" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               {providerProfile ? "Update Profile" : "Create Profile"}
//             </button>
//             {providerProfile && (
//               <button
//                 onClick={() => setActiveTab("requests")}
//                 className={`px-4 py-2 rounded-md font-medium ${
//                   activeTab === "requests" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-50"
//                 }`}
//               >
//                 Booking Requests ({bookingRequests.length})
//               </button>
//             )}
//           </nav>
//         </div>

//         {activeTab === "profile" && (
//           <ProviderProfileForm user={user} onSaveProfile={onSaveProfile} existingProfile={providerProfile} />
//         )}

//         {activeTab === "requests" && providerProfile && (
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Requests</h2>

//             {bookingRequests.length === 0 ? (
//               <p className="text-gray-500 text-center py-8">No booking requests yet.</p>
//             ) : (
//               <div>
//                 {bookingRequests.map((request) => (
//                   <BookingRequestCard key={request.id} request={request} onUpdateStatus={onUpdateBookingStatus} />
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {!providerProfile && activeTab === "requests" && (
//           <div className="bg-white rounded-lg shadow-md p-6 text-center">
//             <p className="text-gray-500 mb-4">Please create your profile first to start receiving booking requests.</p>
//             <button
//               onClick={() => setActiveTab("profile")}
//               className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
//             >
//               Create Profile
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// // Main App Component
// function App() {
//   const [currentPage, setCurrentPage] = useState("home")
//   const [user, setUser] = useState(null)
//   const [users, setUsers] = useState([])
//   const [services, setServices] = useState([])
//   const [providerProfiles, setProviderProfiles] = useState({})
//   const [bookingRequests, setBookingRequests] = useState([])

//   // Mock services data with provider profiles
//   useEffect(() => {
//     const mockServices = [
//       {
//         id: 1,
//         name: "John Smith",
//         category: "Home Repair",
//         bio: "Experienced electrician with 10+ years in residential and commercial electrical work.",
//         skills: ["Electrical wiring", "Circuit repair", "Installation", "Troubleshooting"],
//         hourlyRate: 75,
//         location: "Los Angeles, CA",
//         phone: "+1-555-0101",
//         alternatePhone: "+1-555-0102",
//         email: "john.smith@email.com",
//         rating: 4.8,
//         providerId: "provider1",
//       },
//       {
//         id: 2,
//         name: "Sarah Johnson",
//         category: "Home Repair",
//         bio: "Professional plumber specializing in emergency repairs and bathroom renovations.",
//         skills: ["Pipe repair", "Drain cleaning", "Bathroom renovation", "Emergency repairs"],
//         hourlyRate: 65,
//         location: "San Francisco, CA",
//         phone: "+1-555-0201",
//         email: "sarah.johnson@email.com",
//         rating: 4.9,
//         providerId: "provider2",
//       },
//       {
//         id: 3,
//         name: "Mike Chen",
//         category: "Education",
//         bio: "Mathematics tutor with expertise in high school and college level math.",
//         skills: ["Algebra", "Calculus", "Statistics", "Test preparation"],
//         hourlyRate: 45,
//         location: "New York, NY",
//         phone: "+1-555-0301",
//         alternatePhone: "+1-555-0302",
//         rating: 4.7,
//         providerId: "provider3",
//       },
//     ]
//     setServices(mockServices)
//   }, [])

//   const handleSignUp = (userData) => {
//     const newUser = {
//       id: Date.now().toString(),
//       ...userData,
//     }
//     setUsers([...users, newUser])
//     alert("Account created successfully! Please login.")
//     setCurrentPage("login")
//   }

//   const handleLogin = (loginData) => {
//     const foundUser = users.find(
//       (u) =>
//         (u.email === loginData.identifier || u.phone === loginData.identifier) && u.password === loginData.password,
//     )

//     if (foundUser) {
//       setUser(foundUser)
//       setCurrentPage(foundUser.role === "customer" ? "customer-dashboard" : "provider-dashboard")
//     } else {
//       alert("Invalid credentials. Please try again.")
//     }
//   }

//   const handleLogout = () => {
//     setUser(null)
//     setCurrentPage("home")
//   }

//   const handleBookService = (service) => {
//     const message = prompt("Please enter a message for the service provider:")
//     if (message) {
//       const newRequest = {
//         id: Date.now().toString(),
//         customerId: user.id,
//         customerName: user.name,
//         customerPhone: user.phone,
//         customerEmail: user.email,
//         providerId: service.providerId,
//         serviceId: service.id,
//         message: message,
//         status: "pending",
//         date: new Date().toLocaleDateString(),
//       }
//       setBookingRequests([...bookingRequests, newRequest])
//       alert("Booking request sent successfully!")
//     }
//   }

//   const handleSaveProviderProfile = (profileData) => {
//     const newProfile = {
//       ...profileData,
//       providerId: user.id,
//       name: user.name,
//       phone: user.phone,
//       email: user.email,
//       location: `${user.city}, ${user.state}`,
//       rating: 5.0,
//     }

//     setProviderProfiles({
//       ...providerProfiles,
//       [user.id]: newProfile,
//     })

//     // Add to services list if not already there
//     const existingServiceIndex = services.findIndex((s) => s.providerId === user.id)
//     if (existingServiceIndex >= 0) {
//       const updatedServices = [...services]
//       updatedServices[existingServiceIndex] = { ...newProfile, id: services[existingServiceIndex].id }
//       setServices(updatedServices)
//     } else {
//       const newService = { ...newProfile, id: Date.now().toString() }
//       setServices([...services, newService])
//     }

//     alert("Profile saved successfully!")
//   }

//   const handleUpdateBookingStatus = (requestId, status) => {
//     setBookingRequests(bookingRequests.map((request) => (request.id === requestId ? { ...request, status } : request)))
//     alert(`Booking request ${status} successfully!`)
//   }

//   const getCurrentUserBookingRequests = () => {
//     return bookingRequests.filter((request) => request.providerId === user?.id)
//   }

//   const renderCurrentPage = () => {
//     switch (currentPage) {
//       case "home":
//         return <HomePage onNavigate={setCurrentPage} />
//       case "signup":
//         return <SignUpPage onNavigate={setCurrentPage} onSignUp={handleSignUp} />
//       case "login":
//         return <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />
//       case "customer-dashboard":
//         return <CustomerDashboard user={user} services={services} onBook={handleBookService} />
//       case "provider-dashboard":
//         return (
//           <ProviderDashboard
//             user={user}
//             providerProfile={providerProfiles[user?.id]}
//             onSaveProfile={handleSaveProviderProfile}
//             bookingRequests={getCurrentUserBookingRequests()}
//             onUpdateBookingStatus={handleUpdateBookingStatus}
//           />
//         )
//       default:
//         return <HomePage onNavigate={setCurrentPage} />
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <NavigationBar user={user} onLogout={handleLogout} onNavigate={setCurrentPage} />
//       {renderCurrentPage()}
//     </div>
//   )
// }

// // Render the app
// ReactDOM.render(<App />, document.getElementById("root"))

