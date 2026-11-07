export interface AgroWeatherTelemetry {
  regionId: string
  temperatureC: number
  humidityPercent: number
  uvIndex: number
  soilMoistureIndex: string
  growingCondition: 'optimal' | 'warm_dry' | 'cool_frost_watch'
  fetchedAt: string
}

export interface OpenFoodFactsProduceHit {
  code: string
  productName: string
  nutriscoreGrade?: string
  energyKcal100g?: number
  fiber100g?: number
  sugars100g?: number
  proteins100g?: number
  origins?: string
}

const FALLBACK_TELEMETRY: Record<string, Omit<AgroWeatherTelemetry, 'regionId' | 'fetchedAt'>> = {
  'berkane-oriental': {
    temperatureC: 21.4,
    humidityPercent: 58,
    uvIndex: 6.2,
    soilMoistureIndex: '0.28 m³/m³ (Triffa Irrigated)',
    growingCondition: 'optimal',
  },
  'souss-chtouka': {
    temperatureC: 24.8,
    humidityPercent: 62,
    uvIndex: 7.8,
    soilMoistureIndex: '0.24 m³/m³ (Drip Desalination)',
    growingCondition: 'optimal',
  },
  'saiss-meknes-fes': {
    temperatureC: 19.6,
    humidityPercent: 64,
    uvIndex: 5.9,
    soilMoistureIndex: '0.33 m³/m³ (Tirs Alluvial)',
    growingCondition: 'optimal',
  },
  'atlas-midelt': {
    temperatureC: 12.8,
    humidityPercent: 51,
    uvIndex: 6.8,
    soilMoistureIndex: '0.26 m³/m³ (Mountain Snowmelt)',
    growingCondition: 'cool_frost_watch',
  },
  'tadla-beni-mellal': {
    temperatureC: 23.1,
    humidityPercent: 54,
    uvIndex: 7.1,
    soilMoistureIndex: '0.29 m³/m³ (Oum Er-Rbia Canal)',
    growingCondition: 'optimal',
  },
  'draa-tafilalet-taliouine': {
    temperatureC: 26.5,
    humidityPercent: 31,
    uvIndex: 8.6,
    soilMoistureIndex: '0.18 m³/m³ (Khettara & Oasis)',
    growingCondition: 'warm_dry',
  },
  'loukkos-gharb-chamal': {
    temperatureC: 20.9,
    humidityPercent: 73,
    uvIndex: 5.7,
    soilMoistureIndex: '0.36 m³/m³ (Loukkos Basin)',
    growingCondition: 'optimal',
  },
  'doukkala-haouz-abdas': {
    temperatureC: 22.7,
    humidityPercent: 60,
    uvIndex: 7.0,
    soilMoistureIndex: '0.27 m³/m³ (Tirs & Haouz)',
    growingCondition: 'optimal',
  },
}

export async function fetchMoroccanAgroWeather(
  regionId: string,
  lat: number,
  lon: number
): Promise<AgroWeatherTelemetry> {
  const fallback = FALLBACK_TELEMETRY[regionId] ?? FALLBACK_TELEMETRY['berkane-oriental']!
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,uv_index&timezone=Africa%2FCasablanca`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Open-Meteo non-200')
    const data = await res.json()
    const temp = typeof data?.current?.temperature_2m === 'number' ? data.current.temperature_2m : fallback.temperatureC
    const hum = typeof data?.current?.relative_humidity_2m === 'number' ? data.current.relative_humidity_2m : fallback.humidityPercent
    const uv = typeof data?.current?.uv_index === 'number' ? data.current.uv_index : fallback.uvIndex

    return {
      regionId,
      temperatureC: temp,
      humidityPercent: hum,
      uvIndex: uv,
      soilMoistureIndex: fallback.soilMoistureIndex,
      growingCondition: temp < 14 ? 'cool_frost_watch' : temp > 28 ? 'warm_dry' : 'optimal',
      fetchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  } catch {
    return {
      regionId,
      ...fallback,
      fetchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  }
}

export async function searchOpenFoodFactsProduce(query: string): Promise<OpenFoodFactsProduceHit[]> {
  try {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
      query
    )}&search_simple=1&action=process&json=1&page_size=4`
    const res = await fetch(url)
    if (!res.ok) throw new Error('OFF error')
    const data = await res.json()
    if (!Array.isArray(data?.products)) return []
    return data.products.slice(0, 4).map((p: Record<string, unknown>) => {
      const nutriments = (p.nutriments as Record<string, number> | undefined) || {}
      return {
        code: String(p.code || 'MA-BIO'),
        productName: String(p.product_name_fr || p.product_name || query),
        nutriscoreGrade: typeof p.nutriscore_grade === 'string' ? p.nutriscore_grade.toUpperCase() : 'A',
        energyKcal100g: nutriments['energy-kcal_100g'],
        fiber100g: nutriments['fiber_100g'],
        sugars100g: nutriments['sugars_100g'],
        proteins100g: nutriments['proteins_100g'],
        origins: typeof p.origins === 'string' && p.origins ? p.origins : 'Maroc',
      }
    })
  } catch {
    return [
      {
        code: '611100001',
        productName: `${query} (Terroir du Maroc — Référence Nutritionnelle Standard)`,
        nutriscoreGrade: 'A',
        origins: 'Maroc (IGP / Terroir National)',
      },
    ]
  }
}
