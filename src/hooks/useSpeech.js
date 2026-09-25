import { useState, useEffect, useCallback } from 'react'

export function useSpeech() {
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isSupported, setIsSupported] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            setIsSupported(true)
        }
    }, [])

    const speak = useCallback((text) => {
        if (!('speechSynthesis' in window) || !text) return

        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 1.0
        utterance.pitch = 1.0

        // Try to pick an English voice
        const voices = window.speechSynthesis.getVoices()
        const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')))
        if (englishVoice) {
            utterance.voice = englishVoice
        }

        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => setIsSpeaking(false)
        utterance.onerror = () => setIsSpeaking(false)

        window.speechSynthesis.speak(utterance)
    }, [])

    const stop = useCallback(() => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel()
            setIsSpeaking(false)
        }
    }, [])

    return { speak, stop, isSpeaking, isSupported }
}