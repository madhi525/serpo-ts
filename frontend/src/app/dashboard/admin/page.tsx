"use client"

import TablePencapaianPm from "@/components/tables/table-pencapaian-pm";
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
        <div className="col-span-2 px-4 rounded-md shadow-md text-center content-center border row-span-2">
          <TablePencapaianPm />
        </div>
        <div className="col-span-2 p-4 rounded-md shadow-md text-center content-center">
          <span>Status upload BOQ</span>
        </div>
        {/* <div className="p-4 col-span-3 rounded-md shadow-md text-center content-center">
          <span>Nodin</span>
        </div> */}
        <div className="p-4 col-span-4 rounded-md shadow-md text-center content-center">
          <span>RAKER</span>
        </div>
      </div>
    );
  }

export default (Admin);