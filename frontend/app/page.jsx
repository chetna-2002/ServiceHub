"use client"

import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import {useRouter} from "next/navigation"
import NavigationBar from '../components/navigation/NavigationBar'

export default function HomePage() {
  const router = useRouter()

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <NavigationBar/>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to ServiceHub</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            ServiceHub is a local service marketplace that connects customers with trusted service providers like
            electricians, plumbers, tutors, and more. We offer easy booking, real-time status updates, secure profiles,
            and reviews to ensure a smooth and reliable service experience.
          </p>
          <Button onClick={() => router.push("/signup")} size="lg" className="px-8 py-3 text-lg">
            Explore Services
          </Button>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Popular Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src="/plumber-fixing-pipes.png" alt="Plumbing Services" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Plumbing</h3>
                <p className="text-gray-600 text-sm">Expert plumbers for repairs, installations, and maintenance</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src="/tutor-student-desk.png" alt="Tutoring Services" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tutoring</h3>
                <p className="text-gray-600 text-sm">Professional tutors for all subjects and grade levels</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src="/placeholder-4ykox.png" alt="Electrical Services" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Electrical</h3>
                <p className="text-gray-600 text-sm">Licensed electricians for wiring, repairs, and installations</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src="/house-cleaner.png" alt="Cleaning Services" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cleaning</h3>
                <p className="text-gray-600 text-sm">Professional cleaning services for homes and offices</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src="/gardener-landscaping.png" alt="Gardening Services" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Gardening</h3>
                <p className="text-gray-600 text-sm">Expert gardeners for landscaping and plant care</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src="/placeholder-8hnj8.png" alt="Handyman Services" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Handyman</h3>
                <p className="text-gray-600 text-sm">Skilled handymen for home repairs and maintenance</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src="/yoga-instructor-class.png" alt="Yoga Services" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Yoga</h3>
                <p className="text-gray-600 text-sm">Certified yoga instructors for classes and personal sessions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Providers</h3>
              <p className="text-gray-600">Connect with verified and experienced service providers in your area</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Book services quickly with real-time status updates and notifications</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">Secure profiles, reviews, and ratings ensure quality service delivery</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}












































// "use client"

// import { useState } from "react"
// import NavigationBar from "../components/navigation/NavigationBar"
// import HomePage from "../components/pages/HomePage"
// // import SignUpPage from "../components/pages/SignUpPage"
// // import LoginPage from "../components/pages/LoginPage"
// import CustomerDashboard from "../components/pages/CustomerDashboard"
// import ProviderDashboard from "../components/pages/ProviderDashboard"

// export default function App() {
//   const [currentPage, setCurrentPage] = useState("home")
//   const [user, setUser] = useState(null)

//   const navigateTo = (page) => {
//     setCurrentPage(page)
//   }

//   const handleLogin = (userData) => {
//     setUser(userData)
//     if (userData.role === "customer") {
//       setCurrentPage("customer-dashboard")
//     } else {
//       setCurrentPage("provider-dashboard")
//     }
//   }

//   const handleLogout = () => {
//     setUser(null)
//     setCurrentPage("home")
//   }

//   const renderCurrentPage = () => {
//     switch (currentPage) {
//       case "home":
//         return <HomePage onNavigate={navigateTo} />
//       case "signup":
//         return <SignUpPage onNavigate={navigateTo} />
//       case "login":
//         return <LoginPage onNavigate={navigateTo} onLogin={handleLogin} />
//       case "customer-dashboard":
//         return <CustomerDashboard user={user} />
//       case "provider-dashboard":
//         return <ProviderDashboard user={user} />
//       default:
//         return <HomePage onNavigate={navigateTo} />
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <NavigationBar user={user} onNavigate={navigateTo} onLogout={handleLogout} currentPage={currentPage} />
//       <main>{renderCurrentPage()}</main>
//     </div>
//   )
// }
