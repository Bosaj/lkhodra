export interface MoroccanAgroRegion {
  id: string
  nameAr: string
  nameFr: string
  nameEn: string
  hubCity: string
  dialectZone: 'oriental' | 'chamal' | 'centre' | 'sud'
  lat: number
  lon: number
  climateAr: string
  climateFr: string
  climateEn: string
  igpLabels: string[]
  signatureProduceIds: string[]
  annualProductionNote: {
    ar: string
    fr: string
    en: string
  }
}

export const MOROCCAN_AGRO_REGIONS: MoroccanAgroRegion[] = [
  {
    id: 'berkane-oriental',
    nameAr: 'سهل طريفة وبركان والجهة الشرقية',
    nameFr: 'Plaine des Triffa, Berkane & Oriental',
    nameEn: 'Triffa Plain, Berkane & Oriental',
    hubCity: 'Berkane / Oujda / Figuig',
    dialectZone: 'oriental',
    lat: 34.92,
    lon: -2.32,
    climateAr: 'مناخ متوسطي معتدل في طريفة وشبه صحراوي في الهضاب العليا وفجيج',
    climateFr: 'Microclimat méditerranéen doux (Triffa) et steppique présaharien (Hauts Plateaux & Figuig)',
    climateEn: 'Mild Mediterranean microclimate in Triffa & arid oasis climate in High Plateaus/Figuig',
    igpLabels: [
      'IGP Clémentine de Berkane',
      'IGP Nèfle de Zegzel',
      'IGP Datte Aziza Bouzid de Figuig',
    ],
    signatureProduceIds: ['clementine-berkane', 'truffe-terfess', 'pomme-de-terre-triffa', 'olives-oriental'],
    annualProductionNote: {
      ar: 'عاصمة الحوامض في المغرب (أكثر من 220 ألف طن من الكليمونتين والنافيل) وموطن المزاح د زڭزل والترفاس الصحراوي بمعاركة وتندرارة.',
      fr: 'Capitale marocaine des agrumes (Clémentine de Berkane IGP), nèfles de Zegzel, pommes de terre des Triffa et truffes du désert (Terfess) des Hauts Plateaux.',
      en: 'Morocco’s citrus capital (IGP Berkane Clementine), Zegzel loquats, Triffa potatoes, and prized desert truffles (Terfess) of Tendrara.',
    },
  },
  {
    id: 'souss-chtouka',
    nameAr: 'سوس ماسة وسهل شتوكة وتارودانت',
    nameFr: 'Plaine du Souss-Massa, Chtouka & Taroudant',
    nameEn: 'Souss-Massa Valley, Chtouka & Taroudant',
    hubCity: 'Agadir / Biougra / Taroudant',
    dialectZone: 'sud',
    lat: 30.22,
    lon: -9.35,
    climateAr: 'شمس ساطعة 320 يوماً في السنة مع نسيم المحيط الأطلسي المعتدل',
    climateFr: '320 jours d’ensoleillement annuel tempérés par la brise océanique atlantique',
    climateEn: '320+ sunny days per year moderated by Atlantic Ocean breezes',
    igpLabels: [
      'IGP Clémentine du Souss',
      'IGP Figue de Barbarie d’Aït Baâmrane',
      'IGP Huile d’Argane',
    ],
    signatureProduceIds: ['tomate-chtouka', 'figue-barbarie-ait-baamrane', 'clementine-berkane', 'gombo-mloukhiya'],
    annualProductionNote: {
      ar: 'سلة المغرب وأوروبا الشتوية: ينتج أكثر من 85% من البواكر المغربية (ماطيشة شتوكة، الفلفلة، القرعة الخضراء، والهندية د آيت باعمران).',
      fr: 'Premier bassin maraîcher primeur du Royaume (plus de 85% des exportations de tomates, poivrons, courgettes et figues de Barbarie d’Aït Baâmrane).',
      en: 'Morocco’s premier winter greenhouse & primeur vegetable basin producing 85%+ of national tomato and pepper exports.',
    },
  },
  {
    id: 'saiss-meknes-fes',
    nameAr: 'سهل سايس، مكناس، الحاجب وفاس',
    nameFr: 'Plaine du Saïss, Meknès, El Hajeb & Fès',
    nameEn: 'Saïss Plain, Meknès, El Hajeb & Fès',
    hubCity: 'Meknès / El Hajeb / Fès',
    dialectZone: 'centre',
    lat: 33.89,
    lon: -5.54,
    climateAr: 'تربة تيرس وحمري غنية جداً مع أمطار شتوية وينابيع الأطلس المتوسط',
    climateFr: 'Sols riches (Tirs et Hamri) irrigués par les sources karstiques du Moyen Atlas',
    climateEn: 'Deep fertile alluvial soils watered by Middle Atlas karstic springs',
    igpLabels: [
      'IGP Oignon d’El Hajeb',
      'AOP Huile d’Olive Volubilis',
      'IGP Cerise de Sefrou',
    ],
    signatureProduceIds: ['oignon-el-hajeb', 'ail-el-hajeb', 'olive-picholine', 'cerise-sefrou', 'menthe-meknes', 'feve-jelbana', 'navet-meknes'],
    annualProductionNote: {
      ar: 'القلب الفلاحي التاريخي للمغرب: ينتج أكثر من 55% من البصلة الحمراء والثومة البلدية بالحاجب، وأجود الزيتون، وحب الملوك بصفرو، والنعناع المكاوي.',
      fr: 'Cœur agricole impérial : produit plus de 55% des oignons et ails du Maroc (El Hajeb), l’olive Picholine, la cerise de Sefrou et la menthe de Bhalil.',
      en: 'Imperial agricultural heartland supplying 55%+ of Morocco’s red onions and pink garlic (El Hajeb), olives, Sefrou cherries, and Meknès mint.',
    },
  },
  {
    id: 'atlas-midelt',
    nameAr: 'الأطلس الكبير والمتوسط (ميدلت، إفران، خنيفرة)',
    nameFr: 'Haut & Moyen Atlas (Midelt, Ifrane, Khénifra)',
    nameEn: 'High & Middle Atlas (Midelt, Ifrane, Khénifra)',
    hubCity: 'Midelt / Ifrane / Azrou',
    dialectZone: 'centre',
    lat: 32.68,
    lon: -4.74,
    climateAr: 'مناخ جبلي بارد شتاءً (ساعات برودة عالية) ومشمس نهاراً يمنح الفواكه قرمشة وحلاوة مركزة',
    climateFr: 'Climat montagnard d’altitude (1 500 m+) offrant les heures de froid idéales pour les rosacées',
    climateEn: 'High-altitude mountain climate (1,500m+) providing optimal winter chill hours for crisp orchard fruit',
    igpLabels: [
      'IGP Pomme de Midelt',
      'IGP Cerise d’Ifrane & Sefrou',
    ],
    signatureProduceIds: ['pomme-midelt', 'cerise-sefrou', 'topinambour-qasbiya'],
    annualProductionNote: {
      ar: 'ميدلت تنتج أكثر من 60% من التفاح المغربي بفضل علو جبال العياشي وبرد الشتاء الذي يركز مضادات الأكسدة والبكتين في القشرة.',
      fr: 'Midelt assure plus de 60% de la production nationale de pommes grâce à l’altitude du Jbel Ayachi.',
      en: 'Midelt produces over 60% of Morocco’s apples thanks to the high-altitude slopes of Jbel Ayachi.',
    },
  },
  {
    id: 'tadla-beni-mellal',
    nameAr: 'سهل تادلة، بني ملال وأولاد عبد الله',
    nameFr: 'Plaine du Tadla, Béni Mellal & Ouled Abdellah',
    nameEn: 'Tadla Plain, Béni Mellal & Ouled Abdellah',
    hubCity: 'Béni Mellal / Fquih Ben Salah',
    dialectZone: 'centre',
    lat: 32.34,
    lon: -6.36,
    climateAr: 'سهل مسقي بمياه أم الربيع وسد بين الويدان مع حرارة خريفية تنضج الرمان والزيتون',
    climateFr: 'Plaine irriguée par l’Oum Er-Rbia et le barrage Bin El Ouidane, idéale pour le grenadier et les agrumes',
    climateEn: 'Irrigated plain fed by Oum Er-Rbia and Bin El Ouidane dam, ideal for pomegranates and olives',
    igpLabels: [
      'IGP Grenade Sefri d’Ouled Abdellah',
      'IGP Huile d’Olive de Tadla',
    ],
    signatureProduceIds: ['grenade-sefri', 'olive-picholine', 'artichaut-qouq'],
    annualProductionNote: {
      ar: 'أولاد عبد الله ببني ملال هي عاصمة الرمان السفري المغربي العالمي ذي القشرة الرقيقة والحبات الياقوتية الحلوة بدون عظم قاسٍ.',
      fr: 'Ouled Abdellah est le berceau mondialement reconnu de la Grenade Sefri IGP à peau fine et arilles sucrés.',
      en: 'Ouled Abdellah is the world-renowned cradle of the thin-skinned, ruby-sweet IGP Sefri Pomegranate.',
    },
  },
  {
    id: 'draa-tafilalet-taliouine',
    nameAr: 'واحات درعة وتافيلالت وتاليوين (الرشيدية، زاكورة)',
    nameFr: 'Oasis de Drâa-Tafilalet, Zagora & Taliouine',
    nameEn: 'Drâa-Tafilalet Oases, Zagora & Taliouine',
    hubCity: 'Errachidia / Zagora / Taliouine',
    dialectZone: 'sud',
    lat: 31.43,
    lon: -4.42,
    climateAr: 'واحات صحراوية وجبال سيروا البركانية (تاليوين) ذات الإشعاع الشمسي العالي',
    climateFr: 'Oasis sahariennes (Ziz & Drâa) et terrasses volcaniques d’altitude du Jbel Siroua (Taliouine)',
    climateEn: 'Saharan river oases (Ziz & Drâa) and volcanic mountain terraces of Jbel Siroua (Taliouine)',
    igpLabels: [
      'IGP Datte Majhoul de Tafilalet',
      'AOP Safran de Taliouine',
      'IGP Datte Boufeggous',
      'IGP Amande de Tafraoute',
    ],
    signatureProduceIds: ['datte-majhoul', 'safran-taliouine', 'pasteque-zagora', 'amande-tafraoute'],
    annualProductionNote: {
      ar: 'مهد التمر المجهول الملكي بتافيلالت، والزعفران الحر بتاليوين، والدلاح البكري بزاكورة، واللوز البلدي بتافراوت.',
      fr: 'Berceau historique de la datte royale Majhoul, du Safran AOP de Taliouine et des pastèques primeurs de Zagora.',
      en: 'Historic cradle of the royal Medjool date (Tafilalet), AOP Taliouine Saffron, and early spring Zagora watermelons.',
    },
  },
  {
    id: 'loukkos-gharb-chamal',
    nameAr: 'حوض اللوكوس، الغرب والشمال (العرائش، القنيطرة، تاونات)',
    nameFr: 'Bassins du Loukkos, Gharb & Nord (Larache, Kénitra, Taounate)',
    nameEn: 'Loukkos, Gharb & Northern Basins (Larache, Kenitra, Taounate)',
    hubCity: 'Larache / Kénitra / Taounate',
    dialectZone: 'chamal',
    lat: 35.18,
    lon: -6.15,
    climateAr: 'مناخ أطلسي رطب وتربة رملية-طينية مثالية للفواكه الحمراء والأفوكادو والكرموس',
    climateFr: 'Climat atlantique humide et sols sablo-limoneux idéaux pour fruits rouges, avocats et figuiers',
    climateEn: 'Humid Atlantic climate & sandy-loam soils ideal for berries, avocados, artichokes, and figs',
    igpLabels: [
      'IGP Figue de Taounate',
      'IGP Fraise du Loukkos',
    ],
    signatureProduceIds: ['fraise-loukkos', 'avocat-gharb', 'figue-taounate', 'artichaut-qouq'],
    annualProductionNote: {
      ar: 'ينتج حوض اللوكوس والغرب أكثر من 90% من الفريز (التوت الأرضي) والتوت الأزرق والأفوكادو المغربية، بينما تتصدر تاونات ووزان إنتاج الكرموس البلدي.',
      fr: 'Le Loukkos et le Gharb concentrent 90% des fraises, fruits rouges et avocats du Maroc ; Taounate domine la figue fraîche et séchée.',
      en: 'Loukkos and Gharb produce 90%+ of Morocco’s strawberries, berries, and avocados, while Taounate leads in heritage figs.',
    },
  },
  {
    id: 'doukkala-haouz-abdas',
    nameAr: 'سهول دكالة، عبدة والحوز (الجديدة، آسفي، مراكش)',
    nameFr: 'Plaines des Doukkala, Abda & Haouz (El Jadida, Safi, Marrakech)',
    nameEn: 'Doukkala, Abda & Haouz Plains (El Jadida, Safi, Marrakech)',
    hubCity: 'El Jadida / Safi / Marrakech',
    dialectZone: 'centre',
    lat: 32.25,
    lon: -8.52,
    climateAr: 'تربة تيرس سوداء خصبة في دكالة وسفوح الأطلس الكبير المشمسة في الحوز',
    climateFr: 'Terres noires fertiles (Tirs des Doukkala) et piémonts ensoleillés du Haouz de Marrakech',
    climateEn: 'Rich black Tirs soils of Doukkala and sunny High Atlas foothills of Marrakech Haouz',
    igpLabels: [
      'IGP Câpre de Safi',
      'IGP Raisin Doukkali',
    ],
    signatureProduceIds: ['citrouille-doukkala', 'raisin-doukkali', 'coing-haouz', 'melon-souihla', 'capre-safi'],
    annualProductionNote: {
      ar: 'دكالة مشهورة بالڭرعة الحمراء العسلية للكسكس والعنب الدكالي، وآسفي بالكبار المغربي الأول عالمياً، والحوز بالسفرجل والسويهلة المراكشية.',
      fr: 'Doukkala excelle dans la courge rouge à couscous et le raisin Muscat ; Safi est leader mondial du câpre ; le Haouz brille par ses coings et melons.',
      en: 'Doukkala is famed for sweet red couscous pumpkins and Muscat grapes, Safi leads global caper exports, and Haouz excels in quinces and melons.',
    },
  },
]

export function getSeasonStatusForMonth(
  peakMonths: number[],
  availableMonths: number[],
  monthNum: number
): 'peak' | 'available' | 'off_season' {
  if (peakMonths.includes(monthNum)) return 'peak'
  if (availableMonths.includes(monthNum)) return 'available'
  return 'off_season'
}

export function calculateSeasonalPriceMAD(
  inSeasonMAD: number,
  offSeasonMAD: number,
  peakMonths: number[],
  availableMonths: number[],
  monthNum: number
): number {
  const status = getSeasonStatusForMonth(peakMonths, availableMonths, monthNum)
  if (status === 'peak') return inSeasonMAD
  if (status === 'available') return Math.round(((inSeasonMAD + offSeasonMAD) / 2) * 10) / 10
  return offSeasonMAD
}
