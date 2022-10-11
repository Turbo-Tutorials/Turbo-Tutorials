import { IncomingMessage, ServerResponse } from 'http'
import { getContentfulClient } from "../../enhancers/helpers"

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.end()
    return
  }

  console.log('[sitemap] generating dynamic routes')

  const ctfClient = getContentfulClient();
  const tutorials = await ctfClient.getEntries({
    content_type: "turboTutorial",
  });

  const routes = tutorials.items.map((tutorial) => {
    return `/tutorials/${tutorial.fields.slug}/`
  })

  return [...routes, '/', '/about/', '/pwyw/', '/personalization-profile/', '/privacy-policy/']
}