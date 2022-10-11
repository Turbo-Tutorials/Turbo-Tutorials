import dynamicRoutes from './lib/dynamicRoutes'

const modules = [
  '@nuxtjs/tailwindcss',
  '@uniformdev/uniform-nuxt',
  '@nuxtjs/algolia',
  '@nuxt/content',
  '@funken-studio/sitemap-nuxt-3',
]

if (process.env.NODE_ENV !== 'development') {
  modules.push('@kevinmarrec/nuxt-pwa',)
}

export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/tutorials/', '/rss.xml']
    }
  },
  modules,
  pwa: {
    workbox: {
      enabled: true
    }
  },
  sitemap: {
    hostname: 'https://turbo-tutorials.dev',
    cacheTime: 1,
    routes: dynamicRoutes,
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
    uniformContextPath: './lib/context/uniformContext'
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
  }
})