"use client"

import { Button } from "../ui/button"

export default function BookingRequestCard({ request, onAction }) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{request.serviceId?.serviceTitle}</h3>
          <p className="text-sm text-gray-600">
            Customer: {request.customerId?.name}
          </p>
          <p className="text-sm text-gray-600">
            Phone: {request.customerId?.phone}
          </p>
          
          <p className="text-sm text-gray-500">
            Requested on: {new Date(request.bookingDate).toLocaleDateString()}
          </p>
          
  
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            request.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : request.status === "accepted"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </span>
      </div>

      {request.status === "pending" && (
        <div className="flex space-x-2">
          <Button
            onClick={() => onAction(request._id, "accepted")}
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            Accept
          </Button>
          <Button
            onClick={() => onAction(request._id, "rejected")}
            size="sm"
            variant="destructive"
          >
            Reject
          </Button>
        </div>
      )}
    </div>
  )
}
