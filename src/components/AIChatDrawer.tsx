import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  User, 
  CornerDownLeft, 
  Compass, 
  Languages, 
  Utensils, 
  DollarSign 
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanTripFromChat?: (query: string) => void;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({
  isOpen,
  onClose,
  onPlanTripFromChat
}) => {
  const { t, isKannada } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: isKannada
        ? 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಕರ್ನಾಟಕ AI ಪ್ರವಾಸ ಸಹಾಯಕ. ಸ್ಥಳಗಳು, ಬಜೆಟ್, ರುಚಿಕರ ಊಟ ಅಥವಾ ಕನ್ನಡ ಪದಗಳ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ.'
        : 'Namaskara! I am your Karnataka Travel AI assistant. Ask me anything about places, budgets, local food, routes, or Kannada phrases!',
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    { label: '₹2,000 in Bengaluru today?', query: "I'm in Bengaluru and have ₹2,000. What can I do today?" },
    { label: 'Best breakfast in Mysuru?', query: 'Where to find the best Mysore Pak and Mylari Dosa in Mysuru?' },
    { label: 'Coorg vs Chikmagalur?', query: 'What is the difference between Coorg and Chikmagalur for a 3-day trip?' },
    { label: 'How to ask price in Kannada?', query: 'How do I ask "How much does this cost?" in Kannada?' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // AI Response generation (Knowledgeable local assistant)
    setTimeout(() => {
      const responseText = generateAssistantReply(query);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  function generateAssistantReply(userQuery: string): string {
    const q = userQuery.toLowerCase();

    if (q.includes('2000') || (q.includes('bengaluru') && q.includes('today'))) {
      return `Here are 4 amazing budget ways to spend a memorable day in Bengaluru with ₹2,000:
1. 🌿 **Lalbagh Botanical Garden & Vidyarthi Bhavan**: Morning walk under historic trees (entry ₹30), followed by Benne Masale Dosa in Gandhi Bazaar (~₹140).
2. 🏛️ **Cubbon Park & Bangalore Palace**: Visit Vidhana Soudha for photos (free), stroll Cubbon Park, then visit Tudor-style Bangalore Palace (entry ₹250).
3. ☕ **South Bangalore Filter Coffee & Temples**: Stroll through Bull Temple and sample hot Gulab Jamuns at Brahmin's Coffee Bar (~₹100).
4. 🚌 **Namma Metro Transit**: Get a day pass for ₹60 to zip across the city seamlessly!`;
    }

    if (q.includes('mysore pak') || q.includes('mylari') || q.includes('mysuru food')) {
      return `For the most authentic culinary gems in Mysuru:
1. **Guru Sweet Mart (Sayyaji Rao Road)**: The original birthplace of Mysore Pak, crafted by Kakasura Madappa (the royal royal chef) with pure dripping ghee!
2. **Original Hotel Vinayaka Mylari (Nazarbad)**: Legend has it their secret butter masala dosa recipe has stayed within the family for generations.
3. **Malgudi Cafe & Dasaprakash**: Delicious traditional filter coffee and multi-grain rava idli.`;
    }

    if (q.includes('coorg vs chikmagalur') || (q.includes('coorg') && q.includes('chikmagalur'))) {
      return `**Coorg vs Chikmagalur Comparison**:
• **Coorg (Kodagu)**: Best for dense spice plantations, unique Kodava cuisine (Akki Roti, Kadambuttu), Tibetan culture at Bylakuppe Golden Temple, and Abbey Falls. Slightly more commercial and homestay-focused.
• **Chikmagalur**: Best for high-altitude mountain trekking (Mullayanagiri is Karnataka's highest peak), misty cloud vistas, Baba Budangiri, and cascading forest streams like Hebbe and Jhari Falls.
👉 *If you want cloud walks & trekking, choose Chikmagalur. If you want culture, coffee heritage & waterfalls, choose Coorg!*`;
    }

    if (q.includes('how much') || q.includes('kannada') || q.includes('phrase') || q.includes('language')) {
      return `To ask "How much does this cost?" in Kannada, say:
👉 **"ಇದು ಎಷ್ಟು?" (Pronounced: "Idu eshtu?")**

Other handy phrases:
• "ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ" (*"Svalpa kadime maadi"*) — Can you reduce the price a little?
• "ಧನ್ಯವಾದ" (*"Dhanyavaada"*) — Thank you!
• "ಊಟ ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ" (*"Oota tumba chennagide"*) — Food is very tasty!`;
    }

    if (q.includes('jog falls') || q.includes('shivamogga')) {
      return `The best time to visit **Jog Falls** is between **July and October (Monsoon & Post-Monsoon)**. The Sharavathi river swells to full power and plunges 830 feet in 4 distinct waterfalls: Raja, Roarer, Rocket, and Rani! Tip: Take the KSRTC bus from Sagara town (30 km away).`;
    }

    if (q.includes('cheap') || q.includes('budget') || q.includes('save money')) {
      return `Top budget travel hacks for Karnataka:
1. **Ride KSRTC Sarige / Rajahamsa Buses**: The gold standard of public transport in India. Clean, punctual, and costs 70% less than private cabs.
2. **Eat at Darshinis & Messes**: Piping hot idli-vada, bisi bele bath, and thali meals cost between ₹50 and ₹120.
3. **Stay in Homestays or Zostel**: In Hampi, Gokarna, and Coorg, dorms cost ₹500–₹800/night.
4. **Utilize Free Nature Viewpoints**: Mullayanagiri, Matanga Hill sunrise, Om Beach, and Cubbon Park are all 100% free!`;
    }

    return `That's a great travel question! Karnataka has incredible diversity ranging from coastal Gokarna to heritage ruins of Hampi and the coffee hills of Kodagu. 

You can also use our **AI Planner** above to instantly build a complete day-by-day itinerary with exact budget optimization and route mapping! Would you like me to recommend specific destinations?`;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-slide-left">
      {/* Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-600 to-amber-700 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-white/10 text-white backdrop-blur-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold flex items-center space-x-1.5">
              <span>{t.assistantTitle}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </h3>
            <p className="text-[11px] text-amber-100">{t.assistantSubtitle}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-white/10 text-amber-100 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF6F0]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                msg.sender === 'user' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-amber-400'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-amber-600 text-white rounded-tr-none shadow-sm'
                  : 'bg-white text-slate-800 rounded-tl-none border border-amber-200/70 shadow-sm'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>
              <span className={`text-[10px] block mt-1 ${msg.sender === 'user' ? 'text-amber-200' : 'text-slate-400'}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs italic p-2">
            <Bot className="w-4 h-4 animate-spin" />
            <span>AI is finding local Karnataka insights...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Question Chips */}
      <div className="p-3 bg-white border-t border-amber-100 overflow-x-auto flex space-x-2 scrollbar-none">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q.query)}
            className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-slate-700 hover:text-amber-900 border border-amber-200/70 transition shrink-0"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.assistantPlaceholder}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white shadow-sm transition active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
