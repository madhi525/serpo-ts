"use client"

import Tabelpmlink from "@/components/tabel-pmlink";
import { PmLinkProvider } from "@/context/pmlink-context";

const page = () => {
    return (
        <div className="flex w-full gap-4 p-3">
            <div className="w-full border rounded-md">
                <PmLinkProvider>
                    <Tabelpmlink/>
                </PmLinkProvider>
            </div>
        </div>
    )
}

export default page;