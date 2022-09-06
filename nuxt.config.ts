import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
	modules: [
		'@nuxtjs/tailwindcss',
		'nuxt-schema-org',
		'@uniformdev/uniform-nuxt',
	],
	uniform: {
		projectId: process.env.UNIFORM_PROJECT_ID,
		readOnlyApiKey: process.env.UNIFORM_API_KEY,
	},
	schemaOrg: {
		meta: {
			host: 'https://turbo-tutorials.dev',
		}
	},
})
