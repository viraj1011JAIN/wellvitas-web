/**
 * This script helps you understand what data needs to be added to Storyblok
 * Run with: node scripts/migrate-to-storyblok.js
 */

const currentData = {
  heroSlides: [
    {
      title: "Grand opening in Anniesland",
      image: "/hero/slide1.jpg",
      link: "/about",
      alt: "Clinic exterior in Glasgow",
    },
    {
      title: "Free taster treatment this month",
      image: "/hero/slide2.jpg",
      link: "/booking",
      alt: "Treatment room with calming decor",
    },
    {
      title: "Now offering Hyperbaric Oxygen Therapy",
      image: "/hero/slide3.jpg",
      link: "/therapies#hyperbaric-oxygen-therapy",
      alt: "Hyperbaric chamber",
    },
  ],

  introBlock: {
    title: "Feel better with Wellvitas",
    description: "Holistic therapies, wellness programmes, and lifestyle support in Glasgow.",
    button1Text: "Book an enquiry",
    button1Link: "/booking",
    button2Text: "View therapies",
    button2Link: "#therapies",
  },

  treatmentPackages: [
    {
      title: "Pain Relief Bundle",
      price: 149,
      period: "/ 4 weeks",
      link: "/therapies#pain-relief-bundle",
      image: "/therapies/physio.jpg",
      badge: "Save 15%",
      features: ["4 × targeted sessions", "Home mobility plan", "Progress review"],
    },
    {
      title: "Stress Reset (4 Sessions)",
      price: 179,
      period: "/ course",
      link: "/therapies#stress-reset",
      image: "/therapies/light.jpg",
      badge: "Popular",
      features: ["4 × recovery sessions", "Breathing + sleep guide", "WhatsApp check-ins"],
    },
    {
      title: "Detox & Lymphatic Pack",
      price: 199,
      period: "/ 6 weeks",
      link: "/therapies#detox-lymph",
      image: "/therapies/compression.jpg",
      badge: "Best value",
      features: ["Compression & lymphatic", "Nutrition reset guide", "Before/after measures"],
    },
    {
      title: "Sports Recovery Plan",
      price: 229,
      period: "/ 4 weeks",
      link: "/therapies#sports-recovery",
      image: "/therapies/laser-acu.jpg",
      features: ["4 × recovery sessions", "Prehab/rehab drills", "Coach notes & load plan"],
    },
  ],

  howToBook: {
    title: "How to book",
    description:
      "Make an enquiry, complete the health screening, enjoy a free taster treatment, then start your programme.",
    whatsappNumber: "447379005856",
  },

  visitUs: {
    title: "Visit us",
    address: "Open 9:00–20:00 · 1626 Great Western Rd, Anniesland, Glasgow G13 1HH",
    mapLink: "https://maps.google.com/?q=1620+Great+Western+Rd,+Anniesland,+Glasgow+G13+1HH",
  },
};

console.log("📋 Current Website Data");
console.log("========================\n");
console.log("This data needs to be added to Storyblok:\n");
console.log(JSON.stringify(currentData, null, 2));
console.log("\n✅ Copy this data and use it when creating your Storyblok content!");


// ============================================
// STORYBLOK COMPONENT SCHEMAS (JSON)
// Create these in your Storyblok space
// ============================================

const storyblokSchemas = {
  page: {
    name: "page",
    display_name: "Page",
    schema: {
      body: {
        type: "bloks",
        restrict_components: true,
        component_whitelist: [
          "hero_carousel",
          "intro_block",
          "therapies_section",
          "treatment_packages_section",
          "how_to_book",
          "visit_us",
          "testimonials_section",
        ],
      },
    },
    is_root: true,
    is_nestable: false,
  },

  hero_carousel: {
    name: "hero_carousel",
    display_name: "Hero Carousel",
    schema: {
      slides: {
        type: "bloks",
        restrict_components: true,
        component_whitelist: ["hero_slide"],
      },
    },
    is_root: false,
    is_nestable: true,
  },

  hero_slide: {
    name: "hero_slide",
    display_name: "Hero Slide",
    schema: {
      image: {
        type: "asset",
        filetypes: ["images"],
      },
      title: {
        type: "text",
      },
      link: {
        type: "multilink",
      },
      alt_text: {
        type: "text",
      },
    },
    is_root: false,
    is_nestable: true,
  },

  intro_block: {
    name: "intro_block",
    display_name: "Intro Block",
    schema: {
      title: {
        type: "text",
        default_value: "Feel better with Wellvitas",
      },
      description: {
        type: "textarea",
        default_value: "Holistic therapies, wellness programmes, and lifestyle support in Glasgow.",
      },
      button_1_text: {
        type: "text",
        default_value: "Book an enquiry",
      },
      button_1_link: {
        type: "multilink",
      },
      button_2_text: {
        type: "text",
        default_value: "View therapies",
      },
      button_2_link: {
        type: "multilink",
      },
      background_color: {
        type: "text",
        default_value: "#2E0056",
      },
    },
    is_root: false,
    is_nestable: true,
  },

  therapies_section: {
    name: "therapies_section",
    display_name: "Therapies Section",
    schema: {
      title: {
        type: "text",
        default_value: "Therapies",
      },
      subtitle: {
        type: "textarea",
        default_value: "Browse by category and tap any card for details.",
      },
      categories: {
        type: "options",
        options: [
          { name: "All", value: "All" },
          { name: "Oxygen", value: "Oxygen" },
          { name: "Light", value: "Light" },
          { name: "Acupuncture", value: "Acupuncture" },
          { name: "PMF", value: "PMF" },
          { name: "Compression", value: "Compression" },
          { name: "Physiotherapy", value: "Physiotherapy" },
          { name: "Combined", value: "Combined" },
        ],
        use_uuid: false,
      },
      therapy_cards: {
        type: "bloks",
        restrict_components: true,
        component_whitelist: ["therapy_card"],
      },
      view_all_text: {
        type: "text",
        default_value: "View all therapies",
      },
      view_all_link: {
        type: "multilink",
      },
    },
    is_root: false,
    is_nestable: true,
  },

  therapy_card: {
    name: "therapy_card",
    display_name: "Therapy Card",
    schema: {
      image: {
        type: "asset",
        filetypes: ["images"],
      },
      title: {
        type: "text",
      },
      category: {
        type: "option",
        options: [
          { name: "Oxygen", value: "Oxygen" },
          { name: "Light", value: "Light" },
          { name: "Acupuncture", value: "Acupuncture" },
          { name: "PMF", value: "PMF" },
          { name: "Compression", value: "Compression" },
          { name: "Physiotherapy", value: "Physiotherapy" },
          { name: "Combined", value: "Combined" },
        ],
        use_uuid: false,
      },
      link: {
        type: "multilink",
      },
      button_text: {
        type: "text",
        default_value: "View details →",
      },
      alt_text: {
        type: "text",
      },
    },
    is_root: false,
    is_nestable: true,
  },

  treatment_packages_section: {
    name: "treatment_packages_section",
    display_name: "Treatment Packages Section",
    schema: {
      title: {
        type: "text",
        default_value: "Treatment Packages",
      },
      packages: {
        type: "bloks",
        restrict_components: true,
        component_whitelist: ["treatment_package"],
      },
    },
    is_root: false,
    is_nestable: true,
  },

  treatment_package: {
    name: "treatment_package",
    display_name: "Treatment Package",
    schema: {
      image: {
        type: "asset",
        filetypes: ["images"],
      },
      badge: {
        type: "text",
        description: "Optional badge like 'Best value' or 'Popular'",
      },
      title: {
        type: "text",
      },
      price: {
        type: "number",
      },
      currency: {
        type: "text",
        default_value: "£",
      },
      period: {
        type: "text",
        description: "e.g., '/ 4 weeks' or '/ course'",
      },
      features: {
        type: "textarea",
        description: "One feature per line",
      },
      button_text: {
        type: "text",
        default_value: "View details",
      },
      button_link: {
        type: "multilink",
      },
    },
    is_root: false,
    is_nestable: true,
  },

  how_to_book: {
    name: "how_to_book",
    display_name: "How to Book",
    schema: {
      title: {
        type: "text",
        default_value: "How to book",
      },
      description: {
        type: "textarea",
        default_value:
          "Make an enquiry, complete the health screening, enjoy a free taster treatment, then start your programme.",
      },
      whatsapp_number: {
        type: "text",
        default_value: "447379005856",
      },
      whatsapp_text: {
        type: "text",
        default_value: "WhatsApp us",
      },
      booking_form_text: {
        type: "text",
        default_value: "Booking form",
      },
      booking_form_link: {
        type: "multilink",
      },
      background_color: {
        type: "text",
        default_value: "#2E0056",
      },
    },
    is_root: false,
    is_nestable: true,
  },

  visit_us: {
    name: "visit_us",
    display_name: "Visit Us",
    schema: {
      title: {
        type: "text",
        default_value: "Visit us",
      },
      address: {
        type: "textarea",
        default_value: "Open 9:00–20:00 · 1626 Great Western Rd, Anniesland, Glasgow G13 1HH",
      },
      map_link: {
        type: "text",
        default_value: "https://maps.google.com/?q=1620+Great+Western+Rd,+Anniesland,+Glasgow+G13+1HH",
      },
      get_directions_text: {
        type: "text",
        default_value: "Get directions",
      },
      see_map_text: {
        type: "text",
        default_value: "See map",
      },
    },
    is_root: false,
    is_nestable: true,
  },

  testimonials_section: {
    name: "testimonials_section",
    display_name: "Testimonials Section",
    schema: {
      title: {
        type: "text",
        default_value: "Testimonials",
      },
      testimonials: {
        type: "bloks",
        restrict_components: true,
        component_whitelist: ["testimonial"],
      },
    },
    is_root: false,
    is_nestable: true,
  },

  testimonial: {
    name: "testimonial",
    display_name: "Testimonial",
    schema: {
      author_name: {
        type: "text",
      },
      content: {
        type: "textarea",
      },
      rating: {
        type: "number",
        default_value: 5,
        description: "Rating from 1-5 stars",
      },
    },
    is_root: false,
    is_nestable: true,
  },
};

// Save schemas to file for reference
console.log("\n📦 Storyblok Component Schemas");
console.log("===============================\n");
console.log("Save this JSON and use it to create components in Storyblok:\n");
console.log(JSON.stringify(storyblokSchemas, null, 2));