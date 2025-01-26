"use client"

import { verifikasiToken } from "../../../../utils/verifikasiToken";
const Admin = () => {
    return (
      <div>
        <p>admin</p>
      </div>
    );
  }

export default verifikasiToken(Admin, ['admin']);