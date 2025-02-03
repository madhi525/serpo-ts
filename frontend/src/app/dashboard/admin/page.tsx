"use client"

import { verifikasiToken } from "../../../../utils/verifikasiToken";
// import Tabelpmlink from "@/components/tabel-pmlink";
// import { PmLinkProvider } from "@/context/pmlink-context";
const Admin = () => {
    return (
      <div className="grid grid-cols-4 w-full h-full p-4 gap-4">
        {/* <PmLinkProvider>
          <Tabelpmlink />
        </PmLinkProvider> */}
        <div className="col-span-2 p-4 rounded-md shadow-md text-center content-center">
          <span>WIN LOSE MTTR</span>
        </div>
        <div className="col-span-2 p-4 rounded-md shadow-md text-center content-center">
          <span>Pencapaian PM</span>
        </div>
        <div className="p-4 rounded-md shadow-md text-center content-center">
          <span>Status upload BOQ</span>
        </div>
        <div className="p-4 col-span-2 rounded-md shadow-md text-center content-center">
          <span>raker</span>
        </div>
        <div className="p-4 rounded-md shadow-md text-center content-center">
          <span>NOdin</span>
        </div>
      </div>
    );
  }

export default verifikasiToken(Admin, ['admin']);