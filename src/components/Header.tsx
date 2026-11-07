import React, { useState } from 'react'
import {
  Sprout,
  Calendar,
  HeartPulse,
  Map,
  ShoppingBasket,
  UtensilsCrossed,
  Sparkles,
  Volume2,
  VolumeX,
  MapPin,
  TrendingDown,
  TrendingUp,
  Minus,
} from 'lucide-react'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'
import { MOROCCAN_AGRO_REGIONS } from '../lib/moroccanTerroir'
import { MOROCCAN_PRODUCE } from '../data/produce'
import { sounds } from '../lib/soundEffects'

export type NavTab =
  | 'atlas'
  | 'seasons'
  | 'benefits'
  | 'map'
  | 'basket'
  | 'recipes'
  | 'market'

interface HeaderProps {
  activeTab: NavTab
  setActiveTab: (tab: NavTab) => void
  lang: SupportedLanguage
  setLang: (lang: SupportedLanguage) => void
  selectedRegionId: string
  setSelectedRegionId: (id: string) => void
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  selectedRegionId,
  setSelectedRegionId,
}) => {
  const t = STRINGS[lang]
  const [soundEnabled, setSoundEnabled] = useState(sounds.isEnabled())

  const handleToggleSound = () => {
    const next = sounds.toggle()
    setSoundEnabled(next)
    if (next) sounds.playPop()
  }

  const navItems: {
    id: NavTab
    num: string
    label: string
    sub: string
    icon: React.ReactNode
  }[] = [
    {
      id: 'atlas',
      num: '01',
      label: t.navAtlas,
      sub:
        lang === 'ar'
          ? `${MOROCCAN_PRODUCE.length} صنف عالمي وبلدي`
          : lang === 'fr'
            ? `${MOROCCAN_PRODUCE.length} Spécimens`
            : `${MOROCCAN_PRODUCE.length} Specimens`,
      icon: <Sprout className="w-4 h-4" />,
    },
    {
      id: 'seasons',
      num: '02',
      label: t.navSeasons,
      sub: lang === 'ar' ? 'الأعضاء والأسابيع' : lang === 'fr' ? 'Organes & 4 Sem.' : 'Organs & 4 Wks',
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: 'benefits',
      num: '03',
      label: t.navBenefits,
      sub: lang === 'ar' ? 'خريطة الشفاء' : lang === 'fr' ? 'Clinique & Organes' : 'Clinical & Organs',
      icon: <HeartPulse className="w-4 h-4" />,
    },
    {
      id: 'map',
      num: '04',
      label: t.navMap,
      sub: lang === 'ar' ? '12 جهة و IGP' : lang === 'fr' ? '12 Terroirs IGP' : '12 IGP Terroirs',
      icon: <Map className="w-4 h-4" />,
    },
    {
      id: 'basket',
      num: '05',
      label: t.navBasket,
      sub: lang === 'ar' ? 'القفة والمقارن' : lang === 'fr' ? 'Qoffa & Duel' : 'Qoffa & Duel',
      icon: <ShoppingBasket className="w-4 h-4" />,
    },
    {
      id: 'recipes',
      num: '06',
      label: t.navRecipes,
      sub: lang === 'ar' ? 'شهيوات وتداوي' : lang === 'fr' ? 'Remèdes & Plats' : 'Remedies & Dishes',
      icon: <UtensilsCrossed className="w-4 h-4" />,
    },
    {
      id: 'market',
      num: '07',
      label: t.navMarket,
      sub: lang === 'ar' ? 'الفرز والخزين' : lang === 'fr' ? 'Tri & Garde' : 'Selection & Storage',
      icon: <Sparkles className="w-4 h-4" />,
    },
  ]

  const tickerProduce = MOROCCAN_PRODUCE.slice(0, 10)

  return (
    <header className="sticky top-0 z-40 bg-[#050b07]/90 backdrop-blur-xl border-b border-[#10b981]/20">
      {/* Top Wholesale Souk Telemetry Ribbon */}
      <div className="bg-[#07120c] border-b border-[#10b981]/15 px-4 py-1.5">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-[#34d399]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span>
              {lang === 'ar'
                ? 'بورصة أسواق الجملة والكرونوبيولوجيا العلاجية بالمغرب'
                : lang === 'fr'
                  ? 'OBSERVATOIRE BOTANIQUE & CHRONOBIOLOGIE DES ORGANES'
                  : 'MOROCCAN BOTANICAL & ORGAN CHRONOBIOLOGY OBSERVATORY'}
            </span>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-0.5">
            {tickerProduce.map((item) => {
              const name =
                lang === 'ar'
                  ? item.nameDarijaArabic
                  : lang === 'fr'
                    ? item.nameFrench
                    : item.nameEnglish
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-1.5 whitespace-nowrap text-[#a7bfb0] border-e border-white/10 pe-3 last:border-none"
                >
                  <span className="font-bold text-[#f0f7f2]">{name}</span>
                  <span className="font-mono-num font-bold text-[#34d399]">
                    {item.pricing.currentSpotMAD} {t.priceUnitKg}
                  </span>
                  {item.pricing.trend === 'down' ? (
                    <TrendingDown className="w-3.5 h-3.5 text-[#34d399]" />
                  ) : item.pricing.trend === 'up' ? (
                    <TrendingUp className="w-3.5 h-3.5 text-[#fbbf24]" />
                  ) : (
                    <Minus className="w-3.5 h-3.5 text-[#6e8a79]" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Command Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Brand Identity */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              sounds.playPop()
              setActiveTab('atlas')
            }}
            className="flex items-center gap-3.5 text-start group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#047857] text-[#050b07] flex flex-col items-center justify-center shadow-lg shadow-[#10b981]/20 shrink-0">
              <Sprout className="w-6 h-6 text-[#050b07]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#f0f7f2]">
                  {t.siteTitle}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#10b981]/15 text-[#34d399] border border-[#10b981]/30">
                  {lang === 'ar' ? 'أطلس الأعضاء والمواسم' : 'BIO-APOTHICAIRE'}
                </span>
              </div>
              <p className="text-xs text-[#a7bfb0] mt-0.5 max-w-xl line-clamp-1">
                {t.tagline}
              </p>
            </div>
          </button>
        </div>

        {/* Right Controls: Terroir Selector, Sound & Language Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Terroir Filter */}
          <div className="flex items-center gap-2 bg-[#0a140e] border border-[#10b981]/25 rounded-xl px-3 py-2">
            <MapPin className="w-4 h-4 text-[#fbbf24] shrink-0" />
            <label htmlFor="region-select" className="sr-only">
              Region
            </label>
            <select
              id="region-select"
              aria-label="Select Moroccan agricultural region"
              value={selectedRegionId}
              onChange={(e) => {
                sounds.playPop()
                setSelectedRegionId(e.target.value)
              }}
              className="bg-[#0a140e] text-xs font-bold text-[#f0f7f2] focus:outline-none cursor-pointer"
            >
              {MOROCCAN_AGRO_REGIONS.map((reg) => (
                <option key={reg.id} value={reg.id} className="bg-[#0a140e] text-[#f0f7f2]">
                  {lang === 'ar' ? reg.nameAr : lang === 'fr' ? reg.nameFr : reg.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            title={soundEnabled ? 'Mute UI Sounds' : 'Enable UI Sounds'}
            className="p-2.5 rounded-xl bg-[#0a140e] border border-[#10b981]/25 text-[#a7bfb0] hover:text-[#34d399] hover:border-[#10b981] cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#34d399]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Language Switcher */}
          <div
            className="inline-flex rounded-xl bg-[#0a140e] p-1 border border-[#10b981]/25"
            role="group"
            aria-label="Language switcher"
          >
            {(
              [
                { code: 'ar', label: 'العربية', aria: 'العربية' },
                { code: 'fr', label: 'FR', aria: 'Français' },
                { code: 'en', label: 'EN', aria: 'English' },
              ] as const
            ).map((l) => (
              <button
                key={l.code}
                type="button"
                aria-label={l.aria}
                onClick={() => {
                  sounds.playPop()
                  setLang(l.code)
                }}
                className={`px-3 py-1 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                  lang === l.code
                    ? 'bg-[#10b981] text-[#050b07] shadow-sm'
                    : 'text-[#a7bfb0] hover:text-[#f0f7f2]'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 7-Module Floating Workspace Dock */}
      <nav
        aria-label="Primary Herbarium Sections"
        className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-3"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  sounds.playPop()
                  setActiveTab(item.id)
                }}
                className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl text-start cursor-pointer border transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#10b981] to-[#059669] text-[#050b07] border-[#34d399] shadow-lg shadow-[#10b981]/20'
                    : 'bg-[#0a140e]/90 text-[#f0f7f2] border-white/10 hover:border-[#10b981]/40 hover:bg-[#0f1f16]'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-mono-num text-[10px] font-extrabold ${
                        isActive ? 'text-[#050b07]' : 'text-[#34d399]'
                      }`}
                    >
                      {item.num}
                    </span>
                    <span className="text-xs font-extrabold truncate">{item.label}</span>
                  </div>
                  <div
                    className={`text-[10px] truncate mt-0.5 ${
                      isActive ? 'text-[#050b07]/80 font-semibold' : 'text-[#a7bfb0]'
                    }`}
                  >
                    {item.sub}
                  </div>
                </div>
                <span className={isActive ? 'text-[#050b07] shrink-0' : 'text-[#34d399] shrink-0'}>
                  {item.icon}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
