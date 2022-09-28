import type { RouterOptions } from '@nuxt/schema'

export default <RouterOptions>{
  scrollBehavior: () => ({ left: 0, top: 0 })
}