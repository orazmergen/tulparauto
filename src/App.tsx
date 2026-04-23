import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Check, Shield, Clock, Award, Star, MessageCircle, Menu, X, Phone, Mail, Instagram, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const CAR_FLEET = [
  {
    class: 'Executive',
    name: 'Mercedes-Benz S-Class',
    img: 'https://tulparauto.kz/img/ms223.jpg',
    gallery: [
      'https://tulparauto.kz/img/ms223.jpg',
      '	https://tulparauto.kz/img/maybachnew/3.jpg',
      '	https://tulparauto.kz/img/maybachnew/4.jpg'
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
  }
];

export default function App() {
  const [city, setCity] = useState('Astana');
  const [lang, setLang] = useState('EN');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<typeof CAR_FLEET[0] | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);

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
                      onClick={() => { setCity(c); setIsCityDropdownOpen(false); }}
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
                      onClick={() => { setLang(l.code); setIsLangDropdownOpen(false); }}
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
                 {['About Us', 'Transfer', 'Our Services', 'Contacts'].map((item, i) => (
                   <motion.div
                     key={item}
                     initial={{ opacity: 0, x: -30 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                     className="overflow-hidden"
                   >
                     <a 
                       href={`#${item.toLowerCase().replace(' ', '-')}`} 
                       onClick={() => setIsMenuOpen(false)}
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
              <div>Astana • Premium Transport</div>
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
              Excellence in Motion
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-[5rem] serif font-light leading-[1.1] mb-8"
            >
              Your Private Chauffeur <br/>
              <i className="font-normal italic">in {city}</i>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-lg opacity-60 max-w-lg font-light leading-relaxed mb-12"
            >
              Seamless luxury transportation for executive arrivals, diplomatic missions, and refined urban travel. Perfection in every detail of your journey.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-wrap gap-6"
            >
              <a 
                href="https://wa.me?phone=77753432448&text=Hello%2C%20I%20would%20like%20to%20discuss%20the%20security%20protocol"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel px-10 py-5 rounded-sm hover:bg-white/5 transition-colors uppercase tracking-[0.2em] text-[12px] font-semibold border-white/20 inline-block text-center"
              >
                Discuss Protocol
              </a>
              <a 
                href="https://wa.me?phone=77753432448&text=Hello%2C%20I%20would%20like%20to%20reserve%20a%20VIP%20crew"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-gold)] text-black px-10 py-5 rounded-sm uppercase tracking-[0.2em] text-[12px] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:bg-white transition-all inline-block text-center"
              >
                Reserve Crew
              </a>
            </motion.div>
          </div>
          
        </div>
      </section>

      {/* Editorial Protocol Section */}
      <section className="pt-8 pb-32 px-12 relative z-10 bg-[var(--color-bg-dark)] border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16 relative">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="nav-link gold-text mb-4 mt-8"
            >
              The Standard
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl serif font-light tracking-tight"
            >
              Service Protocol
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 p-[1px] shadow-2xl">
            {[
              { num: "01", icon: Shield, title: "Classified Privacy", desc: "Absolute discretion guaranteed by legally binding non-disclosure agreements. Your conversations remain hermetically sealed.", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2574" },
              { num: "02", icon: Award, title: "Tactical Security", desc: "Armed escort and advanced convoy routing. Chauffeurs trained in evasive driving and threat assessment.", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671" },
              { num: "03", icon: Clock, title: "Chrono-Precision", desc: "Vehicles arrive and prepare 15 minutes prior to the agreed schedule. We do not wait for time, time waits for us.", img: "https://tulparauto.kz/img/photo/6347cbe29d733688814873.jpg" },
              { num: "04", icon: Check, title: "Impeccable Form", desc: "Bespoke-suited personnel, English-speaking, and attentive to unspoken cues. An extension of your own high standards.", img: "https://tulparauto.kz/img/photo/a38f4771-159b-4913-a9be-a111606492a1.jpg" }
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
      <section className="pb-32 pt-12 bg-[var(--color-bg-dark)] relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <div className="text-[10px] uppercase tracking-widest gold-text mb-6">Active Fleet</div>
            <h2 className="text-5xl md:text-6xl mb-6 serif tracking-tight">The Elite Collection</h2>
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
                      href={`https://wa.me?phone=77753432448&text=Hello%2C%20I%20would%20like%20to%20reserve%20the%20${car.name.replace(/\s+/g, '%20')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-[var(--color-gold)] text-black px-12 py-5 rounded-sm uppercase tracking-[0.2em] text-[12px] font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-white hover:text-black transition-all whitespace-nowrap active:scale-95 text-center w-full md:w-auto overflow-hidden block"
                    >
                      Reserve Vehicle
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
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[var(--color-gold)] whitespace-nowrap">Trusted By Global Leaders</span>
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
            <h2 className="text-4xl md:text-5xl mb-6 serif tracking-tight">Client Perspectives</h2>
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
      <section className="py-24 px-12 bg-[var(--color-bg-card)] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--color-gold) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 serif">Diplomatic & VIP Protocol</h2>
            <p className="max-w-2xl text-white/50 text-sm tracking-wide leading-relaxed">
              Discreet and high-security transportation for government officials, C-level executives, and royal families.
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
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-8">Contact Us</h2>
            <p className="text-white/50 text-lg font-light leading-relaxed mb-10 max-w-md">
              Available 24/7 for urgent reservations, bespoke transport arrangements, and exclusive VIP services.
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
            <span className="text-xs font-medium">Strict NDA Protocol</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-widest opacity-40">Arrival</span>
            <span className="text-xs font-medium">15 Min Early Advantage</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-widest opacity-40">Security</span>
            <span className="text-xs font-medium">Certified Close Protection</span>
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
                  <div className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Key Features</div>
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
                  href={`https://wa.me?phone=77753432448&text=Hello%2C%20I%20would%20like%20to%20reserve%20the%20${selectedCar.name.replace(/\s+/g, '%20')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--color-gold)] text-black px-12 py-5 rounded-sm uppercase tracking-[0.2em] text-[12px] font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-white transition-all text-center block mt-auto"
                >
                  Reserve Vehicle
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me?phone=77753432448&text=Hello%2C%20I%20am%20writing%20to%20you%20from%20the%20tulparauto.kz%20website.%20Please%20consult%20me%20on%20the%20service%3A%20VIP%20Meeting%2C%20seeing%20off%2C%20transfer&type=phone_number&app_absent=0"
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
