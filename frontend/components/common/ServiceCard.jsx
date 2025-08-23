"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { getCurrencySymbol } from "../../utils/locationData"

export default function ServiceCard({ service, onBook, showBookButton = false, userCountry = "United States" }) {
  const currencySymbol = getCurrencySymbol(userCountry)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">{service.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-green-600 text-xl">
              {currencySymbol}
              {service.hourlyRate}/hour
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">
              <strong>Provider:</strong> {service.providerName}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Location:</strong> {service.location}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-700">{service.bio}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">
              <strong>Skills:</strong> {service.skills}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">
              <strong>Contact:</strong> {service.phone}
            </p>
            {service.alternatePhone && (
              <p className="text-sm text-gray-600">
                <strong>Alternate:</strong> {service.alternatePhone}
              </p>
            )}
          </div>

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
