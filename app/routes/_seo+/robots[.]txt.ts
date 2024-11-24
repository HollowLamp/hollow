import { generateRobotsTxt } from "@nasa-gcn/remix-seo";

export function loader() {
  return generateRobotsTxt([
    { type: "sitemap", value: "https://star.hollowlamp.top/sitemap.xml" },
  ]);
}