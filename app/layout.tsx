import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
