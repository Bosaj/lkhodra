import type { SupportedLanguage } from '../i18n/strings'

export function speakDarija(
  arabicText: string,
  phoneticHint?: string,
  lang: SupportedLanguage = 'ar'
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return
  }

  try {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(
      lang === 'ar' ? arabicText : phoneticHint || arabicText
    )
    utterance.lang = lang === 'ar' ? 'ar-MA' : lang === 'fr' ? 'fr-FR' : 'en-US'
    utterance.rate = 0.92
    utterance.pitch = 1.0

    const voices = window.speechSynthesis.getVoices()
    const matchingVoice =
      voices.find((v) => v.lang.toLowerCase().includes('ar-ma')) ||
      voices.find((v) => v.lang.toLowerCase().startsWith(lang === 'ar' ? 'ar' : lang))
    if (matchingVoice) {
      utterance.voice = matchingVoice
    }

    window.speechSynthesis.speak(utterance)
  } catch {
    // Graceful fallback if speech synthesis is blocked
  }
}
