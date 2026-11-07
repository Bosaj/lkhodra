export type ProduceCategory =
  | 'fruit'
  | 'vegetable'
  | 'tuber_root'
  | 'herb_spice'
  | 'legume_seed'

export type SeasonName = 'winter' | 'spring' | 'summer' | 'autumn' | 'all_year'

export type HealthTargetOrgan =
  | 'heart'
  | 'immunity'
  | 'digestion'
  | 'blood_sugar'
  | 'brain'
  | 'liver'
  | 'eyes_skin'
  | 'bones'
  | 'anemia_iron'

export type CulinaryUse =
  | 'tagine'
  | 'couscous'
  | 'salade'
  | 'raw_fresh'
  | 'juice_smoothie'
  | 'preserve_marmalade'
  | 'infusion_remedy'

export interface RegionalNames {
  oriental: string[] // Oujda, Berkane, Nador, Figuig, Taourirt
  chamal: string[] // Tangier, Tetouan, Chefchaouen, Larache, Ouezzane
  centre: string[] // Casablanca, Rabat, Fès, Meknès, Marrakech, Béni Mellal, Doukkala
  sud: string[] // Agadir, Chtouka, Taroudant, Tafilalet, Zagora, Dakhla (Tashelhit / Hassani)
}

export interface ProduceNutrition100g {
  calories: number
  waterPercent: number
  carbsGrams: number
  fiberGrams: number
  sugarGrams: number
  proteinGrams: number
  glycemicIndex: number // 0 - 100 (< 55 low, 55-69 medium, >= 70 high)
  antioxidantOrac: number // ORAC units per 100g
  vitaminC_mg: number
  vitaminA_iu: number
  vitaminB6_mg: number
  folateMcg: number
  potassiumMg: number
  magnesiumMg: number
  calciumMg: number
  ironMg: number
  bioactiveCompounds: {
    name: string
    roleAr: string
    roleFr: string
    roleEn: string
  }[]
  targetOrgans: HealthTargetOrgan[]
  healthBenefits: {
    ar: string[]
    fr: string[]
    en: string[]
  }
  synergyTip: {
    ar: string
    fr: string
    en: string
  }
  traditionalMoroccanRemedy: {
    ar: string
    fr: string
    en: string
  }
}

export interface ProduceSeasonality {
  peakMonths: number[] // 1-12 (Peak abundance & lowest price)
  availableMonths: number[] // 1-12 (Including early Bakor & late storage)
  primarySeason: SeasonName
  harvestNotes: {
    ar: string
    fr: string
    en: string
  }
}

export interface ProducePricing {
  unit: 'kg' | 'bunch' | '100g' | 'gram'
  inSeasonMAD: number
  offSeasonMAD: number
  currentSpotMAD: number
  past6MonthsMAD: number[]
  trend: 'up' | 'down' | 'stable'
  igpLabel?: string // e.g., "IGP Clémentine de Berkane", "AOP Safran de Taliouine"
  exportHubs: string
  marketNote: {
    ar: string
    fr: string
    en: string
  }
}

export interface ProduceItem {
  id: string
  nameDarijaArabic: string
  nameDarijaLatin: string
  nameAmazigh: string
  nameFrench: string
  nameEnglish: string
  scientificName: string
  botanicalFamily: string
  category: ProduceCategory
  mainTerroirs: string[]
  terroirRegionIds: string[]
  regionalNames: RegionalNames
  seasonality: ProduceSeasonality
  nutrition: ProduceNutrition100g
  pricing: ProducePricing
  culinaryUses: CulinaryUse[]
  freshnessGuide: {
    ar: string[]
    fr: string[]
    en: string[]
  }
  storageAndPreservation: {
    shelfLifeDays: number
    fridgeRecommended: boolean
    ar: string
    fr: string
    en: string
  }
  description: {
    ar: string
    fr: string
    en: string
  }
  imageUrl: string
  galleryImages?: {
    url: string
    captionAr: string
    captionFr: string
    captionEn: string
  }[]
  accentColor: string
  audioPhonetic?: string
}

export interface MoroccanProduceRecipe {
  id: string
  titleDarijaArabic: string
  titleDarijaLatin: string
  titleFrench: string
  titleEnglish: string
  category: 'tagine' | 'couscous' | 'salade_entree' | 'dessert_boisson' | 'remede_traditionnel'
  season: SeasonName
  prepTimeMinutes: number
  cookTimeMinutes: number
  servings: number
  difficulty: 'easy' | 'medium' | 'pro'
  featuredProduceIds: string[]
  caloriesPerServing: number
  keyHealthHighlight: {
    ar: string
    fr: string
    en: string
  }
  ingredients: {
    ar: string[]
    fr: string[]
    en: string[]
  }
  steps: {
    ar: string[]
    fr: string[]
    en: string[]
  }
  chefTip: {
    ar: string
    fr: string
    en: string
  }
  imageUrl: string
}
