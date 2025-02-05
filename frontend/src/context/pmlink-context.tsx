"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getDataPmLink } from "../../utils/api";

// Debugging flag
const DEBUG_MODE = false;

export type pmLink = {
  serpo: string;
  wilayah: string;
  segment: string;
  tanggalpm: string;
  traveltiket: number;
  jarak: number;
};

export type PmLinkContextType = {
  dataPmLink: pmLink[];
  loading: boolean;
  ambilDataPmLink: () => void;
};

interface PmLinkProviderProps {
  children: ReactNode;
}

const PmLinkContext = createContext<PmLinkContextType | undefined>(undefined);

export const PmLinkProvider: React.FC<PmLinkProviderProps> = ({ children }) => {
  const [dataPmLink, setDataPmLink] = useState<pmLink[]>([]);
  const [loading, setLoading] = useState(true);

  // Debugging effect untuk memantau perubahan data
  useEffect(() => {
    if (DEBUG_MODE) {
      console.log("DataPmLink updated:", dataPmLink);
      console.log("Loading state:", loading);
    }
  }, [dataPmLink, loading]);

  const ambilDataPmLink = async () => {
    const startTime = Date.now();
    try {
      setLoading(true);
      if (DEBUG_MODE) console.log("Memulai fetching data PM Link...");
      
      const response = await getDataPmLink();
      if (DEBUG_MODE) {
        console.log("Response API:", response);
        console.log("Waktu fetching:", Date.now() - startTime + "ms");
      }

      if (response.status === "success") {
        const formattedData = response.data.map((item: any) => {
          // Validasi data
          if (!item.serpo || !item.wilayah) {
            console.warn("Data tidak valid:", item);
            return null;
          }
          
          return {
            ...item,
            tanggalpm: new Date(item.tanggalpm).toLocaleDateString(),
          };
        }).filter(Boolean);

        setDataPmLink(formattedData);
        if (DEBUG_MODE) console.log("Data diformat:", formattedData);
      } else {
        console.warn("Status response tidak success:", response.data);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
      if (DEBUG_MODE) {
        console.error("Stack trace:", (e as Error).stack);
        console.dir(e);
      }
    } finally {
      setLoading(false);
      if (DEBUG_MODE) console.log("Total waktu proses:", Date.now() - startTime + "ms");
    }
  };

  useEffect(() => {
    if (DEBUG_MODE) console.log("Komponen PmLinkProvider dimount");
    
    ambilDataPmLink();

    return () => {
      if (DEBUG_MODE) console.log("Komponen PmLinkProvider di-unmount");
    };
  }, []);

  return (
    <PmLinkContext.Provider value={{ dataPmLink, loading, ambilDataPmLink }}>
      {children}
    </PmLinkContext.Provider>
  );
};

export const usePmLink = (): PmLinkContextType => {
  const context = useContext(PmLinkContext);
  
  if (!context) {
    const error = new Error("usePmLink must be used within a PmLinkProvider");
    console.error(error.message);
    throw error;
  }

  // Debugging setiap kali hook digunakan
  if (DEBUG_MODE) {
    console.log("usePmLink context:", {
      dataCount: context.dataPmLink.length,
      loading: context.loading
    });
  }

  return context;
};