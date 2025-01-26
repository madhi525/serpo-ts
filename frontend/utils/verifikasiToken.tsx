"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {jwtDecode} from "jwt-decode";

interface decodedToken {
    id: string;
    role: string;
    exp: number;
}

export const verifikasiToken = (WarppedComponent: React.ComponentType, allowedRoles: string[]) => {
    const AuthekasiKomponen = (props: any) => {
        const router = useRouter();
        useEffect(() => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert('tidak di izikan')
                router.push("/");
                return;
            }
            try {
                const decoded: decodedToken = jwtDecode(token);
                // Cek apakah token sudah kedaluwarsa
                const currentTime = Math.floor(Date.now() / 1000);
                if (decoded.exp < currentTime) {
                localStorage.removeItem("token"); // Hapus token yang sudah expired
                router.push("/");
                return;
                }
                if (!allowedRoles.includes(decoded.role)){
                    router.push("/");
                    return;
                }
            } catch (error) {
                console.error("Token tidak valid ",error);
                localStorage.removeItem("token");
                router.push("/");

            }
        }, [router]);
        return <WarppedComponent {...props} />;
    };
    return AuthekasiKomponen;
}
