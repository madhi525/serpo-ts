"use client"

// PmLinkContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getDataPmLink } from "../../utils/api";

export type pmLink = {
  serpo: string;
  wilayah: string;
  segment: string;
  tanggalpm: string;
  traveltiket: number;
  jarak: number;
};

type PmLinkContextType = {
  dataPm: pmLink[];
  loading: boolean;
  ambilData: () => void;
};

// Menggunakan ReactNode untuk mendefinisikan children
interface PmLinkProviderProps {
  children: ReactNode;
}

const PmLinkContext = createContext<PmLinkContextType | undefined>(undefined);

export const PmLinkProvider: React.FC<PmLinkProviderProps> = ({ children }) => {
  const [dataPm, setDataPm] = useState<pmLink[]>([]);
  const [loading, setLoading] = useState(true);

  const ambilData = async () => {
    try {
      const response = await getDataPmLink.get('/');
      if (response.data.status === "success") {
        const formattedData: pmLink[] = response.data.data.map((item: any) => ({
          ...item,
          tanggalpm: new Date(item.tanggalpm).toLocaleDateString(),
        }));
        setDataPm(formattedData);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ambilData();
  }, []);

  return (
    <PmLinkContext.Provider value={{ dataPm, loading, ambilData }}>
      {children}
    </PmLinkContext.Provider>
  );
};

export const usePmLink = (): PmLinkContextType => {
  const context = useContext(PmLinkContext);
  if (!context) {
    throw new Error("usePmLink must be used within a PmLinkProvider");
  }
  return context;
};
