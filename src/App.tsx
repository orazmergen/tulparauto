import {useEffect, useMemo, useState} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {
  Award,
  Briefcase,
  Building2,
  Check,
  ChevronRight,
  Clock,
  Globe2,
  Languages,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Shield,
  Sparkles,
  Star,
  X,
} from 'lucide-react';

type Lang = 'ru' | 'en' | 'zh';
type CitySlug = 'astana' | 'almaty' | 'shymkent';
type ServiceSlug = 'transfer' | 'rent-car-with-driver' | 'corporate-clients';

type PageKind = 'home' | 'city' | 'service';

const DOMAIN = 'https://tulparauto.kz';
const PHONE = '+7 775 343 24 48';
const WHATSAPP = 'https://wa.me/77753432448';

const LANGS: Record<Lang, {label: string; short: string; hreflang: string}> = {
  ru: {label: 'Русский', short: 'RU', hreflang: 'ru-KZ'},
  en: {label: 'English', short: 'EN', hreflang: 'en-KZ'},
  zh: {label: '中文', short: 'ZH', hreflang: 'zh-CN'},
};

const CITIES: Record<CitySlug, Record<Lang, {name: string; airport: string; local: string}>> = {
  astana: {
    ru: {name: 'Астана', airport: 'аэропорт NQZ', local: 'деловые кварталы, отели, госучреждения и площадки форумов'},
    en: {name: 'Astana', airport: 'NQZ airport', local: 'business districts, hotels, government venues and forum sites'},
    zh: {name: '阿斯塔纳', airport: 'NQZ机场', local: '商务区、酒店、政府机构和论坛场地'},
  },
  almaty: {
    ru: {name: 'Алматы', airport: 'аэропорт Алматы', local: 'отели, бизнес-центры, Медеу и загородные маршруты'},
    en: {name: 'Almaty', airport: 'Almaty airport', local: 'hotels, business centers, Medeu and mountain routes'},
    zh: {name: '阿拉木图', airport: '阿拉木图机场', local: '酒店、商务中心、Medeu和山区路线'},
  },
  shymkent: {
    ru: {name: 'Шымкент', airport: 'аэропорт Шымкент', local: 'деловые районы города и маршруты по Туркестанской области'},
    en: {name: 'Shymkent', airport: 'Shymkent airport', local: 'city business routes and trips across the Turkistan region'},
    zh: {name: '奇姆肯特', airport: '奇姆肯特机场', local: '城市商务路线和突厥斯坦地区行程'},
  },
};

const SERVICE_PATHS: Record<Lang, Record<ServiceSlug, string>> = {
  ru: {
    transfer: 'transfer',
    'rent-car-with-driver': 'rent-car-with-driver',
    'corporate-clients': 'corporate-clients',
  },
  en: {
    transfer: 'transfer',
    'rent-car-with-driver': 'chauffeur-service',
    'corporate-clients': 'corporate-transport',
  },
  zh: {
    transfer: 'transfer',
    'rent-car-with-driver': 'chauffeur-service',
    'corporate-clients': 'corporate-transport',
  },
};

const SERVICES: Record<ServiceSlug, Record<Lang, {label: string; nav: string; title: string; description: string; keywords: string[]; icon: typeof MapPin}>> = {
  transfer: {
    ru: {
      label: 'Трансфер',
      nav: 'Трансфер',
      title: 'Премиальный трансфер с водителем',
      description: 'Встреча в аэропорту, трансфер до отеля, офиса, мероприятия или частного адреса с профессиональным водителем и заранее согласованным маршрутом.',
      keywords: ['трансфер из аэропорта', 'VIP трансфер', 'встреча гостей', 'трансфер для делегаций'],
      icon: MapPin,
    },
    en: {
      label: 'Transfer',
      nav: 'Transfer',
      title: 'Premium airport and city transfer',
      description: 'Airport meet-and-greet, hotel transfer, office routes, event arrivals and private address drop-offs with a professional chauffeur.',
      keywords: ['airport transfer', 'VIP transfer', 'meet and greet', 'delegation transfer'],
      icon: MapPin,
    },
    zh: {
      label: '接送服务',
      nav: '接送',
      title: '高端机场及城市接送服务',
      description: '提供机场接机、酒店接送、商务路线、活动抵达和私人地址接送服务，配备专业司机并提前确认路线。',
      keywords: ['机场接送', '贵宾接送', '商务接送', '代表团接送'],
      icon: MapPin,
    },
  },
  'rent-car-with-driver': {
    ru: {
      label: 'Аренда авто с водителем',
      nav: 'Авто с водителем',
      title: 'Аренда автомобиля с профессиональным водителем',
      description: 'Почасовая аренда, аренда на день, поездки по городу, деловые встречи, свадьбы, съемки, загородные маршруты и сопровождение гостей.',
      keywords: ['аренда авто с водителем', 'машина с водителем', 'премиум авто с водителем', 'аренда Mercedes с водителем'],
      icon: Sparkles,
    },
    en: {
      label: 'Car with Driver',
      nav: 'Chauffeur Service',
      title: 'Chauffeur-driven car rental',
      description: 'Hourly and daily chauffeur service for business meetings, private routes, weddings, production days, events and guest support.',
      keywords: ['car with driver', 'chauffeur service', 'premium car rental with driver', 'Mercedes chauffeur'],
      icon: Sparkles,
    },
    zh: {
      label: '带司机租车',
      nav: '带司机租车',
      title: '专业司机高端租车服务',
      description: '按小时或全天提供商务会议、私人行程、婚礼、拍摄、活动和来宾陪同用车服务。',
      keywords: ['带司机租车', '商务用车', '高端租车', '奔驰司机服务'],
      icon: Sparkles,
    },
  },
  'corporate-clients': {
    ru: {
      label: 'Корпоративным клиентам',
      nav: 'Для бизнеса',
      title: 'Транспортное обслуживание для компаний',
      description: 'Корпоративный транспорт для сотрудников, партнеров, делегаций, форумов, конференций и регулярных маршрутов с документами для бухгалтерии.',
      keywords: ['корпоративный транспорт', 'транспорт для делегаций', 'авто для мероприятий', 'перевозка сотрудников'],
      icon: Briefcase,
    },
    en: {
      label: 'Corporate Clients',
      nav: 'Corporate',
      title: 'Corporate transportation for companies',
      description: 'Business transport for teams, partners, delegations, forums, conferences and recurring routes with clear documentation for accounting.',
      keywords: ['corporate transportation', 'delegation transport', 'event transport', 'employee shuttle'],
      icon: Briefcase,
    },
    zh: {
      label: '企业客户',
      nav: '企业用车',
      title: '企业和代表团交通服务',
      description: '为员工、合作伙伴、代表团、论坛、会议和固定路线提供商务交通服务，并支持企业结算文件。',
      keywords: ['企业交通服务', '代表团用车', '活动用车', '员工通勤'],
      icon: Briefcase,
    },
  },
};

const UI: Record<Lang, {
  menu: string;
  close: string;
  home: string;
  cities: string;
  services: string;
  fleet: string;
  clients: string;
  contacts: string;
  reserve: string;
  consult: string;
  why: string;
  cityHeading: string;
  servicesHeading: string;
  faqHeading: string;
  sitemapHeading: string;
  routePrefix: string;
  footerNote: string;
}> = {
  ru: {
    menu: 'Меню',
    close: 'Закрыть',
    home: 'Главная',
    cities: 'Города',
    services: 'Услуги',
    fleet: 'Автопарк',
    clients: 'Клиенты',
    contacts: 'Контакты',
    reserve: 'Оставить заявку',
    consult: 'Получить консультацию',
    why: 'Стандарт сервиса',
    cityHeading: 'Городские направления',
    servicesHeading: 'Услуги Tulpar Auto',
    faqHeading: 'Частые вопросы',
    sitemapHeading: 'SEO-структура сайта',
    routePrefix: 'Маршрут',
    footerNote: 'Премиальный трансфер, аренда авто с водителем и корпоративный транспорт в Казахстане.',
  },
  en: {
    menu: 'Menu',
    close: 'Close',
    home: 'Home',
    cities: 'Cities',
    services: 'Services',
    fleet: 'Fleet',
    clients: 'Clients',
    contacts: 'Contacts',
    reserve: 'Request a booking',
    consult: 'Get consultation',
    why: 'Service standard',
    cityHeading: 'City destinations',
    servicesHeading: 'Tulpar Auto services',
    faqHeading: 'FAQ',
    sitemapHeading: 'SEO site structure',
    routePrefix: 'Route',
    footerNote: 'Premium transfers, chauffeur service and corporate transport in Kazakhstan.',
  },
  zh: {
    menu: '菜单',
    close: '关闭',
    home: '首页',
    cities: '城市',
    services: '服务',
    fleet: '车队',
    clients: '客户',
    contacts: '联系',
    reserve: '预约服务',
    consult: '获取咨询',
    why: '服务标准',
    cityHeading: '服务城市',
    servicesHeading: 'Tulpar Auto服务',
    faqHeading: '常见问题',
    sitemapHeading: 'SEO网站结构',
    routePrefix: '路线',
    footerNote: '哈萨克斯坦高端接送、带司机租车和企业交通服务。',
  },
};

const COPY: Record<Lang, {
  eyebrow: string;
  homeH1: string;
  homeLead: string;
  cityLead: (city: string, airport: string, local: string) => string;
  serviceLead: (service: string, city: string, airport: string) => string;
  proof: string[];
  process: {title: string; text: string}[];
  fleetIntro: string;
  corporateIntro: string;
  faq: {q: string; a: string}[];
}> = {
  ru: {
    eyebrow: 'Премиальный транспорт в Казахстане',
    homeH1: 'Трансфер и аренда авто с водителем в Астане, Алматы и Шымкенте',
    homeLead: 'Tulpar Auto организует премиальные поездки для деловых гостей, частных клиентов, компаний и делегаций. Мы объединяем пунктуальную подачу, чистый автомобиль, профессионального водителя и понятную коммуникацию до, во время и после поездки.',
    cityLead: (city, airport, local) => `Tulpar Auto предоставляет автомобили с водителем в городе ${city}: трансфер из ${airport}, поездки между ${local}, сопровождение мероприятий, делегаций и частных маршрутов. Страница оптимизирована под локальный спрос, чтобы клиент сразу видел релевантную услугу в своем городе.`,
    serviceLead: (service, city, airport) => `${service} в городе ${city} подходит для деловых встреч, гостей из аэропорта, частных маршрутов и мероприятий. Мы заранее согласуем время подачи, класс автомобиля, маршрут, ожидание и дополнительные пожелания пассажиров. Для рейсов учитываем ${airport}.`,
    proof: ['Подача точно по времени', 'Автомобили бизнес- и представительского класса', 'Русский, английский и китайский языки', 'Безналичная оплата и документы для компаний'],
    process: [
      {title: 'Заявка', text: 'Уточняем город, дату, маршрут, количество пассажиров и нужный класс автомобиля.'},
      {title: 'Подтверждение', text: 'Фиксируем водителя, автомобиль, точку встречи, контакты и формат оплаты.'},
      {title: 'Поездка', text: 'Водитель приезжает заранее, помогает с багажом и сопровождает маршрут без лишнего ожидания.'},
    ],
    fleetIntro: 'В структуре сайта автопарк должен поддерживать коммерческие страницы: седаны бизнес-класса, представительские автомобили, внедорожники, минивэны и автобусы для групп.',
    corporateIntro: 'Для компаний важно показать не только премиальность, но и операционную надежность: регулярные заявки, документы, единый менеджер, обслуживание делегаций и мероприятий.',
    faq: [
      {q: 'Можно ли заказать трансфер из аэропорта?', a: 'Да, водитель встретит пассажира в аэропорту, поможет с багажом и доставит по согласованному адресу.'},
      {q: 'Можно ли арендовать автомобиль на несколько часов?', a: 'Да, доступна почасовая аренда, аренда на день и индивидуальные условия для длительных маршрутов.'},
      {q: 'Работаете ли вы с корпоративными клиентами?', a: 'Да, мы обслуживаем компании, делегации, конференции, форумы, сотрудников и партнеров.'},
      {q: 'В каких городах доступен сервис?', a: 'Основные города: Астана, Алматы и Шымкент. Междугородние маршруты согласуются отдельно.'},
    ],
  },
  en: {
    eyebrow: 'Premium transportation in Kazakhstan',
    homeH1: 'Transfers and chauffeur-driven cars in Astana, Almaty and Shymkent',
    homeLead: 'Tulpar Auto arranges premium journeys for business guests, private clients, companies and delegations. Every route is built around punctual arrival, a prepared vehicle, a professional chauffeur and clear communication.',
    cityLead: (city, airport, local) => `Tulpar Auto provides chauffeur-driven cars in ${city}: transfers from ${airport}, routes across ${local}, event transportation, delegation support and private itineraries. Each city page targets local search intent with clear service relevance.`,
    serviceLead: (service, city, airport) => `${service} in ${city} is designed for business meetings, airport guests, private routes and events. We confirm pickup time, vehicle class, route details, waiting time and passenger preferences in advance. Flight arrivals are coordinated through ${airport}.`,
    proof: ['On-time pickup', 'Business and executive class fleet', 'Russian, English and Chinese support', 'Cashless payment and company documents'],
    process: [
      {title: 'Request', text: 'We confirm the city, date, route, passenger count and the right vehicle class.'},
      {title: 'Confirmation', text: 'We lock the chauffeur, vehicle, meeting point, contacts and payment format.'},
      {title: 'Journey', text: 'The chauffeur arrives early, assists with luggage and keeps the route calm and efficient.'},
    ],
    fleetIntro: 'The fleet section supports commercial pages with business sedans, executive vehicles, SUVs, minivans and buses for groups.',
    corporateIntro: 'Corporate pages should prove operational reliability: recurring requests, documents, a dedicated manager, delegation support and event logistics.',
    faq: [
      {q: 'Can I book an airport transfer?', a: 'Yes, the chauffeur can meet the passenger at the airport, assist with luggage and drive to the agreed address.'},
      {q: 'Can I rent a car with driver for a few hours?', a: 'Yes, hourly bookings, full-day service and custom long-route conditions are available.'},
      {q: 'Do you work with corporate clients?', a: 'Yes, we serve companies, delegations, conferences, forums, employees and business partners.'},
      {q: 'Which cities are covered?', a: 'Core cities are Astana, Almaty and Shymkent. Intercity routes are arranged on request.'},
    ],
  },
  zh: {
    eyebrow: '哈萨克斯坦高端交通服务',
    homeH1: '阿斯塔纳、阿拉木图和奇姆肯特接送及带司机租车',
    homeLead: 'Tulpar Auto为商务来宾、私人客户、企业和代表团安排高端出行。每一次服务都注重准时到达、车辆整洁、专业司机和清晰沟通。',
    cityLead: (city, airport, local) => `Tulpar Auto在${city}提供带司机用车服务：${airport}接送、${local}路线、活动交通、代表团接待和私人行程。每个城市页面都围绕本地搜索需求建立清晰内容。`,
    serviceLead: (service, city, airport) => `${city}${service}适合商务会议、机场来宾、私人路线和活动用车。我们会提前确认上车时间、车型、路线、等待时间和乘客需求，并根据${airport}航班安排接送。`,
    proof: ['准时到达', '商务级和行政级车辆', '俄语、英语、中文支持', '企业无现金支付和文件'],
    process: [
      {title: '提交需求', text: '确认城市、日期、路线、乘客人数和所需车型。'},
      {title: '确认安排', text: '确认司机、车辆、会面地点、联系方式和付款方式。'},
      {title: '完成行程', text: '司机提前到达，协助行李，并确保路线舒适高效。'},
    ],
    fleetIntro: '车队页面需要支持商业页面：商务轿车、行政级车辆、SUV、商务车和团队巴士。',
    corporateIntro: '企业页面应突出运营可靠性：长期申请、文件、专属经理、代表团接待和活动交通安排。',
    faq: [
      {q: '可以预约机场接送吗？', a: '可以，司机将在机场迎接乘客，协助行李，并送达约定地址。'},
      {q: '可以按小时租带司机车辆吗？', a: '可以，支持按小时、全天和定制长路线服务。'},
      {q: '是否服务企业客户？', a: '是的，我们为公司、代表团、会议、论坛、员工和合作伙伴提供服务。'},
      {q: '服务覆盖哪些城市？', a: '核心城市为阿斯塔纳、阿拉木图和奇姆肯特。城际路线可单独确认。'},
    ],
  },
};

const CITY_SEO: Record<CitySlug, Record<Lang, {districts: string[]; routes: string[]; demand: string}>> = {
  astana: {
    ru: {
      districts: ['аэропорт NQZ', 'EXPO', 'левый берег', 'район Байтерек', 'Президентский парк', 'отели St. Regis, Ritz-Carlton и Sheraton'],
      routes: ['аэропорт - отель', 'отель - бизнес-центр', 'городской маршрут с ожиданием', 'делегация на форум', 'междугородняя поездка по Казахстану'],
      demand: 'В Астане основной спрос формируют аэропортовые трансферы, деловые маршруты, правительственные и корпоративные мероприятия, форумы и сопровождение иностранных делегаций.',
    },
    en: {
      districts: ['NQZ airport', 'EXPO area', 'left bank', 'Baiterek district', 'Presidential Park', 'St. Regis, Ritz-Carlton and Sheraton hotels'],
      routes: ['airport to hotel', 'hotel to business center', 'city route with waiting time', 'forum delegation support', 'intercity Kazakhstan route'],
      demand: 'Astana demand is driven by airport transfers, business routes, government and corporate events, forums and foreign delegation support.',
    },
    zh: {
      districts: ['NQZ机场', 'EXPO区域', '左岸商务区', 'Baiterek区域', '总统公园', 'St. Regis、Ritz-Carlton和Sheraton酒店'],
      routes: ['机场到酒店', '酒店到商务中心', '城市等待路线', '论坛代表团接待', '哈萨克斯坦城际路线'],
      demand: '阿斯塔纳的主要需求来自机场接送、商务路线、政府和企业活动、论坛以及外国代表团接待。',
    },
  },
  almaty: {
    ru: {
      districts: ['аэропорт Алматы', 'центр города', 'Бостандыкский район', 'Медеу', 'Шымбулак', 'деловые центры и премиальные отели'],
      routes: ['аэропорт - центр', 'отель - Медеу', 'городской бизнес-маршрут', 'трансфер на мероприятие', 'поездка в горном направлении'],
      demand: 'В Алматы сильный спрос на трансфер из аэропорта, автомобили с водителем для встреч, премиальные поездки в горном направлении, мероприятия и сопровождение гостей.',
    },
    en: {
      districts: ['Almaty airport', 'city center', 'Bostandyk district', 'Medeu', 'Shymbulak', 'business centers and premium hotels'],
      routes: ['airport to city center', 'hotel to Medeu', 'business city route', 'event transfer', 'mountain direction route'],
      demand: 'Almaty demand is strong for airport transfers, chauffeur service for meetings, premium mountain routes, events and guest support.',
    },
    zh: {
      districts: ['阿拉木图机场', '市中心', 'Bostandyk区', 'Medeu', 'Shymbulak', '商务中心和高端酒店'],
      routes: ['机场到市中心', '酒店到Medeu', '城市商务路线', '活动接送', '山区方向路线'],
      demand: '阿拉木图的搜索需求集中在机场接送、会议带司机用车、高端山区路线、活动交通和来宾接待。',
    },
  },
  shymkent: {
    ru: {
      districts: ['аэропорт Шымкент', 'центр города', 'деловые кварталы', 'отели города', 'маршруты в Туркестан и по области'],
      routes: ['аэропорт - отель', 'городской маршрут', 'Шымкент - Туркестан', 'транспорт для мероприятия', 'встреча деловых гостей'],
      demand: 'В Шымкенте важны понятные трансферы, деловые поездки, транспорт для мероприятий и маршруты по Туркестанской области.',
    },
    en: {
      districts: ['Shymkent airport', 'city center', 'business districts', 'city hotels', 'routes to Turkistan and the region'],
      routes: ['airport to hotel', 'city route', 'Shymkent to Turkistan', 'event transport', 'business guest pickup'],
      demand: 'Shymkent demand is focused on clear transfers, business trips, event transport and routes across the Turkistan region.',
    },
    zh: {
      districts: ['奇姆肯特机场', '市中心', '商务区', '城市酒店', '前往Turkistan及周边地区路线'],
      routes: ['机场到酒店', '城市路线', '奇姆肯特到Turkistan', '活动交通', '商务来宾接待'],
      demand: '奇姆肯特需求集中在机场接送、商务出行、活动交通以及突厥斯坦地区路线。',
    },
  },
};

const SERVICE_SEO: Record<ServiceSlug, Record<Lang, {intent: string; useCases: string[]; included: string[]; faq: {q: string; a: string}[]}>> = {
  transfer: {
    ru: {
      intent: 'Страница закрывает спрос на трансфер из аэропорта, встречу гостей, VIP-трансфер, трансфер до отеля, трансфер на мероприятие и групповую перевозку.',
      useCases: ['встреча с табличкой в аэропорту', 'трансфер в отель или офис', 'сопровождение иностранного гостя', 'минивэн или автобус для группы', 'ночной или ранний рейс'],
      included: ['контроль времени прилета', 'помощь с багажом', 'ожидание пассажира', 'чистый салон и вода', 'маршрут до точного адреса'],
      faq: [
        {q: 'Водитель отслеживает рейс?', a: 'Да, для аэропортового трансфера мы заранее уточняем номер рейса и корректируем подачу при изменении времени прилета.'},
        {q: 'Можно ли встретить гостя с табличкой?', a: 'Да, водитель может встретить пассажира с табличкой имени, компании или мероприятия.'},
      ],
    },
    en: {
      intent: 'This page targets airport transfer, guest meet-and-greet, VIP transfer, hotel transfer, event transfer and group transportation searches.',
      useCases: ['airport pickup with a sign', 'hotel or office transfer', 'foreign guest support', 'minivan or bus for a group', 'late-night or early flight'],
      included: ['flight time monitoring', 'luggage assistance', 'passenger waiting time', 'clean cabin and water', 'route to the exact address'],
      faq: [
        {q: 'Does the chauffeur monitor the flight?', a: 'Yes, we confirm the flight number and adjust pickup timing if the arrival time changes.'},
        {q: 'Can the chauffeur meet a guest with a sign?', a: 'Yes, the chauffeur can meet the passenger with a name, company or event sign.'},
      ],
    },
    zh: {
      intent: '本页面覆盖机场接送、来宾迎接、贵宾接送、酒店接送、活动接送和团队交通等搜索需求。',
      useCases: ['机场举牌接机', '酒店或办公室接送', '外国来宾陪同', '团队商务车或巴士', '深夜或清晨航班'],
      included: ['航班时间跟进', '协助行李', '等待乘客', '干净车厢和饮用水', '送达准确地址'],
      faq: [
        {q: '司机会跟进航班时间吗？', a: '会，我们会提前确认航班号，并在到达时间变化时调整接送时间。'},
        {q: '可以举牌接机吗？', a: '可以，司机可按姓名、公司或活动名称举牌迎接乘客。'},
      ],
    },
  },
  'rent-car-with-driver': {
    ru: {
      intent: 'Страница закрывает запросы аренда авто с водителем, личный водитель, почасовая аренда авто, прокат премиум авто, авто на день и машина с водителем.',
      useCases: ['деловые встречи в течение дня', 'личные поездки по городу', 'свадьба или фотосессия', 'загородный маршрут', 'VIP-сопровождение с ожиданием'],
      included: ['почасовая или дневная аренда', 'водитель в деловом стиле', 'ожидание между встречами', 'замена автомобиля при необходимости', 'подбор класса под задачу'],
      faq: [
        {q: 'Какой минимальный срок аренды?', a: 'Минимальный срок зависит от города, класса автомобиля и даты. Для премиальных автомобилей условия лучше согласовать с менеджером заранее.'},
        {q: 'Можно ли заказать автомобиль на весь день?', a: 'Да, автомобиль с водителем можно забронировать на несколько часов, полный день или серию маршрутов.'},
      ],
    },
    en: {
      intent: 'This page targets car with driver, private chauffeur, hourly chauffeur service, premium car rental, full-day car hire and executive chauffeur searches.',
      useCases: ['business meetings throughout the day', 'private city routes', 'wedding or photo production', 'out-of-city route', 'VIP support with waiting time'],
      included: ['hourly or daily booking', 'business-style chauffeur', 'waiting between meetings', 'vehicle replacement if needed', 'vehicle class selection'],
      faq: [
        {q: 'What is the minimum booking time?', a: 'The minimum depends on city, vehicle class and date. Premium vehicles are best confirmed with a manager in advance.'},
        {q: 'Can I book a chauffeur for the whole day?', a: 'Yes, chauffeur service is available for a few hours, a full day or a chain of routes.'},
      ],
    },
    zh: {
      intent: '本页面覆盖带司机租车、私人司机、按小时租车、高端租车、全天用车和行政司机服务搜索需求。',
      useCases: ['全天商务会议', '城市私人路线', '婚礼或拍摄', '郊区路线', '贵宾等待陪同'],
      included: ['按小时或全天预约', '商务形象司机', '会议之间等待', '必要时更换车辆', '按任务选择车型'],
      faq: [
        {q: '最低预约时长是多少？', a: '最低时长取决于城市、车型和日期。高端车型建议提前与经理确认。'},
        {q: '可以预约全天带司机用车吗？', a: '可以，支持几小时、全天或多个连续路线的用车。'},
      ],
    },
  },
  'corporate-clients': {
    ru: {
      intent: 'Страница закрывает корпоративный транспорт, транспорт для делегаций, развозку сотрудников, авто для конференции, транспорт для форума и обслуживание партнеров.',
      useCases: ['транспорт для форума или конференции', 'встреча партнеров и инвесторов', 'развозка сотрудников', 'маршрут для делегации', 'единый транспортный менеджер на событие'],
      included: ['безналичная оплата', 'закрывающие документы', 'планирование маршрутов', 'несколько автомобилей в один график', 'оперативная связь с координатором'],
      faq: [
        {q: 'Можно ли работать по договору?', a: 'Да, для корпоративных клиентов возможны договор, безналичная оплата и закрывающие документы.'},
        {q: 'Можно ли организовать несколько автомобилей одновременно?', a: 'Да, мы можем подготовить несколько автомобилей, минивэнов или автобусов под единый график мероприятия.'},
      ],
    },
    en: {
      intent: 'This page targets corporate transportation, delegation transport, employee shuttle, conference transport, forum logistics and partner transportation.',
      useCases: ['forum or conference transport', 'partner and investor pickup', 'employee shuttle', 'delegation route', 'dedicated transport manager for an event'],
      included: ['cashless payment', 'closing documents', 'route planning', 'multiple vehicles in one schedule', 'direct coordinator communication'],
      faq: [
        {q: 'Can we work under a company agreement?', a: 'Yes, corporate clients can use an agreement, cashless payment and closing documents.'},
        {q: 'Can you organize several vehicles at once?', a: 'Yes, we can prepare several cars, minivans or buses under one event schedule.'},
      ],
    },
    zh: {
      intent: '本页面覆盖企业交通、代表团用车、员工通勤、会议交通、论坛交通和合作伙伴接待需求。',
      useCases: ['论坛或会议交通', '合作伙伴和投资人接待', '员工通勤', '代表团路线', '活动专属交通经理'],
      included: ['企业无现金支付', '结算文件', '路线规划', '多车辆统一排期', '协调员直接沟通'],
      faq: [
        {q: '可以按企业合同合作吗？', a: '可以，企业客户可使用合同、无现金支付和结算文件。'},
        {q: '可以同时安排多辆车吗？', a: '可以，我们可为活动统一安排多辆轿车、商务车或巴士。'},
      ],
    },
  },
};

const FLEET = [
  {name: 'Mercedes-Benz S-Class', className: 'Executive', image: 'https://tulparauto.kz/img/ms223.jpg'},
  {name: 'Mercedes-Maybach S', className: 'VIP', image: 'https://tulparauto.kz/img/photo/1571909968_0.jpg'},
  {name: 'Mercedes-Benz V-Class', className: 'Delegation', image: 'https://tulparauto.kz/img/photo/08-v-class-250-d-wallpaper-4K.jpg'},
];

function pathFor(lang: Lang, city?: CitySlug, service?: ServiceSlug) {
  return `/${[lang, city, service ? SERVICE_PATHS[lang][service] : undefined].filter(Boolean).join('/')}/`;
}

function parsePath(): {lang: Lang; city?: CitySlug; service?: ServiceSlug; kind: PageKind} {
  const parts = window.location.pathname.split('/').filter(Boolean);
  const lang = (['ru', 'en', 'zh'].includes(parts[0]) ? parts[0] : 'ru') as Lang;
  const city = (['astana', 'almaty', 'shymkent'].includes(parts[1]) ? parts[1] : undefined) as CitySlug | undefined;
  const service = (Object.keys(SERVICE_PATHS[lang]).find((key) => SERVICE_PATHS[lang][key as ServiceSlug] === parts[2]) ||
    (['transfer', 'rent-car-with-driver', 'corporate-clients'].includes(parts[2]) ? parts[2] : undefined)) as ServiceSlug | undefined;
  return {lang, city, service, kind: service ? 'service' : city ? 'city' : 'home'};
}

function setMeta(selector: string, attr: string, value: string) {
  let tag = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!tag) {
    tag = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
    if (selector.includes('description')) tag.setAttribute('name', 'description');
    if (selector.includes('og:title')) tag.setAttribute('property', 'og:title');
    if (selector.includes('og:description')) tag.setAttribute('property', 'og:description');
    if (selector.startsWith('link')) tag.setAttribute('rel', 'canonical');
    document.head.appendChild(tag);
  }
  tag.setAttribute(attr, value);
}

function buildSeo(lang: Lang, city?: CitySlug, service?: ServiceSlug) {
  const cityName = city ? CITIES[city][lang].name : '';
  const serviceName = service ? SERVICES[service][lang].label : '';

  if (city && service) {
    if (lang === 'en') {
      return {
        title: `${serviceName} in ${cityName} | Tulpar Auto`,
        description: `${serviceName} in ${cityName}: premium chauffeur-driven cars for airport transfers, business routes, events and corporate transportation.`,
        h1: `${serviceName} in ${cityName}`,
      };
    }

    if (lang === 'zh') {
      return {
        title: `${cityName}${serviceName} | Tulpar Auto`,
        description: `${cityName}${serviceName}：高端车辆、专业司机、机场接送、商务路线、活动用车和企业交通服务。`,
        h1: `${cityName}${serviceName}`,
      };
    }

    return {
      title: `${serviceName} в ${cityName} | Tulpar Auto`,
      description: `${serviceName} в ${cityName}: премиальные автомобили с профессиональным водителем, трансфер, деловые маршруты, мероприятия и корпоративное обслуживание.`,
      h1: `${serviceName} в ${cityName}`,
    };
  }

  if (city) {
    if (lang === 'en') {
      return {
        title: `Transfers and chauffeur service in ${cityName} | Tulpar Auto`,
        description: `Chauffeur-driven cars in ${cityName}: airport transfer, car with driver, corporate transportation, VIP routes and delegation support.`,
        h1: `Transfers and chauffeur service in ${cityName}`,
      };
    }

    if (lang === 'zh') {
      return {
        title: `${cityName}接送和带司机租车 | Tulpar Auto`,
        description: `${cityName}带司机用车：机场接送、高端租车、企业交通、贵宾路线和代表团服务。`,
        h1: `${cityName}接送和带司机租车`,
      };
    }

    return {
      title: `Трансфер и аренда авто с водителем в ${cityName} | Tulpar Auto`,
      description: `Автомобили с водителем в ${cityName}: трансфер из аэропорта, аренда авто, корпоративный транспорт, VIP-поездки и обслуживание делегаций.`,
      h1: `Трансфер и аренда авто с водителем в ${cityName}`,
    };
  }

  return {
    title: lang === 'ru'
      ? 'Tulpar Auto — премиум трансфер и аренда авто с водителем в Казахстане'
      : lang === 'en'
        ? 'Tulpar Auto — premium transfers and chauffeur service in Kazakhstan'
        : 'Tulpar Auto — 哈萨克斯坦高端接送和带司机租车',
    description: lang === 'ru'
      ? 'Премиальные автомобили с профессиональными водителями в Астане, Алматы и Шымкенте. Трансфер из аэропорта, аренда авто с водителем и корпоративный транспорт.'
      : lang === 'en'
        ? 'Premium cars with professional chauffeurs in Astana, Almaty and Shymkent. Airport transfer, chauffeur service and corporate transportation.'
        : '在阿斯塔纳、阿拉木图和奇姆肯特提供高端车辆和专业司机。机场接送、带司机租车和企业交通服务。',
    h1: COPY[lang].homeH1,
  };
}

export default function App() {
  const [route, setRoute] = useState(parsePath);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const {lang, city, service} = route;
  const ui = UI[lang];
  const copy = COPY[lang];
  const seo = useMemo(() => buildSeo(lang, city, service), [lang, city, service]);
  const currentCity = city ? CITIES[city][lang] : undefined;
  const currentService = service ? SERVICES[service][lang] : undefined;
  const citySeo = city ? CITY_SEO[city][lang] : undefined;
  const serviceSeo = service ? SERVICE_SEO[service][lang] : undefined;
  const pageFaq = useMemo(() => (serviceSeo ? [...serviceSeo.faq, ...copy.faq] : copy.faq), [copy.faq, serviceSeo]);

  useEffect(() => {
    const onPopState = () => setRoute(parsePath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = seo.title;
    setMeta('meta[name="description"]', 'content', seo.description);
    setMeta('meta[property="og:title"]', 'content', seo.title);
    setMeta('meta[property="og:description"]', 'content', seo.description);
    setMeta('link[rel="canonical"]', 'href', `${DOMAIN}${pathFor(lang, city, service)}`);

    document.head.querySelectorAll('link[data-hreflang="true"]').forEach((node) => node.remove());
    (Object.keys(LANGS) as Lang[]).forEach((code) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = LANGS[code].hreflang;
      link.href = `${DOMAIN}${pathFor(code, city, service)}`;
      link.dataset.hreflang = 'true';
      document.head.appendChild(link);
    });
    const fallback = document.createElement('link');
    fallback.rel = 'alternate';
    fallback.hreflang = 'x-default';
    fallback.href = `${DOMAIN}${pathFor('ru', city, service)}`;
    fallback.dataset.hreflang = 'true';
    document.head.appendChild(fallback);

    const jsonLd = [
      {
        '@context': 'https://schema.org',
        '@type': city ? 'AutoRental' : 'Organization',
        name: 'Tulpar Auto',
        url: `${DOMAIN}${pathFor(lang, city, service)}`,
        telephone: PHONE,
        areaServed: city ? CITIES[city].en.name : ['Astana', 'Almaty', 'Shymkent'],
        serviceType: service ? SERVICES[service].en.label : ['Airport transfer', 'Chauffeur service', 'Corporate transportation'],
        availableLanguage: ['Russian', 'English', 'Chinese'],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {'@type': 'ListItem', position: 1, name: ui.home, item: `${DOMAIN}${pathFor(lang)}`},
          city ? {'@type': 'ListItem', position: 2, name: CITIES[city][lang].name, item: `${DOMAIN}${pathFor(lang, city)}`} : undefined,
          city && service ? {'@type': 'ListItem', position: 3, name: SERVICES[service][lang].label, item: `${DOMAIN}${pathFor(lang, city, service)}`} : undefined,
        ].filter(Boolean),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: pageFaq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {'@type': 'Answer', text: item.a},
        })),
      },
    ];
    let script = document.getElementById('tulpar-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'tulpar-jsonld';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, [lang, city, service, seo, pageFaq, ui.home]);

  const navigate = (href: string) => {
    window.history.pushState(null, '', href);
    setRoute(parsePath());
    setIsMenuOpen(false);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const heroLead = currentService && currentCity
    ? copy.serviceLead(currentService.label, currentCity.name, currentCity.airport)
    : currentCity
      ? copy.cityLead(currentCity.name, currentCity.airport, currentCity.local)
      : copy.homeLead;

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] font-sans text-white overflow-x-clip selection:bg-[var(--color-gold)] selection:text-black">
      <header className="fixed top-0 w-full z-40 glass">
        <div className="w-full mx-auto px-5 md:px-12 h-20 md:h-24 flex items-center justify-between">
          <button onClick={() => navigate(pathFor(lang))} className="flex items-center gap-4 text-left">
            <img src="https://storage.yandexcloud.kz/altyn.1992/logo(2).png" alt="Tulpar Auto" className="h-9 md:h-12 object-contain" />
          </button>

          <nav className="hidden lg:flex items-center gap-8 nav-link text-white/70">
            <button onClick={() => navigate(pathFor(lang))} className="hover:text-[var(--color-gold)]">{ui.home}</button>
            {city && Object.keys(SERVICES).map((slug) => (
              <button key={slug} onClick={() => navigate(pathFor(lang, city, slug as ServiceSlug))} className="hover:text-[var(--color-gold)]">
                {SERVICES[slug as ServiceSlug][lang].nav}
              </button>
            ))}
            {!city && <a href="#services" className="hover:text-[var(--color-gold)]">{ui.services}</a>}
            <a href="#contacts" className="hover:text-[var(--color-gold)]">{ui.contacts}</a>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden md:flex glass-panel rounded-full p-1">
              {(Object.keys(CITIES) as CitySlug[]).map((slug) => (
                <button
                  key={slug}
                  onClick={() => navigate(pathFor(lang, slug, service))}
                  className={`px-4 py-2 rounded-full nav-link transition-colors ${city === slug ? 'bg-[var(--color-gold)] text-black' : 'text-white/65 hover:text-white'}`}
                >
                  {CITIES[slug][lang].name}
                </button>
              ))}
            </div>
            <div className="flex glass-panel rounded-full p-1">
              {(Object.keys(LANGS) as Lang[]).map((code) => (
                <button
                  key={code}
                  onClick={() => navigate(pathFor(code, city, service))}
                  className={`px-3 py-2 rounded-full nav-link transition-colors ${lang === code ? 'bg-white text-black' : 'text-white/65 hover:text-white'}`}
                  aria-label={LANGS[code].label}
                >
                  {LANGS[code].short}
                </button>
              ))}
            </div>
            <button onClick={() => setIsMenuOpen(true)} className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10" aria-label={ui.menu}>
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="fixed inset-0 z-50 bg-[#0F1115]/95 backdrop-blur-xl px-6 md:px-12 pt-24">
            <div className="absolute top-0 left-0 w-full h-20 md:h-24 glass flex items-center justify-between px-5 md:px-12">
              <img src="https://storage.yandexcloud.kz/altyn.1992/logo(2).png" alt="Tulpar Auto" className="h-9 md:h-12 object-contain" />
              <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 rounded-full glass-panel flex items-center justify-center" aria-label={ui.close}>
                <X size={18} />
              </button>
            </div>
            <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-12 h-full pb-12 items-center">
              <nav className="flex flex-col gap-5">
                {[{label: ui.home, href: pathFor(lang)}, ...Object.keys(SERVICES).map((slug) => ({
                  label: SERVICES[slug as ServiceSlug][lang].label,
                  href: pathFor(lang, city || 'astana', slug as ServiceSlug),
                }))].map((item, index) => (
                  <motion.button
                    key={item.href}
                    initial={{opacity: 0, x: -20}}
                    animate={{opacity: 1, x: 0}}
                    transition={{delay: index * 0.06}}
                    onClick={() => navigate(item.href)}
                    className="font-serif text-left text-4xl md:text-7xl text-white/85 hover:text-[var(--color-gold)] transition-colors"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
              <div className="grid gap-4">
                {(Object.keys(CITIES) as CitySlug[]).map((slug) => (
                  <button key={slug} onClick={() => navigate(pathFor(lang, slug, service))} className="glass-panel p-6 text-left group">
                    <span className="nav-link gold-text">{ui.routePrefix}</span>
                    <span className="mt-3 flex items-center justify-between text-2xl font-serif">
                      {CITIES[slug][lang].name}
                      <ChevronRight className="group-hover:text-[var(--color-gold)]" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070" alt="" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 hero-gradient" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 py-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-end">
            <div>
              <div className="nav-link gold-text mb-5">{copy.eyebrow}</div>
              <h1 className="text-4xl md:text-7xl lg:text-[5.2rem] serif font-light leading-tight mb-8">{seo.h1}</h1>
              <p className="text-base md:text-lg text-white/65 max-w-2xl font-light leading-relaxed mb-10">{heroLead}</p>
              <div className="flex flex-wrap gap-4">
                <a href={`${WHATSAPP}?text=${encodeURIComponent(seo.h1)}`} target="_blank" rel="noopener noreferrer" className="bg-[var(--color-gold)] text-black px-8 py-4 rounded-sm uppercase tracking-[0.18em] text-[12px] font-bold">
                  {ui.reserve}
                </a>
                <a href="tel:+77753432448" className="glass-panel px-8 py-4 rounded-sm uppercase tracking-[0.18em] text-[12px] font-semibold">
                  {ui.consult}
                </a>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {copy.proof.map((item) => (
                <div key={item} className="glass-panel p-5 min-h-[112px] flex flex-col justify-between">
                  <Check className="text-[var(--color-gold)]" size={20} />
                  <span className="text-sm text-white/75 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cities" className="py-24 px-6 md:px-12 bg-[var(--color-bg-dark)] border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <span className="nav-link gold-text">{ui.cities}</span>
                <h2 className="text-4xl md:text-6xl serif mt-4">{ui.cityHeading}</h2>
              </div>
              <p className="text-white/50 max-w-xl leading-relaxed">{seo.description}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
              {(Object.keys(CITIES) as CitySlug[]).map((slug) => (
                <button key={slug} onClick={() => navigate(pathFor(lang, slug, service))} className={`text-left p-8 md:p-10 bg-[var(--color-bg-dark)] hover:bg-white/[0.04] transition-colors ${city === slug ? 'outline outline-1 outline-[var(--color-gold)]' : ''}`}>
                  <MapPin className="text-[var(--color-gold)] mb-8" strokeWidth={1.4} />
                  <h3 className="text-3xl serif mb-4">{CITIES[slug][lang].name}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{CITIES[slug][lang].airport} · {CITIES[slug][lang].local}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="py-24 px-6 md:px-12 bg-[var(--color-bg-card)] border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <span className="nav-link gold-text">{ui.services}</span>
            <h2 className="text-4xl md:text-6xl serif mt-4 mb-12">{ui.servicesHeading}</h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {(Object.keys(SERVICES) as ServiceSlug[]).map((slug) => {
                const item = SERVICES[slug][lang];
                const Icon = item.icon;
                return (
                  <article key={slug} className="glass-panel p-8 flex flex-col min-h-[430px]">
                    <Icon className="text-[var(--color-gold)] mb-8" size={32} strokeWidth={1.3} />
                    <h3 className="text-3xl serif mb-4">{item.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed mb-7">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {item.keywords.map((keyword) => (
                        <span key={keyword} className="px-3 py-1 border border-white/10 text-[11px] text-white/55">{keyword}</span>
                      ))}
                    </div>
                    <button onClick={() => navigate(pathFor(lang, city || 'astana', slug))} className="mt-auto text-left nav-link gold-text flex items-center gap-2">
                      {item.label} <ChevronRight size={14} />
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 bg-[var(--color-bg-dark)] border-t border-white/5">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
            <div>
              <span className="nav-link gold-text">SEO Focus</span>
              <h2 className="text-4xl md:text-6xl serif mt-4 mb-8">
                {currentService && currentCity ? `${currentService.label}: ${currentCity.name}` : currentCity ? currentCity.name : 'Kazakhstan'}
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                {serviceSeo?.intent || citySeo?.demand || copy.homeLead}
              </p>
              {citySeo && (
                <div>
                  <h3 className="text-2xl serif mb-4">{ui.routePrefix}</h3>
                  <div className="flex flex-wrap gap-2">
                    {citySeo.routes.map((routeName) => (
                      <span key={routeName} className="px-3 py-2 border border-white/10 text-sm text-white/60">{routeName}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <article className="glass-panel p-8">
                <h3 className="text-2xl serif mb-6">{lang === 'ru' ? 'Сценарии заказа' : lang === 'en' ? 'Booking Scenarios' : '预约场景'}</h3>
                <ul className="space-y-4 text-sm text-white/60 leading-relaxed">
                  {(serviceSeo?.useCases || ['airport transfer', 'chauffeur service', 'corporate route', 'event transportation', 'delegation support']).map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check size={16} className="mt-1 shrink-0 text-[var(--color-gold)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="glass-panel p-8">
                <h3 className="text-2xl serif mb-6">{lang === 'ru' ? 'Что входит' : lang === 'en' ? 'What Is Included' : '服务包含'}</h3>
                <ul className="space-y-4 text-sm text-white/60 leading-relaxed">
                  {(serviceSeo?.included || copy.proof).map((item) => (
                    <li key={item} className="flex gap-3">
                      <Shield size={16} className="mt-1 shrink-0 text-[var(--color-gold)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
              {citySeo && (
                <article className="glass-panel p-8 md:col-span-2">
                  <h3 className="text-2xl serif mb-6">{lang === 'ru' ? 'Локальные точки спроса' : lang === 'en' ? 'Local Demand Points' : '本地需求地点'}</h3>
                  <div className="flex flex-wrap gap-2">
                    {citySeo.districts.map((item) => (
                      <span key={item} className="px-3 py-2 bg-white/[0.03] border border-white/10 text-sm text-white/60">{item}</span>
                    ))}
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 bg-[var(--color-bg-dark)] border-t border-white/5">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
            <div>
              <span className="nav-link gold-text">{ui.why}</span>
              <h2 className="text-4xl md:text-6xl serif mt-4 mb-8">Tulpar Auto</h2>
              <p className="text-white/55 leading-relaxed">{copy.corporateIntro}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
              {copy.process.map((step, index) => (
                <div key={step.title} className="bg-[var(--color-bg-dark)] p-8">
                  <span className="serif text-5xl italic gold-text">0{index + 1}</span>
                  <h3 className="text-2xl serif mt-8 mb-4">{step.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="fleet" className="py-24 px-6 md:px-12 bg-[var(--color-bg-card)] border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <span className="nav-link gold-text">{ui.fleet}</span>
                <h2 className="text-4xl md:text-6xl serif mt-4">Mercedes-Benz · Maybach · V-Class</h2>
              </div>
              <p className="text-white/50 max-w-xl leading-relaxed">{copy.fleetIntro}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {FLEET.map((car) => (
                <article key={car.name} className="group overflow-hidden bg-[#0F1115] border border-white/10">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <span className="nav-link gold-text">{car.className}</span>
                    <h3 className="text-2xl serif mt-3">{car.name}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="clients" className="py-24 px-6 md:px-12 bg-[var(--color-bg-dark)] border-t border-white/5">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-12">
            <div>
              <Building2 className="text-[var(--color-gold)] mb-8" size={36} strokeWidth={1.3} />
              <h2 className="text-4xl md:text-6xl serif mb-8">{SERVICES['corporate-clients'][lang].title}</h2>
              <p className="text-white/55 leading-relaxed">{SERVICES['corporate-clients'][lang].description}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[Shield, Clock, Award, Globe2].map((Icon, index) => (
                <div key={index} className="glass-panel p-8">
                  <Icon className="text-[var(--color-gold)] mb-8" strokeWidth={1.3} />
                  <div className="flex gap-1 mb-4">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={13} className="fill-[var(--color-gold)] text-[var(--color-gold)]" />)}</div>
                  <p className="text-sm text-white/55 leading-relaxed">{copy.proof[index]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 bg-[var(--color-bg-card)] border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <span className="nav-link gold-text">{ui.faqHeading}</span>
            <h2 className="text-4xl md:text-6xl serif mt-4 mb-10">{ui.faqHeading}</h2>
            <div className="border-y border-white/10">
              {pageFaq.map((item, index) => (
                <div key={item.q} className="border-b border-white/10 last:border-b-0">
                  <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="w-full py-7 flex items-center justify-between gap-6 text-left">
                    <span className="text-xl serif">{item.q}</span>
                    <ChevronRight className={`shrink-0 transition-transform ${openFaq === index ? 'rotate-90 text-[var(--color-gold)]' : ''}`} />
                  </button>
                  {openFaq === index && <p className="pb-7 text-white/55 leading-relaxed">{item.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 bg-[var(--color-bg-dark)] border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <span className="nav-link gold-text">{ui.sitemapHeading}</span>
            <h2 className="text-4xl md:text-6xl serif mt-4 mb-12">{ui.sitemapHeading}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {(Object.keys(CITIES) as CitySlug[]).map((citySlug) => (
                <div key={citySlug} className="glass-panel p-7">
                  <button onClick={() => navigate(pathFor(lang, citySlug))} className="text-2xl serif hover:text-[var(--color-gold)]">{CITIES[citySlug][lang].name}</button>
                  <div className="mt-6 flex flex-col gap-3">
                    {(Object.keys(SERVICES) as ServiceSlug[]).map((serviceSlug) => (
                      <button key={serviceSlug} onClick={() => navigate(pathFor(lang, citySlug, serviceSlug))} className="text-left text-sm text-white/55 hover:text-[var(--color-gold)]">
                        /{lang}/{citySlug}/{serviceSlug}/ · {SERVICES[serviceSlug][lang].label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className="py-24 px-6 md:px-12 bg-[#0F1115] border-t border-white/5">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
            <div>
              <span className="nav-link gold-text">{ui.contacts}</span>
              <h2 className="text-4xl md:text-6xl serif mt-4 mb-8">Tulpar Auto</h2>
              <p className="text-white/55 leading-relaxed">{ui.footerNote}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="tel:+77753432448" className="glass-panel p-7 hover:bg-white/5">
                <Phone className="text-[var(--color-gold)] mb-6" />
                <span className="block nav-link text-white/40 mb-2">Phone</span>
                <span>{PHONE}</span>
              </a>
              <a href="mailto:info@tulparauto.kz" className="glass-panel p-7 hover:bg-white/5">
                <Mail className="text-[var(--color-gold)] mb-6" />
                <span className="block nav-link text-white/40 mb-2">Email</span>
                <span>info@tulparauto.kz</span>
              </a>
              <a href={`${WHATSAPP}?text=${encodeURIComponent(seo.h1)}`} target="_blank" rel="noopener noreferrer" className="glass-panel p-7 hover:bg-white/5">
                <MessageCircle className="text-[var(--color-gold)] mb-6" />
                <span className="block nav-link text-white/40 mb-2">WhatsApp</span>
                <span>{ui.reserve}</span>
              </a>
              <div className="glass-panel p-7">
                <Languages className="text-[var(--color-gold)] mb-6" />
                <span className="block nav-link text-white/40 mb-2">{ui.services}</span>
                <span>RU · EN · 中文</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-6 md:px-12 py-10 border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center justify-between text-sm text-white/45">
          <span>Tulpar Auto · {ui.footerNote}</span>
          <div className="flex gap-4">
            {(Object.keys(LANGS) as Lang[]).map((code) => (
              <button key={code} onClick={() => navigate(pathFor(code, city, service))} className="hover:text-[var(--color-gold)]">{LANGS[code].short}</button>
            ))}
          </div>
        </div>
      </footer>

      <a href={`${WHATSAPP}?text=${encodeURIComponent(seo.h1)}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-[45] w-14 h-14 bg-[var(--color-gold)] text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:bg-white hover:scale-105 transition-all">
        <MessageCircle size={26} strokeWidth={1.5} />
      </a>
    </div>
  );
}
