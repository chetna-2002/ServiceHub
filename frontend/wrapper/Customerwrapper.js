"use client";
import { useEffect } from "react";
import useUser from "../../hooks/useUser"; // your hook path
import { useRouter } from "next/navigation";
import CustomerDashboardComponent from "../components/pages/CustomerDashboard";

export default function CustomerDashboard() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return <CustomerDashboardComponent user={user} />;
}
