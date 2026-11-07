import { describe, it, expect } from 'vitest'
import {
  MOROCCAN_AGRO_REGIONS,
  getSeasonStatusForMonth,
  calculateSeasonalPriceMAD,
} from './moroccanTerroir'
import { MOROCCAN_PRODUCE } from '../data/produce'
import {
  SEASONAL_ORGAN_PROFILES,
  getProduceSeasonalOrganRole,
} from '../data/seasonalOrgans'

describe('Moroccan Terroir & Seasonality Engine', () => {
  it('defines all 8 flagship Moroccan agricultural regions with IGP/AOP labels', () => {
    expect(MOROCCAN_AGRO_REGIONS.length).toBeGreaterThanOrEqual(8)
    const berkane = MOROCCAN_AGRO_REGIONS.find((r) => r.id === 'berkane-oriental')
    expect(berkane).toBeDefined()
    expect(berkane?.igpLabels).toContain('IGP Clémentine de Berkane')
  })

  it('accurately classifies peak, available, and off-season months', () => {
    const clementine = MOROCCAN_PRODUCE.find((p) => p.id === 'clementine-berkane')!
    expect(
      getSeasonStatusForMonth(
        clementine.seasonality.peakMonths,
        clementine.seasonality.availableMonths,
        12
      )
    ).toBe('peak')
    expect(
      getSeasonStatusForMonth(
        clementine.seasonality.peakMonths,
        clementine.seasonality.availableMonths,
        10
      )
    ).toBe('available')
    expect(
      getSeasonStatusForMonth(
        clementine.seasonality.peakMonths,
        clementine.seasonality.availableMonths,
        7
      )
    ).toBe('off_season')
  })

  it('computes lower MAD prices during peak Moroccan harvest compared to off-season', () => {
    const peakPrice = calculateSeasonalPriceMAD(6, 16, [11, 12, 1, 2], [10, 11, 12, 1, 2, 3], 12)
    const offPrice = calculateSeasonalPriceMAD(6, 16, [11, 12, 1, 2], [10, 11, 12, 1, 2, 3], 7)
    expect(peakPrice).toBe(6)
    expect(offPrice).toBe(16)
    expect(peakPrice).toBeLessThan(offPrice)
  })

  it('validates that every Moroccan produce item has trilingual health benefits and regional dialects', () => {
    for (const item of MOROCCAN_PRODUCE) {
      expect(item.nutrition.healthBenefits.ar.length).toBeGreaterThan(0)
      expect(item.nutrition.healthBenefits.fr.length).toBeGreaterThan(0)
      expect(item.nutrition.healthBenefits.en.length).toBeGreaterThan(0)
      expect(item.seasonality.peakMonths.length).toBeGreaterThan(0)
      expect(item.regionalNames.oriental.length).toBeGreaterThan(0)
      expect(item.regionalNames.sud.length).toBeGreaterThan(0)
      expect(item.galleryImages?.length).toBeGreaterThanOrEqual(3)
      const organRole = getProduceSeasonalOrganRole(item.id)
      expect(organRole).toBeDefined()
      expect(organRole?.weakOrganHealed.ar.length).toBeGreaterThan(0)
    }
  })

  it('defines 4-week organ recovery schedules and vulnerable organs for all 4 Moroccan seasons', () => {
    for (const season of ['winter', 'spring', 'summer', 'autumn'] as const) {
      const profile = SEASONAL_ORGAN_PROFILES[season]
      expect(profile.weakOrgans.length).toBe(4)
      expect(profile.weeklySchedule.length).toBe(4)
    }
  })
})
