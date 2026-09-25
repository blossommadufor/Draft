// Lightweight Web Audio API Synthesizer (No external mp3 assets needed)

let audioCtx = null

function getAudioContext() {
    if (typeof window === 'undefined') return null
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        if (AudioContext) {
            audioCtx = new AudioContext()
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume()
    }
    return audioCtx
}

export const soundEffects = {
    muted: false,

    toggleMute() {
        this.muted = !this.muted
        return this.muted
    },

    playFlip() {
        if (this.muted) return
        const ctx = getAudioContext()
        if (!ctx) return
        try {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.type = 'triangle'
            osc.frequency.setValueAtTime(260, ctx.currentTime)
            osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.08)
            gain.gain.setValueAtTime(0.12, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.start()
            osc.stop(ctx.currentTime + 0.08)
        } catch (e) {
            // Audio autoplay policy
        }
    },

    playCorrect() {
        if (this.muted) return
        const ctx = getAudioContext()
        if (!ctx) return
        try {
            const now = ctx.currentTime
            const notes = [523.25, 659.25, 783.99] // C5, E5, G5 major triad
            notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator()
                const gain = ctx.createGain()
                osc.type = 'sine'
                osc.frequency.setValueAtTime(freq, now + idx * 0.06)
                gain.gain.setValueAtTime(0.15, now + idx * 0.06)
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.22)
                osc.connect(gain)
                gain.connect(ctx.destination)
                osc.start(now + idx * 0.06)
                osc.stop(now + idx * 0.06 + 0.22)
            })
        } catch (e) {}
    },

    playWrong() {
        if (this.muted) return
        const ctx = getAudioContext()
        if (!ctx) return
        try {
            const now = ctx.currentTime
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.type = 'sawtooth'
            osc.frequency.setValueAtTime(180, now)
            osc.frequency.exponentialRampToValueAtTime(110, now + 0.18)
            gain.gain.setValueAtTime(0.1, now)
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.start(now)
            osc.stop(now + 0.18)
        } catch (e) {}
    },

    playClick() {
        if (this.muted) return
        const ctx = getAudioContext()
        if (!ctx) return
        try {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.type = 'sine'
            osc.frequency.setValueAtTime(800, ctx.currentTime)
            gain.gain.setValueAtTime(0.04, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.start()
            osc.stop(ctx.currentTime + 0.04)
        } catch (e) {}
    },

    playCelebration() {
        if (this.muted) return
        const ctx = getAudioContext()
        if (!ctx) return
        try {
            const now = ctx.currentTime
            const fanfare = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
            fanfare.forEach((freq, idx) => {
                const osc = ctx.createOscillator()
                const gain = ctx.createGain()
                osc.type = 'triangle'
                osc.frequency.setValueAtTime(freq, now + idx * 0.1)
                gain.gain.setValueAtTime(0.18, now + idx * 0.1)
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.4)
                osc.connect(gain)
                gain.connect(ctx.destination)
                osc.start(now + idx * 0.1)
                osc.stop(now + idx * 0.1 + 0.4)
            })
        } catch (e) {}
    },
}