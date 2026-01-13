import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import { AuthProvider } from "@/providers/AuthProvider";
import { Montserrat } from "next/font/google";
import { fetchStory, fetchTopLevelPages } from "@/lib/storyblok";

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

export default async function RootLayout({ children }) {
  let headerProps = {};
  let footerProps = {};

  try {
    const configStory = await fetchStory("config", { version: "published" }); // Use published by default, or draft if needed

    if (configStory && configStory.content) {
      // --- Header Logic ---
      let links = [];
      // 1. Try Manual Nav from Config
      if (configStory.content.header_nav?.length > 0) {
        links = configStory.content.header_nav.map(item => ({
          label: item.label,
          href: item.link?.cached_url ? (item.link.cached_url.startsWith('http') || item.link.cached_url.startsWith('/') ? item.link.cached_url : `/${item.link.cached_url}`) : (item.url || "#")
        }));
      } else {
        // 2. Fallback: Automatic Top-Level Pages
        console.log("No manual nav found, fetching top-level pages...");
        links = await fetchTopLevelPages();
      }

      headerProps = {
        logo: configStory.content.header_logo,
        navLinks: links.length > 0 ? links : undefined
      };

      // --- Footer Logic ---
      let footerLinks = configStory.content.footer_links?.map(item => ({
        label: item.label,
        href: item.link?.cached_url ? (item.link.cached_url.startsWith('http') || item.link.cached_url.startsWith('/') ? item.link.cached_url : `/${item.link.cached_url}`) : (item.url || "#")
      })) || [];

      // If no manual footer links, fallback to the main navigation (which might be auto-fetched)
      if (footerLinks.length === 0) {
        footerLinks = links;
      }

      footerProps = {
        contact: {
          address: configStory.content.footer_address,
          email: configStory.content.footer_email,
          phone: configStory.content.footer_phone,
        },
        navLinks: footerLinks.length > 0 ? footerLinks : undefined,
        mapUrl: configStory.content.footer_map_url
      };
    }
  } catch (e) {
    console.error("Failed to fetch config story for header/footer:", e);
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/W_favicon.ico" />
        <script
          src="https://app.storyblok.com/f/storyblok-v2-latest.js"
          type="text/javascript"
        />
      </head>
      <body
        className={`${montserrat.variable} bg-(--color-page) font-sans text-sm text-slate-600`}
      >
        <AuthProvider>
          <Header {...headerProps} />
          <main>{children}</main>
          <Footer {...footerProps} />
          <WhatsAppFab />
        </AuthProvider>
      </body>
    </html>
  );
}
