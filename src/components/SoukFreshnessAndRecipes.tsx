import React, { useState } from 'react'
import {
  UtensilsCrossed,
  Clock,
  Users,
  Flame,
  Sparkles,
  ShieldCheck,
  Search,
  Database,
  CheckCircle2,
} from 'lucide-react'
import type { ProduceItem, MoroccanProduceRecipe } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import { MOROCCAN_PRODUCE_RECIPES } from '../data/recipes'
import { searchOpenFoodFactsProduce, type OpenFoodFactsProduceHit } from '../services/agroApis'

interface SoukFreshnessAndRecipesProps {
  mode: 'recipes' | 'market'
  produceList: ProduceItem[]
  lang: SupportedLanguage
  onSelectProduce: (item: ProduceItem) => void
}

export const SoukFreshnessAndRecipes: React.FC<SoukFreshnessAndRecipesProps> = ({
  mode,
  produceList,
  lang,
  onSelectProduce,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<MoroccanProduceRecipe>(
    MOROCCAN_PRODUCE_RECIPES[0]!
  )
  const [offQuery, setOffQuery] = useState('Clémentine Berkane')
  const [offResults, setOffResults] = useState<OpenFoodFactsProduceHit[]>([])
  const [searchingOff, setSearchingOff] = useState(false)

  const handleOffSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!offQuery.trim()) return
    setSearchingOff(true)
    const hits = await searchOpenFoodFactsProduce(offQuery)
    setOffResults(hits)
    setSearchingOff(false)
  }

  if (mode === 'recipes') {
    return (
      <section className="space-y-6">
        <div className="double-bezel">
          <div className="double-bezel-inner p-6 sm:p-8 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f59e0b]/45 bg-[#f59e0b]/12 px-3 py-1 font-mono text-xs font-bold text-[#fcd34d]">
                <UtensilsCrossed className="h-3.5 w-3.5" />
                {lang === 'ar'
                  ? 'المطبخ المغربي الموسمي والتآزر الغذائي'
                  : lang === 'fr'
                    ? 'GASTRONOMIE SAISONNIÈRE & SYNERGIES CULINAIRES'
                    : 'SEASONAL MOROCCAN GASTRONOMY & NUTRIENT SYNERGY'}
              </span>
              <h2 className="mt-2 font-editorial text-2xl sm:text-3xl font-bold text-[#f0f7f2]">
                {lang === 'ar'
                  ? 'طواجن وشلايظ ووصفات الموسم بأعلى فائدة صحية'
                  : lang === 'fr'
                    ? 'Tagines, Salades Cuites & Recettes du Terroir'
                    : 'Seasonal Moroccan Tagines, Salads & Elixirs'}
              </h2>
            </div>

            {/* Recipe Selector Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {MOROCCAN_PRODUCE_RECIPES.map((rec) => {
                const isSelected = rec.id === selectedRecipe.id
                return (
                  <button
                    key={rec.id}
                    type="button"
                    onClick={() => setSelectedRecipe(rec)}
                    className={`group flex flex-col justify-between rounded-2xl overflow-hidden text-start transition ${
                      isSelected
                        ? 'border-2 border-[#10b981] bg-[#132115] shadow-lg shadow-[#4ea865]/20'
                        : 'border border-white/10 bg-[#0d110c] hover:border-[#10b981]/40'
                    }`}
                  >
                    <div className="relative h-36 w-full overflow-hidden">
                      <img
                        src={rec.imageUrl}
                        alt={rec.titleFrench}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d110c] via-transparent to-transparent" />
                      <span className="absolute bottom-2 start-2 rounded-full bg-[#07120c]/85 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#6ee7b7]">
                        <Flame className="inline h-3 w-3 text-orange-400 mr-0.5" />
                        {rec.caloriesPerServing} kcal
                      </span>
                    </div>
                    <div className="p-3.5">
                      <h3 className="font-editorial text-sm font-bold text-[#f0f7f2]">
                        {lang === 'ar'
                          ? rec.titleDarijaArabic
                          : lang === 'fr'
                            ? rec.titleFrench
                            : rec.titleEnglish}
                      </h3>
                      <div className="mt-2 flex items-center gap-3 font-mono text-[10px] text-[#84a391]">
                        <span>
                          <Clock className="inline h-3 w-3 mr-0.5 text-[#fbbf24]" />
                          {rec.prepTimeMinutes + rec.cookTimeMinutes} min
                        </span>
                        <span>
                          <Users className="inline h-3 w-3 mr-0.5 text-[#34d399]" />
                          {rec.servings}
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Active Recipe Full Detail */}
            <div className="rounded-2xl border border-[#10b981]/25 bg-[#0c120d] p-5 sm:p-6 space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#f0f7f2]">
                    {lang === 'ar'
                      ? selectedRecipe.titleDarijaArabic
                      : lang === 'fr'
                        ? selectedRecipe.titleFrench
                        : selectedRecipe.titleEnglish}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#6ee7b7]">
                    <Sparkles className="inline h-4 w-4 mr-1" />
                    {selectedRecipe.keyHealthHighlight[lang]}
                  </p>
                </div>

                {/* Featured Produce Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {selectedRecipe.featuredProduceIds.map((pid) => {
                    const p = produceList.find((x) => x.id === pid)
                    if (!p) return null
                    return (
                      <button
                        key={pid}
                        type="button"
                        onClick={() => onSelectProduce(p)}
                        className="rounded-full border border-[#10b981]/40 bg-[#142216] px-3 py-1 text-xs font-bold text-[#f0f7f2] hover:bg-[#10b981] hover:text-[#050b07]"
                      >
                        🌿 {lang === 'ar' ? p.nameDarijaArabic.split(' ')[0] : p.nameFrench.split(' ')[0]}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-5 space-y-3">
                  <h4 className="font-editorial text-base font-bold text-[#fcd34d]">
                    {lang === 'ar' ? 'المقادير والمكونات البلدية' : 'Ingrédients du Terroir'}
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#e7e3d6]">
                    {selectedRecipe.ingredients[lang].map((ing, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#34d399] shrink-0 mt-0.5" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-7 space-y-3">
                  <h4 className="font-editorial text-base font-bold text-[#6ee7b7]">
                    {lang === 'ar' ? 'مراحل التحضير والطهي الصحي' : 'Étapes de Préparation'}
                  </h4>
                  <ol className="space-y-2.5 text-xs sm:text-sm text-[#e7e3d6]">
                    {selectedRecipe.steps[lang].map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10b981] font-mono text-xs font-bold text-[#050b07]">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-4 rounded-xl border border-[#e59a38]/35 bg-[#1b1409] p-3.5 text-xs text-[#fcd34d]">
                    <strong>{lang === 'ar' ? 'سر الشيف المغربي:' : 'Secret de Chef :'}</strong>{' '}
                    {selectedRecipe.chefTip[lang]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Market Guide & Open Food Facts Live Inspector Mode
  return (
    <section className="space-y-6">
      <div className="double-bezel">
        <div className="double-bezel-inner p-6 sm:p-8 space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#10b981]/40 bg-[#10b981]/12 px-3 py-1 font-mono text-xs font-bold text-[#6ee7b7]">
              <ShieldCheck className="h-3.5 w-3.5" />
              {lang === 'ar'
                ? 'دليل السلامة الغذائية، الغسل الطبيعي والـ APIs العالمية'
                : 'GUIDE FRAÎCHEUR, LAVAGE NATUREL & OPEN FOOD FACTS API'}
            </span>
            <h2 className="mt-2 font-editorial text-2xl sm:text-3xl font-bold text-[#f0f7f2]">
              {lang === 'ar'
                ? 'الطريقة العلمية لتنقية الخضر والفواكه من بقايا المبيدات والحفاظ على فيتاميناتها'
                : lang === 'fr'
                  ? 'Protocole Scientifique de Lavage Naturel & Conservation au Maroc'
                  : 'Scientific Produce Washing Protocol & Live Open Food Facts Inspector'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-[#10b981]/25 bg-[#0d140e] p-5">
              <span className="font-mono text-xs font-bold text-[#6ee7b7]">01 · بيكربونات الصوديوم</span>
              <h3 className="mt-1 font-editorial text-base font-bold text-[#f0f7f2]">
                {lang === 'ar'
                  ? 'حمام بيكربونات الصوديوم (12 دقيقة)'
                  : 'Bain au Bicarbonate de Soude (12 min)'}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#d1e5d8]">
                {lang === 'ar'
                  ? 'أثبتت الدراسات المخبرية أن نقع التفاح، الفريز، الطماطم، والنعناع في ماء بارد مع ملعقة صغيرة من بيكربونات الصوديوم لمدة 12 دقيقة يزيل حتى 96% من بقايا المبيدات السطحية.'
                  : 'Tremper les pommes, fraises, tomates et herbes 12 minutes dans une eau additionnée d’une cuillère à café de bicarbonate élimine 96% des résidus de surface.'}
              </p>
            </div>

            <div className="rounded-2xl border border-[#f59e0b]/30 bg-[#17120a] p-5">
              <span className="font-mono text-xs font-bold text-[#fcd34d]">02 · الخل البلدي والملح</span>
              <h3 className="mt-1 font-editorial text-base font-bold text-[#f0f7f2]">
                {lang === 'ar'
                  ? 'تعقيم الورقيات (النعناع، القزبر، المعدنوس)'
                  : 'Désinfection des Herbes (Menthe, Coriandre)'}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#d1e5d8]">
                {lang === 'ar'
                  ? 'انقع قبطة النعناع والربيع في ماء بارد مع ملعقتين من الخل الأبيض أو خل التفاح لـ 5 دقائق، ثم اشطفها بماء صافٍ وجففها في منديل قطني قبل وضعها في الثلاجة.'
                  : 'Bain de 5 minutes dans une eau vinaigrée suivie d’un rinçage à l’eau claire et d’un séchage complet dans un linge en coton.'}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111510] p-5">
              <span className="font-mono text-xs font-bold text-cyan-300">03 · الطبخ في الفخار (الطاجين)</span>
              <h3 className="mt-1 font-editorial text-base font-bold text-[#f0f7f2]">
                {lang === 'ar'
                  ? 'لماذا يحافظ الطاجين المغربي على الفيتامينات؟'
                  : 'Pourquoi le Tagine en terre cuite préserve les nutriments ?'}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#d1e5d8]">
                {lang === 'ar'
                  ? 'الطبخ البطيء في طاجين الفخار المغربي يدير البخار المتكاثف في المخروط العلوي بدون غليان عنيف، مما يحفظ الفيتامينات والمعادن الذائبة في المرق بنسبة تفوق السلق العادي بـ 60%.'
                  : 'Le cône du tagine marocain condense la vapeur à basse température, préservant 60% de vitamines hydrosolubles en plus que l’ébullition à l’eau.'}
              </p>
            </div>
          </div>

          {/* Live Open Food Facts Search Box */}
          <div className="rounded-2xl border border-white/10 bg-[#0a140e] p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#6ee7b7] flex items-center gap-1.5">
                  <Database className="h-4 w-4" />
                  {lang === 'ar'
                    ? 'قاعدة بيانات Open Food Facts العالمية المباشرة'
                    : 'Base de Données Live Open Food Facts'}
                </span>
                <p className="text-xs text-[#84a391] mt-0.5">
                  {lang === 'ar'
                    ? 'ابحث عن أي منتج فلاحي أو غذائي مغربي للتحقق من تصنيف Nutri-Score:'
                    : 'Recherchez un produit agricole ou alimentaire marocain pour inspecter son Nutri-Score :'}
                </p>
              </div>

              <form onSubmit={handleOffSearch} className="flex items-center gap-2">
                <input
                  type="text"
                  value={offQuery}
                  onChange={(e) => setOffQuery(e.target.value)}
                  placeholder="Ex: Huile d'olive Maroc, Datte Majhoul..."
                  className="rounded-xl border border-white/10 bg-[#121811] px-3.5 py-2 text-xs text-[#f0f7f2] focus:border-[#10b981] focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#10b981] px-4 py-2 text-xs font-bold text-[#050b07]"
                >
                  <Search className="h-3.5 w-3.5" />
                  <span>{searchingOff ? '...' : lang === 'ar' ? 'بحث' : 'Chercher'}</span>
                </button>
              </form>
            </div>

            {offResults.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
                {offResults.map((hit, idx) => (
                  <div
                    key={`${hit.code}-${idx}`}
                    className="rounded-xl border border-white/10 bg-[#121711] p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#84a391]">#{hit.code}</span>
                      <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                        Nutri-Score {hit.nutriscoreGrade || 'A'}
                      </span>
                    </div>
                    <p className="mt-1.5 font-sans text-xs font-bold text-[#f0f7f2] line-clamp-2">
                      {hit.productName}
                    </p>
                    <span className="mt-1 block text-[10px] text-[#fbbf24]">
                      📍 {hit.origins || 'Maroc'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
