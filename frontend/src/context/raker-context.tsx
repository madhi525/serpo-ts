"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getDataRaker } from "../../utils/api";

// debbug mode
const DEBUG_MODE = false;

export type raker = {
    nama: string;
    serpo: string;
    wilayah: string;
    deadline: Date;
    realisasi: Date | null;
};

export type rakerContextType = {
    dataRaker: raker[];
    loading: boolean;
    ambilDataRaker: () => void;
};

interface rakerProviderProps {
    children: ReactNode;
}

const rakerContext = createContext<rakerContextType | undefined>(undefined);

export const RakerProvider: React.FC<rakerProviderProps> = ({children}) => {
    const [dataRaker, setDataRaker] = useState<raker[]>([]);
    const [loading, setLoading] = useState(true);

    //debbug
    useEffect(() => {
        if (DEBUG_MODE) {
            console.log("dataRaker updated: ", dataRaker);
            console.log("Loading state: ", loading);
        }
    }, [dataRaker, loading]);

    const ambilDataRaker = async () => {
        // const mulaiAmbil = Date.now();
        try{
            setLoading(true);

            const response = await getDataRaker();

            if (response.status === "success"){
                const formattedData = response.data.map((item:any) => {
                    if (!item.serpo || !item.wilayah){
                        console.warn("Data tiadk valid: ", item);
                        return null;
                    }
                    return {
                        ...item,
                        deadline: new Date(item.deadline).toLocaleDateString(),
                    };
            }).filter(Boolean);
            setDataRaker(formattedData);
            } else {
                console.error("Status respon tidak succsess: ", response);
            }
        } catch (e){
            console.error("Error fetching data: ", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect (() => {
        ambilDataRaker();
    }, []);

    return (
        <rakerContext.Provider value={{dataRaker, loading, ambilDataRaker}}>
            {children}
        </rakerContext.Provider>
    )
}

export const useRaker = (): rakerContextType => {
    const context = useContext(rakerContext);
    if(!context) {
        throw new Error("useRaker must be used within a RakerProvider");
    }
    return context;
}