import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { TaskProvider } from "@/components/TaskProvider";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "An accessible task board built with Next.js and Tailwind.",
  metadataBase: new URL("https://taskflow-coral-delta.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "TaskFlow",
    description: "An accessible task board built with Next.js and Tailwind.",
    url: "/",
    siteName: "TaskFlow",
    type: "website",
    images: ["/screenshot-mobile.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskFlow",
    description: "An accessible task board built with Next.js and Tailwind.",
    images: ["/screenshot-mobile.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#060f1f",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ServiceWorkerRegister />
        <TaskProvider>{children}</TaskProvider>
      </body>
    </html>
  );
}
