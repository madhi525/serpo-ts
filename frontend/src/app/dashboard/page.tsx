import Tabelpmlink from "@/components/tabel-pmlink";
import { PmLinkProvider } from "@/context/pmlink-context";
export default function Page() {
    return (
      <div className="grid grid-cols-3">
        <PmLinkProvider>
          <Tabelpmlink />
        </PmLinkProvider>
        <PmLinkProvider>
          <div>
            
          </div>
        </PmLinkProvider>
      </div>
    );
  }

// export default verifikasiToken(Admin, ['admin']);