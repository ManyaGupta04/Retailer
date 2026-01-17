// Voice Context for controlling voice enabled/disabled state across windows
// Uses localStorage to sync state across multiple tabs/windows

const VOICE_ENABLED_KEY = 'retailer_voice_enabled';

// Check if voice is enabled globally
export const isVoiceEnabled = (): boolean => {
    const stored = localStorage.getItem(VOICE_ENABLED_KEY);
    // Default to enabled if not set
    return stored === null ? true : stored === 'true';
};

// Set voice enabled/disabled state
export const setVoiceEnabled = (enabled: boolean): void => {
    localStorage.setItem(VOICE_ENABLED_KEY, String(enabled));
    // Dispatch storage event for other windows to pick up
    window.dispatchEvent(new StorageEvent('storage', {
        key: VOICE_ENABLED_KEY,
        newValue: String(enabled)
    }));
};

// Toggle voice state
export const toggleVoice = (): boolean => {
    const newState = !isVoiceEnabled();
    setVoiceEnabled(newState);
    return newState;
};

// Subscribe to voice state changes (for cross-window sync)
export const subscribeToVoiceChanges = (callback: (enabled: boolean) => void): (() => void) => {
    const handler = (event: StorageEvent) => {
        if (event.key === VOICE_ENABLED_KEY) {
            callback(event.newValue === 'true');
        }
    };

    window.addEventListener('storage', handler);

    // Return unsubscribe function
    return () => window.removeEventListener('storage', handler);
};
