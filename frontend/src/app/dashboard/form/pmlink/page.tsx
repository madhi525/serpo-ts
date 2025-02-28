"use client"

import dynamic from "next/dynamic"

const PMLinkFormClient = dynamic(() => import("./PMLinkFormClient"), {
  ssr: false,
  loading: () => <p>Loading form...</p>,
})

export default function PMLinkForm() {
  return <PMLinkFormClient />
}