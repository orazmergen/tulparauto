# Tulpar Auto SEO Structure

## Main Logic

The site is organized by language, city and service:

```text
/ru/
/ru/astana/
/ru/astana/transfer/
/ru/astana/rent-car-with-driver/
/ru/astana/corporate-clients/
/ru/almaty/
/ru/almaty/transfer/
/ru/almaty/rent-car-with-driver/
/ru/almaty/corporate-clients/
/ru/shymkent/
/ru/shymkent/transfer/
/ru/shymkent/rent-car-with-driver/
/ru/shymkent/corporate-clients/

/en/...
/zh/...
```

English and Chinese canonical service slugs use search-friendly names:

```text
/en/astana/chauffeur-service/
/en/astana/corporate-transport/
/zh/astana/chauffeur-service/
/zh/astana/corporate-transport/
```

## SEO Intent

- Home pages target the national brand query and broad commercial demand.
- City pages target local searches: transfer, chauffeur service and corporate transport in a specific city.
- Service pages target high-intent searches: airport transfer, car with driver, corporate transportation.
- Language pages are not literal duplicates. Each language has its own search phrasing and localized content.

## Required Production Notes

- The app now generates `title`, `description`, canonical URL, `hreflang` links and JSON-LD per route.
- `public/sitemap.xml` and `public/robots.txt` are included for indexing.
- `public/_redirects` routes direct SPA URLs back to `index.html` on hosts that support Netlify-style redirects.
- For other production hosting, configure the server to return `index.html` for every SPA route.
- Keep every city + service page unique: first paragraph, FAQ and local landmarks should mention the selected city.
