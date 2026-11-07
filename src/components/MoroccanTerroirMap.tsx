import React, { useState, useEffect } from 'react'
import {
  Map,
  Award,
  Thermometer,
  Droplets,
  Sun,
  Sprout,
  RefreshCw,
} from 'lucide-react'
import type { ProduceItem } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import { MOROCCAN_AGRO_REGIONS, type MoroccanAgroRegion } from '../lib/moroccanTerroir'
import { fetchMoroccanAgroWeather, type AgroWeatherTelemetry } from '../services/agroApis'
import { ProduceCard } from './ProduceCard'
import { sounds } from '../lib/soundEffects'

interface MoroccanTerroirMapProps {
  produceList: ProduceItem[]
  lang: SupportedLanguage
  selectedRegionId: string
  onSelectRegionId: (id: string) => void
  onSelectProduce: (item: ProduceItem) => void
}

export const MoroccanTerroirMap: React.FC<MoroccanTerroirMapProps> = ({
  produceList,
  lang,
  selectedRegionId,
  onSelectRegionId,
  onSelectProduce,
}) => {
  const [weather, setWeather] = useState<AgroWeatherTelemetry | null>(null)
  const [loadingWeather, setLoadingWeather] = useState(false)

  const activeRegion: MoroccanAgroRegion =
    MOROCCAN_AGRO_REGIONS.find((r) => r.id === selectedRegionId) || MOROCCAN_AGRO_REGIONS[0]!

  useEffect(() => {
    let mounted = true
    setLoadingWeather(true)
    fetchMoroccanAgroWeather(activeRegion.id, activeRegion.lat, activeRegion.lon)
      .then((data) => {
        if (mounted) {
          setWeather(data)
          setLoadingWeather(false)
        }
      })
      .catch(() => {
        if (mounted) setLoadingWeather(false)
      })
    return () => {
      mounted = false
    }
  }, [activeRegion.id, activeRegion.lat, activeRegion.lon])

  const regionalProduce = produceList.filter(
    (item) =>
      item.terroirRegionIds.includes(activeRegion.id) ||
      activeRegion.signatureProduceIds.includes(item.id)
  )

  return (
    <section className="space-y-6">
      <div className="double-bezel">
        <div className="double-bezel-inner p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/45 bg-[#f59e0b]/12 px-3 py-1 font-mono text-xs font-bold text-[#fcd34d]">
                <Map className="h-3.5 w-3.5" />
                {lang === 'ar'
                  ? 'خريطة الأحواض الفلاحية المغربية وعلامات الجودة IGP / AOP'
                  : lang === 'fr'
                    ? 'ATLAS DES BASSINS AGRICOLES & TERROIRS IGP / AOP DU MAROC'
                    : 'MOROCCAN AGRICULTURAL TERROIRS & IGP/AOP ATLAS'}
              </span>
              <h2 className="mt-2 font-editorial text-2xl sm:text-3xl font-bold text-[#f0f7f2]">
                {lang === 'ar'
                  ? activeRegion.nameAr
                  : lang === 'fr'
                    ? activeRegion.nameFr
                    : activeRegion.nameEn}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#a7bfb0] max-w-3xl">
                {activeRegion.annualProductionNote[lang]}
              </p>
            </div>

            {/* Live Open-Meteo Agrometeorological Telemetry Box */}
            {weather && (
              <div className="rounded-2xl border border-[#10b981]/25 bg-[#0c130d] p-4 font-mono shrink-0">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-[10px] font-bold uppercase text-[#6ee7b7] flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#10b981] animate-ping" />
                    {lang === 'ar' ? 'طقس الفلاحة المباشر (Open-Meteo)' : 'Météo Agricole Live'}
                  </span>
                  {loadingWeather && <RefreshCw className="h-3 w-3 animate-spin text-[#34d399]" />}
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-[#07120c] px-3 py-2">
                    <span className="block text-[10px] text-[#84a391]">
                      <Thermometer className="inline h-3 w-3 text-amber-400 mr-0.5" />
                      Temp
                    </span>
                    <span className="text-sm font-bold text-[#f0f7f2]">{weather.temperatureC}°C</span>
                  </div>
                  <div className="rounded-xl bg-[#07120c] px-3 py-2">
                    <span className="block text-[10px] text-[#84a391]">
                      <Droplets className="inline h-3 w-3 text-sky-400 mr-0.5" />
                      Humid.
                    </span>
                    <span className="text-sm font-bold text-sky-300">{weather.humidityPercent}%</span>
                  </div>
                  <div className="rounded-xl bg-[#07120c] px-3 py-2">
                    <span className="block text-[10px] text-[#84a391]">
                      <Sun className="inline h-3 w-3 text-yellow-400 mr-0.5" />
                      UV Index
                    </span>
                    <span className="text-sm font-bold text-yellow-300">{weather.uvIndex}</span>
                  </div>
                </div>
                <div className="mt-2 text-[10px] text-[#84a391] flex items-center justify-between">
                  <span>🌱 {weather.soilMoistureIndex}</span>
                  <span className="text-[#6ee7b7] font-bold">
                    {activeRegion.lat.toFixed(2)}°N, {activeRegion.lon.toFixed(2)}°W
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 8 Moroccan Agricultural Regions Interactive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {MOROCCAN_AGRO_REGIONS.map((reg) => {
              const isSelected = reg.id === selectedRegionId
              return (
                <button
                  key={reg.id}
                  type="button"
                  onClick={() => {
                    sounds.playPop()
                    onSelectRegionId(reg.id)
                  }}
                  className={`flex flex-col justify-between rounded-2xl p-4 text-start transition ${
                    isSelected
                      ? 'border-2 border-[#10b981] bg-[#132216] text-[#f0f7f2] shadow-lg shadow-[#4ea865]/20'
                      : 'border border-white/10 bg-[#0d110c] text-[#a7bfb0] hover:border-[#10b981]/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
                      <span className="text-[#fbbf24] font-bold">{reg.hubCity}</span>
                      <span className="rounded bg-[#07120c] px-2 py-0.5 text-[#6ee7b7]">
                        {reg.dialectZone.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="mt-1.5 font-editorial text-sm font-bold text-[#f0f7f2]">
                      {lang === 'ar' ? reg.nameAr : lang === 'fr' ? reg.nameFr : reg.nameEn}
                    </h3>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1 border-t border-white/10 pt-2.5">
                    {reg.igpLabels.slice(0, 2).map((label) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1 rounded-md bg-[#241807] px-2 py-0.5 font-mono text-[9px] font-semibold text-[#fcd34d]"
                      >
                        <Award className="h-2.5 w-2.5" />
                        {label}
                      </span>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Region Climate & IGP Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0a140e] p-4 text-xs">
            <div className="flex items-center gap-2 text-[#d1e5d8]">
              <Sprout className="h-4 w-4 text-[#34d399] shrink-0" />
              <span>
                <strong>{lang === 'ar' ? 'الخصوصية المناخية والتربة:' : 'Climat & Pédologie :'}</strong>{' '}
                {lang === 'ar'
                  ? activeRegion.climateAr
                  : lang === 'fr'
                    ? activeRegion.climateFr
                    : activeRegion.climateEn}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeRegion.igpLabels.map((lbl) => (
                <span
                  key={lbl}
                  className="rounded-full border border-[#f59e0b]/45 bg-[#f59e0b]/12 px-3 py-0.5 font-mono text-[11px] font-bold text-[#fcd34d]"
                >
                  🏅 {lbl}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Regional Produce Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regionalProduce.map((item, idx) => (
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
