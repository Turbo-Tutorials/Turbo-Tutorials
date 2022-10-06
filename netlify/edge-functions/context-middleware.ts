// @ts-ignore
import type { Context } from 'netlify:edge';
import manifest from '../../lib/context/context-manifest.json' assert { type: 'json' };
// @ts-ignore
import {
  createEdgeContext,
  createUniformEdgeHandler,
  buildNetlifyQuirks,
} from '../../lib/context/index.deno.js';

const IGNORED_PATHS = /\/.*\.(ico|png|jpg|jpeg|svg|css|js|json)(?:\?.*|$)$/g;

export default async (request: Request, netlifyContext: Context) => {
  if (
    request.method.toUpperCase() !== 'GET' ||
    request.url.match(IGNORED_PATHS)
  ) {
    return await netlifyContext.next({ sendConditionalRequest: true });
  }

  const context = createEdgeContext({
    manifest: manifest,
    request,
  });

  const originResponse = await netlifyContext.next();

  const handler = createUniformEdgeHandler();

  const { processed, response } = await handler({
    context,
    request,
    response: originResponse,
    quirks: buildNetlifyQuirks(netlifyContext),
  });

  if (processed) {
    netlifyContext.log('Edge Function:', { url: request.url, processed });
  }

  if (!processed) {
    return response;
  }

  return new Response(response.body, {
    ...response,
    headers: {
      ...response.headers,
      'Cache-Control': 'no-store, must-revalidate',
      Expires: '0',
    },
  });
};
