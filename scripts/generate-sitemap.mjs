import {writeFileSync} from 'node:fs';

const domain = 'https://tulparauto.kz';
const langs = [
  {code: 'ru', hreflang: 'ru-KZ'},
  {code: 'en', hreflang: 'en-KZ'},
  {code: 'zh', hreflang: 'zh-CN'},
];
const cities = ['astana', 'almaty', 'shymkent'];
const services = {
  ru: ['transfer', 'rent-car-with-driver', 'corporate-clients'],
  en: ['transfer', 'chauffeur-service', 'corporate-transport'],
  zh: ['transfer', 'chauffeur-service', 'corporate-transport'],
};

const urls = [];

for (const {code} of langs) {
  urls.push({lang: code, city: null, serviceIndex: null});
  for (const city of cities) {
    urls.push({lang: code, city, serviceIndex: null});
    for (let serviceIndex = 0; serviceIndex < services[code].length; serviceIndex += 1) {
      urls.push({lang: code, city, serviceIndex});
    }
  }
}

function route({lang, city, serviceIndex}) {
  return `/${[lang, city, serviceIndex === null ? null : services[lang][serviceIndex]].filter(Boolean).join('/')}/`;
}

function alternates(url) {
  return langs.map(({code, hreflang}) => {
    const sibling = {lang: code, city: url.city, serviceIndex: url.serviceIndex};
    return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${domain}${route(sibling)}" />`;
  }).join('\n');
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((url) => `  <url>
    <loc>${domain}${route(url)}</loc>
${alternates(url)}
    <xhtml:link rel="alternate" hreflang="x-default" href="${domain}${route({...url, lang: 'ru'})}" />
  </url>`).join('\n')}
</urlset>
`;

writeFileSync('public/sitemap.xml', xml);
console.log(`Generated ${urls.length} sitemap URLs`);
