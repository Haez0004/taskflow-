import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { TaskProvider } from "@/components/TaskProvider";

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "An accessible task board built with Next.js and Tailwind.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TaskProvider>{children}</TaskProvider>
      </body>
    </html>
  );
}
