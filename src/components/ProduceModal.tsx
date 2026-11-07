import React, { useState } from 'react'
import {
  X,
  Volume2,
  HeartPulse,
  Calendar,
  MapPin,
  Sparkles,
  CheckCircle2,
  Award,
  ShoppingBasket,
  UtensilsCrossed,
  Flame,
  ShieldCheck,
  BookOpen,
  Camera,
} from 'lucide-react'
import type { ProduceItem, MoroccanProduceRecipe } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'
import { speakDarija } from '../lib/speech'
import { MOROCCAN_PRODUCE_RECIPES } from '../data/recipes'
import { getProduceSeasonalOrganRole } from '../data/seasonalOrgans'

interface ProduceModalProps {
  item: ProduceItem
  lang: SupportedLanguage
  onClose: () => void
  onAddToBasket: (produceId: string) => void
  onSelectRecipe?: (recipe: MoroccanProduceRecipe) => void
}

export const ProduceModal: React.FC<ProduceModalProps> = ({
  item,
  lang,
  onClose,
  onAddToBasket,
}) => {
  const t = STRINGS[lang]
  const [activeModalTab, setActiveModalTab] = useState<'benefits' | 'seasons_dialects' | 'souk_guide'>('benefits')
  const [portionGrams, setPortionGrams] = useState<number>(100)
  const [addedFeedback, setAddedFeedback] = useState(false)
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0)

  const seasonalOrganRole = getProduceSeasonalOrganRole(item.id)
  const galleryPhotos = item.galleryImages?.length
    ? item.galleryImages
    : [{ url: item.imageUrl, captionAr: item.nameDarijaArabic, captionFr: item.nameFrench, captionEn: item.nameEnglish }]
  const activeHeroPhoto = galleryPhotos[selectedGalleryIdx] || galleryPhotos[0]!

  const scale = portionGrams / 100
  const n = item.nutrition

  const primaryName =
    lang === 'ar' ? item.nameDarijaArabic : lang === 'fr' ? item.nameFrench : item.nameEnglish

  const matchingRecipes = MOROCCAN_PRODUCE_RECIPES.filter((r) =>
    r.featuredProduceIds.includes(item.id)
  )

  const handleAdd = () => {
    onAddToBasket(item.id)
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 1800)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={primaryName}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="double-bezel my-auto w-full max-w-4xl max-h-[92dvh] overflow-hidden flex flex-col"
      >
        <div className="double-bezel-inner flex flex-col max-h-[90dvh] overflow-hidden">
          {/* Top Hero Header */}
          <div className="relative h-60 sm:h-72 w-full shrink-0 overflow-hidden bg-[#07120c]">
            <img
              src={activeHeroPhoto.url}
              alt={primaryName}
              className="h-full w-full object-cover opacity-90 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111610] via-[#111610]/55 to-black/40" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 end-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#07120c]/80 text-[#f0f7f2] hover:border-[#10b981] hover:text-[#34d399]"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Audio & IGP Top Strip */}
            <div className="absolute top-4 start-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => speakDarija(item.nameDarijaArabic, item.audioPhonetic, lang)}
                className="inline-flex items-center gap-2 rounded-full border border-[#10b981]/40 bg-[#07120c]/85 px-3.5 py-1.5 text-xs font-bold text-[#6ee7b7] backdrop-blur-md"
              >
                <Volume2 className="h-4 w-4 text-[#34d399]" />
                <span>{t.listenPronunciation}</span>
              </button>
              {item.pricing.igpLabel && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e59a38]/50 bg-[#261805]/90 px-3 py-1 font-mono text-xs font-bold text-[#fcd34d]">
                  <Award className="h-3.5 w-3.5" />
                  {item.pricing.igpLabel}
                </span>
              )}
            </div>

            {/* Bottom Title Info */}
            <div className="absolute bottom-4 inset-x-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#6ee7b7]">
                  <span>{item.scientificName}</span>
                  <span>•</span>
                  <span>{item.botanicalFamily}</span>
                  <span>•</span>
                  <span>{item.nameAmazigh}</span>
                </div>
                <h2 className="mt-1 font-editorial text-2xl sm:text-3xl font-bold text-[#f0f7f2]">
                  {primaryName}
                </h2>
                <p className="mt-1 text-xs text-[#d1e5d8] max-w-2xl">
                  {item.description[lang]}
                </p>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#10b981] px-4 py-2.5 text-xs font-bold text-[#050b07] shadow-lg hover:bg-[#5ec276]"
              >
                <ShoppingBasket className="h-4 w-4" />
                <span>
                  {addedFeedback
                    ? lang === 'ar'
                      ? '✓ أُضيفت لقفة السوق'
                      : '✓ Ajouté au panier'
                    : lang === 'ar'
                      ? 'أضف لقفة السوق'
                      : lang === 'fr'
                        ? 'Ajouter au Panier Souk'
                        : 'Add to Souk Qoffa'}
                </span>
              </button>
            </div>
          </div>

          {/* Modal Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#0d110c] px-5 py-2.5 overflow-x-auto shrink-0">
            <button
              type="button"
              onClick={() => setActiveModalTab('benefits')}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeModalTab === 'benefits'
                  ? 'bg-[#10b981] text-[#050b07]'
                  : 'text-[#84a391] hover:text-[#f0f7f2]'
              }`}
            >
              <HeartPulse className="h-4 w-4" />
              <span>
                {lang === 'ar'
                  ? 'الفوائد العلاجية والقيمة الغذائية'
                  : lang === 'fr'
                    ? 'Bienfaits Cliniques & Nutrition'
                    : 'Clinical Benefits & Nutrition'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModalTab('seasons_dialects')}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeModalTab === 'seasons_dialects'
                  ? 'bg-[#10b981] text-[#050b07]'
                  : 'text-[#84a391] hover:text-[#f0f7f2]'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>
                {lang === 'ar'
                  ? 'المواسم الفلاحية واللهجات المغربية'
                  : lang === 'fr'
                    ? 'Calendrier 12 Mois & Dialectes'
                    : '12-Month Seasons & Dialects'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModalTab('souk_guide')}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeModalTab === 'souk_guide'
                  ? 'bg-[#10b981] text-[#050b07]'
                  : 'text-[#84a391] hover:text-[#f0f7f2]'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>
                {lang === 'ar'
                  ? 'دليل السوق، الحفظ والوصفات'
                  : lang === 'fr'
                    ? 'Guide Souk, Conservation & Recettes'
                    : 'Souk Selection, Storage & Recipes'}
              </span>
            </button>
          </div>

          {/* Scrollable Tab Content */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
            {/* Multi-Angle Real Photo Gallery Strip */}
            {galleryPhotos.length > 1 && (
              <div className="rounded-2xl border border-white/10 bg-[#0a140e] p-3.5">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#6ee7b7]">
                    <Camera className="h-3.5 w-3.5 text-[#34d399]" />
                    {lang === 'ar'
                      ? `معرض الصور الحقيقية (${galleryPhotos.length} زوايا: الثمرة، المقطع الداخلي، والحقل)`
                      : lang === 'fr'
                        ? `Galerie Photos Réelles (${galleryPhotos.length} vues)`
                        : `Real Botanical Photo Gallery (${galleryPhotos.length} views)`}
                  </span>
                  <span className="text-[11px] text-[#a7bfb0]">
                    {lang === 'ar'
                      ? activeHeroPhoto.captionAr
                      : lang === 'fr'
                        ? activeHeroPhoto.captionFr
                        : activeHeroPhoto.captionEn}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {galleryPhotos.map((photo, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedGalleryIdx(idx)}
                      className={`group relative h-20 sm:h-24 overflow-hidden rounded-xl border text-start transition ${
                        selectedGalleryIdx === idx
                          ? 'border-2 border-[#10b981] ring-2 ring-[#4ea865]/30'
                          : 'border-white/10 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.captionEn}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-black/75 px-2 py-1 text-[10px] text-[#f0f7f2] truncate">
                        {lang === 'ar' ? photo.captionAr : lang === 'fr' ? photo.captionFr : photo.captionEn}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Seasonal Weak Organ & Weekly Recovery Prescription Card */}
            {seasonalOrganRole && (
              <div className="rounded-2xl border-2 border-[#e59a38]/45 bg-gradient-to-r from-[#1f1608] via-[#151811] to-[#0f1912] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e59a38]/50 bg-[#f59e0b]/12 px-3 py-1 font-mono text-xs font-bold text-[#fcd34d]">
                    🩺{' '}
                    {lang === 'ar'
                      ? 'العضو الضعيف الذي يحتاج هذه الثمرة في فصلها'
                      : lang === 'fr'
                        ? 'Organe Vulnérable Ciblé dans cette Saison'
                        : 'Seasonal Weak Organ Needing This Produce'}
                  </span>
                  <span className="rounded-full border border-emerald-400/40 bg-emerald-950/60 px-3 py-1 font-mono text-xs font-bold text-emerald-300">
                    🗓️ {seasonalOrganRole.targetWeekBadge[lang]}
                  </span>
                </div>
                <h3 className="mt-3 font-editorial text-lg sm:text-xl font-bold text-[#f0f7f2]">
                  {seasonalOrganRole.weakOrganHealed[lang]}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#e7e3d6]">
                  {seasonalOrganRole.whyOrganNeedsItNow[lang]}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-[#07120c]/70 px-3.5 py-2 text-xs">
                  <span className="font-mono font-bold text-[#6ee7b7]">
                    {lang === 'ar' ? 'الجرعة الموسمية الموصى بها:' : lang === 'fr' ? 'Dose saisonnière recommandée :' : 'Recommended Seasonal Dose:'}
                  </span>
                  <span className="text-[#f0f7f2] font-medium">{seasonalOrganRole.dailyDose[lang]}</span>
                </div>
              </div>
            )}

            {activeModalTab === 'benefits' && (
              <div className="space-y-6">
                {/* Clinical Health Benefits List */}
                <div className="rounded-2xl border border-[#10b981]/25 bg-[#0d140e] p-5">
                  <h3 className="flex items-center gap-2 font-editorial text-lg font-bold text-[#6ee7b7]">
                    <HeartPulse className="h-5 w-5 text-[#34d399]" />
                    <span>
                      {lang === 'ar'
                        ? 'الفوائد الصحية والعلاجية الموثقة علمياً'
                        : lang === 'fr'
                          ? 'Bienfaits Santé & Propriétés Thérapeutiques'
                          : 'Verified Clinical Health Benefits'}
                    </span>
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {n.healthBenefits[lang].map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[#e7e3d6]">
                        <CheckCircle2 className="h-4 w-4 text-[#34d399] shrink-0 mt-1" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bioactive Phytochemicals Cards */}
                <div>
                  <h4 className="font-editorial text-base font-bold text-[#f0f7f2] mb-3 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#fbbf24]" />
                    <span>
                      {lang === 'ar'
                        ? 'المركبات النباتية النشطة (Phytochemicals)'
                        : lang === 'fr'
                          ? 'Molécules Bioactives & Phytonutriments'
                          : 'Key Bioactive Phytochemicals'}
                    </span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {n.bioactiveCompounds.map((comp) => (
                      <div
                        key={comp.name}
                        className="rounded-xl border border-[#f59e0b]/30 bg-[#18140d] p-4"
                      >
                        <span className="font-mono text-xs font-bold text-[#fcd34d] block">
                          {comp.name}
                        </span>
                        <p className="mt-1.5 text-xs text-[#d1e5d8] leading-relaxed">
                          {lang === 'ar' ? comp.roleAr : lang === 'fr' ? comp.roleFr : comp.roleEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Synergy Tip & Traditional Moroccan Remedy */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-[#10b981]/25 bg-[#101811] p-4">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#6ee7b7]">
                      <Sparkles className="h-3.5 w-3.5" />
                      {lang === 'ar'
                        ? 'سر التآزر والامتصاص الغذائي في المطبخ المغربي'
                        : lang === 'fr'
                          ? 'Secret de Synergie Nutritionnelle Marocaine'
                          : 'Moroccan Culinary Bioavailability Secret'}
                    </span>
                    <p className="mt-2 text-xs leading-relaxed text-[#e7e3d6]">
                      {n.synergyTip[lang]}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#f59e0b]/30 bg-[#18130c] p-4">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#fcd34d]">
                      <BookOpen className="h-3.5 w-3.5" />
                      {lang === 'ar'
                        ? 'التداوي الطبيعي في العرف المغربي الأصيل'
                        : lang === 'fr'
                          ? 'Remède Traditionnel Marocain'
                          : 'Traditional Moroccan Folk Remedy'}
                    </span>
                    <p className="mt-2 text-xs leading-relaxed text-[#e7e3d6]">
                      {n.traditionalMoroccanRemedy[lang]}
                    </p>
                  </div>
                </div>

                {/* Interactive Portion Calculator */}
                <div className="rounded-2xl border border-white/10 bg-[#0a140e] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                      <h4 className="font-editorial text-base font-bold text-[#f0f7f2]">
                        {lang === 'ar'
                          ? `التركيب الغذائي الدقيق (لكل ${portionGrams} غرام)`
                          : lang === 'fr'
                            ? `Profil Nutritionnel Détaillé (pour ${portionGrams} g)`
                            : `Nutritional Breakdown (per ${portionGrams}g)`}
                      </h4>
                      <span className="text-xs text-[#84a391]">
                        {lang === 'ar'
                          ? 'غير الكمية لحساب الفيتامينات والمعادن والألياف:'
                          : 'Ajustez la portion pour recalculer les apports :'}
                      </span>
                    </div>
                    <div className="inline-flex rounded-xl border border-white/10 bg-[#141a13] p-1 font-mono text-xs">
                      {[100, 200, 350, 500].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setPortionGrams(g)}
                          className={`rounded-lg px-3 py-1 font-bold transition ${
                            portionGrams === g
                              ? 'bg-[#10b981] text-[#050b07]'
                              : 'text-[#84a391] hover:text-[#f0f7f2]'
                          }`}
                        >
                          {g}g
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 font-mono">
                    <div className="rounded-xl border border-[#f5f2e9]/8 bg-[#121811] p-3 text-center">
                      <span className="block text-[10px] text-[#84a391]">
                        <Flame className="inline h-3 w-3 text-orange-400 mr-0.5" />
                        Calories
                      </span>
                      <span className="text-sm font-bold text-[#f0f7f2]">
                        {Math.round(n.calories * scale)} kcal
                      </span>
                    </div>
                    <div className="rounded-xl border border-[#f5f2e9]/8 bg-[#121811] p-3 text-center">
                      <span className="block text-[10px] text-[#84a391]">{t.glycemicIndexLabel}</span>
                      <span className="text-sm font-bold text-emerald-400">
                        GI {n.glycemicIndex}
                      </span>
                    </div>
                    <div className="rounded-xl border border-[#f5f2e9]/8 bg-[#121811] p-3 text-center">
                      <span className="block text-[10px] text-[#84a391]">{t.oracScoreLabel}</span>
                      <span className="text-sm font-bold text-[#fcd34d]">
                        {Math.round(n.antioxidantOrac * scale)}
                      </span>
                    </div>
                    <div className="rounded-xl border border-[#f5f2e9]/8 bg-[#121811] p-3 text-center">
                      <span className="block text-[10px] text-[#84a391]">{t.fiberLabel}</span>
                      <span className="text-sm font-bold text-[#6ee7b7]">
                        {(n.fiberGrams * scale).toFixed(1)} g
                      </span>
                    </div>
                    <div className="rounded-xl border border-[#f5f2e9]/8 bg-[#121811] p-3 text-center">
                      <span className="block text-[10px] text-[#84a391]">{t.vitaminCLabel}</span>
                      <span className="text-sm font-bold text-amber-300">
                        {(n.vitaminC_mg * scale).toFixed(1)} mg
                      </span>
                    </div>
                    <div className="rounded-xl border border-[#f5f2e9]/8 bg-[#121811] p-3 text-center">
                      <span className="block text-[10px] text-[#84a391]">Potassium (K)</span>
                      <span className="text-sm font-bold text-cyan-300">
                        {Math.round(n.potassiumMg * scale)} mg
                      </span>
                    </div>
                    <div className="rounded-xl border border-[#f5f2e9]/8 bg-[#121811] p-3 text-center">
                      <span className="block text-[10px] text-[#84a391]">Magnesium</span>
                      <span className="text-sm font-bold text-[#f0f7f2]">
                        {Math.round(n.magnesiumMg * scale)} mg
                      </span>
                    </div>
                    <div className="rounded-xl border border-[#f5f2e9]/8 bg-[#121811] p-3 text-center">
                      <span className="block text-[10px] text-[#84a391]">Calcium</span>
                      <span className="text-sm font-bold text-[#f0f7f2]">
                        {Math.round(n.calciumMg * scale)} mg
                      </span>
                    </div>
                    <div className="rounded-xl border border-[#f5f2e9]/8 bg-[#121811] p-3 text-center">
                      <span className="block text-[10px] text-[#84a391]">Iron (Fe)</span>
                      <span className="text-sm font-bold text-rose-300">
                        {(n.ironMg * scale).toFixed(2)} mg
                      </span>
                    </div>
                    <div className="rounded-xl border border-[#f5f2e9]/8 bg-[#121811] p-3 text-center">
                      <span className="block text-[10px] text-[#84a391]">Folate (B9)</span>
                      <span className="text-sm font-bold text-[#f0f7f2]">
                        {Math.round(n.folateMcg * scale)} µg
                      </span>
                    </div>
                    <div className="rounded-xl border border-[#f5f2e9]/8 bg-[#121811] p-3 text-center">
                      <span className="block text-[10px] text-[#84a391]">Vitamin A</span>
                      <span className="text-sm font-bold text-[#f0f7f2]">
                        {Math.round(n.vitaminA_iu * scale)} IU
                      </span>
                    </div>
                    <div className="rounded-xl border border-[#f5f2e9]/8 bg-[#121811] p-3 text-center">
                      <span className="block text-[10px] text-[#84a391]">Water %</span>
                      <span className="text-sm font-bold text-sky-300">{n.waterPercent}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeModalTab === 'seasons_dialects' && (
              <div className="space-y-6">
                {/* 12-Month Harvest Matrix for this item */}
                <div className="rounded-2xl border border-white/10 bg-[#0a140e] p-5">
                  <h3 className="font-editorial text-lg font-bold text-[#f0f7f2]">
                    {lang === 'ar'
                      ? 'رزنامة الجني والوفرة في المغرب على مدار 12 شهراً'
                      : lang === 'fr'
                        ? 'Calendrier de Récolte au Maroc sur 12 Mois'
                        : '12-Month Moroccan Harvest & Availability Matrix'}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#d1e5d8] leading-relaxed">
                    {item.seasonality.harvestNotes[lang]}
                  </p>

                  <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-2 font-mono text-center">
                    {t.months.map((mName, idx) => {
                      const mNum = idx + 1
                      const isPeak = item.seasonality.peakMonths.includes(mNum)
                      const isAvail = item.seasonality.availableMonths.includes(mNum)
                      return (
                        <div
                          key={mNum}
                          className={`rounded-xl border p-2.5 ${
                            isPeak
                              ? 'border-emerald-400 bg-emerald-950/50 text-emerald-200 font-bold'
                              : isAvail
                                ? 'border-amber-400/40 bg-amber-950/30 text-amber-200'
                                : 'border-[#f5f2e9]/8 bg-[#111510] text-[#6b7280]'
                          }`}
                        >
                          <span className="block text-[10px]">M{mNum}</span>
                          <span className="block text-xs mt-0.5">{mName}</span>
                          <span className="block text-[9px] mt-1">
                            {isPeak
                              ? lang === 'ar'
                                ? '★ ذروة'
                                : '★ Pic'
                              : isAvail
                                ? lang === 'ar'
                                  ? '● متوفر'
                                  : '● Dispo'
                                : '—'}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* 4 Regional Moroccan Dialect Cards */}
                <div>
                  <h4 className="font-editorial text-base font-bold text-[#f0f7f2] mb-3">
                    {lang === 'ar'
                      ? 'التسميات المحلية في اللهجات المغربية الأربع'
                      : lang === 'fr'
                        ? 'Nomenclature Régionale dans les 4 Régions du Maroc'
                        : 'Moroccan Regional Dialect Names Across 4 Zones'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#f59e0b]/30 bg-[#15120c] p-4">
                      <span className="font-mono text-xs font-bold text-[#fcd34d]">
                        🧭 {lang === 'ar' ? 'الشرق والريف (وجدة، بركان، الناظور، فجيج)' : 'Oriental & Rif (Oujda, Berkane, Nador)'}
                      </span>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.regionalNames.oriental.map((name) => (
                          <span key={name} className="rounded-lg bg-[#07120c] px-2.5 py-1 text-xs font-semibold text-[#f0f7f2]">
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-[#10b981]/25 bg-[#0d150f] p-4">
                      <span className="font-mono text-xs font-bold text-[#6ee7b7]">
                        🌊 {lang === 'ar' ? 'الشمال وجبالة (طنجة، تطوان، شفشاون، العرائش)' : 'Chamal & Nord (Tanger, Tétouan, Larache)'}
                      </span>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.regionalNames.chamal.map((name) => (
                          <span key={name} className="rounded-lg bg-[#07120c] px-2.5 py-1 text-xs font-semibold text-[#f0f7f2]">
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-[#07120c] p-4">
                      <span className="font-mono text-xs font-bold text-[#e7e3d6]">
                        🏛️ {lang === 'ar' ? 'الوسط، فاس، الأطلس ودكالة (الدار البيضاء، فاس، مكناس، مراكش)' : 'Centre, Saïss, Atlas & Doukkala'}
                      </span>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.regionalNames.centre.map((name) => (
                          <span key={name} className="rounded-lg bg-[#07120c] px-2.5 py-1 text-xs font-semibold text-[#f0f7f2]">
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-amber-500/30 bg-[#17120b] p-4">
                      <span className="font-mono text-xs font-bold text-amber-300">
                        ☀️ {lang === 'ar' ? 'سوس، تافيلالت والصحراء (أكادير، شتوكة، تارودانت، زاكورة)' : 'Souss, Tafilalet & Sud (Tashelhit / Hassani)'}
                      </span>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.regionalNames.sud.map((name) => (
                          <span key={name} className="rounded-lg bg-[#07120c] px-2.5 py-1 text-xs font-semibold text-[#f0f7f2]">
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Moroccan Terroirs */}
                <div className="rounded-2xl border border-white/10 bg-[#0a140e] p-4">
                  <span className="font-mono text-xs font-bold text-[#34d399] flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {lang === 'ar' ? 'أهم مناطق وأحواض الإنتاج الفلاحي في المغرب:' : 'Principaux bassins de production au Maroc :'}
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {item.mainTerroirs.map((terroir) => (
                      <span
                        key={terroir}
                        className="rounded-full border border-[#10b981]/25 bg-[#141f15] px-3 py-1 text-xs font-bold text-[#f0f7f2]"
                      >
                        📍 {terroir}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeModalTab === 'souk_guide' && (
              <div className="space-y-6">
                {/* How to Select at the Souk */}
                <div className="rounded-2xl border border-[#10b981]/25 bg-[#0d140e] p-5">
                  <h3 className="font-editorial text-lg font-bold text-[#6ee7b7]">
                    {lang === 'ar'
                      ? 'كيفاش تعزل الحبة المزيانة والطرية فـ السوق المغربي'
                      : lang === 'fr'
                        ? 'Comment choisir les meilleurs produits au Souk'
                        : 'How to Pick the Best & Freshest at the Moroccan Souk'}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {item.freshnessGuide[lang].map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-[#e7e3d6]">
                        <CheckCircle2 className="h-4 w-4 text-[#34d399] shrink-0 mt-1" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Storage & In-Season vs Off-Season Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-[#0a140e] p-4">
                    <h4 className="font-editorial text-base font-bold text-[#f0f7f2]">
                      {lang === 'ar' ? 'طريقة الحفظ والتخزين المنزلي' : 'Conservation & Garde'}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#d1e5d8]">
                      {item.storageAndPreservation[lang]}
                    </p>
                    <div className="mt-3 flex items-center gap-3 font-mono text-xs text-[#6ee7b7]">
                      <span>
                        ⏱ {lang === 'ar' ? `مدة الصلاحية: ~${item.storageAndPreservation.shelfLifeDays} يوم` : `Durée : ~${item.storageAndPreservation.shelfLifeDays} jours`}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#f59e0b]/30 bg-[#17120b] p-4">
                    <h4 className="font-editorial text-base font-bold text-[#fcd34d]">
                      {lang === 'ar' ? 'مقارنة ثمن وقتها vs خارج وقتها' : 'Comparatif Prix Saison vs Hors-Saison'}
                    </h4>
                    <div className="mt-3 grid grid-cols-2 gap-3 font-mono">
                      <div className="rounded-xl bg-[#07120c] p-3">
                        <span className="block text-[10px] text-emerald-400">{t.inSeasonPriceLabel}</span>
                        <span className="text-lg font-extrabold text-emerald-300">
                          {item.pricing.inSeasonMAD} MAD/{item.pricing.unit}
                        </span>
                      </div>
                      <div className="rounded-xl bg-[#07120c] p-3">
                        <span className="block text-[10px] text-rose-400">{t.offSeasonPriceLabel}</span>
                        <span className="text-lg font-extrabold text-rose-300">
                          {item.pricing.offSeasonMAD} MAD/{item.pricing.unit}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2.5 text-xs text-[#d1e5d8]">
                      {item.pricing.marketNote[lang]}
                    </p>
                  </div>
                </div>

                {/* Matching Moroccan Recipes */}
                {matchingRecipes.length > 0 && (
                  <div>
                    <h4 className="font-editorial text-base font-bold text-[#f0f7f2] mb-3 flex items-center gap-2">
                      <UtensilsCrossed className="h-4 w-4 text-[#fbbf24]" />
                      <span>
                        {lang === 'ar'
                          ? 'أطباق وطواجن مغربية يدخل فيها هذا المكون'
                          : 'Recettes Marocaines Associées'}
                      </span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {matchingRecipes.map((rec) => (
                        <div
                          key={rec.id}
                          className="rounded-xl border border-white/10 bg-[#121711] p-3.5"
                        >
                          <span className="font-editorial text-sm font-bold text-[#f0f7f2] block">
                            {lang === 'ar' ? rec.titleDarijaArabic : lang === 'fr' ? rec.titleFrench : rec.titleEnglish}
                          </span>
                          <p className="mt-1 text-xs text-[#6ee7b7]">
                            {rec.keyHealthHighlight[lang]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
