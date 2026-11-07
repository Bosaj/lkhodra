import React, { useState } from 'react'
import {
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  Snowflake,
  Sun,
  CloudRain,
  Leaf,
  HeartPulse,
  ShieldAlert,
} from 'lucide-react'
import type { ProduceItem } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import { getSeasonStatusForMonth, type MoroccanAgroRegion } from '../lib/moroccanTerroir'
import { getSeasonOrganProfileByMonth } from '../data/seasonalOrgans'
import { MONTHLY_ORGAN_ATLAS } from '../data/monthlyOrgans'
import { ProduceCard } from './ProduceCard'
import { sounds } from '../lib/soundEffects'

interface SeasonalHarvestCalendarProps {
  produceList: ProduceItem[]
  lang: SupportedLanguage
  activeRegion: MoroccanAgroRegion
  onSelectProduce: (item: ProduceItem) => void
}

const MONTHS_META = [
  { num: 1, ar: 'يناير', fr: 'Janvier', en: 'January', season: 'winter' },
  { num: 2, ar: 'فبراير', fr: 'Février', en: 'February', season: 'winter' },
  { num: 3, ar: 'مارس', fr: 'Mars', en: 'March', season: 'spring' },
  { num: 4, ar: 'أبريل', fr: 'Avril', en: 'April', season: 'spring' },
  { num: 5, ar: 'ماي', fr: 'Mai', en: 'May', season: 'spring' },
  { num: 6, ar: 'يونيو', fr: 'Juin', en: 'June', season: 'summer' },
  { num: 7, ar: 'يوليوز', fr: 'Juillet', en: 'July', season: 'summer' },
  { num: 8, ar: 'غشت', fr: 'Août', en: 'August', season: 'summer' },
  { num: 9, ar: 'شتنبر', fr: 'Septembre', en: 'September', season: 'autumn' },
  { num: 10, ar: 'أكتوبر', fr: 'Octobre', en: 'October', season: 'autumn' },
  { num: 11, ar: 'نونبر', fr: 'Novembre', en: 'November', season: 'autumn' },
  { num: 12, ar: 'دجنبر', fr: 'Décembre', en: 'December', season: 'winter' },
]

export const SeasonalHarvestCalendar: React.FC<SeasonalHarvestCalendarProps> = ({
  produceList,
  lang,
  activeRegion,
  onSelectProduce,
}) => {
  const currentMonthNum = new Date().getMonth() + 1
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonthNum)
  const [statusFilter, setStatusFilter] = useState<'peak' | 'available' | 'all'>('peak')

  const activeMonthMeta = MONTHS_META.find((m) => m.num === selectedMonth) || MONTHS_META[0]!
  const seasonOrganProfile = getSeasonOrganProfileByMonth(selectedMonth)
  const [selectedWeekNum, setSelectedWeekNum] = useState<1 | 2 | 3 | 4>(1)
  const activeWeekPlan =
    seasonOrganProfile.weeklySchedule.find((w) => w.weekNumber === selectedWeekNum) ||
    seasonOrganProfile.weeklySchedule[0]!

  const peakItems = produceList.filter(
    (item) =>
      getSeasonStatusForMonth(
        item.seasonality.peakMonths,
        item.seasonality.availableMonths,
        selectedMonth
      ) === 'peak'
  )

  const availableItems = produceList.filter(
    (item) =>
      getSeasonStatusForMonth(
        item.seasonality.peakMonths,
        item.seasonality.availableMonths,
        selectedMonth
      ) !== 'off_season'
  )

  const displayedItems =
    statusFilter === 'peak'
      ? peakItems
      : statusFilter === 'available'
        ? availableItems
        : produceList

  const getSeasonAdvice = (season: string) => {
    if (season === 'winter') {
      return lang === 'ar'
        ? 'موسم الحوامض البركانية والسوسية، البطاطا القصبية، القوق والخرشوف، واللفت البلدي: طبيعة المغرب تمنحك فيتامين C والإنولين لتقوية المناعة وتدفئة الجسم.'
        : lang === 'fr'
          ? 'Saison des agrumes de Berkane, topinambours, artichauts et navets : le terroir marocain concentre la Vitamine C et l’inuline pour l’immunité hivernale.'
          : 'Season of Berkane citrus, sunchokes, artichokes, and turnips: Moroccan nature delivers maximum Vitamin C and prebiotic inulin for winter immunity.'
    }
    if (season === 'spring') {
      return lang === 'ar'
        ? 'موسم البواكر الخضراء (الفول الطري، الجلبانة، الفريز د اللوكوس، حب الملوك د صفرو، والنعناع الجديد): لتجديد الدم وتنشيط الكبد بعد الشتاء.'
        : lang === 'fr'
          ? 'Saison des primeurs verts (fèves, petits pois, fraises du Loukkos, cerises de Sefrou) : idéale pour la régénération sanguine et la détox printanière.'
          : 'Season of spring primeurs (fresh fava beans, sweet peas, Loukkos strawberries, Sefrou cherries) for blood renewal and spring liver cleansing.'
    }
    if (season === 'summer') {
      return lang === 'ar'
        ? 'موسم الصمايم والترطيب الخلوي (الهندية د آيت باعمران، الدلاح د زاكورة، الكرموس البلدي، الملوخية): فواكه وخضر غنية بالماء المهيكل، المغنيسيوم، والليكوبين.'
        : lang === 'fr'
          ? 'Saison d’été et d’hydratation minérale (figues de Barbarie, pastèques de Zagora, figues de Taounate, gombos) riche en magnésium et lycopène.'
          : 'Summer hydration season (Aït Baâmrane prickly pears, Zagora watermelons, Taounate figs, Mloukhiya okra) rich in magnesium and cellular water.'
    }
    return lang === 'ar'
      ? 'موسم الخريف والواحات والجبال (الرمان السفري، التمر المجهول الفيلالي، التفاح د ميدلت، السفرجل، والزعفران الحر د تاليوين): قمة مضادات الأكسدة استعداداً للشتاء.'
      : lang === 'fr'
        ? 'Saison d’automne des oasis et montagnes (Grenade Sefri, Datte Majhoul, Pomme de Midelt, Coing, Safran AOP) : le sommet des antioxydants.'
        : 'Autumn oasis and mountain harvest (Sefri pomegranate, Medjool dates, Midelt apples, quince, Taliouine saffron) packing peak antioxidants before winter.'
  }

  return (
    <section className="space-y-6">
      {/* Seasonal Wheel Banner */}
      <div className="double-bezel">
        <div className="double-bezel-inner p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#10b981]/40 bg-[#10b981]/12 px-3 py-1 font-mono text-xs font-bold text-[#6ee7b7]">
                <Calendar className="h-3.5 w-3.5" />
                {lang === 'ar'
                  ? 'التقويم الفلاحي المغربي · 12 شهراً'
                  : lang === 'fr'
                    ? 'CALENDRIER AGRICOLE MAROCAIN · 12 MOIS'
                    : 'MOROCCAN HARVEST CALENDAR · 12 MONTHS'}
              </span>
              <h2 className="mt-2 font-editorial text-2xl sm:text-3xl font-bold text-[#f0f7f2]">
                {lang === 'ar'
                  ? `شنو ناكلو فـ شهر ${activeMonthMeta.ar}؟`
                  : lang === 'fr'
                    ? `Que consommer au Maroc en ${activeMonthMeta.fr} ?`
                    : `What’s in Season in Morocco in ${activeMonthMeta.en}?`}
              </h2>
              <p className="mt-1.5 max-w-3xl text-xs sm:text-sm text-[#a7bfb0] leading-relaxed">
                {getSeasonAdvice(activeMonthMeta.season)}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 px-4 py-2.5 text-center font-mono">
                <span className="block text-xl font-extrabold text-emerald-400">
                  {peakItems.length}
                </span>
                <span className="text-[10px] text-emerald-200">
                  {lang === 'ar' ? 'في ذروة الجني' : lang === 'fr' ? 'En pleine saison' : 'Peak Harvest'}
                </span>
              </div>
              <div className="rounded-2xl border border-[#f59e0b]/30 bg-[#241909]/50 px-4 py-2.5 text-center font-mono">
                <span className="block text-xl font-extrabold text-[#fcd34d]">-52%</span>
                <span className="text-[10px] text-[#fcd34d]">
                  {lang === 'ar' ? 'توفير فـ قفة السوق' : 'Économie Souk'}
                </span>
              </div>
            </div>
          </div>

          {/* 12 Months Selector Bar */}
          <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {MONTHS_META.map((m) => {
              const isSelected = m.num === selectedMonth
              const isCurrent = m.num === currentMonthNum
              const SeasonIcon =
                m.season === 'winter'
                  ? Snowflake
                  : m.season === 'spring'
                    ? Sparkles
                    : m.season === 'summer'
                      ? Sun
                      : m.season === 'autumn'
                        ? Leaf
                        : CloudRain

              return (
                <button
                  key={m.num}
                  type="button"
                  onClick={() => {
                    sounds.playPop()
                    setSelectedMonth(m.num)
                  }}
                  className={`flex flex-col items-center justify-center rounded-xl p-2.5 font-mono transition ${
                    isSelected
                      ? 'border-2 border-[#10b981] bg-[#10b981] text-[#050b07] font-extrabold shadow-lg shadow-[#4ea865]/25'
                      : 'border border-white/10 bg-[#0a140e] text-[#a7bfb0] hover:border-[#10b981]/40 hover:text-[#f0f7f2]'
                  }`}
                >
                  <div className="flex items-center gap-1 text-[10px] opacity-80">
                    <SeasonIcon className="h-3 w-3" />
                    <span>M{m.num}</span>
                  </div>
                  <span className="mt-1 text-xs font-bold">
                    {lang === 'ar' ? m.ar : lang === 'fr' ? m.fr : m.en}
                  </span>
                  {isCurrent && (
                    <span
                      className={`mt-1 rounded-full px-1.5 py-0.2 text-[9px] font-bold ${
                        isSelected ? 'bg-[#07120c] text-[#34d399]' : 'bg-[#f59e0b]/20 text-[#fcd34d]'
                      }`}
                    >
                      {lang === 'ar' ? 'دابا' : 'Actuel'}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Selected Month Specific Organ Vulnerability & 4-Week Schedule */}
          {MONTHLY_ORGAN_ATLAS[selectedMonth] && (
            <div className="mt-5 rounded-2xl bg-[#07120c] border border-[#f59e0b]/35 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <span className="text-sm font-extrabold text-[#fbbf24] block">
                    {MONTHLY_ORGAN_ATLAS[selectedMonth].moroccanSolarName[lang]}
                  </span>
                  <p className="text-xs text-[#a7bfb0] mt-1">
                    {MONTHLY_ORGAN_ATLAS[selectedMonth].climateAndBodySummary[lang]}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-xs font-bold text-[#34d399]">
                  {lang === 'ar'
                    ? `${peakItems.length} صنفاً في ذروة الجني هذا الشهر`
                    : `${peakItems.length} espèces en pleine récolte ce mois-ci`}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-5 space-y-2.5">
                  {MONTHLY_ORGAN_ATLAS[selectedMonth].primaryWeakOrgans.map((mo, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-[#0b1a12] border border-white/10 p-3.5 space-y-1.5"
                    >
                      <div className="text-sm font-extrabold text-[#fbbf24]">
                        {mo.name[lang]}
                      </div>
                      <p className="text-xs text-[#a7bfb0] leading-relaxed">{mo.whyStressed[lang]}</p>
                      <div className="text-[11px] text-[#6ee7b7] bg-[#10b981]/10 rounded-lg px-2.5 py-1.5">
                        {mo.neededNutrients[lang]}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {MONTHLY_ORGAN_ATLAS[selectedMonth].fourWeeksOfMonth.map((w) => (
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

          {/* Filter Pills */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
            <div className="inline-flex rounded-xl border border-white/10 bg-[#0a140e] p-1 text-xs">
              <button
                type="button"
                onClick={() => setStatusFilter('peak')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 font-bold transition ${
                  statusFilter === 'peak'
                    ? 'bg-[#10b981] text-[#050b07]'
                    : 'text-[#84a391] hover:text-[#f0f7f2]'
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>
                  {lang === 'ar'
                    ? `ذروة الجني (${peakItems.length})`
                    : lang === 'fr'
                      ? `Pleine Saison (${peakItems.length})`
                      : `Peak Harvest (${peakItems.length})`}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('available')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 font-bold transition ${
                  statusFilter === 'available'
                    ? 'bg-[#f59e0b] text-[#050b07]'
                    : 'text-[#84a391] hover:text-[#f0f7f2]'
                }`}
              >
                <Clock className="h-3.5 w-3.5" />
                <span>
                  {lang === 'ar'
                    ? `كل المتوفر في الشهر (${availableItems.length})`
                    : lang === 'fr'
                      ? `Disponibles ce mois (${availableItems.length})`
                      : `All Available (${availableItems.length})`}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 font-bold transition ${
                  statusFilter === 'all'
                    ? 'bg-[#f5f2e9] text-[#050b07]'
                    : 'text-[#84a391] hover:text-[#f0f7f2]'
                }`}
              >
                <span>
                  {lang === 'ar'
                    ? `الأطلس الكامل (${produceList.length})`
                    : `Tout (${produceList.length})`}
                </span>
              </button>
            </div>

            <span className="font-mono text-xs text-[#84a391]">
              {lang === 'ar'
                ? 'اضغط على أي خضرة أو فاكهة لعرض فوائدها الصحية ومناطق إنتاجها'
                : 'Cliquez sur une fiche pour inspecter ses bienfaits cliniques'}
            </span>
          </div>
        </div>
      </div>

      {/* Seasonal Weak Organs & 4-Week Organ Recovery Matrix */}
      <div className="double-bezel">
        <div className="double-bezel-inner p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#e59a38]/50 bg-[#f59e0b]/12 px-3 py-1 font-mono text-xs font-bold text-[#fcd34d]">
                <HeartPulse className="h-3.5 w-3.5" />
                {seasonOrganProfile.monthsLabel[lang]}
              </span>
              <h3 className="mt-2 font-editorial text-xl sm:text-2xl font-bold text-[#f0f7f2]">
                {seasonOrganProfile.seasonTitle[lang]}
              </h3>
              <p className="mt-1.5 max-w-3xl text-xs sm:text-sm text-[#d1e5d8] leading-relaxed">
                {seasonOrganProfile.climatePhysiologySummary[lang]}
              </p>
            </div>
          </div>

          {/* 4 Vulnerable Organs in This Season */}
          <div>
            <h4 className="font-editorial text-base sm:text-lg font-bold text-[#6ee7b7] mb-3 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-[#fbbf24]" />
              <span>
                {lang === 'ar'
                  ? 'الأعضاء الأكثر ضعفاً وحساسية في هذا الفصل وما تحتاجه من خضر وفواكه الموسم:'
                  : lang === 'fr'
                    ? 'Organes les plus vulnérables durant cette saison et leurs besoins :'
                    : 'Most Vulnerable Organs in This Season & What They Need:'}
              </span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {seasonOrganProfile.weakOrgans.map((weakOrgan) => {
                const organProduce = produceList.filter((p) =>
                  weakOrgan.recommendedProduceIds.includes(p.id)
                )
                return (
                  <div
                    key={weakOrgan.id}
                    className="rounded-2xl border border-white/10 bg-[#0b0f0a] p-4 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="font-editorial text-base font-bold text-[#f0f7f2]">
                          🩺 {weakOrgan.organName[lang]}
                        </h5>
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                            weakOrgan.vulnerabilityLevel === 'critical'
                              ? 'border border-rose-400/50 bg-rose-950/60 text-rose-300'
                              : 'border border-amber-400/40 bg-amber-950/50 text-amber-300'
                          }`}
                        >
                          {weakOrgan.vulnerabilityLevel === 'critical'
                            ? lang === 'ar'
                              ? 'حساسية قصوى فـ الفصل'
                              : 'Priorité Saisonnière'
                            : lang === 'ar'
                              ? 'يحتاج دعماً موسمياً'
                              : 'Soutien Recommandé'}
                        </span>
                      </div>

                      <div className="rounded-xl bg-[#121711] p-3 text-xs space-y-1.5">
                        <p className="text-[#d1e5d8]">
                          <strong className="text-rose-300">
                            {lang === 'ar' ? 'لماذا يضعف في هذا الفصل؟ ' : 'Pourquoi vulnérable ? '}
                          </strong>
                          {weakOrgan.whyWeakInThisSeason[lang]}
                        </p>
                        <p className="text-[#e7e3d6]">
                          <strong className="text-[#6ee7b7]">
                            {lang === 'ar' ? 'ماذا يحتاج الآن؟ ' : 'Ce dont il a besoin : '}
                          </strong>
                          {weakOrgan.whatItNeeds[lang]}
                        </p>
                      </div>
                    </div>

                    <div>
                      <span className="block font-mono text-[10px] text-[#84a391] mb-1.5">
                        {lang === 'ar'
                          ? 'الفواكه والخضر الموسمية المعالجة لهذا العضو (اضغط للفتح):'
                          : 'Fruits & légumes de saison ciblant cet organe :'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {organProduce.map((prod) => (
                          <button
                            key={prod.id}
                            type="button"
                            onClick={() => onSelectProduce(prod)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#10b981]/40 bg-[#131f14] px-2.5 py-1 text-xs font-bold text-[#6ee7b7] hover:bg-[#10b981] hover:text-[#050b07] transition"
                          >
                            <img
                              src={prod.imageUrl}
                              alt=""
                              className="h-4 w-4 rounded-full object-cover"
                            />
                            <span>
                              {lang === 'ar'
                                ? prod.nameDarijaArabic.split('(')[0]?.trim()
                                : prod.nameFrench.split('(')[0]?.trim()}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 4-Week Seasonal Organ Recovery & Rotation Plan */}
          <div className="rounded-2xl border border-[#10b981]/40 bg-[#0c130d] p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase text-[#fcd34d]">
                  🗓️{' '}
                  {lang === 'ar'
                    ? 'برنامج الأسابيع الأربعة لترميم الأعضاء حسب الفصل'
                    : lang === 'fr'
                      ? 'PROGRAMME DES 4 SEMAINES DE RÉGÉNÉRATION DES ORGANES'
                      : '4-WEEK SEASONAL ORGAN RECOVERY SCHEDULE'}
                </span>
                <h4 className="font-editorial text-lg font-bold text-[#f0f7f2]">
                  {activeWeekPlan.weekTitle[lang]}
                </h4>
              </div>

              <div className="inline-flex rounded-xl border border-white/10 bg-[#07120c] p-1 font-mono text-xs">
                {seasonOrganProfile.weeklySchedule.map((wk) => (
                  <button
                    key={wk.weekNumber}
                    type="button"
                    onClick={() => {
                      sounds.playPop()
                      setSelectedWeekNum(wk.weekNumber)
                    }}
                    className={`rounded-lg px-3 py-1.5 font-bold transition ${
                      selectedWeekNum === wk.weekNumber
                        ? 'bg-[#10b981] text-[#050b07]'
                        : 'text-[#84a391] hover:text-[#f0f7f2]'
                    }`}
                  >
                    {lang === 'ar' ? `الأسبوع ${wk.weekNumber}` : `Sem. ${wk.weekNumber}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl border border-white/10 bg-[#090c08] p-3.5">
                <span className="block font-mono text-[10px] text-[#84a391]">
                  {lang === 'ar' ? 'العضو المستهدف في هذا الأسبوع:' : 'Organe ciblé cette semaine :'}
                </span>
                <span className="mt-1 block text-sm font-bold text-[#6ee7b7]">
                  🎯 {activeWeekPlan.focusOrgan[lang]}
                </span>
                <span className="mt-2 block font-mono text-[10px] text-[#fcd34d]">
                  ⚡ {activeWeekPlan.neededFuel[lang]}
                </span>
              </div>

              <div className="md:col-span-2 rounded-xl border border-white/10 bg-[#090c08] p-3.5 flex flex-col justify-between">
                <p className="text-xs sm:text-sm leading-relaxed text-[#e7e3d6]">
                  <strong className="text-[#34d399]">
                    {lang === 'ar' ? 'البرنامج اليومي في المطبخ المغربي: ' : 'Protocole quotidien : '}
                  </strong>
                  {activeWeekPlan.dailyProtocol[lang]}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] text-[#84a391]">
                    {lang === 'ar' ? 'أغذية الأسبوع:' : 'Produits clés :'}
                  </span>
                  {produceList
                    .filter((p) => activeWeekPlan.featuredProduceIds.includes(p.id))
                    .map((prod) => (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => onSelectProduce(prod)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#f59e0b]/45 bg-[#231908] px-3 py-1 text-xs font-bold text-[#fcd34d] hover:bg-[#f59e0b] hover:text-[#050b07] transition"
                      >
                        <span>
                          {lang === 'ar'
                            ? prod.nameDarijaArabic.split('(')[0]?.trim()
                            : prod.nameFrench.split('(')[0]?.trim()}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtered Produce Grid for Selected Month */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedItems.map((item, idx) => (
          <ProduceCard
            key={item.id}
            item={item}
            index={idx}
            lang={lang}
            activeRegion={activeRegion}
            selectedMonth={selectedMonth}
            onSelect={onSelectProduce}
          />
        ))}
      </div>
    </section>
  )
}
