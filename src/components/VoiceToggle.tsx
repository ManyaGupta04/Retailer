import { useState, useEffect } from 'react';
import { isVoiceEnabled, toggleVoice, subscribeToVoiceChanges } from '../lib/voiceContext';
import './VoiceToggle.css';

const VoiceToggle = () => {
    const [enabled, setEnabled] = useState(isVoiceEnabled());

    useEffect(() => {
        // Subscribe to voice state changes from other windows
        const unsubscribe = subscribeToVoiceChanges((newState) => {
            setEnabled(newState);
        });

        return () => unsubscribe();
    }, []);

    const handleToggle = () => {
        const newState = toggleVoice();
        setEnabled(newState);
    };

    return (
        <button
            className={`voice-toggle ${enabled ? 'enabled' : 'disabled'}`}
            onClick={handleToggle}
            title={enabled ? 'Voice On - Click to turn off' : 'Voice Off - Click to turn on'}
            aria-label={enabled ? 'Disable voice' : 'Enable voice'}
        >
            {enabled ? '🔊' : '🔇'}
        </button>
    );
};

export default VoiceToggle;
