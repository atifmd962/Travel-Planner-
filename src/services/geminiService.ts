// Google Gemini AI Service for Karnataka Travel Planner
// Supports dynamic model auto-discovery (Gemini 2.5 Flash, 2.0 Flash, 1.5 Flash, etc.)
// with automatic fallback to offline knowledge engine.

const STORAGE_KEY = 'karnataka_gemini_api_key';
const MODEL_STORAGE_KEY = 'karnataka_gemini_active_model';

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

// Retrieve active Gemini API Key
export function getGeminiApiKey(): string {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && stored.trim()) {
    return stored.trim();
  }
  // Check Vite env variable if present
  try {
    const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
    if (envKey && typeof envKey === 'string' && envKey.trim()) {
      return envKey.trim();
    }
  } catch (e) {
    // ignore
  }
  return '';
}

// Save Gemini API Key to LocalStorage
export function saveGeminiApiKey(key: string): void {
  if (key && key.trim()) {
    localStorage.setItem(STORAGE_KEY, key.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(MODEL_STORAGE_KEY);
  }
}

// Remove API Key
export function clearGeminiApiKey(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(MODEL_STORAGE_KEY);
}

// Check if Gemini is configured
export function isGeminiActive(): boolean {
  return Boolean(getGeminiApiKey());
}

// Get cached active model name
export function getActiveGeminiModel(): string {
  return localStorage.getItem(MODEL_STORAGE_KEY) || 'Gemini 3.8 Flash';
}

export function saveActiveGeminiModel(modelName: string): void {
  localStorage.setItem(MODEL_STORAGE_KEY, modelName);
}

// Format model identifier into human-friendly label
export function formatModelDisplayName(modelStr: string): string {
  const raw = modelStr.replace(/^models\//, '');
  if (raw.includes('3.8-flash')) return 'Gemini 3.8 Flash';
  if (raw.includes('2.5-flash')) return 'Gemini 2.5 Flash';
  if (raw.includes('2.0-flash-lite')) return 'Gemini 2.0 Flash Lite';
  if (raw.includes('2.0-flash')) return 'Gemini 2.0 Flash';
  if (raw.includes('1.5-flash')) return 'Gemini 1.5 Flash';
  if (raw.includes('1.5-pro')) return 'Gemini 1.5 Pro';
  if (raw.includes('2.0-pro')) return 'Gemini 2.0 Pro';
  if (raw.includes('gemini-pro')) return 'Gemini Pro';
  return raw.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// System Instruction that grounds Gemini as Karnataka Travel Expert
export const KARNATAKA_SYSTEM_INSTRUCTION = `You are "Karnataka Travel AI" (ಕರ್ನಾಟಕ ಪ್ರವಾಸ AI), an intelligent, friendly, and deeply knowledgeable local travel assistant for the state of Karnataka, India.

Your knowledge includes:
1. All 31 districts of Karnataka: Bengaluru, Mysuru, Kodagu (Coorg), Chikmagalur, Shivamogga, Uttara Kannada (Gokarna, Dandeli), Udupi, Dakshina Kannada (Mangaluru), Vijayanagara (Hampi), Bagalkote (Badami, Pattadakal, Aihole), Hassan (Belur, Halebidu), Chamarajanagar (Bandipur), and beyond.
2. Complete tourism themes: Western Ghats waterfalls (Jog, Abbey, Hebbe, Jhari, Sathodi), pristine beaches (Om, Kudle, Malpe, Panambur, Maravanthe), UNESCO World Heritage sites, royal heritage, wildlife safaris (Bandipur, Nagarhole, Kabini), sacred temples (Murudeshwara, Udupi Krishna Matha, Kukke Subramanya, Dharmasthala), and trekking trails.
3. Authentic Karnataka cuisine & eateries: Mysore Pak (Guru Sweet Mart), Mylari Dosa, Maddur Vada, Neer Dosa, Koli Saaru, Akki Rotti, Ragi Mudde, Mangalore Buns, Dharwad Peda, and Davanagere Benne Dosa.
4. Local travel hacks: KSRTC buses (Airavat, Rajahamsa, Sarige Express), Indian Railways routes, best months to visit, budget estimates in Indian Rupees (₹), and safety advice.
5. Language: You are fully bilingual in English and Kannada (ಕನ್ನಡ). If the user asks in Kannada, respond in natural, polite Kannada. If they ask in English, answer in English and optionally include useful Kannada phrases with pronunciation.

Guidelines for your responses:
- Be clear, practical, and inspiring.
- Use emojis and organized bullet points or numbered lists.
- Give realistic budget numbers (₹) and actual travel durations.
- If asked for an itinerary or plan, provide a structured plan with times and places.
- Keep answers concise and mobile-friendly unless the user asks for deep detail.`;

// Candidate models to check in priority order
const CANDIDATE_MODELS = [
  'gemini-3.8-flash',
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.0-flash-exp',
  'gemini-2.0-flash-lite-preview-02-05',
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash-002',
  'gemini-1.5-flash-001',
  'gemini-1.5-flash',
  'gemini-1.5-pro-latest',
  'gemini-1.5-pro',
  'gemini-pro'
];

interface DiscoveredModel {
  fullName: string;      // e.g. "models/gemini-2.0-flash" or "gemini-2.0-flash"
  displayName: string;   // e.g. "Gemini 2.0 Flash"
  apiVersion: string;    // "v1beta" or "v1"
}

// Dynamically discover which model is enabled for this API Key
export async function discoverWorkingModel(apiKey: string): Promise<DiscoveredModel> {
  const cleanKey = apiKey.trim();

  // Step 1: Query Google's ListModels endpoint (v1beta and v1)
  const apiVersions = ['v1beta', 'v1'];
  for (const ver of apiVersions) {
    try {
      const listUrl = `https://generativelanguage.googleapis.com/${ver}/models?key=${cleanKey}`;
      const res = await fetch(listUrl);
      if (res.ok) {
        const data = await res.json();
        const availableModels: any[] = data.models || [];
        
        // Filter models that support content generation
        const contentModels = availableModels.filter(m => 
          Array.isArray(m.supportedGenerationMethods) && 
          m.supportedGenerationMethods.includes('generateContent')
        );

        if (contentModels.length > 0) {
          // Sort by our preferred priority
          for (const cand of CANDIDATE_MODELS) {
            const match = contentModels.find(m => m.name.toLowerCase().includes(cand.toLowerCase()));
            if (match) {
              const cleanModel = match.name.startsWith('models/') ? match.name : `models/${match.name}`;
              return {
                fullName: cleanModel,
                displayName: formatModelDisplayName(match.name),
                apiVersion: ver
              };
            }
          }

          // If no candidate name matched exactly, pick any flash model or the first available
          const flashModel = contentModels.find(m => m.name.toLowerCase().includes('flash'));
          const chosen = flashModel || contentModels[0];
          const cleanModel = chosen.name.startsWith('models/') ? chosen.name : `models/${chosen.name}`;
          return {
            fullName: cleanModel,
            displayName: formatModelDisplayName(chosen.name),
            apiVersion: ver
          };
        }
      }
    } catch (e) {
      // Continue to next version or fallback
    }
  }

  // Step 2: If ListModels fails or is restricted, probe candidate models directly with a dry-run test
  for (const cand of CANDIDATE_MODELS) {
    for (const ver of ['v1beta', 'v1']) {
      try {
        const testUrl = `https://generativelanguage.googleapis.com/${ver}/models/${cand}:generateContent?key=${cleanKey}`;
        const res = await fetch(testUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: 'ping' }] }],
            generationConfig: { maxOutputTokens: 5 }
          })
        });
        if (res.ok) {
          return {
            fullName: `models/${cand}`,
            displayName: formatModelDisplayName(cand),
            apiVersion: ver
          };
        }
      } catch (err) {
        // try next candidate
      }
    }
  }

  // Default fallback if all probes fail
  return {
    fullName: 'models/gemini-3.8-flash',
    displayName: 'Gemini 3.8 Flash',
    apiVersion: 'v1beta'
  };
}

// Test connection with a key and verify live response
export async function testGeminiApiKey(testKey: string): Promise<{ 
  success: boolean; 
  message: string; 
  modelName?: string;
}> {
  if (!testKey || !testKey.trim()) {
    return { success: false, message: 'Please provide a valid API key.' };
  }

  const cleanKey = testKey.trim();

  try {
    // 1. Discover the active model for this key
    const discovered = await discoverWorkingModel(cleanKey);

    // 2. Perform live verification call
    const modelTarget = discovered.fullName.startsWith('models/') 
      ? discovered.fullName 
      : `models/${discovered.fullName}`;
    const url = `https://generativelanguage.googleapis.com/${discovered.apiVersion}/${modelTarget}:generateContent?key=${cleanKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: 'Hello! Respond in 5 words confirming Karnataka Travel Assistant is ready.' }]
          }
        ],
        generationConfig: {
          maxOutputTokens: 30,
          temperature: 0.2
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = errData.error?.message || `HTTP error ${response.status}`;
      return { success: false, message: errMsg };
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (candidateText) {
      saveActiveGeminiModel(discovered.displayName);
      return { 
        success: true, 
        message: candidateText.trim(),
        modelName: discovered.displayName
      };
    }

    return { success: false, message: 'No response received from Gemini model.' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Network error connecting to Gemini API.' };
  }
}

// Ask Gemini Travel Assistant with Conversation Memory and Smart Model Selection
export async function askGeminiTravelAssistant(
  history: ChatMessage[],
  newQuestion: string,
  isKannada: boolean = false
): Promise<string> {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    throw new Error('NO_API_KEY');
  }

  // Format previous history into Gemini contents format (last 6 messages)
  const recentHistory = history.slice(-6);
  const contents: any[] = recentHistory.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  // Append user's new question with language context
  const languageContext = isKannada ? ' (Please reply in Kannada / ಕನ್ನಡ)' : '';
  contents.push({
    role: 'user',
    parts: [{ text: `${newQuestion}${languageContext}` }]
  });

  // Get active model or discover it
  const discovered = await discoverWorkingModel(apiKey);
  const modelTarget = discovered.fullName.startsWith('models/') 
    ? discovered.fullName 
    : `models/${discovered.fullName}`;

  const url = `https://generativelanguage.googleapis.com/${discovered.apiVersion}/${modelTarget}:generateContent?key=${apiKey}`;

  // Try calling with systemInstruction
  let payload: any = {
    systemInstruction: {
      parts: [
        { text: KARNATAKA_SYSTEM_INSTRUCTION }
      ]
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1200
    }
  };

  let response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  // If systemInstruction is rejected on this endpoint/version, inject system prompt as first user/model turn
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const errMsg: string = errorBody?.error?.message || '';

    if (errMsg.toLowerCase().includes('systeminstruction') || errMsg.toLowerCase().includes('not supported')) {
      const fallbackContents = [
        {
          role: 'user',
          parts: [{ text: `System Instruction: ${KARNATAKA_SYSTEM_INSTRUCTION}` }]
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I am your Karnataka Travel Assistant. How can I assist you with your trip today?' }]
        },
        ...contents
      ];

      payload = {
        contents: fallbackContents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1200
        }
      };

      response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      console.error('Gemini API Error:', errorBody);
      throw new Error(errMsg || `Gemini API returned error code ${response.status}`);
    }
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody?.error?.message || `Gemini API returned status ${response.status}`;
    throw new Error(message);
  }

  const result = await response.json();
  const answerText = result.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!answerText) {
    throw new Error('Gemini returned an empty response. Please try rephrasing your question.');
  }

  return answerText;
}
