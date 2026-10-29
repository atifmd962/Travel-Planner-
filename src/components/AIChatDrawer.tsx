import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  User, 
  Settings, 
  Key, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  RefreshCw,
  Compass,
  ArrowRight
} from 'lucide-react';
import { 
  askGeminiTravelAssistant, 
  getGeminiApiKey, 
  saveGeminiApiKey, 
  clearGeminiApiKey, 
  isGeminiActive, 
  testGeminiApiKey,
  getActiveGeminiModel,
  ChatMessage
} from '../services/geminiService';

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
  
  // Gemini Configuration State
  const [hasGeminiKey, setHasGeminiKey] = useState<boolean>(isGeminiActive());
  const [activeModel, setActiveModel] = useState<string>(getActiveGeminiModel());
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [apiKeyInput, setApiKeyInput] = useState<string>(getGeminiApiKey());
  const [keyValidationStatus, setKeyValidationStatus] = useState<'idle' | 'testing' | 'valid' | 'invalid'>('idle');
  const [keyValidationMsg, setKeyValidationMsg] = useState<string>('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: isKannada
        ? 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಕರ್ನಾಟಕ AI ಪ್ರವಾಸ ಸಹಾಯಕ (Google Gemini AI ಚಾಲಿತ). ಕರ್ನಾಟಕದ ಪ್ರವಾಸಿ ತಾಣಗಳು, ಬಜೆಟ್, ರುಚಿಕರ ಊಟ, ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಬಸ್ಸುಗಳು ಅಥವಾ ಕನ್ನಡ ಪದಗಳ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ!'
        : 'Namaskara! I am your Karnataka Travel AI companion (powered by Google Gemini). Ask me anything about places, budgets, local food, KSRTC routes, waterfalls, or Kannada phrases!',
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync state whenever drawer opens
  useEffect(() => {
    if (isOpen) {
      const active = isGeminiActive();
      setHasGeminiKey(active);
      setActiveModel(getActiveGeminiModel());
      setApiKeyInput(getGeminiApiKey());
      scrollToBottom();
    }
  }, [isOpen]);

  const quickQuestions = [
    { label: '✨ 3-Day Hampi Guide', query: 'Give me a 3-day itinerary for Hampi covering major stone ruins, sunrise at Matanga hill, and local food.' },
    { label: '🌿 Coorg vs Chikmagalur?', query: 'What is the difference between Coorg and Chikmagalur for a nature trip in November?' },
    { label: '💰 ₹3,000 Budget Trip?', query: 'I have ₹3,000. Give me a budget 2-day trip idea from Bengaluru using KSRTC bus.' },
    { label: '🍛 Mysuru Food Trail', query: 'Where to find the best authentic Mysore Pak, Mylari Dosa, and filter coffee in Mysuru?' },
    { label: '🗣️ Essential Kannada Phrases', query: 'What are the top 5 essential Kannada travel phrases for negotiating autos and ordering food?' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Test and Save API Key
  const handleTestAndSaveKey = async () => {
    if (!apiKeyInput.trim()) {
      clearGeminiApiKey();
      setHasGeminiKey(false);
      setKeyValidationStatus('idle');
      setKeyValidationMsg('API Key removed. Using offline knowledge engine.');
      return;
    }

    setKeyValidationStatus('testing');
    setKeyValidationMsg('Detecting and connecting to Google Gemini model...');

    const result = await testGeminiApiKey(apiKeyInput.trim());

    if (result.success) {
      saveGeminiApiKey(apiKeyInput.trim());
      setHasGeminiKey(true);
      const connectedName = result.modelName || 'Google Gemini';
      setActiveModel(connectedName);
      setKeyValidationStatus('valid');
      setKeyValidationMsg(`✓ ${connectedName} Connected Successfully!`);
      setTimeout(() => setShowSettings(false), 1400);
    } else {
      setKeyValidationStatus('invalid');
      setKeyValidationMsg(`Connection failed: ${result.message}`);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `m-${Date.now()}`,
        sender: 'ai',
        text: isKannada
          ? 'ಸಂಭಾಷಣೆ ಮರುಹೊಂದಿಸಲಾಗಿದೆ! ಕರ್ನಾಟಕದ ಪ್ರವಾಸದ ಬಗ್ಗೆ ಹೊಸ ಪ್ರಶ್ನೆ ಕೇಳಿ.'
          : 'Conversation cleared! Ask me anything about Karnataka travel or itinerary ideas.',
        timestamp: 'Just now'
      }
    ]);
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      let responseText = '';

      // 1. Try Gemini API if key is present
      if (hasGeminiKey) {
        try {
          responseText = await askGeminiTravelAssistant(messages, query.trim(), isKannada);
        } catch (geminiErr: any) {
          console.warn('Gemini request failed, falling back to local engine:', geminiErr);
          const fallback = generateAssistantReply(query.trim());
          responseText = `${fallback}\n\n*(Notice: Gemini live connection encountered: ${geminiErr.message || 'Network error'}. Using offline knowledge base.)*`;
        }
      } else {
        // 2. Offline Knowledge Base (Instant fallback)
        await new Promise(r => setTimeout(r, 600)); // natural typing delay
        responseText = generateAssistantReply(query.trim());
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      const errMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `I had trouble connecting right now. Here's a tip: You can always use the AI Planner form on the main page to create an instant itinerary!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Local Offline Assistant Knowledge Base
  function generateAssistantReply(userQuery: string): string {
    const q = userQuery.toLowerCase();

    if (q.includes('2000') || (q.includes('bengaluru') && (q.includes('today') || q.includes('day')))) {
      return `Here are 4 great budget ideas to spend a memorable day in Bengaluru with ₹2,000:
1. 🌿 **Lalbagh Botanical Garden & Vidyarthi Bhavan**: Morning walk under century-old trees (entry ₹30), followed by signature Benne Masale Dosa in Gandhi Bazaar (~₹140).
2. 🏛️ **Cubbon Park & Vidhana Soudha**: Stroll tree-lined avenues of Cubbon Park (free), take iconic photos outside Vidhana Soudha, then visit Tudor-style Bangalore Palace (~₹250).
3. ☕ **South Bangalore Coffee & Cultural Heritage**: Visit the Bull Temple in Basavanagudi and sample hot Gulab Jamuns & filter coffee at Brahmin's Coffee Bar (~₹100).
4. 🚌 **Namma Metro Full-Day Pass**: Get an unlimited metro day pass for just ₹60 to zip across the city seamlessly!`;
    }

    if (q.includes('mysore pak') || q.includes('mylari') || q.includes('mysuru food') || q.includes('mysore food')) {
      return `For authentic culinary gems in Mysuru:
1. 🧈 **Guru Sweet Mart (Sayyaji Rao Road)**: The original birthplace of Mysore Pak, crafted by Kakasura Madappa (the royal royal chef) with pure dripping ghee!
2. 🥞 **Original Hotel Vinayaka Mylari (Nazarbad)**: Legend has it their melt-in-mouth butter masala dosa recipe has stayed within the family for generations.
3. ☕ **Malgudi Cafe & Dasaprakash**: Classic South Indian filter coffee and multi-grain rava idli.`;
    }

    if (q.includes('coorg vs chikmagalur') || (q.includes('coorg') && q.includes('chikmagalur'))) {
      return `**Coorg vs Chikmagalur Comparison**:
• **Coorg (Kodagu)**: Best for dense spice & coffee plantations, Kodava cuisine (Akki Rotti, Kadambuttu), Tibetan culture at Bylakuppe Golden Temple, and Abbey Falls. Slightly more homestay and resort focused.
• **Chikmagalur**: Best for high-altitude mountain trekking (Mullayanagiri is Karnataka's highest peak at 1,930m), misty cloud walks, Baba Budangiri, and cascading forest streams like Hebbe and Jhari Falls.
👉 *If you want cloud walks & mountain trekking, choose Chikmagalur. If you want coffee culture & waterfalls, choose Coorg!*`;
    }

    if (q.includes('hampi')) {
      return `**Hampi Travel Essentials (UNESCO World Heritage Site)**:
• **Must-See Monuments**: Virupaksha Temple, Vijaya Vittala Stone Chariot with musical pillars, Lotus Mahal, and Elephant Stables.
• **Best Sunrises/Sunsets**: Matanga Hill (panoramic 360° sunrise) and Hemakuta Hill (sunset with boulders).
• **Sanapur Lake & Bouldering**: Across the Tungabhadra river in Anegundi (Hippie Island).
• **Stay Tip**: Certified backpacker hostels like Zostel Hampi or luxury heritage at Evolve Back Kamalapura Palace.
• **Getting There**: Overnight KSRTC Airavat bus from Bengaluru or train to Hosapete Junction (12 km away).`;
    }

    if (q.includes('how much') || q.includes('kannada') || q.includes('phrase') || q.includes('language')) {
      return `Essential Kannada travel phrases:
👉 **"ಇದು ಎಷ್ಟು?" (*"Idu eshtu?"*)** — How much does this cost?
• **"ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ" (*"Svalpa kadime maadi"*)** — Can you reduce the price a little?
• **"ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ" (*"Dayavittu sahaaya maadi"*)** — Please help me.
• **"ಧನ್ಯವಾದ" (*"Dhanyavaada"*)** — Thank you!
• **"ಊಟ ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ" (*"Oota tumba chennagide"*)** — The food is delicious!
• **"ಇಲ್ಲಿಗೆ ಹೇಗೆ ಹೋಗುವುದು?" (*"Illige hege hoguvudu?"*)** — How do I get here?`;
    }

    if (q.includes('jog falls') || q.includes('shivamogga')) {
      return `The best time to visit **Jog Falls** is between **July and October (Monsoon & Post-Monsoon)**. The Sharavathi river swells to full power and plunges 830 feet in 4 distinct waterfalls: Raja, Roarer, Rocket, and Rani! Tip: Take the KSRTC bus from Sagara town (30 km away).`;
    }

    if (q.includes('cheap') || q.includes('budget') || q.includes('save money')) {
      return `Top budget travel hacks for Karnataka:
1. 🚌 **Ride KSRTC Sarige / Rajahamsa Buses**: Safe, punctual, and costs 70% less than private cabs.
2. 🍛 **Eat at Darshinis & Regional Messes**: Piping hot idli-vada, bisi bele bath, and unlimited thalis cost between ₹50 and ₹120.
3. 🛏️ **Stay in Certified Hostels or Homestays**: In Hampi, Gokarna, and Coorg, Zostel dorms cost ₹500–₹800/night.
4. 🌄 **Utilize Free Nature Viewpoints**: Mullayanagiri, Matanga Hill sunrise, Om Beach, and Cubbon Park are all 100% free!`;
    }

    return `Karnataka offers immense diversity ranging from coastal Gokarna to heritage ruins of Hampi and the coffee hills of Kodagu.

You can ask me about:
• 📍 Specific destinations (Coorg, Hampi, Gokarna, Udupi, Mysuru)
• 💰 Budget planning and cheap travel hacks
• 🚌 KSRTC buses and train connectivity
• 🍛 Regional cuisine and must-visit food spots
• 🗣️ Kannada phrases and translations

💡 *Tip: Click the gear icon (⚙️) above to connect Google Gemini for unlimited real-time AI knowledge!*`;
  }

  // Detect if message is recommending an itinerary and could be planned
  const isTripQuery = (text: string) => {
    const t = text.toLowerCase();
    return t.includes('day') || t.includes('trip') || t.includes('itinerary') || t.includes('budget');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-white shadow-2xl flex flex-col border-l border-amber-200/80 animate-slide-left font-sans">
      
      {/* 1. Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-600 via-amber-600 to-amber-700 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-white/15 text-white backdrop-blur-md shadow-sm">
            <Bot className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <h3 className="text-base font-black flex items-center space-x-2">
              <span>{t.assistantTitle}</span>
              <span className={`w-2 h-2 rounded-full ${hasGeminiKey ? 'bg-emerald-400 animate-pulse' : 'bg-amber-300'}`}></span>
            </h3>
            <div className="flex items-center space-x-1.5 text-[11px] text-amber-100/90 font-medium">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{hasGeminiKey ? `${activeModel} Active` : 'Smart Offline Knowledge Mode'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {/* Settings / API Key Button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-xl transition ${
              showSettings || !hasGeminiKey 
                ? 'bg-white/20 text-white' 
                : 'hover:bg-white/10 text-amber-100 hover:text-white'
            }`}
            title="Gemini AI Settings & API Key"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Clear Chat Button */}
          <button
            onClick={handleClearChat}
            className="p-2 rounded-xl hover:bg-white/10 text-amber-100 hover:text-white transition"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-amber-100 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. Gemini API Key Configuration Panel (Collapsible) */}
      {showSettings && (
        <div className="p-4 bg-amber-50/90 border-b border-amber-200/80 animate-fade-in text-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-slate-900 flex items-center space-x-1.5">
              <Key className="w-3.5 h-3.5 text-amber-600" />
              <span>Google Gemini AI Configuration</span>
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              hasGeminiKey ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
            }`}>
              {hasGeminiKey ? '● Connected' : '○ Offline Mode'}
            </span>
          </div>

          <p className="text-[11px] text-slate-600 leading-relaxed">
            Enter your free Google Gemini API key to ask any custom question. The assistant automatically connects to Google's latest supported model (Gemini 3.8 Flash, 2.5 Flash, etc.).
          </p>

          <div className="space-y-1.5">
            <div className="relative">
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Paste AI Studio API Key (AIzaSy...)"
                className="w-full px-3 py-2 pr-20 text-xs rounded-xl border border-amber-200 bg-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
              <button
                type="button"
                onClick={handleTestAndSaveKey}
                disabled={keyValidationStatus === 'testing'}
                className="absolute right-1 top-1 bottom-1 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-[11px] transition disabled:opacity-50"
              >
                {keyValidationStatus === 'testing' ? 'Testing...' : 'Save Key'}
              </button>
            </div>

            {keyValidationMsg && (
              <div className={`text-[11px] font-semibold flex items-center space-x-1.5 ${
                keyValidationStatus === 'valid' 
                  ? 'text-emerald-700' 
                  : (keyValidationStatus === 'invalid' ? 'text-red-600' : 'text-slate-600')
              }`}>
                {keyValidationStatus === 'valid' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                {keyValidationStatus === 'invalid' && <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />}
                <span>{keyValidationMsg}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-amber-200/50 text-slate-500">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 hover:text-amber-900 font-bold inline-flex items-center space-x-1 underline"
            >
              <span>Get a 100% Free Gemini Key</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
            {hasGeminiKey && (
              <button
                onClick={() => {
                  clearGeminiApiKey();
                  setApiKeyInput('');
                  setHasGeminiKey(false);
                  setKeyValidationMsg('Key removed. Now using offline engine.');
                }}
                className="text-red-600 hover:underline font-medium"
              >
                Remove Key
              </button>
            )}
          </div>
        </div>
      )}

      {/* Notice Pill if Gemini is not yet configured */}
      {!hasGeminiKey && !showSettings && (
        <div className="bg-gradient-to-r from-amber-100/90 via-orange-100/80 to-amber-100/90 px-3.5 py-2 border-b border-amber-200 text-xs flex items-center justify-between">
          <span className="text-[11px] font-medium text-amber-900 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Enable Gemini Live AI for unlimited answers</span>
          </span>
          <button
            onClick={() => setShowSettings(true)}
            className="text-[11px] font-bold text-amber-800 underline hover:text-amber-950 ml-2"
          >
            Connect Key
          </button>
        </div>
      )}

      {/* 3. Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF7F2]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs shrink-0 shadow-sm ${
                msg.sender === 'user' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-amber-400'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-[85%] p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-amber-600 text-white rounded-tr-none shadow-md shadow-amber-600/15'
                  : 'bg-white text-slate-800 rounded-tl-none border border-amber-200/80 shadow-md shadow-amber-950/5'
              }`}
            >
              {/* Formatted Markdown-like Text */}
              <div className="whitespace-pre-line space-y-1">
                {msg.text.split('\n').map((line, idx) => {
                  // Render headers
                  if (line.startsWith('### ') || line.startsWith('## ')) {
                    return (
                      <div key={idx} className="font-extrabold text-slate-950 mt-2 mb-1">
                        {line.replace(/^#+\s*/, '')}
                      </div>
                    );
                  }
                  // Render bullet points
                  if (line.startsWith('• ') || line.startsWith('- ')) {
                    return (
                      <div key={idx} className="pl-3 flex items-start space-x-1.5 my-0.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{formatInlineMarkdown(line.slice(2))}</span>
                      </div>
                    );
                  }
                  // Render regular lines
                  return (
                    <div key={idx} className={line.trim() === '' ? 'h-2' : ''}>
                      {formatInlineMarkdown(line)}
                    </div>
                  );
                })}
              </div>

              {/* Action Button: If AI mentioned an itinerary or trip, offer 1-click plan */}
              {msg.sender === 'ai' && onPlanTripFromChat && isTripQuery(msg.text) && (
                <div className="mt-3 pt-2.5 border-t border-amber-100 flex justify-end">
                  <button
                    onClick={() => onPlanTripFromChat(input || 'Plan this trip')}
                    className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-[11px] font-bold flex items-center space-x-1.5 transition active:scale-95"
                  >
                    <Compass className="w-3.5 h-3.5 text-amber-600" />
                    <span>Plan Itinerary in Planner</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              <span className={`text-[10px] block mt-1.5 ${msg.sender === 'user' ? 'text-amber-200 text-right' : 'text-slate-400'}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-slate-500 text-xs italic p-2 bg-amber-50/60 rounded-xl border border-amber-200/60 w-fit animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
            <span>{hasGeminiKey ? 'Gemini AI is crafting your response...' : 'Finding local Karnataka insights...'}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 4. Quick Suggestion Prompts */}
      <div className="p-2.5 bg-white border-t border-amber-100 overflow-x-auto flex space-x-2 scrollbar-none">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q.query)}
            className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-slate-700 hover:text-amber-950 border border-amber-200/80 transition shrink-0 active:scale-95"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* 5. Input Box */}
      <div className="p-3 bg-white border-t border-amber-200/70">
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
            placeholder={
              hasGeminiKey 
                ? (isKannada ? 'ಜೆಮಿನೈ ಬಳಿ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ...' : 'Ask Gemini anything about Karnataka...') 
                : t.assistantPlaceholder
            }
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-[#FAF7F2]/60"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white shadow-md shadow-amber-600/20 transition active:scale-95 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

// Helper to format inline bold **text** in messages
function formatInlineMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-extrabold text-slate-950">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
