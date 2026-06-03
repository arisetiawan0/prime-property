import type { Metadata } from "next";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Login Agent — Prime Property",
  description:
    "Masuk ke Elite Agent Portal Prime Property untuk mengelola listing properti premium Anda.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Login Agent — Prime Property",
    description:
      "Masuk ke Elite Agent Portal Prime Property untuk mengelola listing properti premium Anda.",
    siteName: "Prime Property",
    locale: "id_ID",
    type: "website",
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
