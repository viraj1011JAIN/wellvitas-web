// src/app/layout.js
import { getStoryblokApi } from "@/lib/storyblok";
import StoryblokProvider from "@/components/StoryblokProvider";
import "./app.css";

export const metadata = {
  title: "Wellvitas - Holistic Health & Wellness",
  description: "Professional holistic health treatment services",
};

async function getGlobalSettings() {
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories/global-settings", {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
    });
    return data.story;
  } catch (error) {
    console.log("Global settings not found, using defaults");
    return null;
  }
}

async function getNavigation() {
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories/navigation", {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
    });
    return data.story;
  } catch (error) {
    console.log("Navigation not found");
    return null;
  }
}

async function getFooter() {
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories/footer", {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
    });
    return data.story;
  } catch (error) {
    console.log("Footer not found");
    return null;
  }
}

export default async function RootLayout({ children }) {
  const globalSettings = await getGlobalSettings();
  const navigation = await getNavigation();
  const footer = await getFooter();

  return (
    <html lang="en">
      <head>
        {/* Storyblok Bridge Script */}
        <script
          src="https://app.storyblok.com/f/storyblok-v2-latest.js"
          type="text/javascript"
        />
        {/* SuperSaaS Script (if needed globally) */}
        <script src="https://www.supersaas.com/schedule/all.js" async />
      </head>
      <body>
        <StoryblokProvider>
          {/* Render Navigation from CMS if available */}
          {navigation?.content && (
            <div dangerouslySetInnerHTML={{ __html: renderStoryblokComponent(navigation.content) }} />
          )}
          
          {children}
          
          {/* Render Footer from CMS if available */}
          {footer?.content && (
            <div dangerouslySetInnerHTML={{ __html: renderStoryblokComponent(footer.content) }} />
          )}
        </StoryblokProvider>
      </body>
    </html>
  );
}

// Helper to render Storyblok components (simplified)
function renderStoryblokComponent(content) {
  // This is a simplified version - in production you'd use proper RSC rendering
  return "";
}
