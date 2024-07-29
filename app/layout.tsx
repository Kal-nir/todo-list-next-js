import type { Metadata } from "next";
import AuthProvider from "./AuthProvider";

export const metadata: Metadata = {
  title: "To-do List",
  description: "A simple to do list.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
