export type meta = {
  title: string;
  description: string;
  slug: string;
  image: string;
  structuredData?: {}
}

export const usePageMeta = ({ title, description, slug, image, structuredData = {} }: meta) => {
  const {
    public: { hostname },
  } = useRuntimeConfig();

  const defaultSchema = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "url": hostname,
    "name": "Turbo Tutorials"
  }

  const schemaData = [defaultSchema, structuredData]
  const url = `${hostname}/${slug === '/' ? '' : `${slug}/`}`

  return useHead({
    title,
    htmlAttrs: {
      lang: "en",
    },
    script: [
      {
        hid: 'json-ld',
        children: JSON.stringify(schemaData),
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
      { rel: "canonical", href: url },
      { rel: "alternate", type: "application/rss+xml", title: "RSS feed for Turbo Tutorials", href: "/rss.xml" }
    ],
    meta: [
      {
        name: "theme-color",
        content: "#14356b",
      },
      {
        name: "msapplication-navbutton-color",
        content: "#14356b",
      },
      {
        name: "apple-mobile-web-app-capable",
        content: "yes",
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
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
        property: "twitter:card",
        content: "summary_large_image"
      },
      {
        property: "twitter:creator",
        content: "@timbenniks"
      },
      {
        property: "twitter:domain",
        content: url,
      },
      {
        property: "twitter:site",
        content: "@timbenniks",
      },
      {
        name: "description",
        content: description,
        hid: "description"
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
        name: "twitter:image:alt",
        content: title,
      },
      {
        property: "og:url",
        content: url,
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