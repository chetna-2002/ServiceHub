"use client";
import { useAuth } from "../Authcontext";

export default function ProviderDashboard() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user logged in</p>;

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
