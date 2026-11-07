import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = path.resolve(__dirname, '../public/images/produce')
const CREDITS_FILE = path.resolve(__dirname, '../public/images/CREDITS.json')

const USER_AGENT =
  'LkhodraMoroccanProduceAtlas/1.0 (https://github.com/Bosaj/lkhodra; oussousselhadji@gmail.com) Node.js/22'

const PRODUCE_WIKI_SOURCES = {
  'clementine-berkane-1': { title: 'File:Mandarin_Oranges_(Citrus_Reticulata).jpg', query: 'Citrus clementina fruit' },
  'grenade-sefri-1': { title: 'File:Pomegranate_fruit_-_whole_and_piece_with_arils.jpg', query: 'Punica granatum fruit arils' },
  'figue-barbarie-ait-baamrane-1': { title: 'File:Opuntia_ficus-indica_fruit9.jpg', query: 'Opuntia ficus-indica fruit' },
  'datte-majhoul-1': { title: 'File:Medjool_dates.jpg', query: 'Medjool dates fruit' },
  'tomate-chtouka-1': { title: 'File:Bright_red_tomato_and_cross_section02.jpg', query: 'Solanum lycopersicum ripe tomato' },
  'artichaut-qouq-1': { title: 'File:Artichoke_heart_cross_section.jpg', query: 'Cynara scolymus globe artichoke' },
  'topinambour-qasbiya-1': { title: 'File:Sunroot_topinambour_sunchoke_helianthus_tuberosus.jpg', query: 'Helianthus tuberosus tubers' },
  'avocat-gharb-1': { title: 'File:Avocado_Hass_-_single_and_halved.jpg', query: 'Persea americana Hass avocado' },
  'fraise-loukkos-1': { title: 'File:Garden_strawberry_(Fragaria_×_ananassa)_single2.jpg', query: 'Fragaria ananassa strawberry' },
  'coing-haouz-1': { title: 'File:Quince_fruit.jpg', query: 'Cydonia oblonga quince fruit' },
  'citrouille-doukkala-1': { title: 'File:FrenchMarketPumpkinsB.jpg', query: 'Cucurbita maxima pumpkin' },
  'pomme-midelt-1': { title: 'File:Red_Apple.jpg', query: 'Malus domestica red apple' },
  'cerise-sefrou-1': { title: 'File:Cherry_Stella444.jpg', query: 'Prunus avium sweet cherries' },
  'figue-taounate-1': { title: 'File:Figs.jpg', query: 'Ficus carica fresh figs' },
  'pasteque-zagora-1': { title: 'File:Watermelon_cross_section.jpg', query: 'Citrullus lanatus watermelon' },
  'oignon-el-hajeb-1': { title: 'File:Mixed_onions.jpg', query: 'Allium cepa red onion' },
  'ail-el-hajeb-1': { title: 'File:Garlic_bulbs.jpg', query: 'Allium sativum pink garlic' },
  'feve-jelbana-1': { title: 'File:Broad_beans_Vicia_faba.jpg', query: 'Vicia faba broad beans' },
  'gombo-mloukhiya-1': { title: 'File:Hong_Kong_Okra_Aug_2012.JPG', query: 'Abelmoschus esculentus okra pods' },
  'olive-picholine-1': { title: 'File:Olives_from_Jordan.jpg', query: 'Olea europaea green olives' },
  'navet-meknes-1': { title: 'File:Turnip_2622027.jpg', query: 'Brassica rapa turnip root' },
  'menthe-meknes-1': { title: 'File:Mint-leaves-2007.jpg', query: 'Mentha spicata spearmint leaves' },
  'safran-taliouine-1': { title: 'File:Saffron_threads.jpg', query: 'Crocus sativus saffron threads' },
  'nefle-berkane-1': { title: 'File:Eriobotrya_japonica_fruit.jpg', query: 'Eriobotrya japonica loquat fruit' },
  'citron-beldi-1': { title: 'File:Lemon_-_whole_and_split.jpg', query: 'Citrus limon lemon fruit' },
  'melon-souihla-1': { title: 'File:Cantaloupes.jpg', query: 'Cucumis melo cantaloupe melon' },
  'feggous-maroc-1': { title: 'File:Armenian_cucumber.jpg', query: 'Cucumis melo flexuosus Armenian cucumber' },
  'prune-chefchaouen-1': { title: 'File:Plums_of_variety_Stanley.jpg', query: 'Prunus domestica plums' },
  'amande-tafraoute-1': { title: 'File:Almonds_in_shell_and_shelled.jpg', query: 'Prunus dulcis almonds' },
  'terfess-oriental-1': { title: 'File:Terfezia_arenaria.jpg', query: 'Terfezia desert truffle' },
  'capre-safi-1': { title: 'File:Salted_capers.jpg', query: 'Capparis spinosa capers' },
}

async function fetchWikiInfoByTitle(fileTitle) {
  const url = new URL('https://commons.wikimedia.org/w/api.php')
  url.searchParams.set('action', 'query')
  url.searchParams.set('format', 'json')
  url.searchParams.set('prop', 'imageinfo')
  url.searchParams.set('iiprop', 'url|extmetadata')
  url.searchParams.set('iiurlwidth', '900')
  url.searchParams.set('titles', fileTitle)

  const res = await fetch(url.toString(), { headers: { 'User-Agent': USER_AGENT } })
  if (!res.ok) return null
  const data = await res.json()
  const pages = data.query?.pages
  if (!pages) return null
  const pageId = Object.keys(pages)[0]
  if (!pageId || pageId === '-1') return null
  return pages[pageId].imageinfo?.[0] || null
}

async function searchWikiImage(query) {
  const url = new URL('https://commons.wikimedia.org/w/api.php')
  url.searchParams.set('action', 'query')
  url.searchParams.set('format', 'json')
  url.searchParams.set('generator', 'search')
  url.searchParams.set('gsrsearch', `filetype:bitmap ${query}`)
  url.searchParams.set('gsrnamespace', '6')
  url.searchParams.set('gsrlimit', '3')
  url.searchParams.set('prop', 'imageinfo')
  url.searchParams.set('iiprop', 'url|extmetadata')
  url.searchParams.set('iiurlwidth', '900')

  const res = await fetch(url.toString(), { headers: { 'User-Agent': USER_AGENT } })
  if (!res.ok) return null
  const data = await res.json()
  const pages = data.query?.pages
  if (!pages) return null
  for (const page of Object.values(pages)) {
    const info = page.imageinfo?.[0]
    if (info && (info.thumburl || info.url)) return info
  }
  return null
}

async function downloadFile(url, destPath) {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(destPath, buf)
}

async function main() {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true })
  const credits = {}

  for (const [key, spec] of Object.entries(PRODUCE_WIKI_SOURCES)) {
    const dest = path.join(PUBLIC_DIR, `${key}.jpg`)
    try {
      let info = await fetchWikiInfoByTitle(spec.title)
      if (!info) {
        info = await searchWikiImage(spec.query)
      }
      if (!info) {
        console.warn(`No image found for ${key}`)
        continue
      }
      const imgUrl = info.thumburl || info.url
      await downloadFile(imgUrl, dest)
      const meta = info.extmetadata || {}
      credits[key] = {
        sourceUrl: info.descriptionurl || imgUrl,
        license: meta.LicenseShortName?.value || 'CC / Public Domain',
      }
      console.log(`Downloaded ${key}.jpg`)
    } catch (err) {
      console.error(`Failed ${key}:`, err.message)
    }
  }

  fs.writeFileSync(CREDITS_FILE, JSON.stringify(credits, null, 2))
  console.log('Done downloading real produce images!')
}

main()
