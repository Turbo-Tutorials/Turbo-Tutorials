import manifestJson from './lib/context/context-manifest.json';
import type { ManifestV2 } from '@uniformdev/context';

export default defineNuxtConfig({
  preset: 'netlify-builder',
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/tutorials']
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@uniformdev/uniform-nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/algolia'
  ],
  algolia: {
    apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
    applicationId: process.env.ALGOLIA_ID,
    lite: true,
    recommend: true,
    instantSearch: {
      theme: 'reset'
    }
  },
  robots: {
    UserAgent: '*',
    Disallow: '',
    Sitemap: (req) => `https://${req.headers.host}/sitemap.xml`
  },
  uniform: {
    projectId: process.env.UNIFORM_PROJECT_ID,
    readOnlyApiKey: process.env.UNIFORM_API_KEY,
    outputType: process.env.OUTPUT_TYPE,
    manifest: manifestJson as ManifestV2,
    defaultConsent: true,
  },
  runtimeConfig: {
    public: {
      contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
      contentfulDeliveryApiKey: process.env.CONTENTFUL_DELIVERY_API_KEY,
      contentfulEnvironment: process.env.CONTENTFUL_ENVIRONMENT,
      youTubeKey: process.env.YOUTUBE_KEY,
      algoliaId: process.env.ALGOLIA_ID,
      algoliaSearchApi: process.env.ALGOLIA_SEARCH_API_KEY,
      algoliaIndex: process.env.ALGOLIA_INDEX,
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag => ['lite-youtube'].includes(tag)
    }
  },
  // build: {
  //   transpile: [
  //     'contentful',
  //   ],
  // },
  // vite: {
  //   optimizeDeps: {
  //     include: [
  //       'contentful',
  //     ]
  //   },
  // }
  // plausible: {
  // 	domain: process.env.PLAUSIBLE_DOMAIN,
  // 	trackLocalhost: false,
  // 	hashMode: false,
  // 	enableAutoPageviews: true,
  // 	enableAutoOutboundTracking: false
  // },
})