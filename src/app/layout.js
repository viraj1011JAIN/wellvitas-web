import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import { AuthProvider } from "@/providers/AuthProvider";
import { Montserrat } from "next/font/google";
import { fetchStory } from "@/lib/storyblok";

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
    const version = process.env.NODE_ENV === 'development' ? 'draft' : 'published';
    const configStory = await fetchStory("config", { version });

    if (configStory && configStory.content) {
      // --- Header Logic ---
      let links = [];
      if (configStory.content.header_nav?.length > 0) {
        links = configStory.content.header_nav.map(item => {
          const label = item.Label || item.label || "";
          const linkObj = item.Link || item.link;

          let href = linkObj?.cached_url
            ? (linkObj.cached_url.startsWith('http') || linkObj.cached_url.startsWith('/') ? linkObj.cached_url : `/${linkObj.cached_url}`)
            : (item.url || "#");

          if (href === '/home') href = '/';

          return {
            id: item._uid,
            label: label,
            href: href
          };
        });
      }

      headerProps = {
        logo: configStory.content.header_logo,
        navLinks: links.length > 0 ? links : []
      };

      // --- Footer Logic ---
      const rawFooterLinks = configStory.content.footer_nav || configStory.content.footer_links;
      let footerLinks = rawFooterLinks?.map(item => {
        const label = item.Label || item.label || "";
        const linkObj = item.Link || item.link;

        let href = linkObj?.cached_url
          ? (linkObj.cached_url.startsWith('http') || linkObj.cached_url.startsWith('/') ? linkObj.cached_url : `/${linkObj.cached_url}`)
          : (item.url || "#");

        if (href === '/home') href = '/';

        return {
          id: item._uid,
          label: label,
          href: href
        };
      }) || [];

      footerProps = {
        contact: {
          address: configStory.content.footer_address,
          email: configStory.content.footer_email || configStory.content.Footer_Email || configStory.content.email || configStory.content.Email,
          phone: configStory.content.footer_phone || configStory.content.Footer_Phone || configStory.content.phone || configStory.content.Phone,
        },
        navLinks: footerLinks,
        mapUrl: configStory.content.footer_map_url || configStory.content.map_url
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
