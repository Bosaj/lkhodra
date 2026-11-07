import React, { useState } from 'react'
import {
  HeartPulse,
  ShieldCheck,
  Brain,
  Eye,
  Bone,
  Droplets,
  Sparkles,
  Activity,
  Flame,
  Calendar,
} from 'lucide-react'
import type { ProduceItem, HealthTargetOrgan, SeasonName } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import type { MoroccanAgroRegion } from '../lib/moroccanTerroir'
import { SEASONAL_ORGAN_PROFILES } from '../data/seasonalOrgans'
import { ProduceCard } from './ProduceCard'
import { sounds } from '../lib/soundEffects'

interface HealthBenefitsExplorerProps {
  produceList: ProduceItem[]
  lang: SupportedLanguage
  activeRegion: MoroccanAgroRegion
  onSelectProduce: (item: ProduceItem) => void
}

interface OrganMeta {
  id: HealthTargetOrgan
  icon: React.ComponentType<{ className?: string }>
  titleAr: string
  titleFr: string
  titleEn: string
  clinicalSummaryAr: string
  clinicalSummaryFr: string
  clinicalSummaryEn: string
  keyMolecules: string[]
}

const ORGANS_CATALOG: OrganMeta[] = [
  {
    id: 'heart',
    icon: HeartPulse,
    titleAr: 'القلب، الشرايين وضغط الدم',
    titleFr: 'Cœur, Artères & Tension Artérielle',
    titleEn: 'Heart, Arteries & Blood Pressure',
    clinicalSummaryAr:
      'تحمي الفواكه والخضر المغربية الغنية بالبونيكالاجين (الرمان السفري)، الليكوبين (ماطيشة شتوكة)، السيترولين (الدلاح)، والأليسين (الثومة الحمراء) جدران الشرايين وترفع أكسيد النيتريك الموسع للأوعية وتخفض الكولسترول الضار.',
    clinicalSummaryFr:
      'Les polyphénols du terroir marocain (Grenade Sefri, Tomate de Chtouka, Ail rose d’El Hajeb, Olive Picholine) stimulent l’oxyde nitrique endothélial, assouplissent les artères et réduisent l’hypertension.',
    clinicalSummaryEn:
      'Moroccan polyphenols (Sefri pomegranate punicalagins, Chtouka tomato lycopene, El Hajeb pink garlic allicin, Picholine olive hydroxytyrosol) boost vascular nitric oxide and protect arterial health.',
    keyMolecules: ['Punicalagins', 'Lycopene', 'Allicin', 'Hydroxytyrosol', 'L-Citrulline', 'Potassium'],
  },
  {
    id: 'blood_sugar',
    icon: Activity,
    titleAr: 'السكري وتوازن الأنسولين (Low GI)',
    titleFr: 'Diabète & Équilibre Glycémique (IG Bas)',
    titleEn: 'Blood Sugar & Insulin Sensitivity (Low GI)',
    clinicalSummaryAr:
      'يتميز التراث الفلاحي المغربي بخضر وفواكه ذات مؤشر سكري منخفض جداً؛ وعلى رأسها البطاطا القصبية (GI = 11 بفضل الإنولين النقي بدلاً من النشا)، الملوخية (GI = 20)، الهندية د آيت باعمران (GI = 25)، ولافوكا د الغرب (GI = 10).',
    clinicalSummaryFr:
      'Le terroir marocain offre des trésors à index glycémique ultra-bas : Topinambour Batata Qasbiya (IG 11 riche en inuline sans amidon), Gombo Mloukhiya (IG 20), Figue de Barbarie (IG 25) et Avocat du Gharb (IG 10).',
    clinicalSummaryEn:
      'Moroccan produce includes remarkable low-GI champions: Batata Qasbiya sunchokes (GI 11, pure inulin instead of starch), Mloukhiya okra (GI 20), Aït Baâmrane prickly pear (GI 25), and Gharb avocado (GI 10).',
    keyMolecules: ['Inulin (Prebiotic)', 'Myricetin', 'Opuntia Mucilage', 'Chromium', 'Pectin'],
  },
  {
    id: 'digestion',
    icon: Sparkles,
    titleAr: 'المعدة، القولون والميكروبيوم',
    titleFr: 'Estomac, Côlon & Microbiote Intestinal',
    titleEn: 'Stomach, Colon & Gut Microbiome',
    clinicalSummaryAr:
      'لتهدئة التهاب المعدة والارتجاع وتغذية البكتيريا النافعة: يتصدر السفرجل البلدي (هلام البكتين)، القوق والخرشوف والبطاطا القصبية (ألياف الإنولين)، الملوخية (الموسيلاج)، والنعناع المكاوي (مضاد التشنج والغازات).',
    clinicalSummaryFr:
      'Pour réparer la muqueuse gastrique et nourrir le microbiote : le Coing du Haouz (gel de pectine), l’Artichaut et le Topinambour (inuline), le Gombo (mucilage) et la Menthe de Meknès (antispasmodique).',
    clinicalSummaryEn:
      'To heal gastric linings and feed beneficial gut flora: Moroccan Quince (pectin gel), Artichoke & Sunchoke (prebiotic inulin), Okra (mucilage), and Meknès Spearmint (antispasmodic carvone).',
    keyMolecules: ['Inulin', 'Pectin Gel', 'Ficin Enzyme', 'Rosmarinic Acid', 'Gastric Mucilage'],
  },
  {
    id: 'immunity',
    icon: ShieldCheck,
    titleAr: 'المناعة ومقاومة نزلات البرد',
    titleFr: 'Immunité & Défenses Respiratoires',
    titleEn: 'Immunity & Respiratory Cold Defense',
    clinicalSummaryAr:
      'درع الشتاء المغربي الطبيعي: كليمونتين بركان والفريز د اللوكوس (فيتامين C وهسبيريدين)، البصلة الحمراء د الحاجب (كيرسيتين)، الثومة البلدية (أليسين مضاد للفيروسات)، واللفت البلدي (جلوكوزينولات لتنقية الرئتين).',
    clinicalSummaryFr:
      'Bouclier immunitaire hivernal : Clémentine de Berkane et Fraise du Loukkos (Vitamine C & bioflavonoïdes), Oignon rouge d’El Hajeb (quercétine), Ail rose (allicine) et Navet (glucosinolates pulmonaires).',
    clinicalSummaryEn:
      'Morocco’s natural immune shield: Berkane Clementines & Loukkos Strawberries (Vitamin C & hesperidin), El Hajeb Red Onions (quercetin), Pink Garlic (allicin), and Turnips (bronchial glucosinolates).',
    keyMolecules: ['Vitamin C', 'Quercetin', 'Hesperidin', 'Allicin', 'Beta-Carotene'],
  },
  {
    id: 'liver',
    icon: Flame,
    titleAr: 'تصفية الكبد والمرارة والكولسترول',
    titleFr: 'Détoxification du Foie & Baisse du Cholestérol',
    titleEn: 'Liver Detoxification & Bile Flow',
    clinicalSummaryAr:
      'القوق والخرشوف البلدي (القرنيع) هو سلطان تنظيف الكبد في المغرب بفضل مركبي السينارين والسيليمارين اللذين يضاعفان إفراز الصفراء ويمنعان تشحم الكبد، بجانب اللفت المحفور والزيتون البلدي والثومة.',
    clinicalSummaryFr:
      'L’artichaut et le cardon marocains (Qouq & Khorchef) sont les rois de la régénération hépatique grâce à la cynarine et la silymarine qui stimulent la bile et combattent la stéatose.',
    clinicalSummaryEn:
      'Moroccan Artichoke & Cardoon (Qouq & Khorchef) lead liver regeneration via cynarin and silymarin, boosting bile flow and clearing hepatic fat alongside turnips and olive polyphenols.',
    keyMolecules: ['Cynarin', 'Silymarin', 'Sulforaphane', 'Oleuropein', 'Selenium'],
  },
  {
    id: 'brain',
    icon: Brain,
    titleAr: 'الدماغ، الذاكرة، المزاج وجودة النوم',
    titleFr: 'Cerveau, Mémoire, Humeur & Sommeil',
    titleEn: 'Brain, Mood, Memory & Deep Sleep',
    clinicalSummaryAr:
      'الزعفران الحر د تاليوين يرفع السيروتونين (مضاد اكتئاب طبيعي)، الفول الأخضر غني بـ L-DOPA (سلف الدوبامين)، حب الملوك د صفرو يمنح الميلاتونين الطبيعي للنوم العميق، والتمر المجهول يغذي الدماغ بفيتامين B6 والبوتاسيوم.',
    clinicalSummaryFr:
      'Le Safran AOP de Taliouine élève la sérotonine, la fève verte apporte de la L-DOPA naturelle (dopamine), la cerise de Sefrou fournit de la mélatonine pour le sommeil, et la datte Majhoul nourrit les neurones.',
    clinicalSummaryEn:
      'AOP Taliouine Saffron boosts serotonin, fresh green fava beans supply natural L-DOPA (dopamine), Sefrou cherries provide sleep-regulating melatonin, and Medjool dates fuel cognition.',
    keyMolecules: ['Crocin & Safranal', 'Natural L-DOPA', 'Phytomelatonin', 'Fisetin', 'Vitamin B6'],
  },
  {
    id: 'eyes_skin',
    icon: Eye,
    titleAr: 'شبكية العين، نضارة البشرة والكولاجين',
    titleFr: 'Acuité Visuelle, Éclat de la Peau & Collagène',
    titleEn: 'Retinal Vision, Skin Radiance & Collagen',
    clinicalSummaryAr:
      'الڭرعة الحمراء الدكالية (8513 وحدة فيتامين A ولوتين)، الزعفران الحر (حماية خلايا الشبكية)، والفريز وكليمونتين بركان والهندية لتحفيز الكولاجين وحماية الجلد من الشيخوخة الضوئية.',
    clinicalSummaryFr:
      'La courge rouge des Doukkala (8 513 UI de Vitamine A et lutéine), le safran de Taliouine (neuroprotection rétinienne) et les agrumes/fraises pour la synthèse du collagène.',
    clinicalSummaryEn:
      'Doukkala red pumpkin (8,513 IU Vitamin A & lutein), Taliouine saffron (retinal neuroprotection), and Berkane citrus & prickly pear for collagen synthesis.',
    keyMolecules: ['Beta-Carotene', 'Lutein & Zeaxanthin', 'Crocin', 'Vitamin C & E', 'Betalains'],
  },
  {
    id: 'bones',
    icon: Bone,
    titleAr: 'تقوية العظام، المفاصل ومضادات النقرس',
    titleFr: 'Densité Osseuse, Articulations & Anti-Goutte',
    titleEn: 'Bone Density, Joints & Uric Acid Relief',
    clinicalSummaryAr:
      'الكرموس البلدي والشريحة والهندية والتمر المجهول والملوخية تزود الجسم بالكالسيوم النباتي، المغنيسيوم، البورون، وفيتامين K1، بينما يخفض حب الملوك د صفرو حمض اليوريك المسبب للنقرس.',
    clinicalSummaryFr:
      'La figue de Taounate (Chri7a), la figue de Barbarie, la datte Majhoul et le gombo apportent calcium, magnésium, bore et vitamine K, tandis que la cerise de Sefrou abaisse l’acide urique.',
    clinicalSummaryEn:
      'Taounate figs, prickly pears, Medjool dates, and okra deliver bioavailable calcium, magnesium, boron, and Vitamin K1, while Sefrou cherries lower joint-inflaming uric acid.',
    keyMolecules: ['Plant Calcium', 'Magnesium', 'Boron', 'Vitamin K1', 'Cyanidin-3-Glucoside'],
  },
  {
    id: 'anemia_iron',
    icon: Droplets,
    titleAr: 'علاج فقر الدم، الحديد والطاقة الحيوية',
    titleFr: 'Lutte contre l’Anémie, Fer & Vitalité',
    titleEn: 'Anti-Anemia, Iron Absorption & Vitality',
    clinicalSummaryAr:
      'البطاطا القصبية (3.4 ملغ حديد)، الفول والجلبانة (حديد + حمض الفوليك B9 العالي)، والتمر المجهول والكرموس، مع كليمونتين بركان الذي يضاعف امتصاص الحديد النباتي بـ 3 مرات!',
    clinicalSummaryFr:
      'Le topinambour (3,4 mg de fer), les fèves et petits pois (fer + 148 µg de folates B9), les dattes Majhoul et figues, associés à la Vitamine C de Berkane qui triple l’assimilation du fer.',
    clinicalSummaryEn:
      'Batata Qasbiya (3.4mg iron), fresh fava beans & peas (iron + 148mcg folate), Medjool dates, and figs—paired with Berkane citrus to triple non-heme iron uptake.',
    keyMolecules: ['Non-Heme Iron', 'Folate (Vitamin B9)', 'Copper', 'Vitamin C Chelation'],
  },
]

export const HealthBenefitsExplorer: React.FC<HealthBenefitsExplorerProps> = ({
  produceList,
  lang,
  activeRegion,
  onSelectProduce,
}) => {
  const [selectedOrgan, setSelectedOrgan] = useState<HealthTargetOrgan>('heart')
  const [selectedSeason, setSelectedSeason] = useState<Exclude<SeasonName, 'all_year'>>('winter')
  const seasonProfile = SEASONAL_ORGAN_PROFILES[selectedSeason]

  const activeOrganMeta =
    ORGANS_CATALOG.find((o) => o.id === selectedOrgan) || ORGANS_CATALOG[0]!

  const matchingProduce = produceList.filter((item) =>
    item.nutrition.targetOrgans.includes(selectedOrgan)
  )

  return (
    <section className="space-y-6">
      {/* Organ & Wellness Goal Selector Header */}
      <div className="double-bezel">
        <div className="double-bezel-inner p-6 sm:p-8 space-y-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#10b981]/40 bg-[#10b981]/12 px-3 py-1 font-mono text-xs font-bold text-[#6ee7b7]">
              <HeartPulse className="h-3.5 w-3.5" />
              {lang === 'ar'
                ? 'مختبر التغذية السريرية والتداوي بالغذاء المغربي'
                : lang === 'fr'
                  ? 'LABORATOIRE DE NUTRITION CLINIQUE & PHYTO-TERROIR'
                  : 'CLINICAL NUTRITION & MOROCCAN PHYTO-THERAPY LAB'}
            </span>
            <h2 className="mt-2 font-editorial text-2xl sm:text-3xl font-bold text-[#f0f7f2]">
              {lang === 'ar'
                ? 'اختر العضو أو الهدف الصحي لاكتشاف أغذية التيروار المغربي المناسبة'
                : lang === 'fr'
                  ? 'Explorez les fruits et légumes du Maroc selon l’organe ou l’objectif santé'
                  : 'Select an Organ System or Health Goal to Discover Targeted Moroccan Produce'}
            </h2>
          </div>

          {/* 9 Organ System Interactive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {ORGANS_CATALOG.map((organ) => {
              const Icon = organ.icon
              const isSelected = organ.id === selectedOrgan
              const count = produceList.filter((p) =>
                p.nutrition.targetOrgans.includes(organ.id)
              ).length

              return (
                <button
                  key={organ.id}
                  type="button"
                  onClick={() => {
                    sounds.playPop()
                    setSelectedOrgan(organ.id)
                  }}
                  className={`flex flex-col items-start justify-between rounded-2xl p-3.5 text-start transition ${
                    isSelected
                      ? 'border-2 border-[#10b981] bg-[#10b981] text-[#050b07] shadow-lg shadow-[#4ea865]/25'
                      : 'border border-white/10 bg-[#0d110c] text-[#d1e5d8] hover:border-[#10b981]/40 hover:text-[#f0f7f2]'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <Icon className={`h-5 w-5 ${isSelected ? 'text-[#050b07]' : 'text-[#34d399]'}`} />
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
                        isSelected
                          ? 'bg-[#07120c] text-[#34d399]'
                          : 'bg-[#171f16] text-[#6ee7b7]'
                      }`}
                    >
                      {count}
                    </span>
                  </div>
                  <span className="mt-2.5 text-xs font-bold leading-snug">
                    {lang === 'ar' ? organ.titleAr : lang === 'fr' ? organ.titleFr : organ.titleEn}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Active Organ Clinical Brief */}
          <div className="rounded-2xl border border-[#10b981]/25 bg-[#0c130d] p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 max-w-3xl">
                <h3 className="font-editorial text-xl font-bold text-[#6ee7b7]">
                  {lang === 'ar'
                    ? activeOrganMeta.titleAr
                    : lang === 'fr'
                      ? activeOrganMeta.titleFr
                      : activeOrganMeta.titleEn}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-[#e7e3d6]">
                  {lang === 'ar'
                    ? activeOrganMeta.clinicalSummaryAr
                    : lang === 'fr'
                      ? activeOrganMeta.clinicalSummaryFr
                      : activeOrganMeta.clinicalSummaryEn}
                </p>
              </div>

              <div className="shrink-0">
                <span className="block font-mono text-[10px] uppercase text-[#84a391] mb-1.5">
                  {lang === 'ar' ? 'أهم الجزيئات الحيوية الفعالة:' : 'Molécules bioactives clés :'}
                </span>
                <div className="flex flex-wrap gap-1.5 max-w-xs">
                  {activeOrganMeta.keyMolecules.map((mol) => (
                    <span
                      key={mol}
                      className="rounded-lg border border-[#f59e0b]/45 bg-[#211708] px-2.5 py-1 font-mono text-[11px] font-bold text-[#fcd34d]"
                    >
                      {mol}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seasonal Organ Vulnerability & 4-Week Chronobiology Matrix */}
      <div className="double-bezel">
        <div className="double-bezel-inner p-6 sm:p-8 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#e59a38]/50 bg-[#f59e0b]/12 px-3 py-1 font-mono text-xs font-bold text-[#fcd34d]">
                <Calendar className="h-3.5 w-3.5" />
                {lang === 'ar'
                  ? 'الأعضاء الضعيفة حسب الفصول الأربعة وبرنامج الأسابيع'
                  : lang === 'fr'
                    ? 'ORGANES VULNÉRABLES PAR SAISON & PROGRAMME HEBDOMADAIRE'
                    : 'SEASONAL WEAK ORGANS & 4-WEEK RECOVERY RHYTHM'}
              </span>
              <h3 className="mt-2 font-editorial text-xl sm:text-2xl font-bold text-[#f0f7f2]">
                {seasonProfile.seasonTitle[lang]}
              </h3>
            </div>

            <div className="inline-flex flex-wrap rounded-xl border border-white/10 bg-[#0a140e] p-1 text-xs font-bold">
              {(
                [
                  { id: 'winter', ar: '❄️ الشتاء', fr: '❄️ Hiver', en: '❄️ Winter' },
                  { id: 'spring', ar: '🌸 الربيع', fr: '🌸 Printemps', en: '🌸 Spring' },
                  { id: 'summer', ar: '☀️ الصيف', fr: '☀️ Été', en: '☀️ Summer' },
                  { id: 'autumn', ar: '🍂 الخريف', fr: '🍂 Automne', en: '🍂 Autumn' },
                ] as const
              ).map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    sounds.playPop()
                    setSelectedSeason(s.id)
                  }}
                  className={`rounded-lg px-3.5 py-2 transition ${
                    selectedSeason === s.id
                      ? 'bg-[#f59e0b] text-[#050b07]'
                      : 'text-[#84a391] hover:text-[#f0f7f2]'
                  }`}
                >
                  {lang === 'ar' ? s.ar : lang === 'fr' ? s.fr : s.en}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {seasonProfile.weeklySchedule.map((wk) => (
              <div
                key={wk.weekNumber}
                className="rounded-2xl border border-white/10 bg-[#0c110b] p-4 flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="inline-block rounded-md border border-[#10b981]/40 bg-[#10b981]/12 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#6ee7b7]">
                    {lang === 'ar' ? `الأسبوع ${wk.weekNumber}` : `Semaine ${wk.weekNumber}`} · 🎯 {wk.focusOrgan[lang]}
                  </span>
                  <h4 className="mt-2 font-editorial text-sm font-bold text-[#f0f7f2]">
                    {wk.weekTitle[lang]}
                  </h4>
                  <p className="mt-1.5 text-xs text-[#d1e5d8] leading-relaxed">
                    {wk.dailyProtocol[lang]}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#f5f2e9]/8">
                  <span className="block font-mono text-[10px] text-[#fcd34d]">
                    ⚡ {wk.neededFuel[lang]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Matching Produce Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matchingProduce.map((item, idx) => (
          <ProduceCard
            key={item.id}
            item={item}
            index={idx}
            lang={lang}
            activeRegion={activeRegion}
            onSelect={onSelectProduce}
          />
        ))}
      </div>
    </section>
  )
}
