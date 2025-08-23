"use client"

import { useState } from "react"
import NavigationBar from "../components/navigation/NavigationBar"
import HomePage from "../components/pages/HomePage"
import SignUpPage from "../components/pages/SignUpPage"
import LoginPage from "../components/pages/LoginPage"
import CustomerDashboard from "../components/pages/CustomerDashboard"
import ProviderDashboard from "../components/pages/ProviderDashboard"

export default function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [user, setUser] = useState(null)

  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  const handleLogin = (userData) => {
    setUser(userData)
    if (userData.role === "customer") {
      setCurrentPage("customer-dashboard")
    } else {
      setCurrentPage("provider-dashboard")
    }
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentPage("home")
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={navigateTo} />
      case "signup":
        return <SignUpPage onNavigate={navigateTo} />
      case "login":
        return <LoginPage onNavigate={navigateTo} onLogin={handleLogin} />
      case "customer-dashboard":
        return <CustomerDashboard user={user} />
      case "provider-dashboard":
        return <ProviderDashboard user={user} />
      default:
        return <HomePage onNavigate={navigateTo} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar user={user} onNavigate={navigateTo} onLogout={handleLogout} currentPage={currentPage} />
      <main>{renderCurrentPage()}</main>
    </div>
  )
}
