// Hindi Voice Speech Utility using Web Speech API for Retailer App

import { isVoiceEnabled } from './voiceContext';

let voicesLoaded = false;
let voicesList: SpeechSynthesisVoice[] = [];

// Stop any ongoing speech
export const stopSpeech = () => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
};

// Load voices - this is async in most browsers
const loadVoices = (): Promise<SpeechSynthesisVoice[]> => {
    return new Promise((resolve) => {
        if (!('speechSynthesis' in window)) {
            resolve([]);
            return;
        }

        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            voicesList = voices;
            voicesLoaded = true;
            resolve(voices);
            return;
        }

        // Wait for voices to load
        window.speechSynthesis.onvoiceschanged = () => {
            voicesList = window.speechSynthesis.getVoices();
            voicesLoaded = true;
            resolve(voicesList);
        };

        // Fallback timeout
        setTimeout(() => {
            voicesList = window.speechSynthesis.getVoices();
            voicesLoaded = true;
            resolve(voicesList);
        }, 1000);
    });
};

// Core function to speak Hindi text
export const speakHindi = async (text: string): Promise<void> => {
    return new Promise((resolve) => {
        // Check if voice is enabled globally
        if (!isVoiceEnabled()) {
            console.log('Voice is disabled, skipping speech:', text);
            resolve();
            return;
        }

        // Check if speech synthesis is available
        if (!('speechSynthesis' in window)) {
            console.warn('Speech synthesis not supported');
            resolve();
            return;
        }

        // Ensure voices are loaded
        const speak = async () => {
            if (!voicesLoaded) {
                await loadVoices();
            }

            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'hi-IN'; // Hindi (India)
            utterance.rate = 0.9;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            // Try to find a Hindi voice, or use default
            const hindiVoice = voicesList.find(voice =>
                voice.lang.includes('hi') ||
                voice.lang.includes('Hindi') ||
                voice.name.toLowerCase().includes('hindi')
            );

            if (hindiVoice) {
                utterance.voice = hindiVoice;
                console.log('Using Hindi voice:', hindiVoice.name);
            } else {
                // Use Google Hindi if available, or first available voice
                const googleVoice = voicesList.find(v => v.name.includes('Google'));
                if (googleVoice) {
                    utterance.voice = googleVoice;
                }
                console.log('No Hindi voice found, using default');
            }

            // Resolve when speech ends
            utterance.onend = () => {
                console.log('Speech ended:', text);
                resolve();
            };

            utterance.onerror = (event) => {
                console.error('Speech error:', event);
                resolve();
            };

            // Debug log
            console.log('Speaking:', text);

            window.speechSynthesis.speak(utterance);
        };

        speak();
    });
};

// Convert number to Hindi words
const numberToHindiWords = (num: number): string => {
    // Hindi number words
    const ones = ['', 'एक', 'दो', 'तीन', 'चार', 'पांच', 'छह', 'सात', 'आठ', 'नौ', 'दस',
        'ग्यारह', 'बारह', 'तेरह', 'चौदह', 'पंद्रह', 'सोलह', 'सत्रह', 'अठारह', 'उन्नीस'];
    const tens = ['', '', 'बीस', 'तीस', 'चालीस', 'पचास', 'साठ', 'सत्तर', 'अस्सी', 'नब्बे'];

    // Special numbers 21-99 (Hindi has unique names for many)
    const special: { [key: number]: string } = {
        21: 'इक्कीस', 22: 'बाईस', 23: 'तेईस', 24: 'चौबीस', 25: 'पच्चीस',
        26: 'छब्बीस', 27: 'सत्ताईस', 28: 'अट्ठाईस', 29: 'उनतीस',
        31: 'इकतीस', 32: 'बत्तीस', 33: 'तैंतीस', 34: 'चौंतीस', 35: 'पैंतीस',
        36: 'छत्तीस', 37: 'सैंतीस', 38: 'अड़तीस', 39: 'उनतालीस',
        41: 'इकतालीस', 42: 'बयालीस', 43: 'तैंतालीस', 44: 'चौवालीस', 45: 'पैंतालीस',
        46: 'छियालीस', 47: 'सैंतालीस', 48: 'अड़तालीस', 49: 'उनचास',
        51: 'इक्यावन', 52: 'बावन', 53: 'तिरेपन', 54: 'चौवन', 55: 'पचपन',
        56: 'छप्पन', 57: 'सत्तावन', 58: 'अट्ठावन', 59: 'उनसठ',
        61: 'इकसठ', 62: 'बासठ', 63: 'तिरसठ', 64: 'चौंसठ', 65: 'पैंसठ',
        66: 'छियासठ', 67: 'सड़सठ', 68: 'अड़सठ', 69: 'उनहत्तर',
        71: 'इकहत्तर', 72: 'बहत्तर', 73: 'तिहत्तर', 74: 'चौहत्तर', 75: 'पचहत्तर',
        76: 'छिहत्तर', 77: 'सतहत्तर', 78: 'अठहत्तर', 79: 'उनासी',
        81: 'इक्यासी', 82: 'बयासी', 83: 'तिरासी', 84: 'चौरासी', 85: 'पचासी',
        86: 'छियासी', 87: 'सत्तासी', 88: 'अट्ठासी', 89: 'नवासी',
        91: 'इक्यानवे', 92: 'बानवे', 93: 'तिरानवे', 94: 'चौरानवे', 95: 'पचानवे',
        96: 'छियानवे', 97: 'सत्तानवे', 98: 'अट्ठानवे', 99: 'निन्यानवे',
        100: 'सौ'
    };

    // Handle decimal numbers - just use the integer part
    num = Math.floor(num);

    if (num === 0) return 'शून्य';
    if (num < 20) return ones[num];
    if (special[num]) return special[num];

    if (num < 100) {
        const ten = Math.floor(num / 10);
        const one = num % 10;
        if (one === 0) return tens[ten];
        return `${tens[ten]} ${ones[one]}`;
    }

    if (num === 100) return 'सौ';

    if (num < 1000) {
        const hundred = Math.floor(num / 100);
        const remainder = num % 100;
        const hundredWord = hundred === 1 ? 'एक सौ' : `${ones[hundred]} सौ`;
        if (remainder === 0) return hundredWord;
        return `${hundredWord} ${numberToHindiWords(remainder)}`;
    }

    if (num < 100000) {
        // Thousands (हज़ार)
        const thousand = Math.floor(num / 1000);
        const remainder = num % 1000;
        const thousandWord = thousand === 1 ? 'एक हज़ार' : `${numberToHindiWords(thousand)} हज़ार`;
        if (remainder === 0) return thousandWord;
        return `${thousandWord} ${numberToHindiWords(remainder)}`;
    }

    // For very large numbers, just return the number as string
    return num.toString();
};

// Speak when a price is set: "*product name* Ka daaam *price in Hindi* rupaye set Kiya Gaya"
export const speakPriceSet = (productName: string, price: number) => {
    const priceInHindi = numberToHindiWords(price);
    const text = `${productName} Ka daaam ${priceInHindi} rupaye set Kiya Gaya`;
    console.log('Speaking price set:', text);
    speakHindi(text);
};

// Speak when a product is published: "*product name* store mein joda Gaya"
export const speakProductPublished = (productName: string) => {
    const text = `${productName} store mein joda Gaya`;
    console.log('Speaking product published:', text);
    speakHindi(text);
};

// Speak when a product is unpublished: "*product name* store se hataya gaya"
export const speakProductUnpublished = (productName: string) => {
    const text = `${productName} store se hataya gaya`;
    console.log('Speaking product unpublished:', text);
    speakHindi(text);
};

// Speak "order Aaya" three times when an order is received
export const speakOrderReceived = async () => {
    console.log('Speaking order received announcement (3 times)');
    for (let i = 0; i < 3; i++) {
        await speakHindi('order Aaya');
        // Small pause between repetitions
        await new Promise(resolve => setTimeout(resolve, 500));
    }
};

// Speak when an order is completed: "Shandaar! order pura hua"
export const speakOrderCompleted = () => {
    const text = 'Shandaar! order pura hua';
    console.log('Speaking order completed:', text);
    speakHindi(text);
};

// Initialize voices (call this early in app startup)
export const initVoices = () => {
    loadVoices().then(voices => {
        console.log('Speech voices loaded:', voices.length, 'voices available');
    });
};
