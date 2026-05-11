import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Check, Shield, Clock, Award, Star, MessageCircle, Menu, X, Phone, Mail, Instagram, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const CAR_FLEET = [
  {
    class: 'Executive',
    name: 'Mercedes-Benz S-Class',
    img: 'https://tulparauto.kz/img/ms223.jpg',
    gallery: [
      'https://tulparauto.kz/img/ms223.jpg',
      'https://tulparauto.kz/img/maybachnew/3.jpg',
      'https://tulparauto.kz/img/maybachnew/4.jpg'
    ],
    desc: 'The pinnacle of modern luxury and driving technology. Perfect for executive transfers.',
    features: ['Massage Seats', 'Evian Water', 'Wi-Fi 5G']
  },
  {
    class: 'VIP',
    name: 'Mercedes-Maybach S',
    img: 'https://tulparauto.kz/img/photo/1571909968_0.jpg',
    gallery: [
      'https://tulparauto.kz/img/photo/1571909968_0.jpg',
      'https://tulparauto.kz/img/s222new/3.jpg',
      'https://tulparauto.kz/img/s222new/4.jpg'
    ],
    desc: 'Unprecedented comfort and acoustic privacy. The ultimate statement of prestige.',
    features: ['Champagne Flutes', 'Reclining Rear Seats', 'Acoustic Comfort']
  },
  {
    class: 'Delegation',
    name: 'Mercedes-Benz V-Class',
    img: 'https://tulparauto.kz/img/photo/08-v-class-250-d-wallpaper-4K.jpg',
    gallery: [
      'https://tulparauto.kz/img/photo/08-v-class-250-d-wallpaper-4K.jpg',
      'https://tulparauto.kz/img/vclass/54f6c08e-fd79-48b8-88e7-b576914e43cf.jpg',
      'https://tulparauto.kz/img/vclass/74b99ece-823f-4767-9d83-d61f1958a781.jpg'
    ],
    desc: 'Spacious luxury for group travel. Featuring a modular conference setup en route.',
    features: ['Face-to-Face Seating', 'Conference Table', 'Privacy Glass']
  },
  {
    class: 'Premium',
    name: 'Lixiang L7',
    img: 'https://tulparauto.kz/img/ms223.jpg',
    gallery: [
      'https://tulparauto.kz/img/ms223.jpg',
      'https://tulparauto.kz/img/maybachnew/3.jpg',
      'https://tulparauto.kz/img/maybachnew/4.jpg'
    ],
    desc: 'A modern premium crossover for quiet city transfers, airport pickups and comfortable daily routes.',
    features: ['Premium Cabin', 'Quiet Ride', 'Climate Comfort']
  },
  {
    class: 'Lux',
    name: 'Mercedes-Gelendwagen',
    img: 'https://tulparauto.kz/img/photo/1571909968_0.jpg',
    gallery: [
      'https://tulparauto.kz/img/photo/1571909968_0.jpg',
      'https://tulparauto.kz/img/s222new/3.jpg',
      'https://tulparauto.kz/img/s222new/4.jpg'
    ],
    desc: 'Iconic luxury SUV presence for VIP arrivals, city routes and confident all-season movement.',
    features: ['SUV Comfort', 'High Seating', 'Premium Sound']
  },
  {
    class: 'Business',
    name: 'Toyota Camry 70',
    img: 'https://tulparauto.kz/img/photo/08-v-class-250-d-wallpaper-4K.jpg',
    gallery: [
      'https://tulparauto.kz/img/photo/08-v-class-250-d-wallpaper-4K.jpg',
      'https://tulparauto.kz/img/vclass/54f6c08e-fd79-48b8-88e7-b576914e43cf.jpg',
      'https://tulparauto.kz/img/vclass/74b99ece-823f-4767-9d83-d61f1958a781.jpg'
    ],
    desc: 'Reliable business-class sedan for airport transfers, corporate trips and everyday chauffeur service.',
    features: ['Business Class', 'Smooth Transfer', 'Daily Routes']
  }
];

const DOMAIN = 'https://tulparauto.kz';
const WHATSAPP_PHONE = '77753432448';

const CITY_CONTENT = {
  Astana: {
    ru: {
      name: 'Астане',
      airport: 'аэропорта NQZ',
      local: 'EXPO, левый берег, Байтерек, St. Regis, Ritz-Carlton, Sheraton',
    },
    en: {
      name: 'Astana',
      airport: 'NQZ airport',
      local: 'EXPO, left bank, Baiterek, St. Regis, Ritz-Carlton, Sheraton',
    },
    zh: {
      name: '阿斯塔纳',
      airport: 'NQZ机场',
      local: 'EXPO、左岸商务区、Baiterek、St. Regis、Ritz-Carlton、Sheraton',
    },
  },
  Almaty: {
    ru: {
      name: 'Алматы',
      airport: 'аэропорта Алматы',
      local: 'центр, Бостандыкский район, Медеу, Шымбулак и премиальные отели',
    },
    en: {
      name: 'Almaty',
      airport: 'Almaty airport',
      local: 'city center, Bostandyk district, Medeu, Shymbulak and premium hotels',
    },
    zh: {
      name: '阿拉木图',
      airport: '阿拉木图机场',
      local: '市中心、Bostandyk区、Medeu、Shymbulak和高端酒店',
    },
  },
  Shymkent: {
    ru: {
      name: 'Шымкенте',
      airport: 'аэропорта Шымкент',
      local: 'центр города, деловые районы, отели и маршруты в Туркестан',
    },
    en: {
      name: 'Shymkent',
      airport: 'Shymkent airport',
      local: 'city center, business districts, hotels and routes to Turkistan',
    },
    zh: {
      name: '奇姆肯特',
      airport: '奇姆肯特机场',
      local: '市中心、商务区、酒店以及前往Turkistan的路线',
    },
  },
};

const LANG_CONTENT = {
  EN: {
    code: 'en',
    label: 'English',
    eyebrow: 'Premium transportation in Kazakhstan',
    h1: (city: string) => <>Private Chauffeur <br/><i className="font-normal italic">in {city}</i></>,
    lead: 'Airport transfers, chauffeur-driven cars and corporate transport for business guests, private clients and delegations. Clear coordination, executive fleet and a calm premium service protocol.',
    primary: 'Request Booking',
    secondary: 'Discuss Route',
    menu: ['About Us', 'Transfer', 'Chauffeur Service', 'Corporate Clients', 'Contacts'],
    standard: 'Service Protocol',
    standardEyebrow: 'The Standard',
    fleet: 'The Elite Collection',
    fleetEyebrow: 'Active Fleet',
    clients: 'Client Perspectives',
    vip: 'Diplomatic & VIP Protocol',
    vipLead: 'Discreet transportation for executives, corporate guests, delegations and official events.',
    contact: 'Contact Us',
    contactLead: 'Available 24/7 for urgent reservations, airport transfer, chauffeur service and corporate transport.',
    title: (city: string) => `Tulpar Auto - premium transfer and chauffeur service in ${city}`,
    description: (city: string) => `Premium airport transfer, chauffeur service and corporate transportation in ${city}. Mercedes-Benz, Maybach, V-Class and business-class fleet.`,
    footer: 'Premium transfer, chauffeur service and corporate transport',
    services: ['Airport transfer', 'Car with driver', 'Corporate transport'],
  },
  RU: {
    code: 'ru',
    label: 'Русский',
    eyebrow: 'Премиальный транспорт в Казахстане',
    h1: (city: string) => <>Трансфер и авто с водителем <br/><i className="font-normal italic">в {city}</i></>,
    lead: 'Tulpar Auto организует трансфер из аэропорта, аренду авто с водителем и корпоративное транспортное обслуживание для деловых гостей, частных клиентов, компаний и делегаций.',
    primary: 'Оставить заявку',
    secondary: 'Обсудить маршрут',
    menu: ['О нас', 'Трансфер', 'Авто с водителем', 'Корпоративным клиентам', 'Контакты'],
    standard: 'Стандарт сервиса',
    standardEyebrow: 'Протокол',
    fleet: 'Премиальный автопарк',
    fleetEyebrow: 'Автопарк',
    clients: 'Отзывы клиентов',
    vip: 'VIP и делегации',
    vipLead: 'Деликатное транспортное сопровождение руководителей, партнеров, делегаций и официальных мероприятий.',
    contact: 'Контакты',
    contactLead: 'На связи 24/7 для срочных заявок, трансфера, аренды авто с водителем и корпоративного обслуживания.',
    title: (city: string) => `Tulpar Auto - трансфер и аренда авто с водителем в ${city}`,
    description: (city: string) => `Премиальный трансфер, аренда авто с водителем и корпоративный транспорт в ${city}. Mercedes-Benz, Maybach, V-Class и бизнес-класс.`,
    footer: 'Премиальный трансфер, авто с водителем и корпоративный транспорт',
    services: ['Трансфер из аэропорта', 'Аренда авто с водителем', 'Корпоративный транспорт'],
  },
  ZH: {
    code: 'zh',
    label: '中文',
    eyebrow: '哈萨克斯坦高端交通服务',
    h1: (city: string) => <>{city}高端接送 <br/><i className="font-normal italic">带司机租车</i></>,
    lead: 'Tulpar Auto为商务来宾、私人客户、企业和代表团提供机场接送、带司机租车和企业交通服务，配备高端车辆与专业司机。',
    primary: '预约服务',
    secondary: '咨询路线',
    menu: ['关于我们', '接送服务', '带司机租车', '企业用车', '联系'],
    standard: '服务标准',
    standardEyebrow: '标准流程',
    fleet: '高端车队',
    fleetEyebrow: '可用车辆',
    clients: '客户评价',
    vip: '贵宾与代表团服务',
    vipLead: '为企业高管、商务伙伴、代表团和官方活动提供谨慎可靠的交通服务。',
    contact: '联系我们',
    contactLead: '24/7支持机场接送、带司机租车、企业交通和紧急预约。',
    title: (city: string) => `Tulpar Auto - ${city}高端接送和带司机租车`,
    description: (city: string) => `${city}高端机场接送、带司机租车和企业交通服务。Mercedes-Benz、Maybach、V-Class及商务车队。`,
    footer: '高端接送、带司机租车和企业交通服务',
    services: ['机场接送', '带司机租车', '企业交通'],
  },
};

const SERVICE_PROTOCOL = {
  EN: [
    { num: '01', icon: Shield, title: 'Discretion', desc: 'Confidential journeys for business guests, private clients and delegations.', img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2574' },
    { num: '02', icon: Award, title: 'Executive Standard', desc: 'Clean vehicles, professional chauffeurs and a route confirmed before pickup.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671' },
    { num: '03', icon: Clock, title: 'Punctual Pickup', desc: 'Airport transfers and city routes are coordinated around exact timing and flight details.', img: 'https://tulparauto.kz/img/photo/6347cbe29d733688814873.jpg' },
    { num: '04', icon: Check, title: 'Corporate Ready', desc: 'Cashless payment, documents and transport coordination for companies and events.', img: 'https://tulparauto.kz/img/photo/a38f4771-159b-4913-a9be-a111606492a1.jpg' }
  ],
  RU: [
    { num: '01', icon: Shield, title: 'Конфиденциальность', desc: 'Деликатные поездки для деловых гостей, частных клиентов, руководителей и делегаций.', img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2574' },
    { num: '02', icon: Award, title: 'Премиальный стандарт', desc: 'Чистый автомобиль, профессиональный водитель и маршрут, согласованный до подачи.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671' },
    { num: '03', icon: Clock, title: 'Точная подача', desc: 'Трансфер из аэропорта и городские поездки координируются по времени и данным рейса.', img: 'https://tulparauto.kz/img/photo/6347cbe29d733688814873.jpg' },
    { num: '04', icon: Check, title: 'Для бизнеса', desc: 'Безналичная оплата, документы и транспортная координация для компаний и мероприятий.', img: 'https://tulparauto.kz/img/photo/a38f4771-159b-4913-a9be-a111606492a1.jpg' }
  ],
  ZH: [
    { num: '01', icon: Shield, title: '保密服务', desc: '为商务来宾、私人客户、企业高管和代表团提供谨慎出行。', img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2574' },
    { num: '02', icon: Award, title: '高端标准', desc: '整洁车辆、专业司机，并在上车前确认路线。', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671' },
    { num: '03', icon: Clock, title: '准时到达', desc: '机场接送和城市路线根据时间与航班信息协调。', img: 'https://tulparauto.kz/img/photo/6347cbe29d733688814873.jpg' },
    { num: '04', icon: Check, title: '企业支持', desc: '支持无现金支付、文件和企业活动交通协调。', img: 'https://tulparauto.kz/img/photo/a38f4771-159b-4913-a9be-a111606492a1.jpg' }
  ],
};

const SERVICE_ROUTES = {
  transfer: {
    EN: {slug: 'transfer', title: 'airport transfer', desc: 'airport meet-and-greet, hotel transfer and VIP transfer'},
    RU: {slug: 'transfer', title: 'трансфер', desc: 'трансфер из аэропорта, встреча гостей и VIP-трансфер'},
    ZH: {slug: 'transfer', title: '机场接送', desc: '机场接机、酒店接送和贵宾接送'},
  },
  chauffeur: {
    EN: {slug: 'chauffeur-service', title: 'chauffeur service', desc: 'hourly car with driver, full-day routes and private chauffeur service'},
    RU: {slug: 'rent-car-with-driver', title: 'аренда авто с водителем', desc: 'почасовая аренда авто, машина с водителем и поездки на день'},
    ZH: {slug: 'chauffeur-service', title: '带司机租车', desc: '按小时租车、全天用车和私人司机服务'},
  },
  corporate: {
    EN: {slug: 'corporate-transport', title: 'corporate transport', desc: 'transport for companies, delegations, forums and events'},
    RU: {slug: 'corporate-clients', title: 'корпоративный транспорт', desc: 'транспорт для компаний, делегаций, форумов и мероприятий'},
    ZH: {slug: 'corporate-transport', title: '企业交通服务', desc: '企业、代表团、论坛和活动交通服务'},
  },
};

function serviceFromSlug(lang: string, slug?: string) {
  return Object.keys(SERVICE_ROUTES).find((key) => {
    const item = SERVICE_ROUTES[key as keyof typeof SERVICE_ROUTES][lang as keyof typeof SERVICE_ROUTES.transfer] || SERVICE_ROUTES[key as keyof typeof SERVICE_ROUTES].EN;
    return item.slug === slug;
  }) || '';
}

function getInitialRoute() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  const langPart = parts[0]?.toUpperCase();
  const cityPart = parts[1]?.toLowerCase();
  const servicePart = parts[2]?.toLowerCase();
  const initialLang = ['EN', 'RU', 'ZH'].includes(langPart) ? langPart : 'EN';
  const initialCity = cityPart === 'almaty' ? 'Almaty' : cityPart === 'shymkent' ? 'Shymkent' : 'Astana';
  const initialService = serviceFromSlug(initialLang, servicePart);
  return {initialLang, initialCity, initialService};
}

export default function App() {
  const initialRoute = getInitialRoute();
  const [city, setCity] = useState(initialRoute.initialCity);
  const [lang, setLang] = useState(initialRoute.initialLang);
  const [service, setService] = useState(initialRoute.initialService);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<typeof CAR_FLEET[0] | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const content = LANG_CONTENT[lang as keyof typeof LANG_CONTENT] || LANG_CONTENT.EN;
  const cityContent = CITY_CONTENT[city as keyof typeof CITY_CONTENT]?.[content.code as keyof typeof CITY_CONTENT.Astana] || CITY_CONTENT.Astana.en;
  const protocol = SERVICE_PROTOCOL[lang as keyof typeof SERVICE_PROTOCOL] || SERVICE_PROTOCOL.EN;
  const serviceMeta = service ? SERVICE_ROUTES[service as keyof typeof SERVICE_ROUTES][lang as keyof typeof SERVICE_ROUTES.transfer] : undefined;
  const servicePath = serviceMeta ? `${serviceMeta.slug}/` : '';
  const currentPath = `/${content.code}/${city.toLowerCase()}/${servicePath}`;
  const baseDescription = content.description(cityContent.name);
  const seoTitle = serviceMeta ? `Tulpar Auto - ${serviceMeta.title} in ${cityContent.name}` : content.title(cityContent.name);
  const seoDescription = serviceMeta ? `${serviceMeta.desc} in ${cityContent.name}. ${baseDescription}` : baseDescription;
  const whatsappText = encodeURIComponent(`${seoTitle}. ${seoDescription}`);
  const setCityRoute = (nextCity: string) => {
    setCity(nextCity);
    window.history.pushState(null, '', `/${content.code}/${nextCity.toLowerCase()}/${servicePath}`);
  };
  const setLangRoute = (nextLang: string) => {
    const nextContent = LANG_CONTENT[nextLang as keyof typeof LANG_CONTENT] || LANG_CONTENT.EN;
    setLang(nextLang);
    const nextServiceMeta = service ? SERVICE_ROUTES[service as keyof typeof SERVICE_ROUTES][nextLang as keyof typeof SERVICE_ROUTES.transfer] : undefined;
    window.history.pushState(null, '', `/${nextContent.code}/${city.toLowerCase()}/${nextServiceMeta ? `${nextServiceMeta.slug}/` : ''}`);
  };

  useEffect(() => {
    document.documentElement.lang = content.code;
    document.title = seoTitle;

    const upsertMeta = (selector: string, attr: string, value: string) => {
      let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        if (selector.includes('description')) tag.setAttribute('name', 'description');
        if (selector.includes('og:title')) tag.setAttribute('property', 'og:title');
        if (selector.includes('og:description')) tag.setAttribute('property', 'og:description');
        document.head.appendChild(tag);
      }
      tag.setAttribute(attr, value);
    };

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${DOMAIN}${currentPath}`;

    upsertMeta('meta[name="description"]', 'content', seoDescription);
    upsertMeta('meta[property="og:title"]', 'content', seoTitle);
    upsertMeta('meta[property="og:description"]', 'content', seoDescription);

    document.head.querySelectorAll('link[data-tulpar-hreflang="true"]').forEach((node) => node.remove());
    [
      {code: 'ru', hreflang: 'ru-KZ'},
      {code: 'en', hreflang: 'en-KZ'},
      {code: 'zh', hreflang: 'zh-CN'},
      {code: 'ru', hreflang: 'x-default'},
    ].forEach((item) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = item.hreflang;
      link.href = `${DOMAIN}/${item.code}/${city.toLowerCase()}/`;
      link.dataset.tulparHreflang = 'true';
      document.head.appendChild(link);
    });

    let jsonLd = document.getElementById('tulpar-jsonld') as HTMLScriptElement | null;
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.id = 'tulpar-jsonld';
      jsonLd.type = 'application/ld+json';
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'AutoRental',
        name: 'Tulpar Auto',
        url: `${DOMAIN}${currentPath}`,
        telephone: '+7 775 343 24 48',
        areaServed: city,
        serviceType: content.services,
        availableLanguage: ['Russian', 'English', 'Chinese'],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: content.code === 'ru' ? 'Можно ли заказать трансфер из аэропорта?' : content.code === 'zh' ? '可以预约机场接送吗？' : 'Can I book an airport transfer?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: content.code === 'ru' ? 'Да, водитель встретит пассажира в аэропорту, поможет с багажом и доставит по согласованному адресу.' : content.code === 'zh' ? '可以，司机将在机场迎接乘客，协助行李并送达约定地址。' : 'Yes, the chauffeur can meet the passenger at the airport, assist with luggage and drive to the agreed address.',
            },
          },
        ],
      },
    ]);
  }, [city, content, currentPath, seoDescription, seoTitle]);

  return (
    <>
      <div className="min-h-screen bg-[var(--color-bg-dark)] font-sans text-white overflow-x-clip selection:bg-[var(--color-gold)] selection:text-black">
        {/* Header */}
      <header className="fixed top-0 w-full z-40 glass">
        <div className="w-full mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="https://storage.yandexcloud.kz/altyn.1992/logo(2).png" 
              alt="TulparAuto Logo" 
              className="h-10 md:h-12 object-contain"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <button 
                onClick={() => {
                  setIsCityDropdownOpen(!isCityDropdownOpen);
                  setIsLangDropdownOpen(false);
                }}
                className="glass-panel px-4 py-2 rounded-full flex items-center gap-3 cursor-pointer"
              >
                <span className="nav-link text-[var(--color-ivory)]">{city}</span>
                <span className="text-[10px] opacity-40 italic">▼</span>
              </button>
              
              {isCityDropdownOpen && (
                <div className="absolute top-full mt-4 right-0 min-w-[180px] bg-[#0F1115] border border-white/10 rounded-sm py-2 shadow-2xl z-50">
                  {['Astana', 'Almaty', 'Shymkent'].map(c => (
                    <button 
                      key={c}
                      onClick={() => { setCityRoute(c); setIsCityDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 nav-link hover:bg-white/5 transition-colors flex items-center justify-between ${city === c ? 'gold-text' : 'text-[var(--color-ivory)] opacity-70'}`}
                    >
                      {c}
                      {city === c && <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                onClick={() => {
                  setIsLangDropdownOpen(!isLangDropdownOpen);
                  setIsCityDropdownOpen(false);
                }}
                className="glass-panel px-3 py-2 rounded-full flex items-center gap-2 cursor-pointer border border-transparent hover:border-white/10 transition-colors"
              >
                <span className="nav-link text-[var(--color-ivory)]">{lang}</span>
                <span className="text-[10px] opacity-40 italic">▼</span>
              </button>
              
              {isLangDropdownOpen && (
                <div className="absolute top-full mt-4 right-0 min-w-[140px] bg-[#0F1115] border border-white/10 rounded-sm py-2 shadow-2xl z-50">
                  {[
                    { code: 'EN', label: 'English' },
                    { code: 'RU', label: 'Русский' },
                    { code: 'ZH', label: '中文' }
                  ].map(l => (
                    <button 
                      key={l.code}
                      onClick={() => { setLangRoute(l.code); setIsLangDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 nav-link hover:bg-white/5 transition-colors flex items-center justify-between ${lang === l.code ? 'gold-text' : 'text-[var(--color-ivory)] opacity-70'}`}
                    >
                      {l.label}
                      {lang === l.code && <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => {
                setIsMenuOpen(true);
                setIsCityDropdownOpen(false);
                setIsLangDropdownOpen(false);
              }}
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
            >
              <Menu size={18} className="text-[var(--color-ivory)]" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#0F1115]/95 flex flex-col pt-24 px-12"
          >
            {/* Menu Header */}
            <div className="absolute top-0 left-0 w-full glass h-24 flex items-center justify-between px-6 md:px-12 z-50 border-b border-white/5">
              <div className="flex items-center">
                <img 
                  src="https://storage.yandexcloud.kz/altyn.1992/logo(2).png" 
                  alt="TulparAuto Logo" 
                  className="h-10 md:h-12 object-contain"
                />
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
              >
                <X size={18} className="text-[var(--color-ivory)]" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full relative z-10">
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="text-[10px] uppercase tracking-[0.3em] gold-text mb-8 md:mb-16"
               >
                 Tulpar Auto
               </motion.div>
               <nav className="flex flex-col gap-6 md:gap-10">
                 {content.menu.map((item, i) => (
                   <motion.div
                     key={item}
                     initial={{ opacity: 0, x: -30 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                     className="overflow-hidden"
                   >
                     <a 
                       href={i === 1 ? '#transfer' : i === 2 ? '#chauffeur-service' : i === 3 ? '#corporate-clients' : i === 4 ? '#contacts' : '#about-us'} 
                       onClick={() => {
                         const nextService = i === 1 ? 'transfer' : i === 2 ? 'chauffeur' : i === 3 ? 'corporate' : '';
                         if (nextService) {
                           const nextServiceMeta = SERVICE_ROUTES[nextService as keyof typeof SERVICE_ROUTES][lang as keyof typeof SERVICE_ROUTES.transfer];
                           setService(nextService);
                           window.history.pushState(null, '', `/${content.code}/${city.toLowerCase()}/${nextServiceMeta.slug}/`);
                         }
                         setIsMenuOpen(false);
                       }}
                       className="font-serif text-4xl md:text-7xl text-white/80 hover:text-[var(--color-gold)] hover:italic transition-all duration-500 inline-block"
                     >
                       {item}
                     </a>
                   </motion.div>
                 ))}
               </nav>
            </div>
            
            {/* Menu Footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/10 pt-8 max-w-7xl mx-auto opacity-50 text-xs font-light"
            >
              <div>{city} • {content.footer}</div>
              <div className="text-right">Designed by Kaizen Imagen Studio</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <motion.div 
          style={{ y: yHero }}
          className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070" 
            alt="Luxury Car Interior background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 hero-gradient" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-20">
          
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-4 nav-link gold-text opacity-80"
            >
              {content.eyebrow}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-[5rem] serif font-light leading-[1.1] mb-8"
            >
              {content.h1(cityContent.name)}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-lg opacity-60 max-w-lg font-light leading-relaxed mb-12"
            >
              {content.lead}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-wrap gap-6"
            >
              <a 
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel px-10 py-5 rounded-sm hover:bg-white/5 transition-colors uppercase tracking-[0.2em] text-[12px] font-semibold border-white/20 inline-block text-center"
              >
                {content.secondary}
              </a>
              <a 
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-gold)] text-black px-10 py-5 rounded-sm uppercase tracking-[0.2em] text-[12px] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:bg-white transition-all inline-block text-center"
              >
                {content.primary}
              </a>
            </motion.div>
          </div>
          
        </div>
      </section>

      {/* Editorial Protocol Section */}
      <section id="transfer" className="pt-8 pb-32 px-12 relative z-10 bg-[var(--color-bg-dark)] border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16 relative">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="nav-link gold-text mb-4 mt-8"
            >
              {content.standardEyebrow}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl serif font-light tracking-tight"
            >
              {content.standard}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 p-[1px] shadow-2xl">
            {[
              ...protocol
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ margin: "-30% 0px -30% 0px", once: false }}
                className="relative bg-[var(--color-bg-dark)] min-h-[400px] p-12 overflow-hidden flex flex-col justify-between"
              >
                {/* Background Animation */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, scale: 1.1 },
                    visible: { opacity: 0.35, scale: 1 }
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${item.img})` }} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)] via-transparent to-[var(--color-bg-dark)] opacity-70 pointer-events-none" />
                
                {/* Top content */}
                <div className="relative z-10 flex justify-between items-start">
                  <motion.span 
                    variants={{ hidden: { opacity: 0.6 }, visible: { opacity: 1 } }}
                    className="serif text-5xl md:text-6xl gold-text italic font-light tracking-tighter"
                  >
                    {item.num}
                  </motion.span>
                  <motion.div variants={{ hidden: { opacity: 0.2, color: '#ffffff' }, visible: { opacity: 1, color: 'var(--color-gold)' } }}>
                    <item.icon size={32} strokeWidth={1} />
                  </motion.div>
                </div>
                
                {/* Bottom content */}
                <motion.div 
                  variants={{ hidden: { y: 20 }, visible: { y: 0 } }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative z-10"
                >
                  <motion.h3 variants={{ hidden: { color: 'rgba(255,255,255,0.8)' }, visible: { color: '#ffffff' } }} className="serif text-3xl mb-4 transition-colors">
                    {item.title}
                  </motion.h3>
                  <motion.p variants={{ hidden: { color: 'rgba(255,255,255,0.4)' }, visible: { color: 'rgba(255,255,255,0.9)' } }} className="text-sm leading-relaxed font-light transition-colors max-w-sm">
                    {item.desc}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Automotive Showcase */}
      <section id="chauffeur-service" className="pb-32 pt-12 bg-[var(--color-bg-dark)] relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <div className="text-[10px] uppercase tracking-widest gold-text mb-6">{content.fleetEyebrow}</div>
            <h2 className="text-5xl md:text-6xl mb-6 serif tracking-tight">{content.fleet}</h2>
            <div className="w-12 h-[1px] bg-[var(--color-gold)] mx-auto" />
          </div>

          <div className="space-y-6 md:space-y-16">
            {CAR_FLEET.map((car, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                onClick={() => {
                  setSelectedCar(car);
                  setGalleryIndex(0);
                }}
                className="relative h-[500px] md:h-[700px] rounded-lg overflow-hidden group shadow-2xl border border-white/10 cursor-pointer"
              >
                <img 
                  src={car.img} 
                  alt={car.name} 
                  className="absolute inset-0 w-full h-full object-cover filter contrast-[1.1] grayscale-[0.2] brightness-90 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F1115] via-[#0F1115]/90 via-50% to-transparent opacity-90 group-hover:opacity-100 transition-all duration-1000" />
                
                <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-between z-10 pointer-events-none">
                  <div className="max-w-2xl pointer-events-auto">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-[1px] bg-[var(--color-gold)]" />
                      <div className="text-[var(--color-gold)] text-[10px] tracking-[0.3em] uppercase opacity-90 drop-shadow-md">{car.class}</div>
                    </div>
                    <h3 className="serif text-4xl md:text-6xl mb-4 italic tracking-tight drop-shadow-xl">{car.name}</h3>
                    <p className="text-white/70 font-light text-sm md:text-base leading-relaxed mb-6 max-w-lg drop-shadow-md">
                      {car.desc}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {car.features.map(f => (
                        <span key={f} className="glass-panel text-white border-white/10 px-4 py-2 text-xs font-light tracking-wide rounded-sm backdrop-blur-md">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-start md:justify-end mt-auto pointer-events-auto">
                    <a 
                      href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`${content.primary}: ${car.name}. ${seoDescription}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-[var(--color-gold)] text-black px-12 py-5 rounded-sm uppercase tracking-[0.2em] text-[12px] font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-white hover:text-black transition-all whitespace-nowrap active:scale-95 text-center w-full md:w-auto overflow-hidden block"
                    >
                      {content.primary}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Partners Marquee */}
      <section className="py-12 bg-[#0F1115] relative z-10 border-y border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[var(--color-gold)]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          
          <div className="flex-shrink-0 md:border-r border-white/10 md:pr-12 md:mr-4 z-20 bg-[#0F1115]">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[var(--color-gold)] whitespace-nowrap">Tulpar Auto • {content.services.join(' • ')}</span>
          </div>

          <div className="w-full overflow-hidden relative flex mask-gradient-x">
             <div className="animate-marquee gap-16 md:gap-24 items-center">
                {/* SET 1 */}
                <img src="https://tulparauto.kz/img/logo/AIFC.png" alt="AIFC" className="h-8 md:h-10 object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-all duration-500 filter" />
                <img src="https://tulparauto.kz/img/logo/Park-Inn-Logo.png" alt="Park Inn" className="h-6 md:h-8 object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-all duration-500 filter" />
                <img src="https://tulparauto.kz/img/logo/sheraton-full-lockup-1.png" alt="Sheraton" className="h-6 md:h-8 object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-all duration-500 filter" />
                <img src="https://tulparauto.kz/img/logo/cropped-logo-3.png" alt="Kazauen" className="h-6 md:h-8 object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-all duration-500 filter" />
                
                {/* SET 2 (exact duplicate for infinite scroll illusion) */}
                <img src="https://tulparauto.kz/img/logo/AIFC.png" alt="AIFC" className="h-8 md:h-10 object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-all duration-500 filter" />
                <img src="https://tulparauto.kz/img/logo/Park-Inn-Logo.png" alt="Park Inn" className="h-6 md:h-8 object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-all duration-500 filter" />
                <img src="https://tulparauto.kz/img/logo/sheraton-full-lockup-1.png" alt="Sheraton" className="h-6 md:h-8 object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-all duration-500 filter" />
                <img src="https://tulparauto.kz/img/logo/cropped-logo-3.png" alt="Kazauen" className="h-6 md:h-8 pr-16 md:pr-24 object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-all duration-500 filter" />
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-12 bg-[var(--color-bg-dark)] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl mb-6 serif tracking-tight">{content.clients}</h2>
            <div className="w-12 h-[1px] bg-[var(--color-gold)] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alikhan S.", role: "CEO, Tech Firm", date: "October 20th", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574", text: "Impeccable service. The chauffeur arrived early, the Mercedes was pristine, and the WiFi was exceptionally fast—crucial for my remote meetings en route." },
              { name: "Eleanor T.", role: "Diplomatic Attache", date: "November 2nd", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576", text: "Their protocol adherence is unmatched. Smooth convoy organization and highly secure transfer from the VIP terminal. They understand discretion perfectly." },
              { name: "Zuhair M.", role: "Private Investor", date: "December 5th", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574", text: "The epitome of luxury in Astana. Truly the only service that seamlessly caters to high-net-worth individuals without a single hiccup. Outstanding." }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="glass-panel p-10 flex flex-col justify-between group hover:border-[var(--color-gold)]/30 transition-colors"
              >
                <div>
                  <div className="flex gap-1.5 mb-8">
                    {[1,2,3,4,5].map(star => <Star key={star} size={14} className="fill-[var(--color-gold)] text-[var(--color-gold)] opacity-90" />)}
                  </div>
                  <p className="text-sm font-light leading-relaxed opacity-80 mb-10 italic">"{review.text}"</p>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 group-hover:border-[var(--color-gold)]/50 transition-colors">
                    <img src={review.img} className="w-full h-full object-cover filter grayscale-[0.2]" alt={review.name} />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif tracking-wide">{review.name}</h4>
                    <div className="text-[10px] uppercase tracking-widest opacity-40 mt-1">{review.date}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP & Delegations */}
      <section id="corporate-clients" className="py-24 px-12 bg-[var(--color-bg-card)] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--color-gold) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 serif">{content.vip}</h2>
            <p className="max-w-2xl text-white/50 text-sm tracking-wide leading-relaxed">
              {content.vipLead}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Convoy Organization", desc: "Coordinated multi-vehicle fleets with seamless communication." },
              { title: "Armored Vehicles", desc: "VR8/VR9 certified armored sedans and SUVs available." },
              { title: "VIP Terminal (NQZ)", desc: "Tarmac tarmac-to-hotel seamless transfer from Astana VIP terminal." }
            ].map((srv, i) => (
              <div key={i} className="glass-panel p-8 rounded-xl text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-gold)]" />
                </div>
                <h3 className="font-serif text-xl mb-3">{srv.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed font-light">{srv.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <a 
              href="tel:+77753432448"
              className="bg-[var(--color-gold)] text-black px-10 py-5 rounded-sm uppercase tracking-[0.2em] text-[12px] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:bg-white transition-all inline-block"
            >
              Contact VIP Manager
            </a>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-32 px-12 relative z-10 bg-[#0F1115] border-t border-white/5 overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[var(--color-gold)]/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16 lg:gap-24 relative z-10">
          <div className="max-w-xl flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-[var(--color-gold)]" />
              <span className="uppercase tracking-[0.2em] text-[10px] text-[var(--color-gold)] font-semibold">Get in Touch</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-8">{content.contact}</h2>
            <p className="text-white/50 text-lg font-light leading-relaxed mb-10 max-w-md">
              {content.contactLead}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-[60%]">
            <a href="tel:+77753432448" className="glass-panel p-8 rounded-xl hover:bg-white/5 transition-all duration-300 group border border-white/5 hover:border-[var(--color-gold)]/30 flex flex-col items-start justify-center">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-[var(--color-gold)]/50 transition-colors">
                <Phone className="w-5 h-5 text-[var(--color-gold)]" strokeWidth={1.5} />
              </div>
              <span className="block text-[10px] uppercase tracking-[0.2em] opacity-40 mb-2">Phone Number</span>
              <span className="text-lg font-light group-hover:text-[var(--color-gold)] transition-colors">+7 775 343 24 48</span>
            </a>
            
            <a href="mailto:info@tulparauto.kz" className="glass-panel p-8 rounded-xl hover:bg-white/5 transition-all duration-300 group border border-white/5 hover:border-[var(--color-gold)]/30 flex flex-col items-start justify-center">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-[var(--color-gold)]/50 transition-colors">
                <Mail className="w-5 h-5 text-[var(--color-gold)]" strokeWidth={1.5} />
              </div>
              <span className="block text-[10px] uppercase tracking-[0.2em] opacity-40 mb-2">Email</span>
              <span className="text-lg font-light group-hover:text-[var(--color-gold)] transition-colors break-all">info@tulparauto.kz</span>
            </a>
            
            <a href="https://www.instagram.com/astana_arenda_avto_" target="_blank" rel="noopener noreferrer" className="glass-panel p-8 rounded-xl hover:bg-white/5 transition-all duration-300 group border border-white/5 hover:border-[var(--color-gold)]/30 flex flex-col items-start justify-center">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-[var(--color-gold)]/50 transition-colors">
                <Instagram className="w-5 h-5 text-[var(--color-gold)]" strokeWidth={1.5} />
              </div>
              <span className="block text-[10px] uppercase tracking-[0.2em] opacity-40 mb-2">Instagram</span>
              <span className="text-lg font-light group-hover:text-[var(--color-gold)] transition-colors">@astana_arenda_avto_</span>
            </a>
            
            <div className="glass-panel p-8 rounded-xl border border-white/5 flex flex-col items-start justify-center">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6">
                <MapPin className="w-5 h-5 text-[var(--color-gold)]" strokeWidth={1.5} />
              </div>
              <span className="block text-[10px] uppercase tracking-[0.2em] opacity-40 mb-2">Address</span>
              <span className="text-lg font-light leading-snug">Kazakhstan, Astana<br/>Berel st. 44</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-12 py-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between z-10 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex gap-8 md:gap-16 flex-wrap justify-center text-center md:text-left mb-6 md:mb-0">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-widest opacity-40">Service Standard</span>
            <span className="text-xs font-medium">{content.services[0]}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-widest opacity-40">Arrival</span>
            <span className="text-xs font-medium">{content.services[1]}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-widest opacity-40">Security</span>
            <span className="text-xs font-medium">{content.services[2]}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[11px] opacity-40 tracking-wider">Designed by: Kaizen Imagen Studio</span>
        </div>
      </footer>
      </div>

      {/* Car Gallery Modal */}
      <AnimatePresence>
        {selectedCar && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(30px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-[#0F1115]/80 overflow-y-auto flex flex-col"
          >
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-8 right-8 w-12 h-12 rounded-full glass-panel flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 z-50 text-white"
            >
              <X size={24} />
            </button>
            
            <div className="flex-1 flex flex-col min-h-screen md:flex-row max-w-7xl mx-auto w-full p-6 lg:p-12 gap-8 lg:gap-16 pt-24 pb-12">
              {/* Image Gallery */}
              <div className="flex-1 relative rounded-2xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center group h-[40vh] md:h-auto min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={galleryIndex}
                    src={selectedCar.gallery[galleryIndex]}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Navigation Arrows */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setGalleryIndex(prev => prev === 0 ? selectedCar.gallery.length - 1 : prev - 1); }}
                    className="w-12 h-12 rounded-full glass-panel flex items-center justify-center pointer-events-auto hover:bg-white hover:text-black transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setGalleryIndex(prev => prev === selectedCar.gallery.length - 1 ? 0 : prev + 1); }}
                    className="w-12 h-12 rounded-full glass-panel flex items-center justify-center pointer-events-auto hover:bg-white hover:text-black transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* Thumbnails indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                  {selectedCar.gallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setGalleryIndex(idx); }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${galleryIndex === idx ? 'w-8 bg-[var(--color-gold)]' : 'bg-white/40 hover:bg-white/80'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-[400px] flex flex-col justify-center py-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-[1px] bg-[var(--color-gold)]" />
                  <div className="text-[var(--color-gold)] text-[10px] tracking-[0.3em] uppercase opacity-90">{selectedCar.class}</div>
                </div>
                <h3 className="serif text-4xl lg:text-5xl mb-6 tracking-tight leading-tight">{selectedCar.name}</h3>
                <p className="text-white/60 font-light text-base leading-relaxed mb-10">
                  {selectedCar.desc}
                </p>
                <div className="mb-12">
                  <div className="text-[10px] uppercase tracking-widest opacity-40 mb-4">{content.standard}</div>
                  <div className="flex flex-col gap-3">
                    {selectedCar.features.map(f => (
                      <div key={f} className="flex items-center gap-3">
                        <Check size={14} className="text-[var(--color-gold)]" />
                        <span className="text-sm font-light text-white/80">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <a 
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`${content.primary}: ${selectedCar.name}. ${seoDescription}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--color-gold)] text-black px-12 py-5 rounded-sm uppercase tracking-[0.2em] text-[12px] font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-white transition-all text-center block mt-auto"
                >
                  {content.primary}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Button */}
      <a 
        href={`https://wa.me/${WHATSAPP_PHONE}?text=${whatsappText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[9999] w-14 h-14 bg-[var(--color-gold)] text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:bg-white hover:scale-110 transition-all duration-300 cursor-pointer"
      >
        <MessageCircle size={26} strokeWidth={1.5} />
        <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-white border-2 border-[#D4AF37] rounded-full animate-pulse" />
      </a>
    </>
  );
}
