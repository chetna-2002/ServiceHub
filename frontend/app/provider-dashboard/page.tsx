"use client"
import ProviderDashboard from "../../components/pages/ProviderDashboard"
import { useAuth } from "../../Authcontext"

export default function Page() {
  const { user } = useAuth()

  if (!user) return <p>Loading...</p>

  return <ProviderDashboard user={user} />
}
