"use client"
import CustomerDashboard from "../../components/pages/CustomerDashboard"
import { useAuth } from "../../Authcontext"

export default function Page() {
  const { user } = useAuth()

  if (!user) return <p>Loading...</p>

  return <CustomerDashboard user={user} />
}
