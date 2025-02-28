"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { TileLayer, Marker, useMapEvents, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix Leaflet marker icons
const fixLeafletIcons = () => {
  const defaultIcon = L.Icon.Default.prototype as {
    _getIconUrl?: string
  }
  delete defaultIcon._getIconUrl

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  })
}

const DynamicMap = dynamic(
  async () => {
    const mod = await import("react-leaflet")
    fixLeafletIcons()
    return mod.MapContainer
  },
  {
    ssr: false,
    loading: () => <div className="h-64 bg-gray-100 rounded-md animate-pulse" />,
  },
)

type LatLngTuple = [number, number]

interface MapProps {
  center: LatLngTuple
  zoom: number
  markers?: LatLngTuple[]
  polyline?: LatLngTuple[]
  onLocationSelect?: (lat: number, lon: number) => void
}

function LocationMarker({ onLocationSelect }: { onLocationSelect?: (lat: number, lon: number) => void }) {
  useMapEvents({
    click(e) {
      onLocationSelect?.(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

export default function Map({ center, zoom, markers = [], polyline = [], onLocationSelect }: MapProps) {
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMapReady(true)
    }
  }, [])

  if (!mapReady) return null

  return (
    <DynamicMap center={center} zoom={zoom} className="h-full w-full" style={{zIndex: 1}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((position, index) => (
        <Marker key={index} position={position} />
      ))}
      {polyline.length > 0 && (
        <Polyline positions={polyline} color="blue" weight={3} />
      )}
      {onLocationSelect && <LocationMarker onLocationSelect={onLocationSelect} />}
    </DynamicMap>
  )
}
