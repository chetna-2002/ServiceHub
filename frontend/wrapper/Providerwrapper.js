"use client";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser"; // your hook path
import { useRouter } from "next/navigation";
import ProviderDashboardComponent from "../components/pages/ProviderDashboard";

export default function ProviderDashboard() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login"); // redirect if not logged in
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null; // redirecting

  return <ProviderDashboardComponent user={user} />;
}
