import XmlSitemap from 'xml-sitemap'
import routes from "../../data/routes.json"

export default defineEventHandler(async (event) => {
  const {
    public: { hostname },
  } = useRuntimeConfig();

  const index = routes.indexOf('/rss.xml');
  if (index > -1) {
    routes.splice(index, 1);
  }

  const routesForSitemap = routes.map(route => {
    return {
      url: route,
      priority: 0.5,
      changefreq: 'weekly',
    }
  })

  const sitemap = new XmlSitemap().setHost(hostname).add([
    ...routesForSitemap
  ])

  event.res.setHeader('content-type', 'text/xml');
  event.res.end(sitemap.xml);
});