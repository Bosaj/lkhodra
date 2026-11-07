import '@testing-library/jest-dom/vitest'

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'speechSynthesis', {
    value: {
      speak: () => {},
      cancel: () => {},
      pause: () => {},
      resume: () => {},
      getVoices: () => [],
    },
    writable: true,
  })

  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: () => Promise.resolve(),
    },
    writable: true,
  })
}
