import fs from "fs";
import path from "path";

const baseUrl = "https://hykon-beta-ux.netlify.app";

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
export default async function sitemap() {
  const appDir = path.join(process.cwd(), "src/app");
  
  // Debug: log everything found
  const allFiles = fs.readdirSync(appDir, { withFileTypes: true });
  console.log("Folders in src/app:", allFiles.filter(e => e.isDirectory()).map(e => e.name));

  const staticPaths = getStaticRoutes(appDir);
  console.log("Discovered routes:", staticPaths);

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...staticPaths.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}