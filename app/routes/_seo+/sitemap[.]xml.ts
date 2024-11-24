import { generateSitemap } from "@nasa-gcn/remix-seo";
import { type ServerBuild, type LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const serverBuild = (await context.serverBuild) as { build: ServerBuild };
  return generateSitemap(request, serverBuild.build.routes, {
    siteUrl: "https://star.hollowlamp.top/",
    headers: {
      "Cache-Control": `public, max-age=${60 * 5}`,
    },
  });
}
