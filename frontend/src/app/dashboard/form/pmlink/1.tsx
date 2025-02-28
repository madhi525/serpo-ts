'use client'

import { useState, useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import 'leaflet/dist/leaflet.css'
import Image from 'next/image'
import Map from "@/components/Map"

type LatLngTuple = [number, number]

const serpoMaping: {[key: string]:string}={
    'SERPO ARGAMAKMUR': 'BENGKULU 1',
    'SERPO MANNA': 'BENGKULU 1',
    'SERPO MUKO': 'BENGKULU 1',
    'SERPO PEKALONGAN': 'BENGKULU 1',
    'SERPO SUKAMERINDU': 'BENGKULU 1',
    'SERPO DEMANG': 'SUMSEL 1',
    'SERPO JAKABARING': 'SUMSEL 1',
    'SERPO MASKAREBET': 'SUMSEL 1',
    'SERPO PALEMBANGKOTA': 'SUMSEL 1',
    'SERPO PALEMBANGULU': 'SUMSEL 1',
    'SERPO SUNGAILILIN': 'SUMSEL 1',
    'SERPO BATURAJA': 'SUMSEL 2',
    'SERPO BUKITASAM': 'SUMSEL 2',
    'SERPO MARTAPURA': 'SUMSEL 2',
    'SERPO PENDOPO': 'SUMSEL 2',
    'SERPO PRABUMULIH': 'SUMSEL 2'
}

interface FormData {
    serpo: string
    segment: string
    traveltiket: number
    tanggalpm?: Date
    tikorawal: { lat: number; lon: number }
    tikorakhir: { lat: number; lon: number }
    fototikorawal: File | null
    fototikorakhir: File | null
    fotoproses: File[]
    wilayah: string
    rute: LatLngTuple[]
    jarak: number
  }

export default function PMLinkForm() {
    const [formData, setFormData] = useState<FormData>({
        serpo: '',
        segment: '',
        traveltiket: 0,
        tikorawal: { lat: 0, lon: 0 },
        tikorakhir: { lat: 0, lon: 0 },
        fototikorawal: null,
        fototikorakhir: null,
        fotoproses: [],
        wilayah: '',
        rute: [],
        jarak: 0
    })
    const [selectedCoordinate, setSelectedCoordinate] = useState<'awal' | 'akhir'>('awal')
    const [previewImages, setPreviewImages] = useState<{
        fototikorawal?: string;
        fototikorakhir?: string;
        fotoproses: string[];
      }>({ fotoproses: [] });

      
    
      const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'fototikorawal' | 'fototikorakhir' | 'fotoproses') => {
        const files = e.target.files
        if (!files) return
      
        if (field === 'fotoproses') {
          const fileArray = Array.from(files)
          const previews = await Promise.all(
            fileArray.map(file => {
              return new Promise<string>((resolve) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result as string)
                reader.readAsDataURL(file)
              })
            })
          )
          
          setPreviewImages(prev => ({ ...prev, [field]: previews }))
          setFormData(prev => ({ ...prev, [field]: fileArray }))
        } else {
          const file = files[0]
          const reader = new FileReader()
          reader.onloadend = () => {
            setPreviewImages(prev => ({ ...prev, [field]: reader.result as string }))
          }
          reader.readAsDataURL(file)
          setFormData(prev => ({ ...prev, [field]: file }))
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
        const [lat1, lon1] = formData.tikorawal
        const [lat2, lon2] = formData.tikorakhir
    
        try {
          const response = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=full&geometries=geojson`,
          )
          const data = await response.json()
    
          if (data.routes?.[0]?.geometry?.coordinates) {
            setFormData((prev) => ({
              ...prev,
              rute: data.routes[0].geometry.coordinates.map(([lon, lat]: number[]) => [lat, lon] as LatLngTuple),
              jarak: data.routes[0].distance / 1000, // Convert to kilometers
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
        console.log("Form Data:", formData)
        // Handle form submission here
      }
    
      // ... (other handlers like handleImageUpload)
    

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* SERPO dan Segment */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>SERPO</Label>
                    <Select
                        onValueChange={value => setFormData(prev => ({
                        ...prev,
                        serpo: value,
                        wilayah: serpoMaping[value] || ''
                    }))}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih SERPO"/>
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(serpoMaping).map(serpo => (
                                <SelectItem key={serpo} value={serpo}>{serpo}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                    <div className="space-y-2">
                        <Label>Segment</Label>
                        <Input
                            value={formData.segment}
                            onChange={(e) => setFormData({...formData, segment: e.target.value})}
                        />
                    </div>
            </div>

            {/* Travel Tiket dan Tanggal PM */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Travel Tiket</Label>
                    <Input
                        type="number"
                        value={formData.traveltiket}
                        onChange={(e) => setFormData({...formData, traveltiket: +e.target.value})}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Tanggal PM</Label>
                    <Calendar
                        mode="single"
                        selected={formData.tanggalpm}
                        onSelect={(date) => setFormData({...formData, tanggalpm: date})}
                        className="rounded-md border"
                    />
                </div>
            </div>

            {/* Koordinat Awal dan Akhir */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className='flex gap-4'>
                        <Button
                            type="button"
                            variant={selectedCoordinate === 'awal' ? 'default' : 'outline'}
                            onClick={() => setSelectedCoordinate('awal')}
                        >
                            Set Koordinat Awal
                        </Button>
                        <Button
                            type="button"
                            variant={selectedCoordinate === 'akhir' ? 'default' : 'outline'}
                            onClick={() => setSelectedCoordinate('akhir')}
                        >
                            Set Koordinat Akhir
                        </Button>
                    </div>
                    <div className="flex flex-row">
                        <Label>Jarak (km)</Label>
                        <Input
                        value={formData.jarak}
                        readOnly
                        onChange={(e) => setFormData({...formData, jarak: +e.target.value})}
                        />
                    </div>
                </div>
                
            {/* Map */}
        <div className="h-64 bg-gray-100 rounded-md overflow-hidden relative">
          <Map
            center={[-6.2088, 106.8456]}
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
        <div className="grid grid-cols-3 gap-4">
        {(['fototikorawal', 'fototikorakhir'] as const).map((field) => (
            <div key={field} className="space-y-2">
            <Label>Foto {field.split('foto')[1]}</Label>
            <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, field)}
            />
            {previewImages[field] && (
                <Image 
                src={previewImages[field] as string}
                width={64}
                height={64}
                alt="Preview" 
                className="mt-2 h-32 w-full object-cover rounded"
                />
            )}
            </div>
        ))}
          <div className="space-y-2">
            <Label>Foto Proses (Multiple)</Label>
            <Input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageUpload(e, 'fotoproses')}
            />
            <div className="grid grid-cols-3 gap-2 mt-2">
            {(previewImages.fotoproses as string[] || []).map((img, index) => (
              <div key={index} className="relative group">
                <Image
                  src={img}
                  alt={`Preview ${index + 1}`}
                  width={128}
                  height={128}
                  className="h-24 w-full object-cover rounded border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    const newPreviews = [...(previewImages.fotoproses as string[])]
                    newPreviews.splice(index, 1)
                    setPreviewImages(prev => ({ ...prev, fotoproses: newPreviews }))
                    
                    const newFiles = [...formData.fotoproses]
                    newFiles.splice(index, 1)
                    setFormData(prev => ({ ...prev, fotoproses: newFiles }))
                  }}
                >
                  ×
                </Button>
              </div>
            ))}
        </div>
          </div>
        </div>

        {/* Wilayah dan Jarak */}
        <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label>Wilayah</Label>
            <Input 
              value={formData.wilayah}
              readOnly
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  )
}