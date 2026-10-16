/**
 * Audio synthesis and Speech Synthesis utility
 * Handles global mute/unmute state, Web Audio sound effects, and Spanish TTS.
 */

let isMutedState = false;

// Check localStorage if available
try {
  const saved = localStorage.getItem('examen_audio_muted');
  if (saved !== null) {
    isMutedState = saved === 'true';
  }
} catch {
  // Ignore localStorage errors in restricted environments
}

const listeners = new Set<(muted: boolean) => void>();

export function isSoundMuted(): boolean {
  return isMutedState;
}

export function setSoundMuted(muted: boolean): boolean {
  isMutedState = muted;
  try {
    localStorage.setItem('examen_audio_muted', String(muted));
  } catch {
    // ignore
  }
  listeners.forEach((listener) => listener(isMutedState));
  if (!isMutedState) {
    playChimeSound();
  } else {
    stopSpeaking();
  }
  return isMutedState;
}

export function toggleGlobalMute(): boolean {
  return setSoundMuted(!isMutedState);
}

export function subscribeSoundMuted(callback: (muted: boolean) => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

// Simple Web Audio chime without external assets
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx) {
    try {
      audioCtx = new AudioContextClass();
    } catch {
      return null;
    }
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playClickSound(): void {
  if (isMutedState) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // Ignore audio context errors
  }
}

export function playSuccessSound(): void {
  if (isMutedState) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  } catch {
    // Ignore
  }
}

export function playErrorSound(): void {
  if (isMutedState) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.setValueAtTime(220, now + 0.1);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  } catch {
    // Ignore
  }
}

export function playChimeSound(): void {
  if (isMutedState) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  } catch {
    // Ignore
  }
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}

export function speakSpanish(
  text: string,
  rate = 1.0,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (isMutedState) {
    return false;
  }
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  try {
    window.speechSynthesis.cancel();

    // Clean up text: remove punctuation prompts or metadata prefixes
    const cleanText = text
      .replace(/^(A|B|\d+\.|\(entrenador\)|\(jugador\)|Entrenador:|Compañero:)\s*/i, '')
      .replace(/\.{2,}/g, '.')
      .trim();

    if (!cleanText) return false;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = Math.max(0.6, Math.min(1.5, rate));
    utterance.pitch = 1.0;

    // Pick Spanish voice if available
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(
      (v) => v.lang.startsWith('es-ES') || v.lang.startsWith('es')
    );
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    if (onStart) utterance.onstart = () => onStart();
    utterance.onend = () => {
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    if (onEnd) onEnd();
    return false;
  }
}
