import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { TaskProvider } from "@/components/TaskProvider";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "An accessible task board built with Next.js and Tailwind.",
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
