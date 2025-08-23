"use client"

import { useState } from "react"
import { Label } from "../ui/label"
import { countries, statesByCountry, citiesByState } from "../../utils/locationData"

export default function LocationSelector({ onLocationChange }) {
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")

  const handleCountryChange = (e) => {
    const country = e.target.value
    setSelectedCountry(country)
    setSelectedState("")
    setSelectedCity("")
    onLocationChange({ country, state: "", city: "" })
  }

  const handleStateChange = (e) => {
    const state = e.target.value
    setSelectedState(state)
    setSelectedCity("")
    onLocationChange({ country: selectedCountry, state, city: "" })
  }

  const handleCityChange = (e) => {
    const city = e.target.value
    setSelectedCity(city)
    onLocationChange({ country: selectedCountry, state: selectedState, city })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="country">Country *</Label>
        <select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {selectedCountry && statesByCountry[selectedCountry] && (
        <div>
          <Label htmlFor="state">State/Province *</Label>
          <select
            id="state"
            value={selectedState}
            onChange={handleStateChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select State/Province</option>
            {statesByCountry[selectedCountry].map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedState && citiesByState[selectedState] && (
        <div>
          <Label htmlFor="city">City *</Label>
          <select
            id="city"
            value={selectedCity}
            onChange={handleCityChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select City</option>
            {citiesByState[selectedState].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
