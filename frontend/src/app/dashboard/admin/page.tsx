"use client"

import { verifikasiToken } from "../../../../utils/verifikasiToken";
import Tabelpmlink from "@/components/tabel-pmlink";
import { PmLinkProvider } from "@/context/pmlink-context";
const Admin = () => {
    return (
      <div className="grid grid-cols-3">
        <PmLinkProvider>
          <Tabelpmlink />
        </PmLinkProvider>
      </div>
    );
  }

export default verifikasiToken(Admin, ['admin']);