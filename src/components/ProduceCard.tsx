import React, { useState } from 'react'
import {
  Volume2,
  Calendar,
  Award,
  ArrowUpRight,
  ShieldCheck,
  Clock,
} from 'lucide-react'
import type { ProduceItem, HealthTargetOrgan } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'
import { speakDarija } from '../lib/speech'
import { getSeasonStatusForMonth, type MoroccanAgroRegion } from '../lib/moroccanTerroir'
import { getProduceSeasonalOrganRole } from '../data/seasonalOrgans'

interface ProduceCardProps {
  item: ProduceItem
  index: number
  lang: SupportedLanguage
  activeRegion: MoroccanAgroRegion
  selectedMonth?: number
  onSelect: (item: ProduceItem) => void
}

export const ProduceCard: React.FC<ProduceCardProps> = ({
  item,
  index,
  lang,
  activeRegion,
  selectedMonth = new Date().getMonth() + 1,
  onSelect,
}) => {
  const t = STRINGS[lang]
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const [imgError, setImgError] = useState(false)

  const seasonStatus = getSeasonStatusForMonth(
    item.seasonality.peakMonths,
    item.seasonality.availableMonths,
    selectedMonth
  )

  const organRole = getProduceSeasonalOrganRole(item.id)
  const gallery = organRole?.gallery || item.galleryImages || []
  const currentGalleryItem = gallery[activePhotoIndex] || gallery[0]
  const activeImgSrc = currentGalleryItem?.url || item.imageUrl

  const displayName =
    lang === 'ar'
      ? item.nameDarijaArabic
      : lang === 'fr'
        ? item.nameFrench
        : item.nameEnglish

  const regionalList =
    activeRegion.dialectZone === 'oriental'
      ? item.regionalNames.oriental
      : activeRegion.dialectZone === 'chamal'
        ? item.regionalNames.chamal
        : activeRegion.dialectZone === 'sud'
          ? item.regionalNames.sud
          : item.regionalNames.centre

  const dialectName = regionalList[0] || item.nameDarijaLatin

  const summaryText =
    lang === 'ar'
      ? item.description.ar
      : lang === 'fr'
        ? item.description.fr
        : item.description.en

  const organBadgeLabel = (organ: HealthTargetOrgan) => {
    const map: Record<HealthTargetOrgan, string> = {
      heart: t.organHeart,
      immunity: t.organImmunity,
      digestion: t.organDigestion,
      blood_sugar: t.organBloodSugar,
      brain: t.organBrain,
      liver: t.organLiver,
      eyes_skin: t.organEyesSkin,
      anemia_iron: t.organAnemiaIron,
      bones: t.organBones,
    }
    return map[organ]
  }

  const specimenNumber = String(index + 1).padStart(2, '0')

  return (
    <article
      onClick={() => onSelect(item)}
      className="herbarium-plate group relative flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Top Specimen Telemetry Bar */}
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-[#07110b] border-b border-[#10b981]/15 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2 py-0.5 rounded-md bg-[#10b981]/15 border border-[#10b981]/30 font-mono-num text-[11px] font-bold text-[#34d399] shrink-0">
            #{specimenNumber}
          </span>
          <span className="italic text-[#6e8a79] truncate text-[11px]" dir="ltr">
            {item.scientificName}
          </span>
        </div>

        {/* Season Status Pill */}
        <span
          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${
            seasonStatus === 'peak'
              ? 'bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/40'
              : seasonStatus === 'available'
                ? 'bg-[#f59e0b]/20 text-[#fcd34d] border border-[#f59e0b]/40'
                : 'bg-white/5 text-[#9ca3af] border border-white/10'
          }`}
        >
          {seasonStatus === 'peak'
            ? t.peakSeasonBadge
            : seasonStatus === 'available'
              ? t.availableSeasonBadge
              : t.offSeasonBadge}
        </span>
      </div>

      {/* Main Botanical Specimen Image + 3-Photo Thumbnail Switcher */}
      <div className="relative h-56 w-full bg-[#060e09] overflow-hidden border-b border-[#10b981]/15">
        {!imgError ? (
          <img
            src={activeImgSrc}
            alt={displayName}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#08130d] text-[#f0f7f2] p-4">
            <span className="font-display text-2xl font-bold text-[#34d399]">
              {item.nameDarijaArabic}
            </span>
            <span className="text-xs text-[#6e8a79] mt-1" dir="ltr">
              {item.scientificName}
            </span>
          </div>
        )}

        {/* Dark Obsidian Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b07] via-[#050b07]/25 to-transparent pointer-events-none" />

        {/* Top Floating Category & IGP Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="px-2.5 py-1 rounded-lg bg-[#050b07]/85 backdrop-blur-md border border-white/15 text-[11px] font-bold text-[#e2f1e8]">
            {item.category === 'fruit'
              ? t.catFruit
              : item.category === 'vegetable'
                ? t.catVegetable
                : item.category === 'herb_spice'
                  ? t.catHerbSpice
                  : item.category === 'legume_seed'
                    ? t.catLegumeSeed
                    : t.catTuberRoot}
          </span>

          {item.pricing.igpLabel && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f59e0b]/90 text-[#050b07] text-[11px] font-extrabold shadow-md">
              <Award className="w-3.5 h-3.5" />
              IGP
            </span>
          )}
        </div>

        {/* Bottom Floating 3-Photo Interactive Switcher & Audio Button */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between gap-2 z-10">
          {gallery.length > 1 ? (
            <div
              className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#050b07]/90 backdrop-blur-md border border-[#10b981]/30"
              onClick={(e) => e.stopPropagation()}
            >
              {gallery.map((g, idx) => {
                const label =
                  lang === 'ar' ? g.captionAr : lang === 'fr' ? g.captionFr : g.captionEn
                const tabText =
                  idx === 0
                    ? lang === 'ar'
                      ? '1. الثمرة'
                      : '1. Whole'
                    : idx === 1
                      ? lang === 'ar'
                        ? '2. المقطع'
                        : '2. Inside'
                      : lang === 'ar'
                        ? '3. التيروار'
                        : '3. Terroir'
                return (
                  <button
                    key={idx}
                    type="button"
                    title={label}
                    onClick={(e) => {
                      e.stopPropagation()
                      setImgError(false)
                      setActivePhotoIndex(idx)
                    }}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                      activePhotoIndex === idx
                        ? 'bg-[#10b981] text-[#050b07] shadow-sm'
                        : 'text-[#a7bfb0] hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <img
                      src={g.url}
                      alt=""
                      className="w-4 h-4 rounded object-cover border border-black/20 shrink-0"
                    />
                    <span>{tabText}</span>
                  </button>
                )
              })}
            </div>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              speakDarija(`${item.nameDarijaArabic} — ${item.nameFrench}`)
            }}
            title={t.listenPronunciation}
            className="p-2 rounded-xl bg-[#050b07]/90 hover:bg-[#10b981] text-[#34d399] hover:text-[#050b07] border border-[#10b981]/30 transition-colors cursor-pointer shrink-0"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Body — Clean Vertical Stack with ZERO Horizontal Collision */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        {/* Title + Regional Dialect + Price */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-extrabold text-[#f0f7f2] group-hover:text-[#34d399] transition-colors leading-snug">
              {displayName}
            </h3>
            <div className="text-end shrink-0 bg-[#10b981]/12 border border-[#10b981]/25 rounded-xl px-2.5 py-1">
              <span className="block font-mono-num text-sm font-extrabold text-[#34d399]">
                {item.pricing.currentSpotMAD}{' '}
                <span className="text-[10px] font-medium text-[#a7bfb0]">
                  {t.priceUnitKg}
                </span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-[#a7bfb0]">
            <span>
              {lang === 'ar'
                ? `الدارجة (${activeRegion.nameAr}):`
                : `${activeRegion.nameFr}:`}
            </span>
            <span className="font-bold text-[#f0f7f2] bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
              {dialectName}
            </span>
            <span className="text-[#6e8a79]">•</span>
            <span className="font-mono-num text-[11px] text-[#6ee7b7]">
              {item.nutrition.calories} kcal/100g
            </span>
          </div>

          <p className="text-xs text-[#a7bfb0] line-clamp-2 leading-relaxed pt-0.5">
            {summaryText}
          </p>
        </div>

        {/* SEASONAL WEAK ORGAN & WEEKLY SCHEDULE BOX — 100% Stacked, Zero Overlap */}
        {organRole && (
          <div className="rounded-2xl bg-[#07120c] border border-[#10b981]/25 p-3.5 space-y-2">
            {/* Row 1: Target Week Schedule Badge (Wraps cleanly, never overflows) */}
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#fbbf24] bg-[#f59e0b]/12 border border-[#f59e0b]/30 rounded-lg px-2.5 py-1 w-fit max-w-full">
              <Clock className="w-3.5 h-3.5 text-[#f59e0b] shrink-0" />
              <span className="break-words leading-snug">
                {organRole.targetWeekBadge[lang]}
              </span>
            </div>

            {/* Row 2: Weak Organ Healed Title (Full width, bold, connected Arabic ligatures) */}
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-extrabold text-[#ecfdf5] leading-snug break-words">
                  {organRole.weakOrganHealed[lang]}
                </div>
                <p className="text-[11px] text-[#a7bfb0] line-clamp-2 leading-relaxed mt-1">
                  {organRole.whyOrganNeedsItNow[lang]}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Target Health Organs Pills */}
        <div className="flex flex-wrap gap-1.5">
          {item.nutrition.targetOrgans.slice(0, 3).map((org) => (
            <span
              key={org}
              className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#10b981]/10 text-[#6ee7b7] border border-[#10b981]/20"
            >
              {organBadgeLabel(org)}
            </span>
          ))}
        </div>

        {/* Bottom 3-Cell Nutritional Bento Bar + Dossier Button */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="grid grid-cols-3 gap-1.5 flex-1">
            <div className="rounded-lg bg-white/[0.03] border border-white/8 px-2 py-1 text-center">
              <span className="block text-[9px] text-[#6e8a79]">GI</span>
              <span className="font-mono-num text-xs font-bold text-[#f0f7f2]">
                {item.nutrition.glycemicIndex}
              </span>
            </div>
            <div className="rounded-lg bg-white/[0.03] border border-white/8 px-2 py-1 text-center">
              <span className="block text-[9px] text-[#6e8a79]">ORAC</span>
              <span className="font-mono-num text-xs font-bold text-[#fbbf24]">
                {item.nutrition.antioxidantOrac}
              </span>
            </div>
            <div className="rounded-lg bg-white/[0.03] border border-white/8 px-2 py-1 text-center">
              <span className="block text-[9px] text-[#6e8a79]">
                {lang === 'ar' ? 'الموسم' : 'Peak'}
              </span>
              <span className="font-mono-num text-xs font-bold text-[#34d399] inline-flex items-center justify-center gap-0.5">
                <Calendar className="w-3 h-3" />
                {item.seasonality.peakMonths.length}m
              </span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#10b981] text-[#050b07] group-hover:bg-[#34d399] text-xs font-extrabold transition-colors shrink-0">
            {lang === 'ar' ? 'الملف' : 'Dossier'}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  )
}
