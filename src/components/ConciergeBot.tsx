import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, ThinkingLevel, Chat } from '@google/genai';
import { MessageSquare, X, Send } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export function ConciergeBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([
    { role: 'model', text: 'Welcome to Tulpar. How may I assist you with your premium transportation needs today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggle-concierge', handleToggle);
    return () => window.removeEventListener('toggle-concierge', handleToggle);
  }, []);

  useEffect(() => {
    if (!chatRef.current) {
      chatRef.current = ai.chats.create({
        model: "gemini-3.1-pro-preview",
        config: {
          systemInstruction: "You are an elite digital concierge for Tulpar, a premium chauffeur service in Astana, Kazakhstan (with plans for Almaty and Shymkent). You assist high-net-worth individuals, diplomats, and corporate clients with booking luxury vehicles (e.g. Mercedes S-Class, Maybach, V-Class). Maintain an elegant, polite, and extraordinarily professional tone. Do not provide concrete pricing, but rather offer to 'calculate the route' or 'transfer the inquiry to a personal manager'. Suggest amenities like Evian water, Wi-Fi, and massage seats. Keep your answers concise, luxurious, and responsive to the user's intent.",
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
        }
      });
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || !chatRef.current) return;
    
    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userText });
      const responseText = response.text || "I apologize, could you clarify your request?";
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Apologies, I am experiencing a temporary connection issue. Please contact us via phone.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-24 right-6 w-full max-w-sm z-50 glass-panel rounded-lg shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: 'calc(100vh - 120px)', height: '600px' }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-[var(--color-bg-dark)]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--color-gold)] animate-pulse" />
                <h3 className="serif text-lg tracking-wider text-[var(--color-gold)]">Personal Assistant</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[var(--color-bg-dark)]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] rounded-md px-5 py-3.5 text-[13px] leading-relaxed font-light ${
                      msg.role === 'user' 
                        ? 'bg-[var(--color-gold)] text-black rounded-tr-none font-medium' 
                        : 'glass-panel text-[var(--color-ivory)] rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-md rounded-tl-none px-5 py-4 glass-panel">
                    <div className="flex gap-1.5 items-center h-4">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t border-white/5 bg-[var(--color-bg-dark)]">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Discuss your itinerary..."
                  className="w-full bg-white/[0.02] border border-white/10 rounded-sm pl-5 pr-12 py-3.5 text-sm focus:outline-none focus:border-[var(--color-gold)]/50 focus:bg-white/5 transition-all text-white placeholder:text-white/30 font-light"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 rounded-full text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <Send size={18} className="translate-x-[1px] -translate-y-[1px]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-[var(--color-gold)] shadow-[0_0_20px_rgba(212,175,55,0.2)] flex md:hidden items-center justify-center text-black"
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </motion.button>
    </>
  );
}
