"use client"

import { useState } from "react"
export default function Page() {

  const [activeItem, setActiveItem] = useState<string | null>(null);
  const handleItemChange = (item:string | null) =>{
    setActiveItem(item);
    console.log("Active item in parent:", item);
  }
  return (
    <div>
      isi dashboard
    </div>
  )
}
