import { Numans } from "next/font/google";
import "./globals.css";
import ClientProvider from './context/ClientProvider';
// import ToastProvider from './components/toast/ToastProvider';

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
      <body className={`${numans.variable} antialiased`}>
        <ClientProvider>
          {children}
        </ClientProvider>
        
        {/* <ToastProvider /> */}
      </body>
    </html>
  );
}