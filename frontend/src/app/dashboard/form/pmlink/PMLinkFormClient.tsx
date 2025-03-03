"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { parse } from "date-fns"
import { cn } from "@/lib/utils"
import "leaflet/dist/leaflet.css"
import Image from "next/image"
import Map from "@/components/Map"

type LatLngTuple = [number, number]

const serpoMaping: { [key: string]: string } = {
  "SERPO ARGAMAKMUR": "BENGKULU 1",
  "SERPO MANNA": "BENGKULU 1",
  "SERPO MUKO": "BENGKULU 1",
  "SERPO PEKALONGAN": "BENGKULU 1",
  "SERPO SUKAMERINDU": "BENGKULU 1",
  "SERPO DEMANG": "SUMSEL 1",
  "SERPO JAKABARING": "SUMSEL 1",
  "SERPO MASKAREBET": "SUMSEL 1",
  "SERPO PALEMBANGKOTA": "SUMSEL 1",
  "SERPO PALEMBANGULU": "SUMSEL 1",
  "SERPO SUNGAILILIN": "SUMSEL 1",
  "SERPO BATURAJA": "SUMSEL 2",
  "SERPO BUKITASAM": "SUMSEL 2",
  "SERPO MARTAPURA": "SUMSEL 2",
  "SERPO PENDOPO": "SUMSEL 2",
  "SERPO PRABUMULIH": "SUMSEL 2",
}

interface FormData {
  serpo: string
  segment: string
  traveltiket: number
  tanggalpm?: Date
  tikorawal: [number, number]
  tikorakhir: [number, number]
  fototikorawal: File | null
  fototikorakhir: File | null
  fotoproses: File[]
  wilayah: string
  rute: LatLngTuple[]
  jarak: number
}

interface initialData {
  serpo: string
  segment: string
  traveltiket: number
  tanggalpm?: Date
  tikorawal: {
    lat: number,
    lon: number
  }
  tikorakhir: {
    lat: number,
    lon: number
  }
  fototikorawal: File | null
  fototikorakhir: File | null
  fotoproses: File[]
  wilayah: string
  rute: LatLngTuple[]
  jarak: number
}

interface PMLinkFormProps {
  initialData?: initialData
  onSubmit?: (data: FormData) => void
  onCancel?: () => void
}

export default function PMLinkForm({ initialData, onSubmit, onCancel }: PMLinkFormProps) {
  const [formData, setFormData] = useState<FormData>(
    {
      serpo: "",
      segment: "",
      traveltiket: 0,
      tanggalpm: undefined,
      tikorawal: [0, 0],
      tikorakhir: [0, 0],
      fototikorawal: null,
      fototikorakhir: null,
      fotoproses: [],
      wilayah: "",
      rute: [],
      jarak: 0,
    },
  )
  const [selectedCoordinate, setSelectedCoordinate] = useState<"awal" | "akhir">("awal")
  const [previewImages, setPreviewImages] = useState<{
    fototikorawal?: string
    fototikorakhir?: string
    fotoproses: string[]
  }>({ fotoproses: [] })


  useEffect(() => {
    const handleFileOrBlob = (value: any) => {
      // If it's a valid File or Blob, process it accordingly
      if (value instanceof Blob || value instanceof File) {
        return URL.createObjectURL(value); // Convert the Blob/File to a URL
      }
      
      // If it's already a valid URL (string), return it directly
      if (isValidUrl(value)) {
        return value; // Return the URL directly
      }
    
      // If the value is neither a valid File/Blob nor a valid URL, return undefined
      return undefined;
    };

    if (initialData) {
      console.log(initialData)
      const formattedInitialData = {
        ...initialData,
        tikorawal: [initialData.tikorawal.lat, initialData.tikorakhir.lon],
        tikorakhir: [initialData.tikorakhir.lat, initialData.tikorakhir.lon],
        tanggalpm: initialData.tanggalpm ? parse(initialData.tanggalpm.toString(), "dd/MM/yyyy", new Date()) : new Date(),
      }
      setFormData(formattedInitialData)
      // Set preview images if available in initialData
      setPreviewImages({
        fototikorawal: initialData.fototikorawal
          ? handleFileOrBlob(initialData.fototikorawal)
          : undefined,
          
        fototikorakhir: initialData.fototikorakhir
          ? handleFileOrBlob(initialData.fototikorakhir)
          : undefined,
          
        fotoproses: initialData.fotoproses && Array.isArray(initialData.fotoproses)
          ? initialData.fotoproses.map((file) =>
              handleFileOrBlob(file)
            )
          : [],
      })
    }
  }, [initialData])

  const handleDateChange = (date: Date | undefined) => {
    if (date && !isNaN(date.getTime())) {
      setFormData((prev) => ({ ...prev, tanggalpm: date }))
    }
  }

  const isValidUrl = (value: any): boolean => {
    try {
      // Check if the value is a valid URL by attempting to create a URL object
      new URL(value);
      return true;
    } catch (e) {
      return false;
    }
  };
  

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "fototikorawal" | "fototikorakhir" | "fotoproses",
  ) => {
    const files = Array.from(e.target.files || [])
    if (!files || files.length === 0) return

    if (field === "fotoproses") {
      const newFiles = [...formData.fotoproses, ...files]
      setFormData((prev) => ({ ...prev, fotoproses: newFiles }))

      const newPreviews = await Promise.all(
        files.map((file) => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
              if (typeof reader.result === "string") {
                resolve(reader.result)
              } else {
                reject("Failed to read image")
              }
            }
            reader.onerror = () => reject(reader.error)
            reader.readAsDataURL(file)
          })
        }),
      )
      setPreviewImages((prev) => ({
        ...prev,
        fotoproses: [...(prev.fotoproses || []), ...newPreviews],
      }))
    } else {
      const file = files[0]
      setFormData((prev) => ({ ...prev, [field]: file }))

      const reader = new FileReader()
      reader.onload = (event) => {
      if (event.target) {
        setPreviewImages((prev) => ({ ...prev, [field]: event.target?.result as string }))
      }

      }
      reader.readAsDataURL(file)
    }
  }

  const handleMapClick = useCallback(
    (lat: number, lon: number) => {
      const field = selectedCoordinate === "awal" ? "tikorawal" : "tikorakhir"
      setFormData((prev) => ({
        ...prev,
        [field]: [lat, lon],
      }))
    },
    [selectedCoordinate],
  )

  const fetchRoute = useCallback(async () => {
    const [lat1, lon1] = formData.tikorawal;  // Destructure as LatLngTuple
    const [lat2, lon2] = formData.tikorakhir; // Destructure as LatLngTuple

    console.log('lat1, lon1:', lat1, lon1);
    console.log('lat2, lon2:', lat2, lon2);

    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=full&geometries=geojson`,
      )
      const data = await response.json()

      if (data.routes?.[0]?.geometry?.coordinates) {
        const distanses = Number.parseFloat((data.routes[0].distance / 1000).toFixed(2))
        setFormData((prev) => ({
          ...prev,
          rute: data.routes[0].geometry.coordinates.map(([lon, lat]: number[]) => [lat, lon] as LatLngTuple),
          jarak: distanses, // Convert to kilometers
        }))
      }
    } catch (error) {
      console.error("Error fetching route:", error)
    }
  }, [formData.tikorawal, formData.tikorakhir])

  useEffect(() => {
    if (formData.tikorawal[0] !== 0 && formData.tikorakhir[0] !== 0) {
      fetchRoute()
    }
  }, [formData.tikorawal, formData.tikorakhir, fetchRoute])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-2 md:p-6 space-y-4 md:space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* SERPO dan Segment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>SERPO</Label>
            <Select
              value={formData.serpo}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  serpo: value,
                  wilayah: serpoMaping[value] || "",
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih SERPO" />
              </SelectTrigger>
              <SelectContent style={{ position: "fixed", zIndex: 9998 }}>
                {Object.keys(serpoMaping).map((serpo) => (
                  <SelectItem key={serpo} value={serpo}>
                    {serpo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Segment</Label>
            <Input value={formData.segment} onChange={(e) => setFormData({ ...formData, segment: e.target.value })} />
          </div>
        </div>

        {/* Travel Tiket dan Tanggal PM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Travel Tiket</Label>
            <Input
              type="number"
              value={formData.traveltiket}
              onChange={(e) => setFormData({ ...formData, traveltiket: +e.target.value })}
            />
          </div>
          <div className="space-y-2 relative">
            <Label>Tanggal PM</Label>
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.tanggalpm && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.tanggalpm ? (
                    formData.tanggalpm.toLocaleString().split(',')[0]
                  ) : (
                    <span>Pick a date</span>
                  )}

                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" style={{ zIndex: 9999 }}>
                <Calendar mode="single" selected={formData.tanggalpm} onSelect={handleDateChange} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Koordinat Awal dan Akhir */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <Button
                type="button"
                variant={selectedCoordinate === "awal" ? "default" : "outline"}
                onClick={() => setSelectedCoordinate("awal")}
                className="w-full md:w-auto"
              >
                Set Koordinat Awal
              </Button>
              <Button
                type="button"
                variant={selectedCoordinate === "akhir" ? "default" : "outline"}
                onClick={() => setSelectedCoordinate("akhir")}
                className="w-full md:w-auto"
              >
                Set Koordinat Akhir
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Label>Jarak (km)</Label>
              <Input
                value={formData.jarak}
                readOnly
                className="w-24"
                onChange={(e) => setFormData({ ...formData, jarak: +e.target.value })}
              />
            </div>
          </div>

          {/* Map */}
          <div className="h-64 bg-gray-100 rounded-md overflow-hidden transition-all duration-200">
            <Map
              center={formData.tikorawal[0] !== 0 ? formData.tikorawal : [-2.960972050283343, 104.73774902999797]}
              zoom={13}
              markers={[
                formData.tikorawal[0] !== 0 ? formData.tikorawal : undefined,
                formData.tikorakhir[0] !== 0 ? formData.tikorakhir : undefined,
              ].filter((marker): marker is LatLngTuple => marker !== undefined)}
              polyline={formData.rute}
              onLocationSelect={handleMapClick}
            />
          </div>
        </div>

        {/* File Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(["fototikorawal", "fototikorakhir"] as const).map((field) => (
            <div key={field} className="space-y-2">
              <Label>Foto {field.split("foto")[1]}</Label>
              <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, field)} />
              {previewImages[field] && (
                <Image
                  src={(previewImages[field] as string) || "/placeholder.svg"}
                  width={64}
                  height={64}
                  alt="Preview"
                  className="mt-2 h-32 w-full object-fit rounded"
                />
              )}
            </div>
          ))}
          <div className="space-y-2 col-span-1 md:col-span-2">
            <Label>Foto Proses (Multiple)</Label>
            <Input type="file" multiple accept="image/*" onChange={(e) => handleImageUpload(e, "fotoproses")} />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {((previewImages.fotoproses as string[]) || []).map((img, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    width={128}
                    height={128}
                    className="h-24 w-full rounded border object-fit"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      const newPreviews = [...(previewImages.fotoproses as string[])]
                      newPreviews.splice(index, 1)
                      setPreviewImages((prev) => ({ ...prev, fotoproses: newPreviews }))

                      const newFiles = [...formData.fotoproses]
                      newFiles.splice(index, 1)
                      setFormData((prev) => ({ ...prev, fotoproses: newFiles }))
                    }}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wilayah */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Wilayah</Label>
            <Input value={formData.wilayah} readOnly />
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="flex-1">
            {initialData ? "Update" : "Submit"}
          </Button>
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
