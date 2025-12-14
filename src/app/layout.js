import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import { Montserrat } from "next/font/google";
import { initStoryblok } from "@/lib/storyblok";

export const metadata = {
  title: "Wellvitas - Holistic Therapies in Glasgow",
  description:
    "Holistic therapies, wellness programmes, and lifestyle support in Glasgow.",
};


const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/W_favicon.ico" />
      </head>
      <body
        className={`${montserrat.variable} bg-(--color-page) font-sans text-sm text-slate-600`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
