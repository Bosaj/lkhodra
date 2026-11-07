import React, { useState, useMemo } from 'react'
import {
  ShoppingBasket,
  Scale,
  Plus,
  Minus,
  Trash2,
  Check,
  Copy,
  ArrowLeftRight,
  Sparkles,
} from 'lucide-react'
import type { ProduceItem } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'
import { sounds } from '../lib/soundEffects'

interface BasketEntry {
  produceId: string
  qty: number
}

interface SoukQoffaAndComparatorProps {
  produceList: ProduceItem[]
  lang: SupportedLanguage
  basket: BasketEntry[]
  setBasket: React.Dispatch<React.SetStateAction<BasketEntry[]>>
  onSelectProduce: (item: ProduceItem) => void
}

export const SoukQoffaAndComparator: React.FC<SoukQoffaAndComparatorProps> = ({
  produceList,
  lang,
  basket,
  setBasket,
  onSelectProduce,
}) => {
  const t = STRINGS[lang]
  const [leftId, setLeftId] = useState<string>(produceList[0]?.id || 'clementine-berkane')
  const [rightId, setRightId] = useState<string>(produceList[1]?.id || 'grenade-sefri')
  const [selectedAddId, setSelectedAddId] = useState<string>(produceList[4]?.id || 'tomate-chtouka')
  const [copied, setCopied] = useState(false)

  const leftItem = useMemo(
    () => produceList.find((p) => p.id === leftId) || produceList[0]!,
    [produceList, leftId]
  )
  const rightItem = useMemo(
    () => produceList.find((p) => p.id === rightId) || produceList[1]!,
    [produceList, rightId]
  )

  const getLocalizedName = (p: ProduceItem) =>
    lang === 'ar' ? p.nameDarijaArabic : lang === 'fr' ? p.nameFrench : p.nameEnglish

  const updateQty = (produceId: string, delta: number) => {
    sounds.playPop()
    setBasket((prev) =>
      prev.map((entry) =>
        entry.produceId === produceId
          ? { ...entry, qty: Math.max(0.5, Math.round((entry.qty + delta) * 10) / 10) }
          : entry
      )
    )
  }

  const removeEntry = (produceId: string) => {
    sounds.playPop()
    setBasket((prev) => prev.filter((e) => e.produceId !== produceId))
  }

  const addSelectedToBasket = () => {
    sounds.playPop()
    setBasket((prev) => {
      const existing = prev.find((e) => e.produceId === selectedAddId)
      if (existing) {
        return prev.map((e) =>
          e.produceId === selectedAddId ? { ...e, qty: e.qty + 1 } : e
        )
      }
      return [...prev, { produceId: selectedAddId, qty: 1 }]
    })
  }

  const totals = useMemo(() => {
    let inSeasonTotalMAD = 0
    let offSeasonTotalMAD = 0
    let totalFiberGrams = 0
    let totalVitCMg = 0

    for (const entry of basket) {
      const item = produceList.find((p) => p.id === entry.produceId)
      if (!item) continue
      inSeasonTotalMAD += item.pricing.inSeasonMAD * entry.qty
      offSeasonTotalMAD += item.pricing.offSeasonMAD * entry.qty
      const factor = item.pricing.unit === 'kg' ? entry.qty * 10 : entry.qty
      totalFiberGrams += item.nutrition.fiberGrams * factor
      totalVitCMg += item.nutrition.vitaminC_mg * factor
    }

    return {
      inSeasonTotalMAD: Math.round(inSeasonTotalMAD),
      offSeasonTotalMAD: Math.round(offSeasonTotalMAD),
      savingsMAD: Math.max(0, Math.round(offSeasonTotalMAD - inSeasonTotalMAD)),
      totalFiberGrams: Math.round(totalFiberGrams),
      totalVitCMg: Math.round(totalVitCMg),
    }
  }, [basket, produceList])

  const copyQoffaList = () => {
    const lines = basket.map((entry) => {
      const item = produceList.find((p) => p.id === entry.produceId)
      if (!item) return ''
      const sub = Math.round(item.pricing.inSeasonMAD * entry.qty)
      return `• ${getLocalizedName(item)} — ${entry.qty} ${item.pricing.unit} (~${sub} MAD)`
    })
    const text = `🧺 LKHODRA — ${lang === 'ar' ? 'قفة السوق المغربية الموسمية' : 'Panier Souk Marocain de Saison'}\n${lines.join('\n')}\n💰 ${lang === 'ar' ? 'المجموع في وقتها' : 'Total en saison'}: ~${totals.inSeasonTotalMAD} MAD (${lang === 'ar' ? 'توفير' : 'Économie'}: ${totals.savingsMAD} MAD)`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {})
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left 7 Cols: Head-to-Head Nutritional & Economic Comparator */}
      <div className="lg:col-span-7 double-bezel">
        <div className="double-bezel-inner p-6 space-y-5 h-full">
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f59e0b]/45 bg-[#f59e0b]/12 px-3 py-0.5 font-mono text-[10px] font-bold text-[#fcd34d]">
                <Scale className="h-3 w-3" />
                {lang === 'ar' ? 'مقارن القيمة الغذائية والأسعار' : 'COMPARATEUR NUTRITION & PRIX SOUK'}
              </span>
              <h2 className="mt-1.5 font-editorial text-xl sm:text-2xl font-bold text-[#f0f7f2]">
                {lang === 'ar'
                  ? 'قارن راس براس بين جوج فواكه أو خضر مغربية (لكل 100 غرام)'
                  : lang === 'fr'
                    ? 'Comparaison tête-à-tête (pour 100 g)'
                    : 'Head-to-Head Produce Comparator (per 100g)'}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                sounds.playPop()
                const temp = leftId
                setLeftId(rightId)
                setRightId(temp)
              }}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#121811] text-[#6ee7b7] hover:border-[#10b981]"
              title="Swap items"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </button>
          </div>

          {/* Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#10b981]/40 bg-[#0c120d] p-3">
              <label className="block font-mono text-[10px] text-[#6ee7b7] mb-1">
                {lang === 'ar' ? 'الاختيار الأول (A)' : 'Produit A'}
              </label>
              <select
                value={leftId}
                onChange={(e) => setLeftId(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-[#f0f7f2] focus:outline-none"
              >
                {produceList.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#111610]">
                    {getLocalizedName(p)}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-xl border border-[#e59a38]/35 bg-[#16120b] p-3">
              <label className="block font-mono text-[10px] text-[#fcd34d] mb-1">
                {lang === 'ar' ? 'الاختيار الثاني (B)' : 'Produit B'}
              </label>
              <select
                value={rightId}
                onChange={(e) => setRightId(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-[#f0f7f2] focus:outline-none"
              >
                {produceList.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#111610]">
                    {getLocalizedName(p)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a140e]">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 bg-[#121711] text-[#84a391]">
                  <th className="p-3 text-start">{lang === 'ar' ? 'المؤشر الصحي' : 'Indicateur'}</th>
                  <th className="p-3 text-center text-[#6ee7b7]">{getLocalizedName(leftItem)}</th>
                  <th className="p-3 text-center text-[#fcd34d]">{getLocalizedName(rightItem)}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f2e9]/8">
                <tr>
                  <td className="p-3 text-[#d1e5d8]">{t.glycemicIndexLabel}</td>
                  <td className="p-3 text-center font-bold text-emerald-400">
                    GI {leftItem.nutrition.glycemicIndex}
                  </td>
                  <td className="p-3 text-center font-bold text-emerald-400">
                    GI {rightItem.nutrition.glycemicIndex}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-[#d1e5d8]">{t.oracScoreLabel}</td>
                  <td className="p-3 text-center font-bold text-[#f0f7f2]">
                    {leftItem.nutrition.antioxidantOrac}
                  </td>
                  <td className="p-3 text-center font-bold text-[#f0f7f2]">
                    {rightItem.nutrition.antioxidantOrac}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-[#d1e5d8]">{t.fiberLabel}</td>
                  <td className="p-3 text-center font-bold text-[#6ee7b7]">
                    {leftItem.nutrition.fiberGrams} g
                  </td>
                  <td className="p-3 text-center font-bold text-[#fcd34d]">
                    {rightItem.nutrition.fiberGrams} g
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-[#d1e5d8]">{t.vitaminCLabel}</td>
                  <td className="p-3 text-center font-bold text-[#f0f7f2]">
                    {leftItem.nutrition.vitaminC_mg} mg
                  </td>
                  <td className="p-3 text-center font-bold text-[#f0f7f2]">
                    {rightItem.nutrition.vitaminC_mg} mg
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-[#d1e5d8]">Potassium (K)</td>
                  <td className="p-3 text-center font-bold text-cyan-300">
                    {leftItem.nutrition.potassiumMg} mg
                  </td>
                  <td className="p-3 text-center font-bold text-cyan-300">
                    {rightItem.nutrition.potassiumMg} mg
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-[#d1e5d8]">Iron (Fe)</td>
                  <td className="p-3 text-center font-bold text-rose-300">
                    {leftItem.nutrition.ironMg} mg
                  </td>
                  <td className="p-3 text-center font-bold text-rose-300">
                    {rightItem.nutrition.ironMg} mg
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-[#d1e5d8]">{t.inSeasonPriceLabel}</td>
                  <td className="p-3 text-center font-extrabold text-[#34d399]">
                    {leftItem.pricing.inSeasonMAD} MAD/{leftItem.pricing.unit}
                  </td>
                  <td className="p-3 text-center font-extrabold text-[#fbbf24]">
                    {rightItem.pricing.inSeasonMAD} MAD/{rightItem.pricing.unit}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right 5 Cols: Interactive Souk Qoffa (قفة السوق المغربية) */}
      <div className="lg:col-span-5 double-bezel">
        <div className="double-bezel-inner p-6 flex flex-col justify-between space-y-5 h-full">
          <div className="space-y-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#10b981]/40 bg-[#10b981]/12 px-3 py-0.5 font-mono text-[10px] font-bold text-[#6ee7b7]">
                <ShoppingBasket className="h-3 w-3" />
                {lang === 'ar' ? 'حاسبة قفة السوق الأسبوعية' : 'SIMULATEUR QOFFA DU SOUK'}
              </span>
              <h2 className="mt-1.5 font-editorial text-xl sm:text-2xl font-bold text-[#f0f7f2]">
                {lang === 'ar'
                  ? 'قفة السوق المغربية وتوفير الموسم'
                  : lang === 'fr'
                    ? 'Panier Souk & Économie Saisonnière'
                    : 'Weekly Souk Qoffa & Seasonal Savings'}
              </h2>
            </div>

            {/* Add Item Row */}
            <div className="flex items-center gap-2">
              <select
                value={selectedAddId}
                onChange={(e) => setSelectedAddId(e.target.value)}
                className="flex-1 rounded-xl border border-white/10 bg-[#0a140e] px-3 py-2 text-xs font-semibold text-[#f0f7f2]"
              >
                {produceList.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#111610]">
                    {getLocalizedName(p)} ({p.pricing.inSeasonMAD} MAD/{p.pricing.unit})
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={addSelectedToBasket}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#10b981] px-3.5 py-2 text-xs font-bold text-[#050b07]"
              >
                <Plus className="h-4 w-4" />
                <span>{lang === 'ar' ? 'أضف للقفة' : 'Ajouter'}</span>
              </button>
            </div>

            {/* Basket Items List */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {basket.map((entry) => {
                const item = produceList.find((p) => p.id === entry.produceId)
                if (!item) return null
                return (
                  <div
                    key={entry.produceId}
                    className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-[#0a140e] p-3"
                  >
                    <button
                      type="button"
                      onClick={() => onSelectProduce(item)}
                      className="text-start"
                    >
                      <span className="block text-xs font-bold text-[#f0f7f2] hover:text-[#34d399]">
                        {getLocalizedName(item)}
                      </span>
                      <span className="font-mono text-[10px] text-[#6ee7b7]">
                        {Math.round(item.pricing.inSeasonMAD * entry.qty)} MAD ({t.inSeasonPriceLabel})
                      </span>
                    </button>

                    <div className="flex items-center gap-1.5 font-mono text-xs">
                      <button
                        type="button"
                        onClick={() => updateQty(entry.produceId, -0.5)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-[#141a13] text-[#f0f7f2]"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-[52px] text-center font-bold text-[#f0f7f2]">
                        {entry.qty} {item.pricing.unit}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(entry.produceId, 0.5)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-[#141a13] text-[#f0f7f2]"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeEntry(entry.produceId)}
                        className="ms-1 flex h-7 w-7 items-center justify-center rounded-lg text-rose-400 hover:bg-rose-950/40"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Basket Summary & Copy Button */}
          <div className="space-y-3 border-t border-white/10 pt-4 font-mono">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/25 p-3">
                <span className="block text-[10px] text-emerald-300">
                  {lang === 'ar' ? 'المجموع في وقتها (الموسم)' : 'Total en pleine saison'}
                </span>
                <span className="text-lg font-extrabold text-emerald-400">
                  {totals.inSeasonTotalMAD} MAD
                </span>
              </div>
              <div className="rounded-xl border border-[#f59e0b]/30 bg-[#211708] p-3">
                <span className="block text-[10px] text-[#fcd34d]">
                  {lang === 'ar' ? 'التوفير مقارنة بخارج الموسم' : 'Économie saisonnière'}
                </span>
                <span className="text-lg font-extrabold text-[#fcd34d]">
                  +{totals.savingsMAD} MAD
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#a7bfb0] px-1">
              <span>
                <Sparkles className="inline h-3.5 w-3.5 text-[#34d399] mr-1" />
                {lang === 'ar' ? 'إجمالي الألياف:' : 'Fibres totales :'} <strong>{totals.totalFiberGrams}g</strong>
              </span>
              <span>
                Vit C: <strong>{totals.totalVitCMg}mg</strong>
              </span>
            </div>

            <button
              type="button"
              onClick={copyQoffaList}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#10b981] py-3 text-xs font-bold text-[#050b07] shadow-lg hover:bg-[#5ec276]"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>
                {copied
                  ? lang === 'ar'
                    ? '✓ تم نسخ لائحة القفة للواتساب'
                    : '✓ Liste copiée dans le presse-papiers'
                  : lang === 'ar'
                    ? 'نسخ لائحة قفة السوق لمشاركتها في الواتساب'
                    : 'Copier la liste du Panier Souk (WhatsApp)'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
