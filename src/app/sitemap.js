import fs from "fs";
import path from "path";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
const apiBase = process.env.NEXT_PUBLIC_BASE_URL;

function getStaticRoutes(dir, baseRoute = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let routes = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (
      entry.name.startsWith("_") ||
      entry.name === "api" ||
      entry.name.startsWith("[") ||
      !entry.isDirectory()
    ) {
      continue;
    }

    const hasPage =
      fs.existsSync(path.join(fullPath, "page.js")) ||
      fs.existsSync(path.join(fullPath, "page.tsx")) ||
      fs.existsSync(path.join(fullPath, "page.jsx")) ||
      fs.existsSync(path.join(fullPath, "index.js")) ||
      fs.existsSync(path.join(fullPath, "index.tsx")) ||
      fs.existsSync(path.join(fullPath, "index.jsx"));

    const currentRoute = baseRoute
      ? `${baseRoute}/${entry.name}`
      : `/${entry.name}`;

    if (hasPage) {
      routes.push(currentRoute);
    }

    routes = routes.concat(getStaticRoutes(fullPath, currentRoute));
  }

  return routes;
}

async function fetchSlugs(endpoint, extractor) {
  try {
    const res = await fetch(`${apiBase}${endpoint}`);
    if (!res.ok) return [];
    const json = await res.json();
    return extractor(json?.data) ?? [];
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const appDir = path.join(process.cwd(), "src/app");
  const staticPaths = getStaticRoutes(appDir);

  const [blogSlugs, newsSlugs, serviceSlugs, categorySlugs] = await Promise.all([
    fetchSlugs("/api/blogs",      d => d?.blogSection?.items?.map(i => i.slug)),
    fetchSlugs("/api/news",       d => d?.newsSection?.items?.map(i => i.slug)),
    fetchSlugs("/api/service",    d => d?.newsSection?.items?.map(i => i.slug)),
    fetchSlugs("/api/categories", d => d?.categoriesSection?.items?.map(i => i.slug)),
  ]);

  const variantSlugs = [];
  for (const catSlug of categorySlugs) {
    const slugs = await fetchSlugs(
      `/api/${catSlug}`,
      d => d?.categoryDetailSection?.items?.flatMap(
        p => p?.variants?.items?.map(v => v.slug) ?? []
      )
    );
    variantSlugs.push(...slugs);
  }
  const uniqueVariantSlugs = [...new Set(variantSlugs)];

  const toEntry = (route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...staticPaths.map(toEntry),
    ...blogSlugs.map(s     => toEntry(`/blog/${s}`)),
    ...newsSlugs.map(s     => toEntry(`/news/${s}`)),
    ...serviceSlugs.map(s  => toEntry(`/service/${s}`)),
    ...categorySlugs.map(s => toEntry(`/category/${s}`)),
    ...uniqueVariantSlugs.map(s => toEntry(`/products/${s}`)),
  ];
}
