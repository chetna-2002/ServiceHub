"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";


export default function NavigationBar({ user, onLogout }) {
  const router = useRouter();
  
  return (
    <nav className="bg-white shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => router.push("/home")}
              className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              ServiceHub
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
               
                <span className="text-foreground">Hi, {user.name}</span>
                <Button onClick={onLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => router.push("/login")}
                  variant="ghost"
                  size="sm"
                >
                  Login
                </Button>
                <Button onClick={() => router.push("/signup")} size="sm">
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
