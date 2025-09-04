"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { getCurrencySymbol } from "../../utils/locationData"

export default function ServiceCard({ service, onBook, showBookButton = false, userCountry = "india" }) {
  const currencySymbol = getCurrencySymbol(userCountry)
  // console.log(service," hi im serbice in servicecard")

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">{service.serviceTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Hourly Rate */}
          <div>
            <p className="font-semibold text-green-600 text-xl">
              {currencySymbol}{service.hourlyRate}/hour
            </p>
          </div>

          {/* Provider & Location */}
          <div>
            <p className="text-sm text-gray-600">
              <strong>Provider:</strong> {service.userId?.name}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Location:</strong>{" "}
              {service.userId?.country}, {service.userId?.state}, {service.userId?.city}
            </p>
          </div>

          {/* Bio */}
          <div>
            <p className="text-sm text-gray-700">{service.bio}</p>
          </div>

          {/* Skills */}
          <div>
            <p className="text-sm text-gray-600">
              <strong>Skills:</strong> {service.skills}
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm text-gray-600">
              <strong>Contact:</strong> {service.userId?.phone}
            </p>
            
          </div>

          {/* Book Button */}
          {showBookButton && (
            <Button onClick={() => onBook(service)} className="w-full mt-4">
              Book Service
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
