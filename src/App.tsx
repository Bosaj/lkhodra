import React, { useState, useMemo, useEffect } from 'react'
import {
  Search,
  Sprout,
  Award,
  Sparkles,
  Filter,
  ShieldAlert,
  Clock,
  Activity,
} from 'lucide-react'
import { Header, type NavTab } from './components/Header'
import { ProduceCard } from './components/ProduceCard'
import { ProduceModal } from './components/ProduceModal'
import { SeasonalHarvestCalendar } from './components/SeasonalHarvestCalendar'
import { HealthBenefitsExplorer } from './components/HealthBenefitsExplorer'
import { MoroccanTerroirMap } from './components/MoroccanTerroirMap'
import { SoukQoffaAndComparator } from './components/SoukQoffaAndComparator'
import { SoukFreshnessAndRecipes } from './components/SoukFreshnessAndRecipes'

import { MOROCCAN_PRODUCE } from './data/produce'
import { SEASONAL_ORGAN_PROFILES } from './data/seasonalOrgans'
import { MONTHLY_ORGAN_ATLAS } from './data/monthlyOrgans'
import type { ProduceItem, HealthTargetOrgan } from './data/types'
import { STRINGS, type SupportedLanguage } from './i18n/strings'
import {
  MOROCCAN_AGRO_REGIONS,
  getSeasonStatusForMonth,
} from './lib/moroccanTerroir'
import { sounds } from './lib/soundEffects'

export const App: React.FC = () => {
  const [lang, setLang] = useState<SupportedLanguage>('ar')
  const [activeTab, setActiveTab] = useState<NavTab>('atlas')
  const [selectedRegionId, setSelectedRegionId] = useState<string>('berkane-oriental')

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedSeasonFilter, setSelectedSeasonFilter] = useState<string>('all')
  const [selectedMonthFilter, setSelectedMonthFilter] = useState<string>('all')
  const [selectedOrganFilter, setSelectedOrganFilter] = useState<string>('all')
  const [heroSeasonKey, setHeroSeasonKey] = useState<'winter' | 'spring' | 'summer' | 'autumn'>('winter')
  const [heroChronoMode, setHeroChronoMode] = useState<'seasons' | 'months'>('seasons')
  const [heroMonthNum, setHeroMonthNum] = useState<number>(new Date().getMonth() + 1)

  const [activeProduce, setActiveProduce] = useState<ProduceItem | null>(null)
  const [basket, setBasket] = useState<Array<{ produceId: string; qty: number }>>([
    { produceId: 'clementine-berkane', qty: 2 },
    { produceId: 'grenade-sefri', qty: 1.5 },
    { produceId: 'tomate-chtouka', qty: 2 },
    { produceId: 'artichaut-qouq', qty: 1 },
  ])

  const t = STRINGS[lang]
  const isRtl = lang === 'ar'
  const currentMonthNum = new Date().getMonth() + 1
  const currentMonthName = t.months[currentMonthNum - 1]

  const activeRegion = useMemo(
    () =>
      MOROCCAN_AGRO_REGIONS.find((r) => r.id === selectedRegionId) ||
      MOROCCAN_AGRO_REGIONS[0]!,
    [selectedRegionId]
  )

  const activeHeroSeasonProfile = useMemo(
    () => SEASONAL_ORGAN_PROFILES[heroSeasonKey] || SEASONAL_ORGAN_PROFILES.winter,
    [heroSeasonKey]
  )

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
  }, [lang, isRtl])

  const filteredProduce = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return MOROCCAN_PRODUCE.filter((item) => {
      const allRegional = [
        ...item.regionalNames.oriental,
        ...item.regionalNames.chamal,
        ...item.regionalNames.centre,
        ...item.regionalNames.sud,
      ]
      const matchesSearch =
        !q ||
        item.nameDarijaArabic.includes(q) ||
        item.nameDarijaLatin.toLowerCase().includes(q) ||
        item.nameAmazigh.toLowerCase().includes(q) ||
        item.nameFrench.toLowerCase().includes(q) ||
        item.nameEnglish.toLowerCase().includes(q) ||
        item.scientificName.toLowerCase().includes(q) ||
        item.mainTerroirs.some((tr) => tr.toLowerCase().includes(q)) ||
        allRegional.some((r) => r.toLowerCase().includes(q))

      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory

      const matchesSeason =
        selectedSeasonFilter === 'all' ||
        (selectedSeasonFilter === 'peak_now' &&
          getSeasonStatusForMonth(
            item.seasonality.peakMonths,
            item.seasonality.availableMonths,
            currentMonthNum
          ) === 'peak') ||
        item.seasonality.primarySeason === selectedSeasonFilter

      const matchesOrgan =
        selectedOrganFilter === 'all' ||
        item.nutrition.targetOrgans.includes(selectedOrganFilter as HealthTargetOrgan)

      const matchesMonth =
        selectedMonthFilter === 'all' ||
        item.seasonality.peakMonths.includes(Number(selectedMonthFilter))

      return matchesSearch && matchesCategory && matchesSeason && matchesOrgan && matchesMonth
    })
  }, [searchQuery, selectedCategory, selectedSeasonFilter, selectedOrganFilter, selectedMonthFilter, currentMonthNum])

  const peakNowCount = useMemo(
    () =>
      MOROCCAN_PRODUCE.filter((item) =>
        item.seasonality.peakMonths.includes(currentMonthNum)
      ).length,
    [currentMonthNum]
  )

  const handleAddToBasket = (produceId: string) => {
    sounds.playPop()
    setBasket((prev) => {
      const existing = prev.find((e) => e.produceId === produceId)
      if (existing) {
        return prev.map((e) =>
          e.produceId === produceId ? { ...e, qty: e.qty + 1 } : e
        )
      }
      return [...prev, { produceId, qty: 1 }]
    })
  }

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-[100dvh] bg-[#050b07] text-[#f0f7f2] selection:bg-[#10b981] selection:text-[#050b07]"
    >
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        selectedRegionId={selectedRegionId}
        setSelectedRegionId={setSelectedRegionId}
      />

      <main className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {activeTab === 'atlas' && (
          <>
            {/* STAGE 1: HERO & INTERACTIVE 4-SEASON ORGAN CHRONOBIOLOGY DECK */}
            <section className="herbarium-plate p-6 sm:p-8 lg:p-10 space-y-8">
              {/* Top Hero Row */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-7">
                <div className="space-y-4 max-w-4xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold bg-[#10b981]/15 text-[#34d399] border border-[#10b981]/30">
                      <Sprout className="h-3.5 w-3.5" />
                      {lang === 'ar'
                        ? `الأطلس العالمي والمغربي للفواكه والخضر • ${MOROCCAN_PRODUCE.length} صنفاً`
                        : `ATLAS MONDIAL & MAROCAIN • ${MOROCCAN_PRODUCE.length} ESPÈCES`}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold bg-[#f59e0b]/15 text-[#fbbf24] border border-[#f59e0b]/30">
                      <Award className="h-3.5 w-3.5" />
                      {lang === 'ar'
                        ? `شهر ${currentMonthName}: ${peakNowCount} في ذروة الجني`
                        : `${currentMonthName} : ${peakNowCount} espèces en pleine récolte`}
                    </span>
                  </div>

                  <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#f0f7f2] leading-tight">
                    <span>
                      {lang === 'ar'
                        ? 'فوائد الفواكه والخضر المغربية ومواسمها الفلاحية بالدارجة'
                        : lang === 'fr'
                          ? 'Bienfaits & Saisons des Fruits et Légumes du Terroir Marocain'
                          : 'Moroccan Fruits & Vegetables: Seasonal Harvest & Clinical Benefits'}
                    </span>
                  </h1>

                  <p className="text-sm sm:text-base text-[#a7bfb0] leading-relaxed">
                    {lang === 'ar'
                      ? 'كل فصل في المغرب يضعف أعضاء معينة في الجسم بسبب تغير الحرارة والرطوبة، وفي نفس الوقت تنضج الفواكه والخضر التي ترمم تلك الأعضاء أسبوعاً بأسبوع. اختر الفصل أسفله لمعرفة الأعضاء المحتاجة والبرنامج الأسبوعي.'
                      : lang === 'fr'
                        ? 'Chaque saison marocaine fragilise certains organes tout en offrant les fruits et légumes qui les régénèrent semaine après semaine.'
                        : 'Every Moroccan season challenges specific organs while ripening the exact fruits and vegetables needed to restore them week by week.'}
                  </p>
                </div>

                {/* Real Specimen Preview Avatars */}
                <div className="flex items-center gap-2 shrink-0">
                  {[
                    '/images/produce/clementine-berkane-1.jpg',
                    '/images/produce/grenade-sefri-1.jpg',
                    '/images/produce/figue-taounate-1.jpg',
                    '/images/produce/safran-taliouine-1.jpg',
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-[#10b981]/40 shadow-lg"
                    />
                  ))}
                </div>
              </div>

              {/* Interactive 4-Season AND 12-Month Chronobiology Selector */}
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-5 h-5 text-[#34d399]" />
                    <h2 className="font-display text-lg sm:text-xl font-extrabold text-[#f0f7f2]">
                      {lang === 'ar'
                        ? 'الأعضاء الضعيفة حسب الفصول الأربعة والشهور الـ 12 والبرنامج الأسبوعي'
                        : lang === 'fr'
                          ? 'Organes Vulnérables par Saison (4) & par Mois (12) + 4 Semaines'
                          : 'Vulnerable Organs by 4 Seasons & 12 Months + 4-Week Schedule'}
                    </h2>
                  </div>

                  {/* Mode Switcher: 4 Seasons vs 12 Months */}
                  <div className="inline-flex rounded-xl bg-[#07120c] p-1 border border-[#10b981]/30">
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playPop()
                        setHeroChronoMode('seasons')
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                        heroChronoMode === 'seasons'
                          ? 'bg-[#10b981] text-[#050b07]'
                          : 'text-[#a7bfb0] hover:text-white'
                      }`}
                    >
                      {lang === 'ar' ? 'حسب الفصول (4 فصول)' : lang === 'fr' ? 'Par Saison (4)' : 'By 4 Seasons'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playPop()
                        setHeroChronoMode('months')
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                        heroChronoMode === 'months'
                          ? 'bg-[#f59e0b] text-[#050b07]'
                          : 'text-[#a7bfb0] hover:text-white'
                      }`}
                    >
                      {lang === 'ar' ? 'حسب الشهور (12 شهراً)' : lang === 'fr' ? 'Par Mois (12 Mois)' : 'By 12 Months'}
                    </button>
                  </div>
                </div>

                {/* 4 Season Buttons OR 12 Month Buttons */}
                {heroChronoMode === 'seasons' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(
                      [
                        {
                          key: 'winter',
                          ar: 'الشتاء (الليالي: دجنبر–فبراير)',
                          fr: 'Hiver (Déc–Fév)',
                          en: 'Winter (Dec–Feb)',
                        },
                        {
                          key: 'spring',
                          ar: 'الربيع (البكور: مارس–ماي)',
                          fr: 'Printemps (Mar–Mai)',
                          en: 'Spring (Mar–May)',
                        },
                        {
                          key: 'summer',
                          ar: 'الصيف (الصمايم: يونيو–غشت)',
                          fr: 'Été (Juin–Août)',
                          en: 'Summer (Jun–Aug)',
                        },
                        {
                          key: 'autumn',
                          ar: 'الخريف (شتنبر–نونبر)',
                          fr: 'Automne (Sep–Nov)',
                          en: 'Autumn (Sep–Nov)',
                        },
                      ] as const
                    ).map((s) => {
                      const active = heroSeasonKey === s.key
                      return (
                        <button
                          key={s.key}
                          type="button"
                          onClick={() => {
                            sounds.playPop()
                            setHeroSeasonKey(s.key)
                          }}
                          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold cursor-pointer border transition-all ${
                            active
                              ? 'bg-[#10b981] text-[#050b07] border-[#34d399] shadow-lg shadow-[#10b981]/25'
                              : 'bg-[#07120c] text-[#a7bfb0] border-white/10 hover:border-[#10b981]/40 hover:text-white'
                          }`}
                        >
                          {lang === 'ar' ? s.ar : lang === 'fr' ? s.fr : s.en}
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
                      {t.months.map((mName, idx) => {
                        const mNum = idx + 1
                        const active = heroMonthNum === mNum
                        const countInMonth = MOROCCAN_PRODUCE.filter((p) =>
                          p.seasonality.peakMonths.includes(mNum)
                        ).length
                        return (
                          <button
                            key={mNum}
                            type="button"
                            onClick={() => {
                              sounds.playPop()
                              setHeroMonthNum(mNum)
                              setSelectedMonthFilter(String(mNum))
                            }}
                            className={`p-2 rounded-xl text-center cursor-pointer border transition-all ${
                              active
                                ? 'bg-[#f59e0b] text-[#050b07] border-[#fbbf24] shadow-md'
                                : 'bg-[#07120c] text-[#a7bfb0] border-white/10 hover:border-[#f59e0b]/40 hover:text-white'
                            }`}
                          >
                            <span className="block font-mono-num text-[10px] opacity-80">
                              {String(mNum).padStart(2, '0')}
                            </span>
                            <span className="block text-xs font-extrabold truncate">{mName}</span>
                            <span className="block font-mono-num text-[10px] mt-0.5 font-bold">
                              {countInMonth} {lang === 'ar' ? 'صنف' : 'sp.'}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    {/* Selected Month Organ & 4-Week Detail Card */}
                    {MONTHLY_ORGAN_ATLAS[heroMonthNum] && (
                      <div className="rounded-2xl bg-[#07120c] border border-[#f59e0b]/35 p-5 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                          <div>
                            <span className="text-xs font-extrabold text-[#fbbf24] block">
                              {MONTHLY_ORGAN_ATLAS[heroMonthNum].moroccanSolarName[lang]}
                            </span>
                            <p className="text-xs text-[#a7bfb0] mt-1">
                              {MONTHLY_ORGAN_ATLAS[heroMonthNum].climateAndBodySummary[lang]}
                            </p>
                          </div>
                          {selectedMonthFilter !== 'all' && (
                            <button
                              type="button"
                              onClick={() => setSelectedMonthFilter('all')}
                              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white cursor-pointer"
                            >
                              {lang === 'ar' ? 'إظهار كل الشهور' : 'Afficher tous les mois'}
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                          <div className="lg:col-span-5 space-y-2.5">
                            {MONTHLY_ORGAN_ATLAS[heroMonthNum].primaryWeakOrgans.map((mo, i) => (
                              <div
                                key={i}
                                className="rounded-xl bg-[#0b1a12] border border-white/10 p-3.5 space-y-1.5"
                              >
                                <div className="text-sm font-extrabold text-[#fbbf24]">
                                  {mo.name[lang]}
                                </div>
                                <p className="text-xs text-[#a7bfb0]">{mo.whyStressed[lang]}</p>
                                <div className="text-[11px] text-[#6ee7b7] bg-[#10b981]/10 rounded-lg px-2.5 py-1">
                                  {mo.neededNutrients[lang]}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {MONTHLY_ORGAN_ATLAS[heroMonthNum].fourWeeksOfMonth.map((w) => (
                              <div
                                key={w.week}
                                className="rounded-xl bg-[#0b1a12] border border-[#f59e0b]/25 p-3.5 space-y-1.5"
                              >
                                <div className="text-xs font-extrabold text-[#34d399]">
                                  {w.focus[lang]}
                                </div>
                                <p className="text-xs text-[#a7bfb0] leading-relaxed">
                                  {w.protocol[lang]}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Split Responsive Grid: Weak Organs (Left 5 cols) + 4-Week Schedule (Right 7 cols) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left 5 Cols: Vulnerable Organs in Selected Season */}
                  <div className="lg:col-span-5 rounded-2xl bg-[#07120c] border border-[#10b981]/20 p-5 space-y-4">
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <span className="inline-flex items-center gap-2 text-xs font-extrabold text-[#fbbf24]">
                        <ShieldAlert className="w-4 h-4 text-[#f59e0b]" />
                        {lang === 'ar'
                          ? 'الأعضاء المتعبة في هذا الفصل ولماذا تحتاج الدعم:'
                          : lang === 'fr'
                            ? 'Organes sollicités cette saison :'
                            : 'Organs vulnerable this season:'}
                      </span>
                      <span className="text-[11px] font-bold text-[#34d399]">
                        {activeHeroSeasonProfile.monthsLabel[lang]}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {activeHeroSeasonProfile.weakOrgans.map((org) => (
                        <div
                          key={org.id}
                          className="rounded-xl bg-[#0b1a12] border border-white/10 p-3.5 space-y-2"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="text-sm font-extrabold text-[#f0f7f2]">
                              {org.organName[lang]}
                            </h3>
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                org.vulnerabilityLevel === 'critical'
                                  ? 'bg-[#f43f5e]/20 text-[#fda4af] border border-[#f43f5e]/30'
                                  : 'bg-[#f59e0b]/20 text-[#fcd34d] border border-[#f59e0b]/30'
                              }`}
                            >
                              {org.vulnerabilityLevel === 'critical'
                                ? lang === 'ar'
                                  ? 'أولوية قصوى'
                                  : 'Priorité Critique'
                                : lang === 'ar'
                                  ? 'حساسية عالية'
                                  : 'Haute Sensibilité'}
                            </span>
                          </div>
                          <p className="text-xs text-[#a7bfb0] leading-relaxed">
                            {org.whyWeakInThisSeason[lang]}
                          </p>
                          <div className="text-[11px] text-[#6ee7b7] bg-[#10b981]/10 border border-[#10b981]/20 rounded-lg px-2.5 py-1.5">
                            <strong className="text-[#34d399]">
                              {lang === 'ar' ? 'ما يحتاجه العضو: ' : 'Besoins : '}
                            </strong>
                            {org.whatItNeeds[lang]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right 7 Cols: 4-Week Organ Recovery Schedule */}
                  <div className="lg:col-span-7 rounded-2xl bg-[#07120c] border border-[#10b981]/20 p-5 space-y-4">
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <span className="inline-flex items-center gap-2 text-xs font-extrabold text-[#34d399]">
                        <Clock className="w-4 h-4 text-[#10b981]" />
                        {lang === 'ar'
                          ? 'البرنامج الأسبوعي لترميم الأعضاء (4 أسابيع في كل فصل):'
                          : lang === 'fr'
                            ? 'Programme de Régénération sur 4 Semaines :'
                            : '4-Week Seasonal Organ Recovery Schedule:'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {activeHeroSeasonProfile.weeklySchedule.map((wk) => (
                        <div
                          key={wk.weekNumber}
                          className="rounded-xl bg-[#0b1a12] border border-[#10b981]/20 p-4 flex flex-col justify-between gap-3"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="px-2.5 py-0.5 rounded-lg bg-[#10b981] text-[#050b07] font-mono-num text-xs font-extrabold">
                                {lang === 'ar'
                                  ? `الأسبوع ${wk.weekNumber}`
                                  : `Semaine ${wk.weekNumber}`}
                              </span>
                              <span className="text-xs font-bold text-[#fbbf24]">
                                {wk.focusOrgan[lang]}
                              </span>
                            </div>

                            <h4 className="text-sm font-extrabold text-[#f0f7f2] leading-snug">
                              {wk.weekTitle[lang]}
                            </h4>

                            <p className="text-xs text-[#a7bfb0] leading-relaxed">
                              {wk.dailyProtocol[lang]}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                            {wk.featuredProduceIds.map((pid) => {
                              const pItem = MOROCCAN_PRODUCE.find((x) => x.id === pid)
                              if (!pItem) return null
                              const pName =
                                lang === 'ar'
                                  ? pItem.nameDarijaArabic
                                  : lang === 'fr'
                                    ? pItem.nameFrench
                                    : pItem.nameEnglish
                              return (
                                <button
                                  key={pid}
                                  type="button"
                                  onClick={() => setActiveProduce(pItem)}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#10b981]/15 hover:bg-[#10b981] text-[#6ee7b7] hover:text-[#050b07] border border-[#10b981]/30 text-xs font-bold cursor-pointer transition-colors"
                                >
                                  <img
                                    src={pItem.imageUrl}
                                    alt=""
                                    className="w-4 h-4 rounded-full object-cover shrink-0"
                                  />
                                  <span>{pName}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* STAGE 2: MULTI-AXIS SEARCH, SEASON, 12-MONTH & TARGET ORGAN FILTER MATRIX */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div className="md:col-span-5 relative">
                    <Search className="pointer-events-none absolute top-1/2 start-3.5 h-4 w-4 -translate-y-1/2 text-[#34d399]" />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t.searchPlaceholder}
                      className="w-full rounded-xl border border-[#10b981]/30 bg-[#07120c] ps-10 pe-4 py-3 text-xs sm:text-sm text-[#f0f7f2] placeholder-[#6e8a79] focus:border-[#34d399] focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <select
                      aria-label="Filter by category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full rounded-xl border border-[#10b981]/30 bg-[#07120c] px-3 py-3 text-xs sm:text-sm font-bold text-[#f0f7f2] focus:border-[#34d399] focus:outline-none"
                    >
                      <option value="all">{t.allCategories}</option>
                      <option value="fruit">{t.catFruit}</option>
                      <option value="vegetable">{t.catVegetable}</option>
                      <option value="tuber_root">{t.catTuberRoot}</option>
                      <option value="herb_spice">{t.catHerbSpice}</option>
                      <option value="legume_seed">{t.catLegumeSeed}</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <select
                      aria-label="Filter by season"
                      value={selectedSeasonFilter}
                      onChange={(e) => setSelectedSeasonFilter(e.target.value)}
                      className="w-full rounded-xl border border-[#10b981]/30 bg-[#07120c] px-3 py-3 text-xs sm:text-sm font-bold text-[#f0f7f2] focus:border-[#34d399] focus:outline-none"
                    >
                      <option value="all">{t.allSeasons}</option>
                      <option value="peak_now">★ {t.seasonInPeakNow}</option>
                      <option value="winter">{t.seasonWinter}</option>
                      <option value="spring">{t.seasonSpring}</option>
                      <option value="summer">{t.seasonSummer}</option>
                      <option value="autumn">{t.seasonAutumn}</option>
                    </select>
                  </div>

                  <div className="md:col-span-3">
                    <select
                      aria-label="Filter by month"
                      value={selectedMonthFilter}
                      onChange={(e) => setSelectedMonthFilter(e.target.value)}
                      className="w-full rounded-xl border border-[#f59e0b]/40 bg-[#07120c] px-3 py-3 text-xs sm:text-sm font-bold text-[#fbbf24] focus:border-[#fbbf24] focus:outline-none"
                    >
                      <option value="all">
                        {lang === 'ar' ? 'كل الشهور (12 شهراً)' : lang === 'fr' ? 'Tous les mois (1–12)' : 'All 12 Months'}
                      </option>
                      {t.months.map((m, idx) => (
                        <option key={idx + 1} value={String(idx + 1)}>
                          {idx + 1}. {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Organ Filter Pills */}
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 font-bold text-[#34d399]">
                      <Filter className="w-3.5 h-3.5" />
                      {lang === 'ar'
                        ? 'تصفية حسب العضو أو الهدف العلاجي:'
                        : 'Filtrer par organe cible :'}
                    </span>
                    <span className="font-mono-num font-bold text-[#fbbf24]">
                      {filteredProduce.length} / {MOROCCAN_PRODUCE.length}{' '}
                      {lang === 'ar' ? 'صنف معروض' : 'spécimens'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        { id: 'all', label: t.allOrgans },
                        { id: 'immunity', label: t.organImmunity },
                        { id: 'liver', label: t.organLiver },
                        { id: 'heart', label: t.organHeart },
                        { id: 'digestion', label: t.organDigestion },
                        { id: 'blood_sugar', label: t.organBloodSugar },
                        { id: 'brain', label: t.organBrain },
                        { id: 'eyes_skin', label: t.organEyesSkin },
                        { id: 'anemia_iron', label: t.organAnemiaIron },
                        { id: 'bones', label: t.organBones },
                      ] as const
                    ).map((org) => {
                      const active = selectedOrganFilter === org.id
                      return (
                        <button
                          key={org.id}
                          type="button"
                          onClick={() => setSelectedOrganFilter(org.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border ${
                            active
                              ? 'bg-[#10b981] text-[#050b07] border-[#34d399] shadow-md'
                              : 'bg-[#07120c] text-[#a7bfb0] border-white/10 hover:border-[#10b981]/40 hover:text-white'
                          }`}
                        >
                          {org.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* Produce Specimen Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProduce.map((item, idx) => (
                <ProduceCard
                  key={item.id}
                  item={item}
                  index={idx}
                  lang={lang}
                  activeRegion={activeRegion}
                  onSelect={(selected) => setActiveProduce(selected)}
                />
              ))}
            </section>
          </>
        )}

        {activeTab === 'seasons' && (
          <SeasonalHarvestCalendar
            produceList={MOROCCAN_PRODUCE}
            lang={lang}
            activeRegion={activeRegion}
            onSelectProduce={(item) => setActiveProduce(item)}
          />
        )}

        {activeTab === 'benefits' && (
          <HealthBenefitsExplorer
            produceList={MOROCCAN_PRODUCE}
            lang={lang}
            activeRegion={activeRegion}
            onSelectProduce={(item) => setActiveProduce(item)}
          />
        )}

        {activeTab === 'map' && (
          <MoroccanTerroirMap
            produceList={MOROCCAN_PRODUCE}
            lang={lang}
            selectedRegionId={selectedRegionId}
            onSelectRegionId={setSelectedRegionId}
            onSelectProduce={(item) => setActiveProduce(item)}
          />
        )}

        {activeTab === 'basket' && (
          <SoukQoffaAndComparator
            produceList={MOROCCAN_PRODUCE}
            lang={lang}
            basket={basket}
            setBasket={setBasket}
            onSelectProduce={(item) => setActiveProduce(item)}
          />
        )}

        {activeTab === 'recipes' && (
          <SoukFreshnessAndRecipes
            mode="recipes"
            produceList={MOROCCAN_PRODUCE}
            lang={lang}
            onSelectProduce={(item) => setActiveProduce(item)}
          />
        )}

        {activeTab === 'market' && (
          <SoukFreshnessAndRecipes
            mode="market"
            produceList={MOROCCAN_PRODUCE}
            lang={lang}
            onSelectProduce={(item) => setActiveProduce(item)}
          />
        )}
      </main>

      {/* Dark Bio-Apothecary Footer */}
      <footer className="relative z-10 mt-16 border-t border-[#10b981]/20 bg-[#040906] py-8">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a7bfb0]">
          <div className="flex items-center gap-2.5">
            <Sprout className="h-4 w-4 text-[#34d399]" />
            <span className="font-bold text-[#f0f7f2]">{t.siteTitle}</span>
            <span>—</span>
            <span>{t.footerMadeWith}</span>
          </div>
          <div className="flex items-center gap-3 font-mono-num text-[11px]">
            <span className="text-[#34d399] font-bold">
              <Sparkles className="inline h-3.5 w-3.5 me-1" />
              CODEX BOTANICA MAROC • 31 SPÉCIMENS
            </span>
            <span>•</span>
            <a
              href="https://github.com/Bosaj"
              target="_blank"
              rel="noreferrer"
              className="text-[#fbbf24] font-bold hover:underline"
            >
              @Bosaj
            </a>
          </div>
        </div>
      </footer>

      {/* Detailed Specimen Modal */}
      {activeProduce && (
        <ProduceModal
          item={activeProduce}
          lang={lang}
          onClose={() => setActiveProduce(null)}
          onAddToBasket={handleAddToBasket}
        />
      )}
    </div>
  )
}
