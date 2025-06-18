import { Numans } from "next/font/google";
import "./globals.css";
import ClientProvider from './context/ClientProvider';
import { Toaster } from 'react-hot-toast';

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
        
        {/* Toast Notifications */}
        <Toaster 
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              fontSize: '14px',
              borderRadius: '8px',
              padding: '12px 16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              fontFamily: 'var(--font-numans)',
            },
            success: {
              style: {
                background: '#5BB045',
                color: '#fff',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#5BB045',
              },
            },
            error: {
              style: {
                background: '#f56565',
                color: '#fff',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#f56565',
              },
            },
            loading: {
              style: {
                background: '#3b82f6',
                color: '#fff',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#3b82f6',
              },
            },
          }}
        />
      </body>
    </html>
  );
}