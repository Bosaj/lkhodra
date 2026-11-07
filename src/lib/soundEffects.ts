class SoundEffectsEngine {
  private enabled = true

  isEnabled(): boolean {
    return this.enabled
  }

  toggle(): boolean {
    this.enabled = !this.enabled
    return this.enabled
  }

  playPop(): void {
    if (!this.enabled || typeof window === 'undefined') return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(520, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.055)
      gain.gain.setValueAtTime(0.035, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.065)
    } catch {
      // Ignore audio context restrictions
    }
  }
}

export const sounds = new SoundEffectsEngine()
