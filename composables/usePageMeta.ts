export type meta = {
  title: string;
  description: string;
  slug: string;
  image: string;
  structuredData?: {}
}

export const usePageMeta = ({ title, description, slug, image, structuredData }: meta) => {
  return useHead({
    viewport: "width=device-width, initial-scale=1",
    charset: "utf-8",
    title,
    htmlAttrs: {
      lang: "en",
    },
    script: [
      {
        hid: 'json-ld',
        children: JSON.stringify(structuredData),
        type: 'application/ld+json'
      },
      {
        defer: "true",
        dataDomain: "turbo-tutorials.dev",
        src: "https://plausible.io/js/script.js"
      },
      {
        hid: 'plausible',
        children: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`,
        type: 'text/javascript',
        charset: 'utf-8'
      }
    ],
    style: [
      { href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;900&display=swap" }
    ],
    link: [
      { rel: "icon", href: "/icon.png" },
      { rel: "apple-touch-icon", href: "/icon.png" },
      { rel: "preconnect", href: "https://res.cloudinary.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "canonical", href: `https://turbo-tutorials.dev/${slug === '/' ? '' : slug}/` },
      { rel: "alternate", type: "application/rss+xml", title: "RSS feed for Turbo Tutorials", href: "/rss.xml" }
    ],
    meta: [
      {
        name: "theme-color",
        content: "#14356b",
      },

      {
        property: "og:site_name",
        content: "Turbo Tutorials",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "twitter:domain",
        content: `https://turbo-tutorials.dev/${slug === '/' ? '' : slug}`,
      },
      {
        property: "twitter:site",
        content: "@timbenniks",
      },
      {
        name: "description",
        content: description,
      },
      {
        name: "og:description",
        content: description,
      },
      {
        name: "twitter:description",
        content: description,
      },
      {
        property: "og:url",
        content: `https://turbo-tutorials.dev/${slug === '/' ? '' : slug}`,
      },
      {
        property: "og:title",
        content: title,
      },
      {
        property: "og:image",
        content: image,
      },
      {
        property: "twitter:image",
        content: image
      },
      {
        property: "twitter:title",
        content: title,
      },
      {
        name: "google-site-verification",
        content: "5vr9hLlKmd0RdQYqtnqzMOe-DdAMTRxhAy0y25EkXfQ"
      }
    ],
  });
}