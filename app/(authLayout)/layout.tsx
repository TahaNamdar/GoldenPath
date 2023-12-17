import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ToastContainer } from "react-toastify";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/dashboard");
    }

    return (
        <div>
            <ToastContainer toastStyle={{ backgroundColor: "#1D212A", fontSize: "14px" }} />
            {children}
        </div>
    );
}
