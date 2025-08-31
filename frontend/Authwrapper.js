"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.replace("/login"); // if not logged in, go to login
    } else {
      // redirect based on role if you have one
      if (user.role === "provider") {
        router.replace("/provider-dashboard");
      } else {
        router.replace("/customer-dashboard");
      }
    }
    setLoading(false);
  }, [router,role]);

  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
}
