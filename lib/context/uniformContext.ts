import {
  Context,
  ManifestV2,
  enableContextDevTools,
  CookieTransitionDataStore,
  UNIFORM_DEFAULT_COOKIE_NAME,
  enableDebugConsoleLogDrain
} from "@uniformdev/context";

import { enablePlausibleAnalytics } from './plausibleAnalytics'
import Cookies from 'universal-cookie';
import manifest from "./context-manifest.json";

const createUniformContext = (() => {
  const cookies = new Cookies();
  const uniformCookie = cookies.get(UNIFORM_DEFAULT_COOKIE_NAME)

  const context = new Context({
    defaultConsent: true,
    manifest: manifest as ManifestV2,
    transitionStore: new CookieTransitionDataStore({
      serverCookieValue: uniformCookie,
    }),
    plugins: [enableContextDevTools(), enableDebugConsoleLogDrain('debug'), enablePlausibleAnalytics()],
  });
  return context
})()

export default createUniformContext
