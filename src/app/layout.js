import { Numans } from "next/font/google";
import "./globals.css";
import ClientProvider from './context/ClientProvider';

const numans = Numans({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-numans",
});

export const metadata = {
  title: "Life Cycle Analysis",
  description: "Carbon, Cost & Quantity Calculation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${numans.variable} antialiased`} suppressHydrationWarning={true}>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}