import staticRoutes from './data/routes.json'

export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: staticRoutes
    }
  },
  // routeRules: {
  //   '/': { static: true },
  //   '/pwyw': { static: true },
  //   '/about': { static: true },
  //   '/personalization-profile': { static: true },
  //   '/privacy-policy': { static: true },
  //   '/tutorials/**': { static: true },
  //   '/rss.xml': { swr: true },
  //   '/sitemap.xml': { swr: true },
  // },
  modules: [
    '@nuxtjs/tailwindcss',
    '@uniformdev/uniform-nuxt',
    '@nuxtjs/algolia',
  ],
  head: {
    viewport: "width=device-width, initial-scale=1",
    charset: "utf-8",
  },
  algolia: {
    apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
    applicationId: process.env.ALGOLIA_ID,
    lite: true,
    recommend: false,
    instantSearch: {
      theme: 'reset'
    }
  },
  uniform: {
    projectId: process.env.UNIFORM_PROJECT_ID,
    readOnlyApiKey: process.env.UNIFORM_API_KEY,
    outputType: process.env.NODE_ENV === 'development' ? "standard" : "edge",
    uniformContextPath: './lib/context/uniformContext',
    apiHost: process.env.UNIFORM_API_HOST,
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
      hostname: process.env.HOST_NAME,
      uniformMode: process.env.UNIFORM_MODE
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag => ['lite-youtube'].includes(tag)
    }
  }
})