import type { SeasonName, HealthTargetOrgan } from './types'

export interface SeasonalWeakOrgan {
  id: string
  organKey: HealthTargetOrgan
  organName: { ar: string; fr: string; en: string }
  vulnerabilityLevel: 'critical' | 'high' | 'moderate'
  whyWeakInThisSeason: { ar: string; fr: string; en: string }
  whatItNeeds: { ar: string; fr: string; en: string }
  keyBioactives: string[]
  recommendedProduceIds: string[]
}

export interface WeeklyOrganPlan {
  weekNumber: 1 | 2 | 3 | 4
  weekTitle: { ar: string; fr: string; en: string }
  focusOrgan: { ar: string; fr: string; en: string }
  neededFuel: { ar: string; fr: string; en: string }
  dailyProtocol: { ar: string; fr: string; en: string }
  featuredProduceIds: string[]
}

export interface SeasonOrganProfile {
  season: Exclude<SeasonName, 'all_year'>
  monthsLabel: { ar: string; fr: string; en: string }
  seasonTitle: { ar: string; fr: string; en: string }
  climatePhysiologySummary: { ar: string; fr: string; en: string }
  weakOrgans: SeasonalWeakOrgan[]
  weeklySchedule: WeeklyOrganPlan[]
}

export interface ProduceSeasonalOrganRole {
  seasonLabel: { ar: string; fr: string; en: string }
  weakOrganHealed: { ar: string; fr: string; en: string }
  whyOrganNeedsItNow: { ar: string; fr: string; en: string }
  targetWeekBadge: { ar: string; fr: string; en: string }
  dailyDose: { ar: string; fr: string; en: string }
  gallery: {
    url: string
    captionAr: string
    captionFr: string
    captionEn: string
  }[]
}

export const SEASONAL_ORGAN_PROFILES: Record<Exclude<SeasonName, 'all_year'>, SeasonOrganProfile> = {
  winter: {
    season: 'winter',
    monthsLabel: {
      ar: 'دجنبر · يناير · فبراير (موسم الليالي)',
      fr: 'Décembre · Janvier · Février (Saison Lyali)',
      en: 'December · January · February (Winter Lyali)',
    },
    seasonTitle: {
      ar: 'الشتاء المغربي: الأعضاء الضعيفة في البرد وما تحتاجه من خضر وفواكه الموسم',
      fr: 'Hiver Marocain : Organes Vulnérables au Froid & Besoins Nutritionnels',
      en: 'Moroccan Winter: Cold-Stressed Weak Organs & Seasonal Produce Needs',
    },
    climatePhysiologySummary: {
      ar: 'في برد الشتاء ("الليالي") ورطوبة الساحل وصقيع الأطلس، تتقلص الأوعية الدموية الطرفية وتضعف حركة الأهداب التنفسية وتستنزف الغدة الكظرية مخزون فيتامين C، مما يجعل الرئتين، المناعة، المفاصل، والقولون أكثر الأعضاء ضعفاً وحاجة لدعم فواكه وخضر الشتاء.',
      fr: 'Durant l’hiver marocain (« Lyali »), la vasoconstriction due au froid et l’humidité affaiblissent les bronches, l’immunité surrénalienne, les articulations et le transit.',
      en: 'During the cold Moroccan winter ("Lyali"), peripheral vasoconstriction and damp air weaken the lungs, adrenal immunity, joints, and gut motility.',
    },
    weakOrgans: [
      {
        id: 'winter-lungs',
        organKey: 'immunity',
        organName: {
          ar: 'الرئتان، القصبات الهوائية والجيوب الأنفية',
          fr: 'Poumons, Bronches & Sinus',
          en: 'Lungs, Bronchi & Sinuses',
        },
        vulnerabilityLevel: 'critical',
        whyWeakInThisSeason: {
          ar: 'الهواء البارد والرطب يبطئ حركة الأهداب المخاطية في القصبات الهوائية فيسهل اختراق فيروسات الزكام والأنفلونزا وتراكم البلغم.',
          fr: 'L’air froid ralentit les cils bronchiques et favorise la congestion pulmonaire et les virus hivernaux.',
          en: 'Cold air slows bronchial cilia clearance, making respiratory mucosa vulnerable to winter viruses and phlegm.',
        },
        whatItNeeds: {
          ar: 'يحتاج إلى فيتامين C الطبيعي، الكيرسيتين، الأليسين الكبريتي، والجلوكوزينولات لإذابة البلغم وتحصين الأغشية المخاطية.',
          fr: 'Besoin de Vitamine C native, Quercétine, Allicine et Glucosinolates soufrés expectorants.',
          en: 'Needs native Vitamin C, Quercetin, Allicin, and sulfur Glucosinolates to thin mucus and boost mucosal IgA.',
        },
        keyBioactives: ['Vitamin C (Ascorbic Acid)', 'Quercetin', 'Allicin', 'Glucosinolates'],
        recommendedProduceIds: ['clementine-berkane', 'navet-meknes', 'oignon-el-hajeb', 'ail-el-hajeb', 'citron-beldi'],
      },
      {
        id: 'winter-joints',
        organKey: 'bones',
        organName: {
          ar: 'المفاصل، العظام والدورة الدموية الطرفية',
          fr: 'Articulations, Os & Microcirculation',
          en: 'Joints, Bones & Peripheral Circulation',
        },
        vulnerabilityLevel: 'high',
        whyWeakInThisSeason: {
          ar: 'انخفاض الحرارة والضغط الجوي يزيد لزوجة السائل المفصلي ويسبب تيبس الركب والمفاصل وبرودة الأطراف.',
          fr: 'Le froid augmente la viscosité synoviale et réveille les douleurs articulaires et rhumatismales.',
          en: 'Low temperatures thicken synovial joint fluid and constrict capillaries, triggering winter joint stiffness.',
        },
        whatItNeeds: {
          ar: 'يحتاج إلى الأوليوكانثال المضاد للالتهاب (في زيت الزيتون الجديدة)، الكبريت العضوي، البوتاسيوم، والحديد الدافئ.',
          fr: 'Besoin d’Oléocanthal anti-inflammatoire (huile d’olive nouvelle), soufre organique et fer.',
          en: 'Needs anti-inflammatory Oleocanthal (fresh olive oil), organic sulfur, potassium, and warming iron.',
        },
        keyBioactives: ['Oleocanthal', 'Hydroxytyrosol', 'Organic Sulfur', 'Non-Heme Iron'],
        recommendedProduceIds: ['olive-picholine', 'topinambour-qasbiya', 'ail-el-hajeb', 'citrouille-doukkala'],
      },
      {
        id: 'winter-gut',
        organKey: 'digestion',
        organName: {
          ar: 'القولون والميكروبيوم المعوي (بطء الهضم الشتوي)',
          fr: 'Côlon & Microbiote Hivernal',
          en: 'Colon & Winter Gut Microbiome',
        },
        vulnerabilityLevel: 'high',
        whyWeakInThisSeason: {
          ar: 'قلة شرب الماء في الشتاء مع كثرة القطاني والأطباق الثقيلة يسبب كسل الأمعاء والانتفاخ وتراجع بكتيريا المناعة.',
          fr: 'La baisse d’hydratation et les plats riches d’hiver ralentissent le transit et ballonnent le côlon.',
          en: 'Lower water intake and heavier winter meals slow intestinal transit and deplete beneficial gut flora.',
        },
        whatItNeeds: {
          ar: 'يحتاج إلى ألياف الإنولين البريبيوتيك (في البطاطا القصبية والقوق) وبكتيريا التخمر الطبيعي (في الحامض المصير والزيتون المسلالة).',
          fr: 'Besoin d’Inuline prébiotique pure (Topinambour, Artichaut) et de probiotiques naturels (Citron confit, Meslalla).',
          en: 'Needs pure prebiotic Inulin (Sunchokes, Artichokes) and live lacto-fermented probiotics (Preserved Beldi Lemon).',
        },
        keyBioactives: ['Prebiotic Inulin', 'Lactobacillus Probiotics', 'Cynarin', 'Soluble Pectin'],
        recommendedProduceIds: ['topinambour-qasbiya', 'artichaut-qouq', 'citron-beldi', 'olive-picholine'],
      },
      {
        id: 'winter-pancreas',
        organKey: 'blood_sugar',
        organName: {
          ar: 'البنكرياس وتوازن الأنسولين الشتوي',
          fr: 'Pancréas & Glycémie Hivernale',
          en: 'Pancreas & Winter Insulin Sensitivity',
        },
        vulnerabilityLevel: 'moderate',
        whyWeakInThisSeason: {
          ar: 'قلة الحركة في البرد وزيادة الشهية للخبز والنشويات ترفع مقاومة الأنسولين وسكر الدم في الشتاء.',
          fr: 'La sédentarité hivernale et l’excès de féculents augmentent la résistance à l’insuline.',
          en: 'Reduced winter activity and higher starch cravings spike blood glucose and insulin resistance.',
        },
        whatItNeeds: {
          ar: 'يحتاج إلى بدائل جذرية خالية من النشا (البطاطا القصبية GI=11 واللفت GI=30) والكروم الطبيعي.',
          fr: 'Besoin de tubercules sans amidon à base d’inuline (Topinambour IG 11, Navet IG 30).',
          en: 'Needs starch-free inulin tubers (Batata Qasbiya GI 11, Turnip GI 30) and insulin-sensitizing chromium.',
        },
        keyBioactives: ['Inulin (GI 11)', 'Chromium', 'Hesperidin', 'Chlorogenic Acid'],
        recommendedProduceIds: ['topinambour-qasbiya', 'navet-meknes', 'clementine-berkane', 'oignon-el-hajeb'],
      },
    ],
    weeklySchedule: [
      {
        weekNumber: 1,
        weekTitle: {
          ar: 'الأسبوع 1 من الشتاء: تحصين الرئتين والقصبات الهوائية',
          fr: 'Semaine 1 d’Hiver : Bouclier Pulmonaire & Bronchique',
          en: 'Winter Week 1: Lung & Bronchial Mucosal Shield',
        },
        focusOrgan: { ar: 'الرئتان والجيوب الأنفية', fr: 'Poumons & Sinus', en: 'Lungs & Sinuses' },
        neededFuel: { ar: 'فيتامين C + جلوكوزينولات اللفت + أليسين الثومة', fr: 'Vitamine C + Glucosinolates + Allicine', en: 'Vitamin C + Glucosinolates + Allicin' },
        dailyProtocol: {
          ar: 'صباحاً: 3 حبات كليمونتين بركان + ماء دافئ بالحامض البلدي. الغداء: طاجين اللفت البلدي والمحفور مع الثومة الحمراء. المساء: شراب اللفت المحفور بالعسل لتنقية الصدر.',
          fr: 'Matin : 3 clémentines de Berkane + eau tiède au citron beldi. Midi : Tagine aux navets et ail rose. Soir : Infusion chaude.',
          en: 'Morning: 3 Berkane clementines + warm Beldi lemon water. Lunch: Heritage turnip tagine with pink garlic. Evening: Honey-turnip bronchial elixir.',
        },
        featuredProduceIds: ['clementine-berkane', 'navet-meknes', 'ail-el-hajeb', 'citron-beldi'],
      },
      {
        weekNumber: 2,
        weekTitle: {
          ar: 'الأسبوع 2 من الشتاء: تغذية الميكروبيوم وضبط السكر بالإنولين',
          fr: 'Semaine 2 d’Hiver : Microbiote & Équilibre Glycémique',
          en: 'Winter Week 2: Microbiome & Low-GI Insulin Reset',
        },
        focusOrgan: { ar: 'القولون والبنكرياس', fr: 'Côlon & Pancréas', en: 'Colon & Pancreas' },
        neededFuel: { ar: 'الإنولين النقي (GI 11) + البروبيوتيك الطبيعي', fr: 'Inuline pure (IG 11) + Probiotiques', en: 'Pure Inulin (GI 11) + Live Probiotics' },
        dailyProtocol: {
          ar: 'استبدال البطاطا العادية في الطاجين بـ "البطاطا القصبية" والخرشوف البلدي مع طريف من الحامض المصير البلدي المخمر طبيعياً.',
          fr: 'Remplacer la pomme de terre par le Topinambour (Batata Qasbiya) et le cardon au citron confit maison.',
          en: 'Replace starchy potatoes with Batata Qasbiya sunchokes and cardoon braised with naturally fermented preserved lemon.',
        },
        featuredProduceIds: ['topinambour-qasbiya', 'artichaut-qouq', 'citron-beldi'],
      },
      {
        weekNumber: 3,
        weekTitle: {
          ar: 'الأسبوع 3 من الشتاء: تدفئة المفاصل وتنشيط الشرايين',
          fr: 'Semaine 3 d’Hiver : Souplesse Articulaire & Circulation',
          en: 'Winter Week 3: Joint Lubrication & Vascular Warmth',
        },
        focusOrgan: { ar: 'المفاصل والشرايين', fr: 'Articulations & Artères', en: 'Joints & Arteries' },
        neededFuel: { ar: 'الأوليوكانثال + الكيرسيتين + البيتا-كاروتين', fr: 'Oléocanthal + Quercétine + Bêta-carotène', en: 'Oleocanthal + Quercetin + Beta-Carotene' },
        dailyProtocol: {
          ar: 'ملعقة زيت زيتون بكر جديدة على الريق، وكسكس بالڭرعة الحمراء الدكالية والبصلة الحمراء د الحاجب والثومة.',
          fr: 'Huile d’olive nouvelle à jeun, Couscous à la courge rouge des Doukkala, oignon rouge d’El Hajeb et ail.',
          en: 'Morning spoonful of fresh-pressed olive oil, plus couscous with Doukkala red pumpkin and El Hajeb red onion.',
        },
        featuredProduceIds: ['olive-picholine', 'citrouille-doukkala', 'oignon-el-hajeb'],
      },
      {
        weekNumber: 4,
        weekTitle: {
          ar: 'الأسبوع 4 من الشتاء: شحن مخزون الحديد وتصفية أواخر الشتاء',
          fr: 'Semaine 4 d’Hiver : Recharge en Fer & Drainage Pré-Printemps',
          en: 'Winter Week 4: Iron Recharge & Late-Winter Hepatic Prep',
        },
        focusOrgan: { ar: 'الدم والكبد', fr: 'Sang & Foie', en: 'Blood & Liver' },
        neededFuel: { ar: 'الحديد النباتي + فيتامين C لمضاعفة الامتصاص 3 مرات', fr: 'Fer végétal + Vitamine C (absorption x3)', en: 'Non-Heme Iron + Vitamin C (3x uptake)' },
        dailyProtocol: {
          ar: 'طاجين القوق والبطاطا القصبية متبوعاً بكليمونتين بركان أو عصير الحامض البلدي لمضاعفة امتصاص الحديد وتهيئة الكبد للربيع.',
          fr: 'Tagine d’artichauts et topinambours suivi de clémentines de Berkane pour tripler l’assimilation du fer.',
          en: 'Artichoke and sunchoke tagine followed by fresh Berkane clementines to triple iron absorption before spring.',
        },
        featuredProduceIds: ['artichaut-qouq', 'topinambour-qasbiya', 'clementine-berkane', 'terfess-oriental'],
      },
    ],
  },
  spring: {
    season: 'spring',
    monthsLabel: {
      ar: 'مارس · أبريل · ماي (موسم البواكر)',
      fr: 'Mars · Avril · Mai (Saison des Primeurs)',
      en: 'March · April · May (Spring Primeurs)',
    },
    seasonTitle: {
      ar: 'الربيع المغربي: الأعضاء المرهقة بعد الشتاء وما تحتاجه للتجديد',
      fr: 'Printemps Marocain : Organes Fatigués Après l’Hiver & Régénération',
      en: 'Moroccan Spring: Post-Winter Congested Organs & Renewal Needs',
    },
    climatePhysiologySummary: {
      ar: 'عند الخروج من الشتاء، يعاني الجسم من "سخفة الربيع" (Asthénie printanière)؛ حيث يكون الكبد والمرارة مثقلين بدهون الشتاء، وينخفض مخزون الفولات والحديد في الدم، وتتحسس الأغشية المخاطية والعيون من حبوب اللقاح.',
      fr: 'Au sortir de l’hiver, le foie est engorgé, la moelle osseuse réclame des folates contre l’asthénie printanière et les muqueuses réagissent au pollen.',
      en: 'Exiting winter, the liver and gallbladder are congested, blood folate/iron stores dip ("spring fatigue"), and mucosa react to spring pollen.',
    },
    weakOrgans: [
      {
        id: 'spring-liver',
        organKey: 'liver',
        organName: {
          ar: 'الكبد والمرارة (الاحتقان والتشحم بعد الشتاء)',
          fr: 'Foie & Vésicule Biliaire (Engorgement Post-Hivernal)',
          en: 'Liver & Gallbladder (Post-Winter Congestion)',
        },
        vulnerabilityLevel: 'critical',
        whyWeakInThisSeason: {
          ar: 'بعد 3 أشهر من الأغذية الشتوية الدسمة وقلة التعرق، تتراكم الدهون الثلاثية والسموم الأيضية في خلايا الكبد وتثقل عصارة المرارة.',
          fr: 'Après les repas riches de l’hiver, les hépatocytes et les voies biliaires sont saturés et nécessitent un drainage profond.',
          en: 'After months of calorie-dense winter meals, hepatocytes and bile ducts become sluggish and lipid-congested.',
        },
        whatItNeeds: {
          ar: 'يحتاج إلى السينارين والسيليمارين (في القوق والخرشوف) وحمض الأورسوليك والبيتا-كاروتين (في المزاح د بركان) لتفجير تدفق الصفراء وتجديد الكبد.',
          fr: 'Besoin de Cynarine et Silymarine (Artichaut) et d’acide ursolique (Nèfle de Zegzel) pour drainer la bile.',
          en: 'Needs Cynarin and Silymarin (Artichoke) plus Ursolic Acid and pectin (Berkane Loquat) to flush bile and clear liver fat.',
        },
        keyBioactives: ['Cynarin', 'Silymarin', 'Ursolic Acid', 'Chlorogenic Acid'],
        recommendedProduceIds: ['artichaut-qouq', 'nefle-berkane', 'citron-beldi', 'menthe-meknes'],
      },
      {
        id: 'spring-blood',
        organKey: 'anemia_iron',
        organName: {
          ar: 'الدم، النخاع العظمي والطاقة ("سخفة الربيع")',
          fr: 'Sang, Moelle Osseuse & Vitalité (Asthénie Printanière)',
          en: 'Blood, Bone Marrow & Energy (Spring Asthenia)',
        },
        vulnerabilityLevel: 'high',
        whyWeakInThisSeason: {
          ar: 'تغير الفصول وارتفاع الحرارة المفاجئ يستنزف كريات الدم الحمراء وفيتامين B9 (الفولات) ويسبب الخمول الصباحي والدوخة.',
          fr: 'La transition climatique épuise les réserves de folates (B9) et de fer, causant la fameuse fatigue du printemps.',
          en: 'Seasonal transition depletes folate (Vitamin B9) and iron reserves, causing classic spring lethargy and pallor.',
        },
        whatItNeeds: {
          ar: 'يحتاج إلى الفولات الطبيعي (148 ميكروغرام في الفول والجلبانة) والحديد وفيتامين C (في الفريز د اللوكوس) لبناء دم جديد.',
          fr: 'Besoin massif de Folates B9 (Fèves & Petits pois), de Fer et de Vitamine C (Fraise du Loukkos).',
          en: 'Needs high Folate B9 (Fresh Fava Beans & Peas), Iron, and Vitamin C (Loukkos Strawberries) for rapid erythropoiesis.',
        },
        keyBioactives: ['Folate (Vitamin B9)', 'Plant Protein', 'Vitamin C', 'Ergothioneine'],
        recommendedProduceIds: ['feve-jelbana', 'fraise-loukkos', 'terfess-oriental', 'amande-tafraoute'],
      },
      {
        id: 'spring-brain',
        organKey: 'brain',
        organName: {
          ar: 'الجهاز العصبي، المزاج والساعة البيولوجية للنوم',
          fr: 'Système Nerveux, Dopamine & Sommeil Printanier',
          en: 'Nervous System, Dopamine & Circadian Sleep',
        },
        vulnerabilityLevel: 'high',
        whyWeakInThisSeason: {
          ar: 'تغير طول النهار والضوء في الربيع يربك إفراز الميلاتونين والدوبامين فيسبب الأرق وتقلب المزاج.',
          fr: 'Le changement de photopériode perturbe la mélatonine et la dopamine, créant insomnie et irritabilité.',
          en: 'Shifting spring daylight hours disrupt endogenous melatonin and dopamine rhythms, causing restless sleep.',
        },
        whatItNeeds: {
          ar: 'يحتاج إلى L-DOPA الطبيعي (في الفول الأخضر الطري) والميلاتونين النباتي والأنثوسيانين (في حب الملوك د صفرو).',
          fr: 'Besoin de L-DOPA naturelle (Fèves fraîches) et de Phytomélatonine (Cerises de Sefrou).',
          en: 'Needs natural L-DOPA (Fresh Green Fava Beans) for daytime dopamine and Phytomelatonin (Sefrou Cherries) for deep sleep.',
        },
        keyBioactives: ['Natural L-DOPA', 'Phytomelatonin', 'Fisetin', 'Rosmarinic Acid'],
        recommendedProduceIds: ['feve-jelbana', 'cerise-sefrou', 'fraise-loukkos', 'menthe-meknes'],
      },
      {
        id: 'spring-mucosa',
        organKey: 'eyes_skin',
        organName: {
          ar: 'العيون، الجلد والأغشية التنفسية (حساسية الربيع)',
          fr: 'Yeux, Peau & Muqueuses (Allergies Printanières)',
          en: 'Eyes, Skin & Mucosa (Spring Pollen & UV Shift)',
        },
        vulnerabilityLevel: 'moderate',
        whyWeakInThisSeason: {
          ar: 'انتشار حبوب اللقاح وبداية سطوع شمس الربيع يهيج الملتحمة والجيوب الأنفية ويفرز الهيستامين.',
          fr: 'Les pollens printaniers et la hausse de l’index UV déclenchent l’histamine et irritent les yeux et la peau.',
          en: 'Spring pollen blooms and rising UV radiation trigger histamine release and ocular/dermal irritation.',
        },
        whatItNeeds: {
          ar: 'يحتاج إلى حمض الروزمارينيك المضاد للهيستامين (النعناع المكاوي)، البيتا-كاروتين (المزاح د بركان)، ومياه الترفاس للعين.',
          fr: 'Besoin d’acide rosmarinique antihistaminique (Menthe), Bêta-carotène (Nèfle) et antioxydants oculaires (Terfess).',
          en: 'Needs antihistamine Rosmarinic Acid (Meknès Mint), Beta-Carotene (Berkane Loquat), and ocular peptides (Terfess).',
        },
        keyBioactives: ['Rosmarinic Acid', 'Beta-Carotene', 'Ellagic Acid', 'Lutein'],
        recommendedProduceIds: ['nefle-berkane', 'terfess-oriental', 'menthe-meknes', 'fraise-loukkos'],
      },
    ],
    weeklySchedule: [
      {
        weekNumber: 1,
        weekTitle: {
          ar: 'الأسبوع 1 من الربيع: غسل الكبد وتنشيط المرارة بعد الشتاء',
          fr: 'Semaine 1 de Printemps : Grand Drainage du Foie & de la Bile',
          en: 'Spring Week 1: Deep Post-Winter Liver & Gallbladder Flush',
        },
        focusOrgan: { ar: 'الكبد والمرارة', fr: 'Foie & Vésicule Biliaire', en: 'Liver & Gallbladder' },
        neededFuel: { ar: 'السينارين + السيليمارين + البكتين', fr: 'Cynarine + Silymarine + Pectine', en: 'Cynarin + Silymarin + Pectin' },
        dailyProtocol: {
          ar: 'طاجين القوق والخرشوف بالجلبانة مع الحامض البلدي، وتناول 5 حبات من المزاح د بركان (البشملة) لتصريف دهون الكبد.',
          fr: 'Tagine d’artichauts et cardons aux petits pois et citron beldi, suivi de nèfles fraîches de Zegzel.',
          en: 'Artichoke and cardoon tagine with sweet peas and Beldi lemon, followed by fresh Berkane loquats.',
        },
        featuredProduceIds: ['artichaut-qouq', 'nefle-berkane', 'citron-beldi'],
      },
      {
        weekNumber: 2,
        weekTitle: {
          ar: 'الأسبوع 2 من الربيع: تجديد الدم والقضاء على سخفة الربيع',
          fr: 'Semaine 2 de Printemps : Régénération Sanguine & Anti-Fatigue',
          en: 'Spring Week 2: Blood Renewal & Anti-Asthenia Protocol',
        },
        focusOrgan: { ar: 'الدم والنخاع العظمي', fr: 'Sang & Moelle Osseuse', en: 'Blood & Bone Marrow' },
        neededFuel: { ar: 'الفولات B9 + الحديد + فيتامين C', fr: 'Folates B9 + Fer + Vitamine C', en: 'Folate B9 + Iron + Vitamin C' },
        dailyProtocol: {
          ar: 'طبق "الفول المشرمل" الأخضر بقشرته الطرية والجلبانة في الغداء، وزلافة فريز د اللوكوس بدون سكر أبيض لتعزيز امتصاص الحديد.',
          fr: 'Salade tiède de « Foul Mchermel » et petits pois à midi, suivie d’un bol de fraises fraîches du Loukkos.',
          en: 'Warm "Foul Mchermel" green fava bean salad at lunch, paired with fresh Loukkos strawberries for iron chelation.',
        },
        featuredProduceIds: ['feve-jelbana', 'fraise-loukkos', 'terfess-oriental'],
      },
      {
        weekNumber: 3,
        weekTitle: {
          ar: 'الأسبوع 3 من الربيع: تهدئة الحساسية وحماية العيون والبشرة',
          fr: 'Semaine 3 de Printemps : Bouclier Anti-Pollen, Yeux & Peau',
          en: 'Spring Week 3: Anti-Pollen Mucosal, Eye & Collagen Shield',
        },
        focusOrgan: { ar: 'العيون، البشرة والجيوب الأنفية', fr: 'Yeux, Peau & Sinus', en: 'Eyes, Skin & Sinuses' },
        neededFuel: { ar: 'حمض الروزمارينيك + البيتا-كاروتين + الإرغوثيونين', fr: 'Acide rosmarinique + Bêta-carotène', en: 'Rosmarinic Acid + Beta-Carotene' },
        dailyProtocol: {
          ar: 'المزاح د بركان صباحاً، طاجين بالترفاس البلدي في الغداء، وكأس أتاي بالنعناع المكاوي المنقوع بدون غلي لتهدئة الهيستامين.',
          fr: 'Nèfles de Berkane le matin, Terfess de l’Oriental à midi et infusion de menthe de Meknès contre l’histamine.',
          en: 'Berkane loquats in the morning, desert truffles at lunch, and steeped Meknès spearmint tea to calm spring histamine.',
        },
        featuredProduceIds: ['nefle-berkane', 'terfess-oriental', 'menthe-meknes', 'fraise-loukkos'],
      },
      {
        weekNumber: 4,
        weekTitle: {
          ar: 'الأسبوع 4 من الربيع: ضبط النوم العميق وتصفية حمض اليوريك',
          fr: 'Semaine 4 de Printemps : Sommeil Profond & Drainage de l’Acide Urique',
          en: 'Spring Week 4: Circadian Sleep & Uric Acid Joint Flush',
        },
        focusOrgan: { ar: 'الدماغ، المفاصل والكليتان', fr: 'Cerveau, Articulations & Reins', en: 'Brain, Joints & Kidneys' },
        neededFuel: { ar: 'الميلاتونين النباتي + الأنثوسيانين + L-DOPA', fr: 'Phytomélatonine + Anthocyanes', en: 'Phytomelatonin + Anthocyanins' },
        dailyProtocol: {
          ar: 'حفنة من حب الملوك د صفرو (الكرز) قبل النوم بساعة لرفع الميلاتونين وتطهير المفاصل والكلى من حمض اليوريك.',
          fr: 'Une poignée de cerises de Sefrou 1h avant le coucher pour le sommeil et l’élimination de l’acide urique.',
          en: 'A handful of dark Sefrou cherries 1 hour before bed to restore deep melatonin sleep and flush uric acid.',
        },
        featuredProduceIds: ['cerise-sefrou', 'feve-jelbana', 'amande-tafraoute'],
      },
    ],
  },
  summer: {
    season: 'summer',
    monthsLabel: {
      ar: 'يونيو · يوليوز · غشت (موسم الصمايم والحر)',
      fr: 'Juin · Juillet · Août (Saison d’Été & Smayem)',
      en: 'June · July · August (Summer & Smayem Heat)',
    },
    seasonTitle: {
      ar: 'الصيف المغربي ("الصمايم"): الأعضاء المهددة بالحرارة والجفاف وما تحتاجه',
      fr: 'Été Marocain (« Smayem ») : Organes Exposés à la Chaleur & Hydratation Cellulaire',
      en: 'Moroccan Summer ("Smayem"): Heat-Stressed Organs & Cellular Hydration Needs',
    },
    climatePhysiologySummary: {
      ar: 'خلال قيظ الصيف المغربي ورياح "الشرگي" وفترة "الصمايم" (من 12 يوليوز إلى 20 غشت)، يفقد الجسم كميات هائلة من الماء والبوتاسيوم والمغنيسيوم عبر التعرق، مما يضع الكليتين، القلب، المعدة، والبشرة تحت ضغط حراري شديد.',
      fr: 'Sous la chaleur estivale marocaine (« Chergui » et « Smayem »), la perte d’eau et d’électrolytes fragilise les reins, le cœur, l’estomac et la peau.',
      en: 'Under intense Moroccan summer heat ("Chergui" and "Smayem"), electrolyte and sweat loss strain the kidneys, heart, stomach mucosa, and skin.',
    },
    weakOrgans: [
      {
        id: 'summer-kidneys',
        organKey: 'liver',
        organName: {
          ar: 'الكليتان، المسالك البولية وتوازن الإلكتروستات (الأملاح)',
          fr: 'Reins, Voies Urinaires & Équilibre Électrolytique',
          en: 'Kidneys, Urinary Tract & Electrolyte Balance',
        },
        vulnerabilityLevel: 'critical',
        whyWeakInThisSeason: {
          ar: 'التعرق الشديد يركز البول ويرفع خطر تكون حصى الكلى (الكالكير) والتهابات المسالك البولية والعياء العضلي.',
          fr: 'La transpiration intense concentre les urines, favorisant les calculs rénaux et la déshydratation cellulaire.',
          en: 'Heavy sweating concentrates urine, sharply increasing kidney stone formation and electrolyte cramps.',
        },
        whatItNeeds: {
          ar: 'يحتاج إلى الماء الخلوي المهيكل (92%+) مع البوتاسيوم والمغنيسيوم والسيترولين لتبريد الجسم وغسل الكليتين بلطف.',
          fr: 'Besoin d’eau cellulaire structurée (92%+), Potassium, Magnésium et Citrulline diurétique.',
          en: 'Needs structured cellular water (92%+), Potassium, Magnesium, and renal-flushing Citrulline.',
        },
        keyBioactives: ['Cellular Water (92%)', 'Potassium', 'Magnesium (85mg)', 'L-Citrulline'],
        recommendedProduceIds: ['pasteque-zagora', 'melon-souihla', 'feggous-maroc', 'figue-barbarie-ait-baamrane'],
      },
      {
        id: 'summer-heart',
        organKey: 'heart',
        organName: {
          ar: 'القلب، الشرايين وضغط الدم الحراري',
          fr: 'Cœur, Vaisseaux & Tension Thermique',
          en: 'Heart, Blood Vessels & Thermal Blood Pressure',
        },
        vulnerabilityLevel: 'high',
        whyWeakInThisSeason: {
          ar: 'الحرارة المرتفعة توسع الأوعية السطحية وتزيد لزوجة الدم ونبضات القلب لتبريد الجسم، مما يرهق عضلة القلب.',
          fr: 'La canicule épaissit le sang par déshydratation et sollicite fortement le rythme cardiaque.',
          en: 'Summer heat thickens blood viscosity and forces the heart to pump harder for thermoregulation.',
        },
        whatItNeeds: {
          ar: 'يحتاج إلى السيترولين (الدلاح)، الليكوبين (ماطيشة شتوكة)، الأدينوزين المسيل للدم (السويهلة)، والروتين المقوي للشعيرات (الكبار).',
          fr: 'Besoin de L-Citrulline (Pastèque), Lycopène (Tomate), Adénosine (Melon Souihla) et Rutine (Câpre).',
          en: 'Needs L-Citrulline (Watermelon), Lycopene (Tomato), blood-thinning Adenosine (Souihla Melon), and capillary-sealing Rutin (Capers).',
        },
        keyBioactives: ['L-Citrulline', 'Lycopene', 'Adenosine', 'Rutin (Bioflavonoid)'],
        recommendedProduceIds: ['pasteque-zagora', 'tomate-chtouka', 'melon-souihla', 'capre-safi'],
      },
      {
        id: 'summer-stomach',
        organKey: 'digestion',
        organName: {
          ar: 'المعدة والقولون الحساس للحرارة والتخمرات الصيفية',
          fr: 'Estomac & Côlon Sensibles à la Chaleur',
          en: 'Heat-Sensitive Stomach & Intestinal Tract',
        },
        vulnerabilityLevel: 'high',
        whyWeakInThisSeason: {
          ar: 'في الصيف تزداد حموضة المعدة والتسممات الغذائية واضطراب القولون بسبب المشروبات المثلجة والمقليات.',
          fr: 'En été, les boissons glacées et la chaleur fragilisent la muqueuse gastrique et le transit.',
          en: 'Iced drinks, summer bacterial fermentation, and heat stress inflame the stomach lining and bowel.',
        },
        whatItNeeds: {
          ar: 'يحتاج إلى الهلام المبرد للمعدة (في الملوخية والهندية)، أنزيم الفيسين الهاضم (الكرموس)، والفقوس المنعش سهل الهضم.',
          fr: 'Besoin de mucilage gastrique rafraîchissant (Gombo Mloukhiya, Handiya), de Ficine (Figue) et de Feggous.',
          en: 'Needs cooling gastric mucilage (Mloukhiya Okra, Prickly Pear), Ficin enzymes (Figs), and ultra-digestible Feggous.',
        },
        keyBioactives: ['Gastric Mucilage', 'Ficin Enzyme', 'Indicaxanthin', 'Sorbitol'],
        recommendedProduceIds: ['gombo-mloukhiya', 'figue-barbarie-ait-baamrane', 'feggous-maroc', 'figue-taounate', 'prune-chefchaouen'],
      },
      {
        id: 'summer-skin',
        organKey: 'eyes_skin',
        organName: {
          ar: 'البشرة وشبكية العين تحت الأشعة فوق البنفسجية (UV)',
          fr: 'Peau & Rétine sous Rayonnement UV Intense',
          en: 'Skin Dermis & Retina under Peak Summer UV',
        },
        vulnerabilityLevel: 'moderate',
        whyWeakInThisSeason: {
          ar: 'أشعة الشمس الحارقة في يوليوز وغشت تؤكسد كولاجين الجلد وتجهد شبكية العين.',
          fr: 'L’indice UV maximal en juillet-août détruit le collagène cutané et oxyde la rétine.',
          en: 'Peak UV radiation in July–August breaks down dermal collagen and generates free radicals in the retina.',
        },
        whatItNeeds: {
          ar: 'يحتاج إلى الليكوبين والبيتا-كاروتين (ماطيشة شتوكة والسويهلة)، وإنزيم SOD وفيتامين E (الهندية).',
          fr: 'Besoin de Lycopène (Tomate), Superoxyde Dismutase SOD (Melon) et Vitamine E (Figue de Barbarie).',
          en: 'Needs internal UV shields: Lycopene (Tomato), Superoxide Dismutase (Souihla Melon), and Vitamin E/Betalains (Prickly Pear).',
        },
        keyBioactives: ['Lycopene', 'Superoxide Dismutase (SOD)', 'Betalains', 'Vitamin E'],
        recommendedProduceIds: ['tomate-chtouka', 'figue-barbarie-ait-baamrane', 'melon-souihla', 'prune-chefchaouen'],
      },
    ],
    weeklySchedule: [
      {
        weekNumber: 1,
        weekTitle: {
          ar: 'الأسبوع 1 من الصيف: غسل الكليتين والترطيب الخلوي العميق',
          fr: 'Semaine 1 d’Été : Hydratation Cellulaire & Drainage Rénal',
          en: 'Summer Week 1: Cellular Hydration & Kidney Stone Flush',
        },
        focusOrgan: { ar: 'الكليتان والمسالك البولية', fr: 'Reins & Voies Urinaires', en: 'Kidneys & Urinary Tract' },
        neededFuel: { ar: 'ماء خلوي 92% + سيترولين + بوتاسيوم', fr: 'Eau cellulaire 92% + Citrulline + Potassium', en: '92% Cellular Water + Citrulline + Potassium' },
        dailyProtocol: {
          ar: 'شريحتان من الدلاح د زاكورة أو السويهلة في الضحى والعصر (خارج الوجبات الدسمة)، وشلاظة الفقوس المغربي بالزعتر.',
          fr: 'Pastèque de Zagora ou Melon Souihla entre les repas, et salade fraîche de Feggous à l’origan.',
          en: 'Enjoy Zagora watermelon or Souihla melon mid-morning and afternoon between meals, plus crisp Feggous salad.',
        },
        featuredProduceIds: ['pasteque-zagora', 'melon-souihla', 'feggous-maroc'],
      },
      {
        weekNumber: 2,
        weekTitle: {
          ar: 'الأسبوع 2 من الصيف: تبريد المعدة وتغليف القولون',
          fr: 'Semaine 2 d’Été : Apaisement Gastrique & Mucilage Protecteur',
          en: 'Summer Week 2: Cooling Gastric Mucosa & Gut Shield',
        },
        focusOrgan: { ar: 'المعدة والقولون', fr: 'Estomac & Côlon', en: 'Stomach & Colon' },
        neededFuel: { ar: 'موسيلاج الملوخية والهندية + أنزيم الفيسين', fr: 'Mucilage de Gombo & Handiya + Ficine', en: 'Okra & Opuntia Mucilage + Ficin' },
        dailyProtocol: {
          ar: 'طاجين الملوخية المغربية بالثومة ومطيشة في الغداء، و3 حبات هندية باردة د آيت باعمران بعد العصر لتبريد المعدة.',
          fr: 'Tagine de gombos (Mloukhiya) à midi, et 3 figues de Barbarie fraîches d’Aït Baâmrane l’après-midi.',
          en: 'Moroccan Mloukhiya okra tagine for lunch, followed by 3 chilled Aït Baâmrane prickly pears in the afternoon.',
        },
        featuredProduceIds: ['gombo-mloukhiya', 'figue-barbarie-ait-baamrane', 'figue-taounate'],
      },
      {
        weekNumber: 3,
        weekTitle: {
          ar: 'الأسبوع 3 من الصيف: حماية الشرايين والقلب في ذروة الصمايم',
          fr: 'Semaine 3 d’Été : Protection Cardiaque & Capillaire (Pic Smayem)',
          en: 'Summer Week 3: Cardiac & Capillary Shield During Peak Heat',
        },
        focusOrgan: { ar: 'القلب والأوعية الدموية', fr: 'Cœur & Capillaires Sanguins', en: 'Heart & Capillaries' },
        neededFuel: { ar: 'المغنيسيوم (85 ملغ) + الروتين + الليكوبين', fr: 'Magnésium + Rutine + Lycopène', en: 'Magnesium (85mg) + Rutin + Lycopene' },
        dailyProtocol: {
          ar: 'شلاظة مغربية بماطيشة د شتوكة والكبار المسفيوي وزيت الزيتون، مع الهندية والسويهلة لتعويض المغنيسيوم والبوتاسيوم.',
          fr: 'Salade de tomates de Chtouka aux câpres de Safi et huile d’olive, complétée par la figue de Barbarie riche en magnésium.',
          en: 'Chtouka tomato salad with Safi capers and olive oil, paired with magnesium-rich prickly pears and Souihla melon.',
        },
        featuredProduceIds: ['tomate-chtouka', 'capre-safi', 'figue-barbarie-ait-baamrane', 'melon-souihla'],
      },
      {
        weekNumber: 4,
        weekTitle: {
          ar: 'الأسبوع 4 من الصيف: ترميم الكولاجين وتقوية العظام',
          fr: 'Semaine 4 d’Été : Réparation Cutanée UV & Minéralisation Osseuse',
          en: 'Summer Week 4: Post-UV Skin Repair & Bone Mineralization',
        },
        focusOrgan: { ar: 'البشرة والعظام', fr: 'Peau & Densité Osseuse', en: 'Skin Dermis & Bones' },
        neededFuel: { ar: 'البورون + الكالسيوم + الأنثوسيانين', fr: 'Bore + Calcium + Anthocyanes', en: 'Boron + Calcium + Anthocyanins' },
        dailyProtocol: {
          ar: 'الكرموس البلدي د تاونات والبرقوق المغربي الطري أو المجفف لإمداد العظام بالكالسيوم والبورون وترميم البشرة.',
          fr: 'Figues fraîches de Taounate et prunes/pruneaux du Maroc pour fixer le calcium osseux et régénérer la peau.',
          en: 'Fresh Taounate figs and Moroccan plums/prunes to lock calcium into bones and repair sun-exposed skin.',
        },
        featuredProduceIds: ['figue-taounate', 'prune-chefchaouen', 'tomate-chtouka'],
      },
    ],
  },
  autumn: {
    season: 'autumn',
    monthsLabel: {
      ar: 'شتنبر · أكتوبر · نونبر (موسم الخريف والجني الجبلي)',
      fr: 'Septembre · Octobre · Novembre (Saison d’Automne)',
      en: 'September · October · November (Autumn Oasis & Atlas Harvest)',
    },
    seasonTitle: {
      ar: 'الخريف المغربي: الأعضاء الحساسة لتقلب الفصول وما تحتاجه قبل الشتاء',
      fr: 'Automne Marocain : Organes Sensibles aux Changements de Saison & Préparation Hivernale',
      en: 'Moroccan Autumn: Season-Shift Vulnerable Organs & Pre-Winter Fortification',
    },
    climatePhysiologySummary: {
      ar: 'يُعرف الخريف في الطب السريري والحكمة المغربية بأنه موسم تهيج قرحة المعدة والقولون، وانخفاض السيروتونين الدماغي مع قصر النهار، وجفاف القصبات الهوائية؛ لذا أوجد الله في خريف المغرب أعظم فواكه التغليف المعوي والهدوء العصبي.',
      fr: 'L’automne est marqué cliniquement par le réveil des gastrites/ulcères, la baisse de sérotonine liée au raccourcissement des jours et le besoin de renforcer les artères avant l’hiver.',
      en: 'Clinically, autumn triggers seasonal gastritis/ulcer flare-ups, declining daylight serotonin, and dry bronchi—matched by Morocco’s richest mucosal and neuro-protective harvest.',
    },
    weakOrgans: [
      {
        id: 'autumn-stomach',
        organKey: 'digestion',
        organName: {
          ar: 'غشاء المعدة والاثني عشر (موسم هيجان القرحة والحرقة الخريفية)',
          fr: 'Muqueuse Gastrique & Duodénum (Pics d’Ulcères d’Automne)',
          en: 'Stomach Mucosa & Duodenum (Autumn Ulcer & Gastritis Peak)',
        },
        vulnerabilityLevel: 'critical',
        whyWeakInThisSeason: {
          ar: 'التقلبات الجوية الخريفية وتغير إفراز الكورتيزول والهيستامين العصبي يضعف جدار المعدة فيسبب عودة الحرقة والتهاب المعدة في شتنبر وأكتوبر.',
          fr: 'Les variations barométriques et neuro-hormonales d’automne fragilisent la paroi de l’estomac et réveillent les gastrites.',
          en: 'Autumn barometric and autonomic shifts thin the gastric mucus barrier, causing classic seasonal gastritis and ulcer flare-ups.',
        },
        whatItNeeds: {
          ar: 'يحتاج إلى هلام البكتين المطبوخ وحمض الشيكيميك (في السفرجل البلدي والتفاح د ميدلت) وعفص البونيكالاجين القابض والمرمم (في الرمان السفري وقشرته).',
          fr: 'Besoin de gel de Pectine cuite (Coing, Pomme de Midelt) et de Punicalagines cicatrisantes (Grenade Sefri).',
          en: 'Needs cooked Pectin hydrogel (Quince, Midelt Apple) and mucosal-healing Punicalagins (Sefri Pomegranate).',
        },
        keyBioactives: ['Cooked Pectin Hydrogel', 'Punicalagins', 'Ellagitannins', 'Shikimic Acid'],
        recommendedProduceIds: ['coing-haouz', 'grenade-sefri', 'pomme-midelt', 'prune-chefchaouen'],
      },
      {
        id: 'autumn-brain',
        organKey: 'brain',
        organName: {
          ar: 'الدماغ، الأعصاب والمزاج (انخفاض السيروتونين والتركيز الخريفي)',
          fr: 'Cerveau, Nerfs & Humeur (Baisse de Sérotonine Automnale)',
          en: 'Brain, Nerves & Mood (Autumn Serotonin Dip & Mental Fatigue)',
        },
        vulnerabilityLevel: 'high',
        whyWeakInThisSeason: {
          ar: 'تناقص ساعات الشمس في الخريف يخفض السيروتونين الدماغي بالتزامن مع الدخول المدرسي والمهني، مما يسبب الإجهاد الذهني والأرق.',
          fr: 'La diminution de la lumière solaire réduit la sérotonine cérébrale au moment de la reprise d’activité intense.',
          en: 'Shortening daylight hours lower brain serotonin right as autumn work and academic demands peak.',
        },
        whatItNeeds: {
          ar: 'يحتاج إلى الكروسين والسفرنال (الزعفران الحر د تاليوين)، فيتامين B6 والمغنيسيوم (التمر المجهول)، وفيتامين E والأحماض الدهنية (اللوز البلدي ولافوكا).',
          fr: 'Besoin de Crocine et Safranal (Safran AOP de Taliouine), Vitamine B6/Magnésium (Datte Majhoul) et Vitamine E (Amande de Tafraoute).',
          en: 'Needs Crocin & Safranal (Taliouine Saffron), Vitamin B6 & Magnesium (Medjool Dates), and Vitamin E/MUFAs (Tafraoute Almonds & Gharb Avocado).',
        },
        keyBioactives: ['Crocin & Safranal', 'Vitamin B6', 'Magnesium', 'Vitamin E (Alpha-Tocopherol)'],
        recommendedProduceIds: ['safran-taliouine', 'datte-majhoul', 'amande-tafraoute', 'avocat-gharb'],
      },
      {
        id: 'autumn-heart',
        organKey: 'heart',
        organName: {
          ar: 'بطانة الشرايين والقلب (التحضير لموجات برد الشتاء)',
          fr: 'Endothélium Artériel & Cœur (Préparation Cardiovasculaire Hivernale)',
          en: 'Arterial Endothelium & Heart (Pre-Winter Vascular Conditioning)',
        },
        vulnerabilityLevel: 'high',
        whyWeakInThisSeason: {
          ar: 'يحتاج القلب والشرايين في الخريف إلى تنظيف اللويحات المؤكسدة ورفع مرونة الأوعية قبل حلول تضيق الشرايين الشتوي.',
          fr: 'Les artères doivent retrouver leur élasticité endothéliale et réduire le cholestérol oxydé avant le froid hivernal.',
          en: 'Arteries must clear oxidized LDL and restore endothelial nitric oxide elasticity before winter cold sets in.',
        },
        whatItNeeds: {
          ar: 'يحتاج إلى البونيكالاجين (الرمان السفري)، الهيدروكسيتيروزول (الزيتون الجديد)، الستيرولات النباتية (اللوز ولافوكا)، والروتين (الكبار).',
          fr: 'Besoin de Punicalagines (Grenade), Hydroxytyrosol (Olive nouvelle) et acide oléique (Avocat, Amande).',
          en: 'Needs Punicalagins (Sefri Pomegranate), Hydroxytyrosol (New Harvest Olives), and Phytosterols (Almonds, Avocado).',
        },
        keyBioactives: ['Punicalagins (ORAC 4,479)', 'Hydroxytyrosol', 'Oleic Acid', 'Phytosterols'],
        recommendedProduceIds: ['grenade-sefri', 'olive-picholine', 'amande-tafraoute', 'avocat-gharb', 'pomme-midelt'],
      },
      {
        id: 'autumn-eyes-lungs',
        organKey: 'eyes_skin',
        organName: {
          ar: 'شبكية العين والأغشية التنفسية الجافة في الخريف',
          fr: 'Rétine Oculaire & Muqueuses Respiratoires Sèches',
          en: 'Retinal Macula & Dry Autumn Respiratory Mucosa',
        },
        vulnerabilityLevel: 'moderate',
        whyWeakInThisSeason: {
          ar: 'رياح الخريف الجافة وطول الجلوس أمام الشاشات يجهدان قرنية وشبكية العين ويجففان الحلق والقصبات.',
          fr: 'Les vents secs d’automne et la fatigue visuelle assèchent les muqueuses respiratoires et sollicitent la rétine.',
          en: 'Dry autumn winds and indoor screen strain dry out respiratory linings and stress retinal photoreceptors.',
        },
        whatItNeeds: {
          ar: 'يحتاج إلى البيتا-كاروتين واللوتين بتركيز عالٍ (الڭرعة الحمراء الدكالية ولافوكا د الغرب) والكروسين الحامي للشبكية (الزعفران الحر).',
          fr: 'Besoin de Bêta-carotène (8 513 UI dans la Courge des Doukkala), Lutéine (Avocat) et Crocine (Safran).',
          en: 'Needs high Beta-Carotene (8,513 IU in Doukkala Pumpkin), Lutein (Gharb Avocado), and retinal Crocin (Taliouine Saffron).',
        },
        keyBioactives: ['Beta-Carotene (8,513 IU)', 'Lutein & Zeaxanthin', 'Crocin', 'Glutathione'],
        recommendedProduceIds: ['citrouille-doukkala', 'safran-taliouine', 'avocat-gharb'],
      },
    ],
    weeklySchedule: [
      {
        weekNumber: 1,
        weekTitle: {
          ar: 'الأسبوع 1 من الخريف: ترميم وتغليف جدار المعدة والقولون',
          fr: 'Semaine 1 d’Automne : Cicatrisation & Protection de l’Estomac',
          en: 'Autumn Week 1: Gastric Mucosa Sealing & Ulcer Defense',
        },
        focusOrgan: { ar: 'المعدة والاثني عشر', fr: 'Estomac & Duodénum', en: 'Stomach & Duodenum' },
        neededFuel: { ar: 'هلام البكتين المطبوخ + البونيكالاجين', fr: 'Gel de Pectine + Punicalagines', en: 'Cooked Pectin Gel + Punicalagins' },
        dailyProtocol: {
          ar: 'زلافة رمان سفري د أولاد عبد الله بشحمته البيضاء الرقيقة صباحاً، وطاجين السفرجل البلدي المعسل بالقرفة في الغداء لتغليف المعدة.',
          fr: 'Bol de Grenade Sefri avec sa fine membrane blanche le matin, et Tagine aux coings fondants à la cannelle à midi.',
          en: 'Morning bowl of Sefri pomegranate (including thin white pith), and braised Moroccan quince tagine at lunch.',
        },
        featuredProduceIds: ['grenade-sefri', 'coing-haouz', 'pomme-midelt'],
      },
      {
        weekNumber: 2,
        weekTitle: {
          ar: 'الأسبوع 2 من الخريف: شحن السيروتونين الدماغي والطاقة العصبية',
          fr: 'Semaine 2 d’Automne : Recharge en Sérotonine, Mémoire & Sommeil',
          en: 'Autumn Week 2: Brain Serotonin, Focus & Deep Sleep Boost',
        },
        focusOrgan: { ar: 'الدماغ والأعصاب', fr: 'Cerveau & Système Nerveux', en: 'Brain & Nervous System' },
        neededFuel: { ar: 'الكروسين والسفرنال + فيتامين B6 + المغنيسيوم', fr: 'Crocine + Vitamine B6 + Magnésium', en: 'Crocin + Vitamin B6 + Magnesium' },
        dailyProtocol: {
          ar: '3 تمرات مجهول د تافيلالت محشوة باللوز البلدي د تافراوت صباحاً، و10 شعرات من الزعفران الحر د تاليوين في أتاي المساء.',
          fr: '3 dattes Majhoul farcies aux amandes de Tafraoute le matin, et 10 pistils de Safran AOP de Taliouine en infusion le soir.',
          en: '3 Medjool dates stuffed with Tafraoute almonds in the morning, and 10 threads of Taliouine saffron steeped in evening tea.',
        },
        featuredProduceIds: ['safran-taliouine', 'datte-majhoul', 'amande-tafraoute'],
      },
      {
        weekNumber: 3,
        weekTitle: {
          ar: 'الأسبوع 3 من الخريف: تلميع الشرايين وخفض الكولسترول الضار',
          fr: 'Semaine 3 d’Automne : Élasticité Artérielle & Baisse du LDL',
          en: 'Autumn Week 3: Arterial Plaque Defense & LDL Reduction',
        },
        focusOrgan: { ar: 'القلب والشرايين', fr: 'Cœur & Artères', en: 'Heart & Arteries' },
        neededFuel: { ar: 'الهيدروكسيتيروزول + حمض الأولييك + الكيرسيتين', fr: 'Hydroxytyrosol + Acide oléique + Quercétine', en: 'Hydroxytyrosol + Oleic Acid + Quercetin' },
        dailyProtocol: {
          ar: 'الزيتون المسلالة الجديد وزيت الزيتون البكر مع شلاظة لافوكا د الغرب، وتفاحة ميدلت بقشرتها يومياً.',
          fr: 'Olives Meslalla nouvelles et huile d’olive vierge, salade à l’avocat du Gharb et pomme de Midelt non pelée.',
          en: 'Fresh-cracked Meslalla olives and new harvest olive oil, Gharb avocado salad, and one unpeeled Midelt apple daily.',
        },
        featuredProduceIds: ['olive-picholine', 'avocat-gharb', 'pomme-midelt', 'grenade-sefri'],
      },
      {
        weekNumber: 4,
        weekTitle: {
          ar: 'الأسبوع 4 من الخريف: تقوية العظام وترطيب الرئتين استعداداً للشتاء',
          fr: 'Semaine 4 d’Automne : Fortification Osseuse & Pulmonaire Pré-Hiver',
          en: 'Autumn Week 4: Bone Density & Bronchial Shield Before Winter',
        },
        focusOrgan: { ar: 'العظام، الرئتان والعيون', fr: 'Os, Bronches & Rétine', en: 'Bones, Bronchi & Retina' },
        neededFuel: { ar: 'فيتامين A (8513 IU) + البورون + الحديد', fr: 'Vitamine A (8 513 UI) + Bore + Fer', en: 'Vitamin A (8,513 IU) + Boron + Iron' },
        dailyProtocol: {
          ar: 'طاجين اللحم بالبرقوق واللوز، وشوربة أو كسكس الڭرعة الحمراء الدكالية لتحصين الأغشية التنفسية والعظام قبل دخول ديسمبر.',
          fr: 'Tagine aux pruneaux et amandes, et velouté/couscous à la courge rouge des Doukkala pour renforcer les muqueuses avant décembre.',
          en: 'Moroccan prune and almond tagine plus Doukkala red pumpkin soup/couscous to fortify respiratory mucosa before December.',
        },
        featuredProduceIds: ['citrouille-doukkala', 'prune-chefchaouen', 'amande-tafraoute', 'datte-majhoul'],
      },
    ],
  },
}

export const PRODUCE_SEASONAL_ORGAN_ROLES: Record<string, ProduceSeasonalOrganRole> = {
  'clementine-berkane': {
    seasonLabel: { ar: 'فصل الشتاء (الليالي)', fr: 'Saison d’Hiver', en: 'Winter Season' },
    weakOrganHealed: {
      ar: 'الرئتان والمناعة والشعيرات الدموية (الضعيفة بسبب برد الشتاء)',
      fr: 'Poumons, Immunité & Capillaires (Fragilisés par le froid)',
      en: 'Lungs, Immunity & Capillaries (Weakened by winter cold)',
    },
    whyOrganNeedsItNow: {
      ar: 'في الشتاء تستنزف الكريات البيضاء والغدة الكظرية فيتامين C لمقاومة الفيروسات، وتضعف الشعيرات الدموية بالبرد؛ كليمونتين بركان يمنحك 49 ملغ فيتامين C وهسبيريدين فوري.',
      fr: 'En hiver, les leucocytes épuisent la vitamine C contre les virus ; la clémentine de Berkane recharge l’immunité et renforce les capillaires grâce à l’hespéridine.',
      en: 'In winter, cold stress depletes leukocyte Vitamin C; Berkane clementines replenish immunity and seal capillaries with hesperidin.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 1 و 4 من الشتاء: درع الرئتين وامتصاص الحديد',
      fr: 'Semaines 1 & 4 d’Hiver : Bouclier Pulmonaire & Fer',
      en: 'Winter Weeks 1 & 4: Lung Shield & Iron Uptake',
    },
    dailyDose: {
      ar: '3 حبات يومياً (صباحاً وبعد الغداء الغني بالحديد)',
      fr: '3 fruits par jour (matin et après un repas riche en fer)',
      en: '3 fruits daily (morning and after iron-rich meals)',
    },
    gallery: [
      {
        url: '/images/produce/clementine-berkane-1.jpg',
        captionAr: 'كليمونتين بركان الطري بأوراقه الخضراء',
        captionFr: 'Clémentine de Berkane fraîche avec feuilles',
        captionEn: 'Fresh Berkane Clementine with green leaves',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Mandarin_Oranges_%28Citrus_Reticulata%29.jpg/800px-Mandarin_Oranges_%28Citrus_Reticulata%29.jpg',
        captionAr: 'فصوص الكليمونتين الغنية بفيتامين C والبيوفلافونويد',
        captionFr: 'Quartiers juteux sans pépins riches en Vitamine C',
        captionEn: 'Seedless juicy segments rich in Vitamin C',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Orange_Blossoms_and_Fruit.jpg/800px-Orange_Blossoms_and_Fruit.jpg',
        captionAr: 'أشجار الحوامض ونوار اللشين في سهل تريفة ببركان',
        captionFr: 'Vergers d’agrumes dans la plaine de Triffa (Berkane)',
        captionEn: 'Citrus orchards and blossoms in Triffa plain, Berkane',
      },
    ],
  },
  'grenade-sefri': {
    seasonLabel: { ar: 'فصل الخريف', fr: 'Saison d’Automne', en: 'Autumn Season' },
    weakOrganHealed: {
      ar: 'غشاء المعدة (موسم هيجان القرحة الخريفية) وبطانة الشرايين',
      fr: 'Muqueuse de l’Estomac (Ulcères d’automne) & Artères',
      en: 'Stomach Lining (Autumn Ulcer Peak) & Arterial Walls',
    },
    whyOrganNeedsItNow: {
      ar: 'في الخريف يرقّ غشاء المعدة وتتهيج القرحة والحرقة؛ البونيكالاجين والعفص في الرمان السفري وشحمته البيضاء يرمم جدار المعدة وينظف الشرايين قبل الشتاء.',
      fr: 'En automne, l’estomac est sujet aux gastrites ; les punicalagines de la Grenade Sefri cicatrisent la muqueuse et protègent le cœur.',
      en: 'Autumn barometric shifts trigger gastritis; Sefri pomegranate punicalagins heal the stomach lining and clear arterial plaque.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 1 و 3 من الخريف: دباغة المعدة وتلميع الشرايين',
      fr: 'Semaines 1 & 3 d’Automne : Estomac & Endothélium',
      en: 'Autumn Weeks 1 & 3: Gastric Healing & Arteries',
    },
    dailyDose: {
      ar: 'حبة رمان سفري واحدة يومياً مع شحمتها البيضاء الرقيقة',
      fr: '1 grenade Sefri par jour avec sa fine membrane blanche',
      en: '1 Sefri pomegranate daily including thin white pith',
    },
    gallery: [
      {
        url: '/images/produce/grenade-sefri-1.jpg',
        captionAr: 'الرمان السفري د أولاد عبد الله مفتوح الحبات الياقوتية',
        captionFr: 'Grenade Sefri d’Ouled Abdallah ouverte aux arilles rubis',
        captionEn: 'Opened Ouled Abdallah Sefri Pomegranate with ruby arils',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Pomegranate_Juice_%282019%29.jpg/800px-Pomegranate_Juice_%282019%29.jpg',
        captionAr: 'حبات وعصير الرمان الطبيعي والشحمة البيضاء الدابغة للمعدة',
        captionFr: 'Grains et membrane blanche riches en punicalagines',
        captionEn: 'Arils and white pith rich in mucosal-healing punicalagins',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Pomegranate_fruit_-_whole_and_piece_with_arils.jpg/800px-Pomegranate_fruit_-_whole_and_piece_with_arils.jpg',
        captionAr: 'مقطع عرضي يوضح قشرة الرمان والشحمة الداخلية',
        captionFr: 'Coupe anatomique de la grenade et de son écorce',
        captionEn: 'Cross-section showing rind, white pith, and soft-seeded arils',
      },
    ],
  },
  'figue-barbarie-ait-baamrane': {
    seasonLabel: { ar: 'فصل الصيف (الصمايم)', fr: 'Saison d’Été (Smayem)', en: 'Peak Summer (Smayem)' },
    weakOrganHealed: {
      ar: 'الكليتان والمعدة والقلب (المرهقة بحرارة الصيف وفقدان الأملاح)',
      fr: 'Reins, Estomac & Cœur (Épuisés par la chaleur d’été)',
      en: 'Kidneys, Stomach & Heart (Depleted by summer heat)',
    },
    whyOrganNeedsItNow: {
      ar: 'في حر غشت يفقد الجسم المغنيسيوم عبر العرق وترتفع حرارة المعدة؛ الهندية تعوض 85 ملغ مغنيسيوم وتبرد المعدة بهلامها وتضبط السكر.',
      fr: 'En plein été, la transpiration épuise le magnésium ; la figue de Barbarie apporte 85 mg de magnésium et tapisse l’estomac.',
      en: 'Summer sweat depletes magnesium; prickly pears restore 85mg magnesium and cool inflamed stomach mucosa.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 2 و 3 من الصيف: تبريد المعدة وشحن المغنيسيوم',
      fr: 'Semaines 2 & 3 d’Été : Mucilage Gastrique & Magnésium',
      en: 'Summer Weeks 2 & 3: Stomach Cooling & Magnesium',
    },
    dailyDose: {
      ar: '2 إلى 4 حبات باردة عصراً (مع شرب الماء وعدم الإكثار على الريق)',
      fr: '2 à 4 fruits frais l’après-midi avec un grand verre d’eau',
      en: '2 to 4 chilled fruits in the afternoon with plenty of water',
    },
    gallery: [
      {
        url: '/images/produce/figue-barbarie-ait-baamrane-1.jpg',
        captionAr: 'الهندية المغربية (أكناري آيت باعمران) بألوانها العسلية والبرتقالية',
        captionFr: 'Figues de Barbarie d’Aït Baâmrane (Aknari)',
        captionEn: 'Aït Baâmrane Prickly Pears (Moroccan Handiya / Aknari)',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Opuntia_ficus-indica_fruit9.jpg/800px-Opuntia_ficus-indica_fruit9.jpg',
        captionAr: 'ثمار الصبار على ألواح الضلف في الجنوب المغربي',
        captionFr: 'Fruits mûrs sur raquettes de cactus Opuntia',
        captionEn: 'Ripe prickly pear fruits growing on Opuntia cactus pads',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Prickly_pears.jpg/800px-Prickly_pears.jpg',
        captionAr: 'الهندية المقشرة الغنية بالبيتالين والمغنيسيوم وبذور فيتامين E',
        captionFr: 'Pulpe juteuse riche en bétalaïnes et graines précieuses',
        captionEn: 'Peeled pulp rich in betalains, magnesium, and Vitamin E seeds',
      },
    ],
  },
  'datte-majhoul': {
    seasonLabel: { ar: 'فصل الخريف والشتاء', fr: 'Automne & Hiver', en: 'Autumn & Winter' },
    weakOrganHealed: {
      ar: 'الدماغ والأعصاب والدم (في تعب الخريف وبرد الشتاء)',
      fr: 'Cerveau, Nerfs & Sang (Fatigue d’automne & froid)',
      en: 'Brain, Nerves & Blood (Autumn fatigue & winter cold)',
    },
    whyOrganNeedsItNow: {
      ar: 'مع نقص ضوء الخريف وبداية البرد، يحتاج الدماغ والعضلات إلى البوتاسيوم (696 ملغ) وفيتامين B6 والمغنيسيوم لبناء السيروتونين وتدفئة الجسم.',
      fr: 'En automne-hiver, le cerveau et les muscles ont besoin du potassium (696 mg) et de la vitamine B6 de la datte Majhoul.',
      en: 'As daylight fades in autumn, the brain and muscles need Medjool potassium (696mg), Vitamin B6, and magnesium.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 2 و 4 من الخريف: شحن الدماغ والطاقة والحديد',
      fr: 'Semaines 2 & 4 d’Automne : Énergie Cérébrale & Fer',
      en: 'Autumn Weeks 2 & 4: Brain Energy & Iron Reserves',
    },
    dailyDose: {
      ar: '3 تمرات مجهول صباحاً محشوة باللوز البلدي أو الكركاع',
      fr: '3 dattes Majhoul le matin farcies aux amandes ou noix',
      en: '3 Medjool dates in the morning stuffed with almonds or walnuts',
    },
    gallery: [
      {
        url: '/images/produce/datte-majhoul-1.jpg',
        captionAr: 'التمر المجهول الملكي لواحات تافيلالت وأرفود',
        captionFr: 'Dattes Majhoul royales des oasis du Tafilalet',
        captionEn: 'Royal Medjool Dates from Tafilalet and Erfoud oases',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Dates_on_date_palm.jpg/800px-Dates_on_date_palm.jpg',
        captionAr: 'عراجين التمر في نخيل واحات درعة وزيز وفجيج',
        captionFr: 'Régimes de dattes sur palmier dattier dans l’oasis',
        captionEn: 'Golden date clusters ripening on oasis date palms',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Medjool_dates.jpg/800px-Medjool_dates.jpg',
        captionAr: 'قوام التمر المجهول المعسل الغني بالألياف والبوتاسيوم',
        captionFr: 'Chair fondante et caramélisée de la datte Majhoul',
        captionEn: 'Caramel-like fiber-rich flesh of Moroccan Medjool dates',
      },
    ],
  },
  'figue-taounate': {
    seasonLabel: { ar: 'فصل الصيف والخريف', fr: 'Été & Automne', en: 'Summer & Autumn' },
    weakOrganHealed: {
      ar: 'العظام والمفاصل والقولون (ترميم الكالسيوم وتليين الأمعاء)',
      fr: 'Os, Articulations & Côlon (Calcium & Transit)',
      en: 'Bones, Joints & Colon (Calcium & Digestive Motility)',
    },
    whyOrganNeedsItNow: {
      ar: 'تمنح الكرموس البلدي في الصيف أنزيم الفيسين الهاضم، وتمنح "الشريحة" المجففة في الخريف والشتاء الكالسيوم والحديد مع زيت الزيتون.',
      fr: 'Fraîche en été pour ses enzymes digestives (ficine), et séchée (« Chri7a ») en hiver avec l’huile d’olive pour les os et les bronches.',
      en: 'Fresh summer figs supply digestive ficin enzymes, while dried "Chri7a" figs in olive oil fortify winter bones and lungs.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 4 من الصيف: تثبيت الكالسيوم وتليين القولون',
      fr: 'Semaine 4 d’Été : Densité Osseuse & Transit',
      en: 'Summer Week 4: Bone Calcium & Gentle Motility',
    },
    dailyDose: {
      ar: '3 حبات كرموس طري في الصيف، أو حبتان شريحة بـزيت الزيتون صباحاً في البرد',
      fr: '3 figues fraîches en été, ou 2 figues sèches à l’huile d’olive en hiver',
      en: '3 fresh figs in summer, or 2 olive-oil cured dried figs in winter',
    },
    gallery: [
      {
        url: '/images/produce/figue-taounate-1.jpg',
        captionAr: 'الكرموس البلدي د تاونات ووزان مقطوع يظهر لبه العسلي',
        captionFr: 'Figue fraîche de Taounate coupée au cœur mielleux',
        captionEn: 'Fresh Taounate Fig halved to reveal honeyed ruby interior',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Figs.jpg/800px-Figs.jpg',
        captionAr: 'ثمار التين المغربي الطري الغني بأنزيم الفيسين والكالسيوم',
        captionFr: 'Figues fraîches riches en calcium végétal et ficine',
        captionEn: 'Fresh Moroccan figs rich in plant calcium and ficin enzyme',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Dried_figs.jpg/800px-Dried_figs.jpg',
        captionAr: 'الشريحة المغربية المجففة تحت شمس الجبل لشتاء دافئ',
        captionFr: 'Figues séchées traditionnelles (« Chri7a »)',
        captionEn: 'Sun-dried Moroccan figs ("Chri7a") for winter immunity',
      },
    ],
  },
  'pasteque-zagora': {
    seasonLabel: { ar: 'فصل الصيف (ماي – غشت)', fr: 'Saison d’Été', en: 'Summer Season' },
    weakOrganHealed: {
      ar: 'الكليتان والشرايين (في موجة الحر والجفاف الصيفي)',
      fr: 'Reins & Artères (Contre la déshydratation estivale)',
      en: 'Kidneys & Arteries (During summer heat & dehydration)',
    },
    whyOrganNeedsItNow: {
      ar: 'في حرارة الصيف يتكاثف البول وترتفع لزوجة الدم؛ دلاح زاكورة يغسل الكليتين بـ 92% ماء مهيكل ويوسع الشرايين بحمض السيترولين.',
      fr: 'En été, la pastèque de Zagora lave les reins (92% d’eau) et dilate les vaisseaux sanguins grâce à la L-citrulline.',
      en: 'In summer heat, Zagora watermelon flushes the kidneys (92% water) and dilates blood vessels with L-Citrulline.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 1 من الصيف: غسل الكليتين وتبريد الدم',
      fr: 'Semaine 1 d’Été : Lavage Rénal & Hydratation',
      en: 'Summer Week 1: Kidney Flush & Vascular Cooling',
    },
    dailyDose: {
      ar: 'شريحتان (300 غرام) بين الوجبات بعيداً عن الغداء بـساعتين',
      fr: '2 tranches (300 g) en dehors des repas principaux',
      en: '2 slices (300g) enjoyed alone between main meals',
    },
    gallery: [
      {
        url: '/images/produce/pasteque-zagora-1.jpg',
        captionAr: 'الدلاح المغربي د زاكورة وشيشاوة بلبه الأحمر المرمل',
        captionFr: 'Pastèque de Zagora à la chair rouge croquante',
        captionEn: 'Zagora Watermelon with crisp lycopene-rich crimson flesh',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Taiwan_2009_Tainan_City_Organic_Farm_Watermelon_FRD_7962.jpg/800px-Taiwan_2009_Tainan_City_Organic_Farm_Watermelon_FRD_7962.jpg',
        captionAr: 'ثمرة الدلاح المخططة الكاملة قبل الفتح',
        captionFr: 'Pastèque entière rayée mûrie au soleil',
        captionEn: 'Whole sun-ripened striped watermelon specimen',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Watermelon_cross_section.jpg/800px-Watermelon_cross_section.jpg',
        captionAr: 'مقطع عرضي يبرز اللب الأحمر والقشرة البيضاء الغنية بالسيترولين',
        captionFr: 'Coupe transversale montrant l’écorce blanche riche en citrulline',
        captionEn: 'Cross-section showing crimson center and citrulline-rich white rind',
      },
    ],
  },
  'avocat-gharb': {
    seasonLabel: { ar: 'فصل الخريف والشتاء', fr: 'Automne & Hiver', en: 'Autumn & Winter' },
    weakOrganHealed: {
      ar: 'الدماغ، القلب وشبكية العين (امتصاص الفيتامينات وحماية الشرايين)',
      fr: 'Cerveau, Cœur & Rétine (Acide oléique & Lutéine)',
      en: 'Brain, Heart & Retina (Oleic Acid & Lutein Shield)',
    },
    whyOrganNeedsItNow: {
      ar: 'في الخريف والشتاء يحتاج الدماغ والقلب إلى الدهون الأحادية الدافئة (GI=10) والجلوتاثيون والبوتاسيوم لمقاومة الإجهاد التأكسدي.',
      fr: 'En automne-hiver, l’avocat du Gharb (IG 10) nourrit le cerveau et le cœur en acides gras mono-insaturés et glutathion.',
      en: 'In autumn and winter, Gharb avocados (GI 10) nourish the brain and heart with oleic acid, potassium, and glutathione.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 3 من الخريف: مرونة الشرايين وتغذية الأعصاب',
      fr: 'Semaine 3 d’Automne : Protection Artérielle & Nerveuse',
      en: 'Autumn Week 3: Arterial Elasticity & Myelin Support',
    },
    dailyDose: {
      ar: 'نصف حبة لافوكا يومياً في الشلاظة بزيت الزيتون والحامض (بدون سكر!)',
      fr: '1/2 avocat par jour en salade au citron et huile d’olive (sans sucre)',
      en: '1/2 avocado daily in salad with lemon and olive oil (skip the sugar)',
    },
    gallery: [
      {
        url: '/images/produce/avocat-gharb-1.jpg',
        captionAr: 'لافوكا د الغرب والعرائش (صنف هاس وزوينو الكريمي)',
        captionFr: 'Avocat du Gharb et Larache coupé en deux',
        captionEn: 'Halved Gharb & Larache Avocado showing creamy green flesh',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Avocado_Hass_-_single_and_halved.jpg/800px-Avocado_Hass_-_single_and_halved.jpg',
        captionAr: 'ثمرة لافوكا الكاملة والمقطوعة مع النواة',
        captionFr: 'Avocat entier et coupé montrant la chair verte sous la peau',
        captionEn: 'Whole and halved Hass avocado showing dark-green outer layer',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Avocado_tree.jpg/800px-Avocado_tree.jpg',
        captionAr: 'أشجار الأفوكادو في بساتين الغرب واللوكوس',
        captionFr: 'Fruits sur l’avocatier avant récolte',
        captionEn: 'Avocado fruits hanging on the orchard tree',
      },
    ],
  },
  'fraise-loukkos': {
    seasonLabel: { ar: 'فصل الربيع (فبراير – ماي)', fr: 'Saison de Printemps', en: 'Spring Season' },
    weakOrganHealed: {
      ar: 'الدم، البشرة والذاكرة (لمحاربة سخفة الربيع وتجديد الكولاجين)',
      fr: 'Sang, Peau & Mémoire (Contre l’asthénie printanière)',
      en: 'Blood, Skin Collagen & Memory (Spring Revitalization)',
    },
    whyOrganNeedsItNow: {
      ar: 'في بداية الربيع ينخفض فيتامين C والحديد في الدم؛ فريز العرائش والمولاي بوسلهام يمنح 58.8 ملغ فيتامين C وحمض الإيلاجيك والفيسيتين للدماغ.',
      fr: 'Au printemps, la fraise du Loukkos apporte 58,8 mg de Vitamine C, de l’acide ellagique pour la peau et de la fisétine pour la mémoire.',
      en: 'In early spring, Loukkos strawberries deliver 58.8mg Vitamin C, skin-renewing ellagic acid, and brain-boosting fisetin.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 2 و 3 من الربيع: تجديد الدم والكولاجين',
      fr: 'Semaines 2 & 3 de Printemps : Sang & Collagène',
      en: 'Spring Weeks 2 & 3: Blood Iron Uptake & Collagen',
    },
    dailyDose: {
      ar: 'حفنة (150 غرام) طرية مع عصرة ليمون بركاني وأوراق نعناع',
      fr: '150 g de fraises fraîches au jus d’orange de Berkane et menthe',
      en: '150g fresh berries tossed with Berkane orange juice and mint',
    },
    gallery: [
      {
        url: '/images/produce/fraise-loukkos-1.jpg',
        captionAr: 'توت الأرض (الفريز) الطري لحوض اللوكوس والمولاي بوسلهام',
        captionFr: 'Fraises fraîches du bassin du Loukkos et Moulay Bousselham',
        captionEn: 'Freshly harvested Loukkos & Moulay Bousselham Strawberries',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg/800px-Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg',
        captionAr: 'تفاصيل حبة الفريز الحمراء الغنية بالأنثوسيانين',
        captionFr: 'Gros plan sur une fraise riche en anthocyanes et fisétine',
        captionEn: 'Close-up of ripe strawberry rich in anthocyanins and fisetin',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Strawberry_halved.jpg/800px-Strawberry_halved.jpg',
        captionAr: 'مقطع داخلي لحبة الفريز الطرية',
        captionFr: 'Coupe intérieure d’une fraise fraîche',
        captionEn: 'Interior cross-section of a fresh strawberry',
      },
    ],
  },
  'pomme-midelt': {
    seasonLabel: { ar: 'فصل الخريف (شتنبر – نونبر)', fr: 'Saison d’Automne', en: 'Autumn Season' },
    weakOrganHealed: {
      ar: 'القولون، الرئتان والشرايين (في تقلبات الخريف الجبلية)',
      fr: 'Côlon, Poumons & Artères (Transition d’automne)',
      en: 'Colon, Lungs & Arteries (Autumn Transition)',
    },
    whyOrganNeedsItNow: {
      ar: 'يغذي بكتين تفاح ميدلت وإيموزار الميكروبيوم المعوي ويخفض الكولسترول، بينما يفتح الكيرسيتين في قشرته القصبات الهوائية.',
      fr: 'La pectine de la pomme de Midelt nourrit le microbiote et baisse le cholestérol, tandis que la quercétine protège les bronches.',
      en: 'Midelt apple pectin feeds gut flora and lowers LDL, while peel quercetin supports bronchial capacity.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 1 و 3 من الخريف: توازن القولون والكولسترول',
      fr: 'Semaines 1 & 3 d’Automne : Microbiote & Cholestérol',
      en: 'Autumn Weeks 1 & 3: Gut Pectin & LDL Control',
    },
    dailyDose: {
      ar: 'تفاحة ميدلت واحدة يومياً بقشرتها بعد غسلها جيداً',
      fr: '1 pomme de Midelt par jour avec sa peau bien lavée',
      en: '1 unpeeled Midelt apple daily after thorough washing',
    },
    gallery: [
      {
        url: '/images/produce/pomme-midelt-1.jpg',
        captionAr: 'تفاح ميدلت والأطلس المتوسط المقرمش',
        captionFr: 'Pommes croquantes d’altitude de Midelt et Imouzzer',
        captionEn: 'Crisp high-altitude Apples from Midelt and Imouzzer',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/800px-Red_Apple.jpg',
        captionAr: 'تفاحة الأطلس الكاملة بقشرتها الغنية بالكيرسيتين',
        captionFr: 'Pomme rouge entière riche en quercétine dans l’épiderme',
        captionEn: 'Whole red Atlas apple with quercetin-rich skin',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pink_lady_and_cross_section.jpg/800px-Pink_lady_and_cross_section.jpg',
        captionAr: 'مقطع عرضي للتفاحة يبرز اللب المتماسك الغني بالبكتين',
        captionFr: 'Coupe transversale montrant la chair dense riche en pectine',
        captionEn: 'Cross-section showing dense, crisp pectin-rich flesh',
      },
    ],
  },
  'cerise-sefrou': {
    seasonLabel: { ar: 'أواخر الربيع وبداية الصيف (ماي – يونيو)', fr: 'Fin Printemps / Début Été', en: 'Late Spring / Early Summer' },
    weakOrganHealed: {
      ar: 'الدماغ (تنظيم النوم) والمفاصل والكليتان (طرد حمض اليوريك والنقرس)',
      fr: 'Cerveau (Sommeil) & Articulations (Élimination de l’acide urique)',
      en: 'Brain (Circadian Sleep) & Joints (Uric Acid & Gout Relief)',
    },
    whyOrganNeedsItNow: {
      ar: 'في الانتقال من الربيع للصيف يضطرب النوم وترتفع التهابات المفاصل؛ حب الملوك د صفرو يزود الدماغ بالميلاتونين الطبيعي ويخفض حمض اليوريك.',
      fr: 'En mai-juin, la cerise de Sefrou régule le sommeil par sa mélatonine naturelle et draine l’acide urique des articulations.',
      en: 'In May–June, Sefrou cherries reset sleep via natural melatonin and flush joint-inflaming uric acid.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 4 من الربيع: النوم العميق وتطهير المفاصل',
      fr: 'Semaine 4 de Printemps : Sommeil & Anti-Goutte',
      en: 'Spring Week 4: Deep Sleep & Joint Uric Acid Flush',
    },
    dailyDose: {
      ar: 'حفنة (100–150 غرام) مساءً، ومغلي السيقان المجففة للكليتين',
      fr: 'Une poignée (100–150 g) le soir, et queues séchées en tisane rénale',
      en: 'A handful (100–150g) in the evening, plus dried stems for kidney tea',
    },
    gallery: [
      {
        url: '/images/produce/cerise-sefrou-1.jpg',
        captionAr: 'حب الملوك د صفرو وعين اللوح بسيقانه الخضراء الطرية',
        captionFr: 'Cerises noires de Sefrou et Aïn Leuh aux pédoncules verts',
        captionEn: 'Dark Sefrou & Aïn Leuh Cherries with fresh green stems',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Cherry_Stella444.jpg/800px-Cherry_Stella444.jpg',
        captionAr: 'ثمار حب الملوك على الأغصان في بساتين الأطلس المتوسط',
        captionFr: 'Grappes de cerises sur l’arbre dans le Moyen Atlas',
        captionEn: 'Clusters of ripe cherries on the branch in the Middle Atlas',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Cherry_season_%2848216568227%29.jpg/800px-Cherry_season_%2848216568227%29.jpg',
        captionAr: 'الكرز الداكن الغني بالأنثوسيانين والميلاتونين الطبيعي',
        captionFr: 'Cerises foncées riches en anthocyanes et mélatonine',
        captionEn: 'Deep crimson cherries packed with anthocyanins and melatonin',
      },
    ],
  },
  'coing-haouz': {
    seasonLabel: { ar: 'فصل الخريف (شتنبر – نونبر)', fr: 'Saison d’Automne', en: 'Autumn Season' },
    weakOrganHealed: {
      ar: 'المعدة والقولون والأمعاء الدقيقة (درع القرحة والإسهال الخريفي)',
      fr: 'Estomac, Côlon & Intestin (Bouclier anti-ulcère et anti-diarrhéique)',
      en: 'Stomach & Colon Mucosa (Autumn Ulcer & Colitis Shield)',
    },
    whyOrganNeedsItNow: {
      ar: 'السفرجل البلدي المطبوخ يطلق هلام البكتين والعفص الذي يكسو جدار المعدة الملتهبة في الخريف بطبقة عازلة تشفي الحرقة وتوقف الإسهال.',
      fr: 'Le coing cuit libère un gel de pectine et de tanins qui tapisse et répare la muqueuse gastrique irritée en automne.',
      en: 'Braised Moroccan quince releases a dense pectin-tannin hydrogel that coats and heals autumn gastritis.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 1 من الخريف: ترميم المعدة وتهدئة القولون',
      fr: 'Semaine 1 d’Automne : Pansement Gastrique Naturel',
      en: 'Autumn Week 1: Natural Gastric Mucosa Bandage',
    },
    dailyDose: {
      ar: 'نصف سفرجلة مطبوخة في الطاجين أو مبخرة بالقرفة بدون سكر مكرر',
      fr: '1/2 coing mijoté en tagine ou cuit vapeur à la cannelle',
      en: '1/2 quince braised in tagine or steamed with Ceylon cinnamon',
    },
    gallery: [
      {
        url: '/images/produce/coing-haouz-1.jpg',
        captionAr: 'السفرجل البلدي الذهبي العطري لمنطقة الحوز وتادلة',
        captionFr: 'Coings dorés parfumés du Haouz et du Moyen Atlas',
        captionEn: 'Fragrant golden Moroccan Quinces from Haouz and Atlas',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Quince_fruit.jpg/800px-Quince_fruit.jpg',
        captionAr: 'ثمرة السفرجل على الشجرة بزغبها القطني الطبيعي',
        captionFr: 'Coing sur sa branche avec son duvet cotonneux',
        captionEn: 'Quince fruit on the branch showing natural downy fuzz',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Cydonia_oblonga_fruit_cross_section.jpg/800px-Cydonia_oblonga_fruit_cross_section.jpg',
        captionAr: 'مقطع داخلي للسفرجل وبذوره الهلامية المسكنة للكحة',
        captionFr: 'Coupe du coing et ses pépins riches en mucilage',
        captionEn: 'Cross-section of quince and its mucilage-rich seeds',
      },
    ],
  },
  'artichaut-qouq': {
    seasonLabel: { ar: 'الشتاء والربيع (نونبر – ماي)', fr: 'Hiver & Printemps', en: 'Winter & Spring' },
    weakOrganHealed: {
      ar: 'الكبد والمرارة (العضو الأول الذي يحتاج التصفية في الشتاء والربيع)',
      fr: 'Foie & Vésicule Biliaire (Organe clé à détoxifier au printemps)',
      en: 'Liver & Gallbladder (Primary Organ Needing Spring Detox)',
    },
    whyOrganNeedsItNow: {
      ar: 'الكبد هو العضو الأكثر إرهاقاً في نهاية الشتاء وبداية الربيع؛ مركبا السينارين والسيليمارين في القوق والخرشوف يضاعفان تدفق الصفراء ويغسلان الكبد.',
      fr: 'À la sortie de l’hiver, le foie est engorgé ; la cynarine et la silymarine de l’artichaut et du cardon régénèrent les cellules hépatiques.',
      en: 'Exiting winter, the liver is congested; artichoke and cardoon cynarin and silymarin flush bile and regenerate hepatocytes.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 1 من الربيع والأسبوع 2 من الشتاء: سلطان تصفية الكبد',
      fr: 'Semaine 1 de Printemps : Roi de la Détox Hépatique',
      en: 'Spring Week 1 & Winter Week 2: Master Liver Cleanser',
    },
    dailyDose: {
      ar: 'وجبتان أسبوعياً من طاجين القوق بالجلبانة أو الخرشوف بالحامض المصير',
      fr: '2 repas par semaine de Tagine Qouq/Jelbana ou Khorchef au citron',
      en: '2 meals weekly of Artichoke & Pea Tagine or Cardoon with lemon',
    },
    gallery: [
      {
        url: '/images/produce/artichaut-qouq-1.jpg',
        captionAr: 'القوق المغربي الطري (الأرضي شوكي) الغني بالسينارين والإنولين',
        captionFr: 'Artichauts violets et verts frais du Maroc (Qouq)',
        captionEn: 'Fresh Moroccan Globe Artichokes (Qouq) rich in cynarin',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Cardoon_stalks.jpg/800px-Cardoon_stalks.jpg',
        captionAr: 'ضلوع الخرشوف البلدي (القرنيع) المنظفة للكبد والمرارة',
        captionFr: 'Côtes de cardon marocain (« Khorchef »)',
        captionEn: 'Moroccan Cardoon stalks ("Khorchef") for liver & bile detox',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Artichoke_heart_cross_section.jpg/800px-Artichoke_heart_cross_section.jpg',
        captionAr: 'قلب القوق مقطوعاً يظهر القاع اللحمي الطري',
        captionFr: 'Coupe d’un cœur d’artichaut frais',
        captionEn: 'Halved artichoke showing the tender fleshy heart',
      },
    ],
  },
  'topinambour-qasbiya': {
    seasonLabel: { ar: 'فصل الشتاء (نونبر – فبراير)', fr: 'Saison d’Hiver', en: 'Winter Season' },
    weakOrganHealed: {
      ar: 'البنكرياس (ضبط السكري GI=11) والقولون ومخزون الحديد في البرد',
      fr: 'Pancréas (Glycémie IG 11), Microbiote & Fer Hivernal',
      en: 'Pancreas (GI 11 Blood Sugar), Gut Microbiome & Winter Iron',
    },
    whyOrganNeedsItNow: {
      ar: 'في الشتاء يرتفع سكر الدم وتكسل الأمعاء؛ البطاطا القصبية خالية تماماً من النشا وتمنح الإنولين النقي (GI=11) مع 3.4 ملغ حديد لتدفئة الجسم.',
      fr: 'En hiver, le topinambour (sans amidon, IG 11) remplace la pomme de terre pour stabiliser la glycémie, nourrir le côlon et apporter 3,4 mg de fer.',
      en: 'In winter, starch-free Batata Qasbiya (GI 11) stabilizes blood sugar, feeds gut immunity with pure inulin, and supplies 3.4mg iron.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 2 و 4 من الشتاء: صديق البنكرياس والقولون الأول',
      fr: 'Semaines 2 & 4 d’Hiver : Allié du Pancréas & du Côlon',
      en: 'Winter Weeks 2 & 4: Pancreas & Microbiome Champion',
    },
    dailyDose: {
      ar: '200 غرام مطبوخة في الطاجين مع الكامون البلدي والقزبر',
      fr: '200 g mijotés en tagine avec cumin beldi et coriandre',
      en: '200g braised in tagine with Beldi cumin and fresh coriander',
    },
    gallery: [
      {
        url: '/images/produce/topinambour-qasbiya-1.jpg',
        captionAr: 'البطاطا القصبية المغربية (الترافس) ذات القشرة العقدية واللب الأبيض',
        captionFr: 'Topinambours marocains (« Batata Qasbiya / Terfess »)',
        captionEn: 'Moroccan Jerusalem Artichokes ("Batata Qasbiya")',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Sunroot_topinambour_sunchoke_helianthus_tuberosus.jpg/800px-Sunroot_topinambour_sunchoke_helianthus_tuberosus.jpg',
        captionAr: 'درنات البطاطا القصبية الكاملة والمقطوعة الغنية بالإنولين',
        captionFr: 'Tubercules entiers et coupés riches en inuline prébiotique',
        captionEn: 'Whole and sliced sunchoke tubers rich in prebiotic inulin',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Helianthus_tuberosus_003.JPG/800px-Helianthus_tuberosus_003.JPG',
        captionAr: 'نبتة وزهرة البطاطا القصبية الصفراء من عائلة دوار الشمس',
        captionFr: 'Fleur jaune d’Helianthus tuberosus (Topinambour)',
        captionEn: 'Yellow blossom of the Helianthus tuberosus sunchoke plant',
      },
    ],
  },
  'citrouille-doukkala': {
    seasonLabel: { ar: 'الخريف والشتاء (أكتوبر – مارس)', fr: 'Automne & Hiver', en: 'Autumn & Winter' },
    weakOrganHealed: {
      ar: 'شبكية العين والأغشية المخاطية للرئتين والمناعة الشتوية',
      fr: 'Rétine Oculaire, Muqueuses Bronchiques & Immunité',
      en: 'Retinal Vision, Respiratory Mucosa & Winter Immunity',
    },
    whyOrganNeedsItNow: {
      ar: 'تمنح الڭرعة الحمراء الدكالية 8,513 وحدة دولية من فيتامين A واللوتين لترميم الأغشية المخاطية التنفسية وحماية شبكية العين في الخريف والشتاء.',
      fr: 'Avec 8 513 UI de Vitamine A et de la lutéine, la courge rouge des Doukkala blinde les muqueuses respiratoires et la rétine en hiver.',
      en: 'Packing 8,513 IU of Vitamin A plus lutein, Doukkala red pumpkin fortifies respiratory linings and retinal vision in winter.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 4 من الخريف والأسبوع 3 من الشتاء: درع العيون والرئتين',
      fr: 'Semaine 4 d’Automne & 3 d’Hiver : Vision & Bronches',
      en: 'Autumn Week 4 & Winter Week 3: Vision & Bronchial Shield',
    },
    dailyDose: {
      ar: 'شريحة كبيرة في كسكس الجمعة أو الشوربة مع زيت الزيتون',
      fr: 'Une belle tranche dans le couscous du vendredi ou en velouté à l’huile d’olive',
      en: 'A generous wedge in Friday couscous or soup with olive oil',
    },
    gallery: [
      {
        url: '/images/produce/citrouille-doukkala-1.jpg',
        captionAr: 'الڭرعة الحمراء الدكالية (الحميرة) ذات اللب البرتقالي الداكن',
        captionFr: 'Courge rouge musquée des Doukkala (« Lgar3a L7amra »)',
        captionEn: 'Doukkala Red Pumpkin ("Lgar3a Lhamra") rich in beta-carotene',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/FrenchMarketPumpkinsB.jpg/800px-FrenchMarketPumpkinsB.jpg',
        captionAr: 'القرع الأحمر المضلع كما يعرض بالمبرود في الأسواق المغربية',
        captionFr: 'Courges musquées côtelées vendues à la tranche au souk',
        captionEn: 'Ribbed terracotta pumpkins displayed at the market',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Pumpkin_seeds.jpg/800px-Pumpkin_seeds.jpg',
        captionAr: 'زريعة الڭرعة الحمراء الغنية بالزنك والمغنيسيوم للبروستاتا والنوم',
        captionFr: 'Graines de courge riches en zinc et magnésium',
        captionEn: 'Pumpkin seeds rich in zinc, magnesium, and tryptophan',
      },
    ],
  },
  'tomate-chtouka': {
    seasonLabel: { ar: 'فصل الصيف وطوال السنة بشتوكة', fr: 'Été & Toute l’Année (Chtouka)', en: 'Summer Peak & Year-Round (Chtouka)' },
    weakOrganHealed: {
      ar: 'القلب والشرايين والبروستاتا والبشرة (تحت شمس الصيف)',
      fr: 'Cœur, Artères, Prostate & Peau (Protection anti-UV)',
      en: 'Heart, Arteries, Prostate & Skin (UV & Vascular Shield)',
    },
    whyOrganNeedsItNow: {
      ar: 'في الصيف تحمي ماطيشة د شتوكة الجلد والشرايين والبروستاتا بفضل الليكوبين المضاد للأكسدة والبوتاسيوم و94.5% ماء مرطب.',
      fr: 'En été, la tomate de Chtouka protège le cœur, la prostate et la peau contre les UV grâce au lycopène et à ses 94,5% d’eau.',
      en: 'In summer, Chtouka tomatoes protect arteries, prostate tissue, and UV-exposed skin via lycopene and 94.5% water.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 3 و 4 من الصيف: حماية القلب والبشرة بالليكوبين',
      fr: 'Semaines 3 & 4 d’Été : Lycopène Cardiaque & Cutané',
      en: 'Summer Weeks 3 & 4: Cardiac & Dermal Lycopene Shield',
    },
    dailyDose: {
      ar: 'يومياً في الشلاظة المغربية أو "لاصوص" مطبوخة بزيت الزيتون (تضاعف الليكوبين 4 مرات)',
      fr: 'Quotidiennement en salade ou mijotée à l’huile d’olive (lycopène x4)',
      en: 'Daily in Moroccan salad or simmered with olive oil (4x lycopene uptake)',
    },
    gallery: [
      {
        url: '/images/produce/tomate-chtouka-1.jpg',
        captionAr: 'ماطيشة د شتوكة آيت باها وسوس بعرشها الأخضر العطري',
        captionFr: 'Tomates en grappe de Chtouka-Aït Baha (Souss-Massa)',
        captionEn: 'Vine-ripened Chtouka-Aït Baha Tomatoes with green calyx',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/800px-Tomato_je.jpg',
        captionAr: 'مقطع عرضي للطماطم يظهر الحجرات العصيرية الغنية بالليكوبين',
        captionFr: 'Coupe transversale d’une tomate juteuse riche en lycopène',
        captionEn: 'Cross-section of a juicy tomato rich in lycopene',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Bright_red_tomato_and_cross_section02.jpg/800px-Bright_red_tomato_and_cross_section02.jpg',
        captionAr: 'حبة الطماطم الكاملة والمقطوعة لتحضير الشلاظة والحريرة',
        captionFr: 'Tomate entière et tranchée pour salade marocaine et Harira',
        captionEn: 'Whole and sliced tomato for Moroccan salad and Harira',
      },
    ],
  },
  'oignon-el-hajeb': {
    seasonLabel: { ar: 'الصيف، الخريف والشتاء', fr: 'Été, Automne & Hiver', en: 'Summer Harvest & Winter Shield' },
    weakOrganHealed: {
      ar: 'القصبات الهوائية، الشرايين والبنكرياس (مضاد حيوي وكيرسيتين)',
      fr: 'Bronches, Artères & Pancréas (Quercétine & Chrome)',
      en: 'Bronchi, Arteries & Pancreas (Quercetin & Chromium)',
    },
    whyOrganNeedsItNow: {
      ar: 'تحتوي البصلة الحمراء د الحاجب على 3 أضعاف الكيرسيتين والكروم؛ تفتح القصبات في الشتاء وتبرد ضربة الشمس في الصيف وتخفض السكر.',
      fr: 'L’oignon rouge d’El Hajeb (3x plus riche en quercétine) fluidifie le sang, régule la glycémie et dégage les bronches en hiver.',
      en: 'El Hajeb red onion (3x richer in quercetin) thins blood, improves insulin sensitivity, and clears winter bronchial phlegm.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 1 و 3 من الشتاء: مطهر الصدر وحامي الشرايين',
      fr: 'Semaines 1 & 3 d’Hiver : Antiseptique Bronchique & Artériel',
      en: 'Winter Weeks 1 & 3: Bronchial & Vascular Quercetin Shield',
    },
    dailyDose: {
      ar: 'نصف بصلة حمراء نيئة في الشلاظة أو مطبوخة في الدغميرة والطاجين يومياً',
      fr: '1/2 oignon rouge cru en salade ou mijoté en tagine chaque jour',
      en: '1/2 red onion raw in salad or slow-braised in tagines daily',
    },
    gallery: [
      {
        url: '/images/produce/oignon-el-hajeb-1.jpg',
        captionAr: 'البصلة الحمراء د الحاجب وبوفكران (IGP) الغنية بالكيرسيتين',
        captionFr: 'Oignon rouge IGP d’El Hajeb et Boufakrane',
        captionEn: 'IGP El Hajeb & Boufakrane Red Onions rich in quercetin',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Mixed_onions.jpg/800px-Mixed_onions.jpg',
        captionAr: 'حلقات البصل الأحمر البنفسجية المركزة بالبوليفينولات',
        captionFr: 'Anneaux violets concentrés en anthocyanes et quercétine',
        captionEn: 'Purple-red onion rings concentrated with anthocyanins',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Onion_on_White.JPG/800px-Onion_on_White.JPG',
        captionAr: 'البصلة الكركوبية الصلبة القابلة للخزن الطويل',
        captionFr: 'Bulbe d’oignon ferme de longue garde',
        captionEn: 'Rock-hard storage onion bulb',
      },
    ],
  },
  'ail-el-hajeb': {
    seasonLabel: { ar: 'يجنى في الصيف ويدخر لشتاء دافئ', fr: 'Récolte d’Été · Bouclier d’Hiver', en: 'Summer Harvest · Winter Immune Shield' },
    weakOrganHealed: {
      ar: 'القلب (خفض الضغط المرتفع)، الرئتان والمناعة والكبد',
      fr: 'Cœur (Hypertension), Poumons, Immunité & Foie',
      en: 'Heart (Blood Pressure), Lungs, Immunity & Liver',
    },
    whyOrganNeedsItNow: {
      ar: 'في برد الشتاء يرتفع ضغط الدم وتنتشر الفيروسات؛ أليسين الثومة البلدية الحمراء يوسع الشرايين ويقتل الميكروبات التنفسية والمعوية.',
      fr: 'En hiver, l’allicine de l’ail rose beldi abaisse la tension artérielle et détruit les virus respiratoires.',
      en: 'In winter, Beldi pink garlic allicin dilates arteries to lower blood pressure and neutralizes respiratory viruses.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 1 و 3 من الشتاء: المضاد الحيوي الطبيعي وموسع الشرايين',
      fr: 'Semaines 1 & 3 d’Hiver : Antibiotique & Hypotenseur Naturel',
      en: 'Winter Weeks 1 & 3: Natural Antimicrobial & Vasodilator',
    },
    dailyDose: {
      ar: 'فصان مدقوقان يتركان 10 دقائق في الهواء قبل إضافتهما للطاجين أو زيت الزيتون',
      fr: '2 gousses écrasées laissées 10 min à l’air avant cuisson ou dans l’huile d’olive',
      en: '2 crushed cloves rested 10 minutes before cooking or steeped in olive oil',
    },
    gallery: [
      {
        url: '/images/produce/ail-el-hajeb-1.jpg',
        captionAr: 'الثومة البلدية الحمراء د سبع عيون وتازة والحاجب',
        captionFr: 'Ail rose Beldi de Sebaa Ayoune, El Hajeb et Taza',
        captionEn: 'Moroccan Beldi Pink Garlic from Sebaa Ayoune and Taza',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Garlic_bulbs.jpg/800px-Garlic_bulbs.jpg',
        captionAr: 'رؤوس وفصوص الثوم الوردي البلدي عالية التركيز بالأليسين',
        captionFr: 'Têtes et caïeux d’ail rose très riches en allicine',
        captionEn: 'Pink garlic bulbs and cloves packed with allicin precursors',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Garlic_braid.jpg/800px-Garlic_braid.jpg',
        captionAr: 'ضفيرة الثومة البلدية المعلقة لخزن السنة كاملة',
        captionFr: 'Tresse d’ail traditionnelle séchée à l’ombre',
        captionEn: 'Traditional braided garlic hung for year-round curing',
      },
    ],
  },
  'feve-jelbana': {
    seasonLabel: { ar: 'فصل الربيع (يناير – أبريل)', fr: 'Saison de Printemps', en: 'Spring Season' },
    weakOrganHealed: {
      ar: 'النخاع العظمي والدم (سخفة الربيع) والدماغ (هرمون الدوبامين)',
      fr: 'Moelle Osseuse, Sang (Asthénie) & Cerveau (Dopamine L-DOPA)',
      en: 'Bone Marrow, Blood (Spring Fatigue) & Brain (L-DOPA Dopamine)',
    },
    whyOrganNeedsItNow: {
      ar: 'في الربيع يحتاج الجسم لتجديد الدم والدوبامين؛ الفول الأخضر والجلبانة يمنحان 148 ميكروغرام فولات B9 و7.9غ بروتين وأعلى نسبة L-DOPA في الطبيعة!',
      fr: 'Au printemps, fèves et petits pois rechargent le sang en folates B9 (148 µg) et le cerveau en L-DOPA naturelle.',
      en: 'In spring, fresh fava beans and peas rebuild blood with 148mcg Folate B9 and boost brain dopamine with natural L-DOPA.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 2 و 4 من الربيع: تجديد الدم ورفع الدوبامين',
      fr: 'Semaines 2 & 4 de Printemps : Sang Neuf & Dopamine',
      en: 'Spring Weeks 2 & 4: Blood Renewal & Brain Dopamine',
    },
    dailyDose: {
      ar: 'زلافة من الفول المشرمل بقشرته الطرية أو طاجين الجلبانة بالقوق مرتين أسبوعياً',
      fr: '1 bol de « Foul Mchermel » ou Tagine petits pois-artichauts 2 fois/semaine',
      en: '1 bowl of "Foul Mchermel" or Pea-Artichoke Tagine twice weekly',
    },
    gallery: [
      {
        url: '/images/produce/feve-jelbana-1.jpg',
        captionAr: 'قرون وحبات الفول الأخضر والجلبانة الطرية في بواكر الربيع',
        captionFr: 'Gousses et grains frais de fèves et petits pois primeurs',
        captionEn: 'Fresh green Fava Bean pods and sweet garden Peas in spring',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Broad_beans_Vicia_faba.jpg/800px-Broad_beans_Vicia_faba.jpg',
        captionAr: 'الفول الأخضر الطري الغني بمركب L-DOPA وحمض الفوليك',
        captionFr: 'Fèves vertes fraîches riches en L-DOPA et folates B9',
        captionEn: 'Fresh green fava beans rich in natural L-DOPA and folate',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Peas_in_pods_-_Studio.jpg/800px-Peas_in_pods_-_Studio.jpg',
        captionAr: 'الجلبانة الحلوة الطرية في قرونها الخضراء',
        captionFr: 'Petits pois frais dans leurs cosses vertes',
        captionEn: 'Sweet garden peas nestled in crisp green pods',
      },
    ],
  },
  'gombo-mloukhiya': {
    seasonLabel: { ar: 'فصل الصيف (يونيو – شتنبر)', fr: 'Saison d’Été', en: 'Summer Season' },
    weakOrganHealed: {
      ar: 'المعدة الملتهبة والقولون والبنكرياس (في حرارة الصيف)',
      fr: 'Estomac Irrité, Côlon & Pancréas (Chaleur d’été)',
      en: 'Irritated Stomach, Colon & Pancreas (Summer Heat)',
    },
    whyOrganNeedsItNow: {
      ar: 'في الصيف تتهيج المعدة والقولون؛ الهلام الطبيعي في الملوخية المغربية يبرد ويغلف جدار المعدة ويمتص السكر الزائد (GI=20).',
      fr: 'En été, le mucilage doux du gombo (Mloukhiya) tapisse l’estomac irrité et ralentit l’absorption du glucose (IG 20).',
      en: 'In summer, okra mucilage coats inflamed gastric linings and traps excess glucose (GI 20).',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 2 من الصيف: بلسم المعدة وضبط السكر الصيفي',
      fr: 'Semaine 2 d’Été : Baume Gastrique & Glycémie (IG 20)',
      en: 'Summer Week 2: Gastric Mucilage & Low-GI Control',
    },
    dailyDose: {
      ar: 'طاجين الملوخية المغربية بالقرون الصغيرة الكاملة مرة إلى مرتين أسبوعياً',
      fr: 'Tagine Mloukhiya aux petits gombos entiers 1 à 2 fois par semaine',
      en: 'Whole baby-pod Moroccan Mloukhiya tagine 1–2 times weekly',
    },
    gallery: [
      {
        url: '/images/produce/gombo-mloukhiya-1.jpg',
        captionAr: 'قرون الملوخية المغربية الخضراء الصغيرة الطرية',
        captionFr: 'Petits gombos verts extra-tendres (« Mloukhiya »)',
        captionEn: 'Tender baby green Moroccan Okra pods ("Mloukhiya")',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Okra_cross_section.jpg/800px-Okra_cross_section.jpg',
        captionAr: 'مقطع عرضي للملوخية يبرز البذور والهلام الطبيعي المرمم للمعدة',
        captionFr: 'Coupe transversale montrant les graines et le mucilage gastrique',
        captionEn: 'Cross-section showing seeds and gastric-soothing mucilage',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Hong_Kong_Okra_Aug_2012.JPG/800px-Hong_Kong_Okra_Aug_2012.JPG',
        captionAr: 'ثمار الملوخية الطازجة كما تقطف في سهول الحوز ومكناس',
        captionFr: 'Gombos frais du terroir de Marrakech et Meknès',
        captionEn: 'Freshly harvested okra pods from Marrakech and Meknès',
      },
    ],
  },
  'olive-picholine': {
    seasonLabel: { ar: 'الخريف والشتاء (أكتوبر – يناير)', fr: 'Automne & Hiver', en: 'Autumn Harvest & Winter Shield' },
    weakOrganHealed: {
      ar: 'القلب والشرايين، المفاصل، والكبد (مضاد التهاب وأكسدة خارق)',
      fr: 'Cœur, Artères, Articulations & Foie (Polyphénols)',
      en: 'Heart, Arteries, Joints & Liver (Polyphenol Shield)',
    },
    whyOrganNeedsItNow: {
      ar: 'موسم الزيتون الجديد في الخريف والشتاء يزود الجسم بالأوليوكانثال والهيدروكسيتيروزول لتسكين آلام المفاصل وحماية الشرايين من الجلطات.',
      fr: 'En automne-hiver, l’olive Picholine nouvelle et son huile vierge apportent oléocanthal et hydroxytyrosol pour les artères et les articulations.',
      en: 'In autumn and winter, new-harvest Picholine olives and oil deliver oleocanthal and hydroxytyrosol for arteries and joints.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 3 من الخريف والأسبوع 3 من الشتاء: إكسير الشرايين والمفاصل',
      fr: 'Semaine 3 d’Automne & d’Hiver : Élixir Cardiaque & Articulaire',
      en: 'Autumn & Winter Week 3: Vascular & Joint Elixir',
    },
    dailyDose: {
      ar: '7 حبات زيتون مسلالة مخمر طبيعياً + ملعقتان زيت زيتون بكر يومياً',
      fr: '7 olives Meslalla naturelles + 2 c.à.s d’huile d’olive vierge par jour',
      en: '7 naturally brined Meslalla olives + 2 tbsp extra-virgin olive oil daily',
    },
    gallery: [
      {
        url: '/images/produce/olive-picholine-1.jpg',
        captionAr: 'الزيتون البلدي المغربي (البيشولين والحوزية والمسلالة)',
        captionFr: 'Olives Picholine Marocaine et Meslalla sur rameau',
        captionEn: 'Moroccan Picholine & Meslalla Olives on the branch',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Olives_from_Jordan.jpg/800px-Olives_from_Jordan.jpg',
        captionAr: 'الزيتون الأخضر الطازج عند الجني للفرشخة والترقاد الطبيعي',
        captionFr: 'Olives vertes fraîches prêtes à être cassées (« Meslalla »)',
        captionEn: 'Freshly picked green olives ready for stone-cracking ("Meslalla")',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Olive_oil_from_Oneglia.jpg/800px-Olive_oil_from_Oneglia.jpg',
        captionAr: 'زيت الزيتون البكر الجديدة الغنية بالأوليوكانثال والهيدروكسيتيروزول',
        captionFr: 'Huile d’olive vierge extra nouvelle riche en polyphénols',
        captionEn: 'Fresh-pressed extra-virgin olive oil rich in polyphenols',
      },
    ],
  },
  'navet-meknes': {
    seasonLabel: { ar: 'فصل الشتاء (أكتوبر – مارس)', fr: 'Saison d’Hiver', en: 'Winter Season' },
    weakOrganHealed: {
      ar: 'الرئتان والقصبات الهوائية (إذابة البلغم) والكبد الشتوي',
      fr: 'Poumons, Bronches (Expectorant) & Foie Hivernal',
      en: 'Lungs, Bronchi (Phlegm Clearance) & Winter Liver',
    },
    whyOrganNeedsItNow: {
      ar: 'في الشتاء تتراكم الإفرازات في الصدر؛ الجلوكوزينولات الكبريتية وفيتامين C في اللفت البلدي والمحفور تذيب البلغم وتنظف الكبد.',
      fr: 'En hiver, les glucosinolates soufrés du navet fluidifient les sécrétions bronchiques, calment la toux et drainent le foie.',
      en: 'In winter, turnip sulfur glucosinolates break down bronchial mucus, soothe coughs, and activate liver detox.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 1 من الشتاء: منقي الرئتين ومهدئ السعال الشتوي',
      fr: 'Semaine 1 d’Hiver : Décongestionnant Pulmonaire',
      en: 'Winter Week 1: Bronchial Decongestant & Cough Soother',
    },
    dailyDose: {
      ar: 'في كسكس وطواجن الشتاء (مع أوراقه الخضراء)، أو منقوع اللفت بالعسل للسعال',
      fr: 'En tagine et couscous d’hiver, ou en sirop de navet au miel contre la toux',
      en: 'In winter tagines and couscous, or honey-macerated turnip syrup for coughs',
    },
    gallery: [
      {
        url: '/images/produce/navet-meknes-1.jpg',
        captionAr: 'اللفت البلدي المغربي بأوراقه الخضراء الطرية الغنية بالكالسيوم',
        captionFr: 'Navets blancs-violets frais du Maroc avec leurs fanes',
        captionEn: 'Fresh Moroccan purple-top Turnips with calcium-rich greens',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Turnip_2622027.jpg/800px-Turnip_2622027.jpg',
        captionAr: 'جذر اللفت الثقيل المتماسك الغني بالجلوكوزينولات وفيتامين C',
        captionFr: 'Racine de navet dense riche en glucosinolates et vitamine C',
        captionEn: 'Dense turnip root rich in bronchial glucosinolates and Vitamin C',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Brassica_rapa_subsp._rapa.jpg/800px-Brassica_rapa_subsp._rapa.jpg',
        captionAr: 'ثلاثي اللفت المغربي في الحقل (الأبيض والأصفر والمحفور)',
        captionFr: 'Récolte de navets de terroir pour le couscous et le tagine',
        captionEn: 'Harvested heritage turnips for Moroccan couscous and tagine',
      },
    ],
  },
  'menthe-meknes': {
    seasonLabel: { ar: 'الربيع والصيف (وطوال العام مع الإقامة)', fr: 'Printemps, Été & Toute l’Année', en: 'Spring-Summer Peak & Year-Round' },
    weakOrganHealed: {
      ar: 'المعدة والقولون المتشنج، والجيوب الأنفية (حساسية الربيع)',
      fr: 'Estomac, Côlon Spasmodique & Sinus (Allergies)',
      en: 'Spastic Stomach/Colon & Sinuses (Spring Allergies)',
    },
    whyOrganNeedsItNow: {
      ar: 'في الربيع يهيج اللقاح الجيوب الأنفية، وبعد الوجبات يتشنج القولون؛ حمض الروزمارينيك (ORAC 13,978) والكارفون في النعناع المكاوي يوقفان الهيستامين والمغص فوراً.',
      fr: 'L’acide rosmarinique (ORAC 13 978) et la carvone de la menthe de Meknès calment les allergies printanières et les spasmes digestifs.',
      en: 'Rosmarinic acid (ORAC 13,978) and carvone in Meknès spearmint block spring histamine and relax gut spasms.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 3 من الربيع: مضاد الهيستامين والتشنج الهضمي',
      fr: 'Semaine 3 de Printemps : Antihistaminique & Digestif',
      en: 'Spring Week 3: Natural Antihistamine & Gut Antispasmodic',
    },
    dailyDose: {
      ar: 'قبطة نعناع مغسولة جيداً تنقع في آخر دقيقة في براد أتاي أو الشلاظة يومياً',
      fr: 'Infusion hors du feu dans le thé vert marocain ou ciselée en salade chaque jour',
      en: 'Steeped off the flame in Moroccan green tea or chopped fresh into salads daily',
    },
    gallery: [
      {
        url: '/images/produce/menthe-meknes-1.jpg',
        captionAr: 'النعناع المكاوي والعبدي الأخضر الكثيف ذو الساق البنفسجي',
        captionFr: 'Menthe Nanah de Meknès et Bhalil aux feuilles gaufrées',
        captionEn: 'Fragrant Meknès & Bhalil Spearmint with crinkled leaves',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Mint-leaves-2007.jpg/800px-Mint-leaves-2007.jpg',
        captionAr: 'أوراق النعناع الغنية بالزيوت الطيارة وحمض الروزمارينيك',
        captionFr: 'Feuilles de menthe fraîches riches en huiles essentielles',
        captionEn: 'Fresh spearmint leaves rich in volatile oils and rosmarinic acid',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Moroccan_mint_tea.jpg/800px-Moroccan_mint_tea.jpg',
        captionAr: 'براد أتاي مغربي أصيل بالنعناع البلدي',
        captionFr: 'Thé à la menthe marocain traditionnel (« Atay »)',
        captionEn: 'Traditional Moroccan Mint Tea ("Atay") ritual',
      },
    ],
  },
  'safran-taliouine': {
    seasonLabel: { ar: 'يجنى في الخريف (أكتوبر–نونبر) ويدخر للشتاء', fr: 'Récolte d’Automne (Oct–Nov)', en: 'Autumn Harvest (Oct–Nov) & Winter Tonic' },
    weakOrganHealed: {
      ar: 'الدماغ والأعصاب (انخفاض السيروتونين الخريفي) وشبكية العين والقلب',
      fr: 'Cerveau (Sérotonine & Sommeil), Rétine & Cœur',
      en: 'Brain (Autumn Serotonin & Sleep), Retina & Heart',
    },
    whyOrganNeedsItNow: {
      ar: 'يقطف الزعفران الحر بتاليوين في الخريف بالضبط حين ينقص ضوء الشمس وينخفض السيروتونين؛ 10 شعرات يومياً ترفع السيروتونين وتحمي الشبكية وتدفئ الدورة الدموية.',
      fr: 'Récolté en automne quand la lumière décline, le safran AOP de Taliouine (10 pistils/jour) remonte la sérotonine, le sommeil et protège la rétine.',
      en: 'Harvested in autumn right as daylight wanes, 10 threads daily of Taliouine saffron boost brain serotonin, deep sleep, and retinal health.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 2 من الخريف: ذهب السيروتونين الدماغي وشبكية العين',
      fr: 'Semaine 2 d’Automne : Or Rouge Cérébral & Rétinien',
      en: 'Autumn Week 2: Brain Serotonin & Retinal Red Gold',
    },
    dailyDose: {
      ar: '10 إلى 12 شعرة (30 ملغ) منقوعة في ماء دافئ أو أتاي المساء يومياً',
      fr: '10 à 12 pistils (30 mg) infusés dans de l’eau tiède ou le thé du soir',
      en: '10 to 12 threads (30mg) steeped in warm water or evening tea daily',
    },
    gallery: [
      {
        url: '/images/produce/safran-taliouine-1.jpg',
        captionAr: 'شعيرات الزعفران الحر د تاليوين (AOP) الحمراء القانية',
        captionFr: 'Pistils de Safran pur AOP de Taliouine (L’Or Rouge)',
        captionEn: 'Pure crimson stigma threads of AOP Taliouine Saffron',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Crocus_sativus1.jpg/800px-Crocus_sativus1.jpg',
        captionAr: 'زهرة الزعفران البنفسجية فجراً في مدرجات جبل سيروا بتاليوين',
        captionFr: 'Fleur de Crocus sativus à l’aube sur le Jbel Siroua',
        captionEn: 'Crocus sativus blossom at dawn on Mount Siroua, Taliouine',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Saffron_threads.jpg/800px-Saffron_threads.jpg',
        captionAr: 'مياسم الزعفران الثلاثية الغنية بالكروسين والسفرنال',
        captionFr: 'Stigmates de safran concentrés en crocine et safranal',
        captionEn: 'Trumpet-shaped saffron threads rich in crocin and safranal',
      },
    ],
  },
  'nefle-berkane': {
    seasonLabel: { ar: 'فصل الربيع (مارس – ماي)', fr: 'Saison de Printemps (Mars–Mai)', en: 'Spring Season (March–May)' },
    weakOrganHealed: {
      ar: 'الكبد والمرارة، الكليتان، والأغشية المخاطية (في بداية الربيع)',
      fr: 'Foie, Reins & Muqueuses Respiratoires (Début de Printemps)',
      en: 'Liver, Kidneys & Respiratory Mucosa (Early Spring)',
    },
    whyOrganNeedsItNow: {
      ar: 'المزاح د بركان وزڭزل هو أول فاكهة شجرية تنضج في الربيع المغربي؛ غني بحمض الأورسوليك والبيتا-كاروتين والبكتين لغسل الكبد والكليتين من رواسب الشتاء وترطيب الحلق.',
      fr: 'Premier fruit d’arbre du printemps marocain, la Nèfle de Zegzel (IGP) draine le foie et les reins après l’hiver grâce à l’acide ursolique et au bêta-carotène.',
      en: 'Morocco’s first tree fruit of spring, Berkane Zegzel Loquat flushes winter liver and kidney toxins via ursolic acid, pectin, and beta-carotene.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 1 و 3 من الربيع: مصفي الكبد والكليتين الأول في الربيع',
      fr: 'Semaines 1 & 3 de Printemps : Draineur Foie & Reins',
      en: 'Spring Weeks 1 & 3: Early Spring Liver & Kidney Cleanser',
    },
    dailyDose: {
      ar: '5 إلى 7 حبات من المزاح البركاني الطري صباحاً أو عصراً',
      fr: '5 à 7 nèfles fraîches de Zegzel en collation matinale',
      en: '5 to 7 fresh Zegzel loquats as a morning or afternoon snack',
    },
    gallery: [
      {
        url: '/images/produce/nefle-berkane-1.jpg',
        captionAr: 'المزاح د بركان ووادي زڭزل (IGP) بلونه البرتقالي الذهبي',
        captionFr: 'Nèfles de Zegzel (Berkane IGP) dorées sur l’arbre',
        captionEn: 'Golden IGP Zegzel Loquats from Berkane on the branch',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Eriobotrya_japonica_fruit.jpg/800px-Eriobotrya_japonica_fruit.jpg',
        captionAr: 'عناقيد المزاح (البشملة) الناضجة في بساتين تافوغالت وزڭزل',
        captionFr: 'Grappes de nèfles mûres dans la vallée de Zegzel',
        captionEn: 'Clusters of ripe loquats in the Zegzel valley orchards',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Loquats.jpg/800px-Loquats.jpg',
        captionAr: 'ثمار المزاح الكاملة والمفتوحة الغنية بالبيتا-كاروتين والبكتين',
        captionFr: 'Nèfles entières et coupées montrant la chair juteuse',
        captionEn: 'Whole and halved loquats showing juicy beta-carotene flesh',
      },
    ],
  },
  'citron-beldi': {
    seasonLabel: { ar: 'فصل الشتاء وطوال السنة (الحامض المصير)', fr: 'Hiver & Toute l’Année (Citron Confit)', en: 'Winter Peak & Year-Round (Mssiyar)' },
    weakOrganHealed: {
      ar: 'الكبد والمرارة، المناعة التنفسية، والميكروبيوم المعوي',
      fr: 'Foie/Bile, Immunité Hivernale & Microbiote (Lacto-fermentation)',
      en: 'Liver Bile, Winter Immunity & Gut Microbiome (Lacto-Fermented)',
    },
    whyOrganNeedsItNow: {
      ar: 'في الشتاء والربيع يحتاج الكبد لحمض الستريك والليمونين لإذابة الدهون وحصى الكلى، بينما يمنح "الحامض المصير" البلدي المخمر بالملح بكتيريا بروبيوتيك حية للأمعاء.',
      fr: 'Le citron beldi frais alcalinise et dissout les calculs rénaux (citrate), tandis que le citron confit (« Mssiyar ») apporte des probiotiques vivants.',
      en: 'Fresh Beldi lemon supplies kidney-protective citrate and vitamin C, while salt-fermented "Mssiyar" delivers live gut probiotics.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 1 و 2 من الشتاء والأسبوع 1 من الربيع: مطهر الكبد والأمعاء',
      fr: 'Semaines 1 & 2 d’Hiver : Citrate Rénal & Probiotiques',
      en: 'Winter Weeks 1 & 2: Hepatic Flush & Fermented Probiotics',
    },
    dailyDose: {
      ar: 'عصرة نصف حامضة بلدية على الشلاظة والقطاني، وربع حامضة مصيرة في الطاجين',
      fr: 'Jus d’1/2 citron beldi sur les légumineuses/salades, et 1/4 de citron confit en tagine',
      en: 'Juice of 1/2 Beldi lemon over legumes/salads, plus 1/4 preserved lemon in tagines',
    },
    gallery: [
      {
        url: '/images/produce/citron-beldi-1.jpg',
        captionAr: 'الحامض البلدي المغربي ("بوصرة") ذو القشرة الرقيقة العطرية جداً',
        captionFr: 'Citrons Beldi du Maroc à peau fine ultra-parfumée',
        captionEn: 'Thin-skinned, intensely fragrant Moroccan Beldi Lemons',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/P1030823_Citrons_confits.JPG/800px-P1030823_Citrons_confits.JPG',
        captionAr: 'الحامض المصير المراكشي المخمر طبيعياً بالملح الحجري وزيت الزيتون',
        captionFr: 'Citrons confits marocains (« L7amd Lmssiyar ») lacto-fermentés',
        captionEn: 'Naturally lacto-fermented Moroccan Preserved Lemons ("Mssiyar")',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Lemon_-_whole_and_split.jpg/800px-Lemon_-_whole_and_split.jpg',
        captionAr: 'مقطع عرضي للحامض البلدي الغني بفيتامين C والسترات والليمونين',
        captionFr: 'Citron entier et coupé riche en acide citrique et d-limonène',
        captionEn: 'Whole and halved lemon rich in citrate and d-limonene',
      },
    ],
  },
  'melon-souihla': {
    seasonLabel: { ar: 'فصل الصيف (ماي – شتنبر)', fr: 'Saison d’Été (Mai–Sept)', en: 'Summer Season (May–Sept)' },
    weakOrganHealed: {
      ar: 'الكليتان، ضغط الدم والشرايين، والبشرة تحت شمس الصيف',
      fr: 'Reins, Tension Artérielle (Adénosine) & Peau (SOD)',
      en: 'Kidneys, Blood Pressure (Adenosine) & Sun-Stressed Skin (SOD)',
    },
    whyOrganNeedsItNow: {
      ar: 'في حر الصيف ترتفع لزوجة الدم وتحتبس السوائل؛ السويهلة المغربية غنية بمركب الأدينوزين المسيل للدم، البوتاسيوم المدر للبول، وإنزيم SOD المضاد للتوتر والشيخوخة.',
      fr: 'En été, le melon Souihla fluidifie le sang grâce à l’adénosine, élimine la rétention d’eau par son potassium et protège les cellules via l’enzyme SOD.',
      en: 'In summer heat, Moroccan Souihla melon thins blood via adenosine, relieves water retention with potassium, and shields cells with SOD.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 1 و 3 من الصيف: مسيل الدم ومبرد الكليتين والأعصاب',
      fr: 'Semaines 1 & 3 d’Été : Fluidifiant Sanguin & Enzyme SOD',
      en: 'Summer Weeks 1 & 3: Blood-Thinning Adenosine & SOD Shield',
    },
    dailyDose: {
      ar: 'شريحتان من السويهلة العطرية في الضحى أو العصر (منفردة لسهولة الهضم)',
      fr: '2 tranches de melon Souihla frais en collation hors des repas',
      en: '2 slices of fragrant Souihla melon enjoyed between meals',
    },
    gallery: [
      {
        url: '/images/produce/melon-souihla-1.jpg',
        captionAr: 'السويهلة المغربية (البطيخ) المشبكة ذات اللب البرتقالي والأخضر العسلي',
        captionFr: 'Melon Souihla et Charentais du Haouz et de Chichaoua',
        captionEn: 'Moroccan Souihla & Cantaloupe Melon from Chichaoua and Haouz',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Cantaloupes.jpg/800px-Cantaloupes.jpg',
        captionAr: 'مقطع داخلي للسويهلة يظهر اللب الغني بالبيتا-كاروتين وإنزيم SOD',
        captionFr: 'Chair orangée fondante riche en bêta-carotène et SOD',
        captionEn: 'Halved melon showing juicy flesh rich in beta-carotene and SOD',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Muskmelon.jpg/800px-Muskmelon.jpg',
        captionAr: 'البطيخ المغربي (المنڭون والسويهلة) الناضج تحت شمس الصيف',
        captionFr: 'Melon brodé mûri au soleil marocain',
        captionEn: 'Sun-ripened netted Moroccan melon',
      },
    ],
  },
  'feggous-maroc': {
    seasonLabel: { ar: 'فصل الصيف (يونيو – غشت)', fr: 'Saison d’Été (Juin–Août)', en: 'Summer Season (June–August)' },
    weakOrganHealed: {
      ar: 'المعدة الحساسة (سهل الهضم جداً)، الكليتان، والمفاصل والجلد',
      fr: 'Estomac Sensible (Ultra-digeste), Reins & Hydratation',
      en: 'Sensitive Stomach (Zero Bitterness), Kidneys & Skin Silica',
    },
    whyOrganNeedsItNow: {
      ar: 'الفقوس المغربي البلدي يتفوق على الخيار العادي بأنه لا يسبب أي تجشؤ أو حموضة للمعدة في حر الصيف، ويحتوي على 95% ماء مبرد وسيليكا طبيعية للجلد والكلى.',
      fr: 'Plus doux et beaucoup plus digeste que le concombre classique, le Feggous marocain rafraîchit l’estomac sans reflux et draine l’acide urique.',
      en: 'Unlike regular cucumbers, Moroccan heritage Feggous causes zero burping or reflux while cooling the stomach and flushing uric acid.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 1 و 2 من الصيف: مبرد المعدة والكليتين بـ 14 سعرة فقط',
      fr: 'Semaines 1 & 2 d’Été : Fraîcheur Gastrique (14 kcal)',
      en: 'Summer Weeks 1 & 2: Ultra-Digestible Gastric & Renal Cooler',
    },
    dailyDose: {
      ar: 'حبة فقوس كاملة يومياً بقشرتها الرقيقة في الشلاظة بالزعتر وزيت الزيتون',
      fr: '1 feggous entier par jour avec sa peau fine en salade à l’origan',
      en: '1 whole Feggous daily with its tender grooved skin and wild oregano',
    },
    gallery: [
      {
        url: '/images/produce/feggous-maroc-1.jpg',
        captionAr: 'الفقوس المغربي البلدي المضلع الطويل (وزان، صفرو، فاس، بركان)',
        captionFr: 'Feggous marocain traditionnel strié et croquant',
        captionEn: 'Traditional grooved Moroccan Feggous (Armenian cucumber)',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Cucumis_melo_flexuosus_2.jpg/800px-Cucumis_melo_flexuosus_2.jpg',
        captionAr: 'ثمار الفقوس البلدي الطرية ذات القشرة الرقيقة غير المرة',
        captionFr: 'Fruits de Cucumis melo var. flexuosus à peau fine sans amertume',
        captionEn: 'Slender grooved Cucumis melo var. flexuosus fruits',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Armenian_cucumber.jpg/800px-Armenian_cucumber.jpg',
        captionAr: 'مقطع الفقوس المقرمش الغني بالماء المهيكل والسيليكا',
        captionFr: 'Tranches croquantes de Feggous pour la salade d’été au Zaatar',
        captionEn: 'Crisp Feggous slices ready for Moroccan summer Zaatar salad',
      },
    ],
  },
  'prune-chefchaouen': {
    seasonLabel: { ar: 'الصيف والخريف (يوليوز – أكتوبر)', fr: 'Été & Automne (Juil–Oct)', en: 'Summer & Autumn (July–Oct)' },
    weakOrganHealed: {
      ar: 'القولون الكسول (مضاد الإمساك الأول) والعظام (البورون وفيتامين K)',
      fr: 'Côlon Paresseux (Transit) & Densité Osseuse (Bore + Vitamine K)',
      en: 'Sluggish Colon (Motility) & Bone Density (Boron + Vitamin K)',
    },
    whyOrganNeedsItNow: {
      ar: 'في الصيف والخريف يعالج البرقوق المغربي الإمساك بلطف بفضل السوربيتول وحمض النيوكلوروجينيك، ويثبت الكالسيوم في العظام بفضل معدن البورون وفيتامين K.',
      fr: 'La prune et le pruneau du Maroc relancent le transit grâce au sorbitol et renforcent la densité osseuse des femmes et seniors grâce au bore.',
      en: 'Moroccan plums and prunes gently restore bowel regularity via sorbitol and rebuild bone mineral density with boron and Vitamin K.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 4 من الصيف والأسبوع 4 من الخريف: منشط القولون وباني العظام',
      fr: 'Semaine 4 d’Été & d’Automne : Transit & Solidité Osseuse',
      en: 'Summer & Autumn Week 4: Colon Motility & Bone Density',
    },
    dailyDose: {
      ar: '4 حبات برقوق طري في الصيف، أو 3 حبات برقوق مجفف في الطاجين المغربي',
      fr: '4 prunes fraîches en été, ou 3 pruneaux dans le tagine marocain',
      en: '4 fresh plums in summer, or 3 prunes braised in Moroccan tagines',
    },
    gallery: [
      {
        url: '/images/produce/prune-chefchaouen-1.jpg',
        captionAr: 'البرقوق المغربي البنفسجي الطري لبساتين شفشاون ومكناس وميدلت',
        captionFr: 'Prunes violettes fraîches de Chefchaouen, Meknès et Midelt',
        captionEn: 'Fresh purple Moroccan Plums from Chefchaouen, Meknès & Midelt',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Plums_of_variety_Stanley.jpg/800px-Plums_of_variety_Stanley.jpg',
        captionAr: 'ثمار البرقوق على الشجرة بطبقتها الشمعية الطبيعية الواقية',
        captionFr: 'Prunes sur l’arbre recouvertes de leur pruine naturelle',
        captionEn: 'Plums on the branch coated in natural protective bloom',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Prunes.jpg/800px-Prunes.jpg',
        captionAr: 'البرقوق المغربي المجفف للأطباق الملكية وتقوية العظام',
        captionFr: 'Pruneaux séchés traditionnels pour le Tagine L7am bel Barqouq',
        captionEn: 'Dried Moroccan prunes for royal Tagine bil-Barqouq and bone health',
      },
    ],
  },
  'amande-tafraoute': {
    seasonLabel: { ar: 'الربيع (اللوز الأخضر) والخريف (اللوز الجاف)', fr: 'Printemps (Frais) & Automne (Sec)', en: 'Spring (Green) & Autumn (Dry Harvest)' },
    weakOrganHealed: {
      ar: 'القلب والشرايين (خفض الكولسترول الضار)، الدماغ، وضبط السكر',
      fr: 'Cœur (Baisse du LDL), Cerveau (Vitamine E) & Glycémie',
      en: 'Heart (LDL Reduction), Brain (Vitamin E) & Blood Sugar',
    },
    whyOrganNeedsItNow: {
      ar: 'في الخريف والشتاء يزود اللوز البلدي د تافراوت وأكنول الدماغ والقلب بـ 25.6 ملغ فيتامين E، 270 ملغ مغنيسيوم، و21.2غ بروتين نباتي بـمؤشر سكري صفري!',
      fr: 'En automne-hiver, l’amande Beldi de Tafraoute et d’Aknoul apporte 25,6 mg de Vitamine E, 270 mg de magnésium et 21,2 g de protéines (IG 0).',
      en: 'In autumn and winter, Tafraoute and Aknoul Beldi almonds supply 25.6mg Vitamin E, 270mg magnesium, and 21.2g protein (GI 0).',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 2 و 3 و 4 من الخريف: وقود الدماغ وحامي الشرايين',
      fr: 'Semaines 2, 3 & 4 d’Automne : Bouclier Artériel & Cérébral',
      en: 'Autumn Weeks 2–4: Brain Vitamin E & Arterial Shield',
    },
    dailyDose: {
      ar: 'حفنة (20 حبة = 25 غرام) من اللوز البلدي غير المملح يومياً (أو مع التمر)',
      fr: 'Une poignée (20 amandes Beldi = 25 g) non salées chaque jour',
      en: 'A handful (20 raw Beldi almonds = 25g) daily or stuffed into dates',
    },
    gallery: [
      {
        url: '/images/produce/amande-tafraoute-1.jpg',
        captionAr: 'اللوز البلدي د تافراوت وأكنول (IGP) صغير الحبة والمركز بالزيت العطري',
        captionFr: 'Amandes Beldi de Tafraoute (Anti-Atlas) et d’Aknoul',
        captionEn: 'Heritage Moroccan Beldi Almonds from Tafraoute and Aknoul',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/Mp/Almonds_in_shell_and_shelled.jpg/800px-Almonds_in_shell_and_shelled.jpg',
        captionAr: 'اللوز البلدي في قشرته الصلبة ومقشراً لتحضير أملو والحلويات المغربية',
        captionFr: 'Amandes en coque et décortiquées pour l’Amlou traditionnel',
        captionEn: 'In-shell and shelled almonds for Moroccan Amlou and tagines',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Almond_flowers_in_Tafraout.jpg/800px-Almond_flowers_in_Tafraout.jpg',
        captionAr: 'نوار اللوز الوردي في جبال تافراوت بالأطلس الصغير (فبراير)',
        captionFr: 'Floraison des amandiers dans la vallée de Tafraoute en février',
        captionEn: 'Pink almond blossoms across Tafraoute’s granite valley in February',
      },
    ],
  },
  'terfess-oriental': {
    seasonLabel: { ar: 'أواخر الشتاء وفصل الربيع (فبراير – أبريل)', fr: 'Fin Hiver & Printemps (Fév–Avril)', en: 'Late Winter & Spring (Feb–April)' },
    weakOrganHealed: {
      ar: 'العيون والقرنية، المناعة الخلوية، وتجديد الأنسجة في الربيع',
      fr: 'Yeux & Vision, Immunité Cellulaire & Régénération (Ergothionéine)',
      en: 'Eyes & Cornea, Cellular Immunity & Spring Tissue Renewal',
    },
    whyOrganNeedsItNow: {
      ar: 'يظهر الترفاس المغربي في صحراء بوعرفة وفجيج وغابة المعمورة بعد رعد وأمطار الربيع ("البرق")؛ غني بالإرغوثيونين والأحماض الأمينية الكاملة والسلينيوم لتقوية البصر والمناعة.',
      fr: 'Né des pluies d’orage de fin d’hiver à Bouarfa et en Maâmora, le Terfess est exceptionnellement riche en L-ergothionéine, sélénium et acides aminés complets.',
      en: 'Born after late-winter thunder rains in Bouarfa and Maâmora, Moroccan desert truffles pack rare L-ergothioneine, selenium, and complete protein.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 4 من الشتاء والأسبوع 2 و 3 من الربيع: كنز البصر والمناعة',
      fr: 'Semaines 2 & 3 de Printemps : Trésor Oculaire & Immunitaire',
      en: 'Spring Weeks 2 & 3: Ocular & Cellular Longevity Treasure',
    },
    dailyDose: {
      ar: '150 غرام في طاجين الترفاس بالبيض البلدي أو الكسكس في موسمه الربيعي',
      fr: '150 g mijotés en tagine aux œufs beldi ou dans le couscous au printemps',
      en: '150g braised with Beldi eggs or steamed over spring couscous',
    },
    gallery: [
      {
        url: '/images/produce/terfess-oriental-1.jpg',
        captionAr: 'الترفاس المغربي (الأبيض والأحمر الصحراوي د بوعرفة وفجيج والمعمورة)',
        captionFr: 'Truffes du désert marocaines (« Terfess » de l’Oriental et Maâmora)',
        captionEn: 'Moroccan Desert Truffles ("Terfess" of Bouarfa & Maâmora)',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Terfezia_arenaria.jpg/800px-Terfess_arenaria.jpg',
        captionAr: 'درنات الترفاس الكاملة والمقطوعة بعد تنظيفها من رمل الصحراء',
        captionFr: 'Terfess brossés montrant leur chair marbrée parfumée',
        captionEn: 'Brushed Terfezia truffles showing marbled aromatic interior',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Desert_truffles.jpg/800px-Desert_truffles.jpg',
        captionAr: 'كمأة الصحراء المغربية الغنية بالبروتين والإرغوثيونين',
        captionFr: 'Récolte printanière de Terfess après les pluies d’orage',
        captionEn: 'Spring harvest of Moroccan desert truffles after rainstorms',
      },
    ],
  },
  'capre-safi': {
    seasonLabel: { ar: 'فصل الصيف (يونيو – غشت) ويدخر للشتاء', fr: 'Récolte d’Été · Bouclier toute l’année', en: 'Summer Harvest · Year-Round Capillary Shield' },
    weakOrganHealed: {
      ar: 'الشعيرات الدموية الدقيقة، الكبد المتشحم، والمفاصل والرحم/البرودة',
      fr: 'Capillaires Sanguins (Record mondial de Rutine), Foie & Articulations',
      en: 'Micro-Capillaries (World #1 Rutin Source), Liver & Joints',
    },
    whyOrganNeedsItNow: {
      ar: 'الكبار المسفيوي والفاسي هو أغنى نبات على وجه الأرض بمركب الروتين (Rutin = 332 ملغ/100غ) والكيرسيتين! يقوي جدران الشعيرات الدموية في الصيف، وينظف تشحم الكبد ويسخن الجسم في البرد.',
      fr: 'La câpre de Safi et Fès est la source n°1 mondiale de Rutine (332 mg/100g) et Quercétine : elle blinde les vaisseaux capillaires et dégraisse le foie.',
      en: 'Safi and Fès capers are the world’s richest natural source of Rutin (332mg/100g) and Quercetin, sealing capillaries and clearing fatty liver.',
    },
    targetWeekBadge: {
      ar: 'الأسبوع 3 من الصيف وفصل الشتاء: بطل الروتين والشعيرات الدموية والكبد',
      fr: 'Semaine 3 d’Été & Hiver : Champion Mondial de la Rutine',
      en: 'Summer Week 3 & Winter: World #1 Rutin Capillary & Liver Shield',
    },
    dailyDose: {
      ar: 'ملعقة كبيرة من الكبار البلدي المغسول من الملح الزائد مع الشلاظة أو طاجين الحوت',
      fr: '1 c.à.s de câpres dessalées à l’eau dans les salades ou le tagine de poisson',
      en: '1 tbsp rinsed capers tossed into salads, Zaalouk, or fish tagines',
    },
    gallery: [
      {
        url: '/images/produce/capre-safi-1.jpg',
        captionAr: 'الكبار المسفيوي والفاسي والزرهوني (براعم القبار المغربي)',
        captionFr: 'Câpres de Safi, Abda et Zerhoun (1er exportateur mondial)',
        captionEn: 'Moroccan Capers from Safi, Abda & Zerhoun (World #1 Exporter)',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Capparis_spinosa_flower.jpg/800px-Capparis_spinosa_flower.jpg',
        captionAr: 'زهرة وبراعم نبتة الكبار البرية في سواحل آسفي وتلال زرهون',
        captionFr: 'Fleur et boutons floraux de Capparis spinosa au Maroc',
        captionEn: 'Wild Capparis spinosa blossom and flower buds in Morocco',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Salted_capers.jpg/800px-Salted_capers.jpg',
        captionAr: 'الكبار البلدي المرقد بالملح البحري والغني بالروتين والكيرسيتين',
        captionFr: 'Câpres marocaines conservées au sel marin riches en rutine',
        captionEn: 'Sea-salt cured Moroccan capers packed with rutin bioflavonoids',
      },
    ],
  },
}

import { WORLD_AND_MOROCCAN_EXTRA_PRODUCE } from './worldAndMoroccanProduce'
import { WORLD_PRODUCE_PART2 } from './worldProducePart2'
import { VERIFIED_PRODUCE_IMAGES } from './verifiedProduceImages'

const EXTRA_LOOKUP = [...WORLD_AND_MOROCCAN_EXTRA_PRODUCE, ...WORLD_PRODUCE_PART2]

export function getProduceSeasonalOrganRole(produceId: string): ProduceSeasonalOrganRole | undefined {
  const verified = VERIFIED_PRODUCE_IMAGES[produceId]
  const localMain = `/images/produce/${produceId}-1.jpg`
  const img1 = verified?.[0] || localMain
  const img2 = verified?.[1] || img1
  const img3 = verified?.[2] || img1

  const explicit = PRODUCE_SEASONAL_ORGAN_ROLES[produceId]
  if (explicit) {
    return {
      ...explicit,
      gallery: [
        {
          ...(explicit.gallery[0] || { captionAr: produceId, captionFr: produceId, captionEn: produceId }),
          url: img1,
        },
        {
          ...(explicit.gallery[1] || explicit.gallery[0] || { captionAr: produceId, captionFr: produceId, captionEn: produceId }),
          url: img2,
        },
        {
          ...(explicit.gallery[2] || explicit.gallery[0] || { captionAr: produceId, captionFr: produceId, captionEn: produceId }),
          url: img3,
        },
      ],
    }
  }

  const item = EXTRA_LOOKUP.find((p) => p.id === produceId)
  if (!item) return undefined

  const s = item.seasonality.primarySeason
  const seasonLabel =
    s === 'winter'
      ? { ar: 'فصل الشتاء (الليالي)', fr: 'Hiver (Lyali)', en: 'Winter (Lyali)' }
      : s === 'spring'
        ? { ar: 'فصل الربيع (البكور)', fr: 'Printemps (Primeurs)', en: 'Spring (Primeurs)' }
        : s === 'summer'
          ? { ar: 'فصل الصيف (الصمايم)', fr: 'Été (Smayem)', en: 'Summer (Smayem)' }
          : { ar: 'فصل الخريف', fr: 'Automne', en: 'Autumn' }

  const primaryOrgan = item.nutrition.targetOrgans[0] || 'immunity'
  const organMap: Record<HealthTargetOrgan, { ar: string; fr: string; en: string; wk: number }> = {
    immunity: { ar: 'الرئتان والجهاز المناعي', fr: 'Poumons & Système Immunitaire', en: 'Lungs & Immune System', wk: 1 },
    liver: { ar: 'الكبد والمرارة وتصريف السموم', fr: 'Foie & Vésicule Biliaire', en: 'Liver & Gallbladder Detox', wk: 1 },
    heart: { ar: 'القلب والشرايين وضغط الدم', fr: 'Cœur, Artères & Tension', en: 'Heart, Arteries & Blood Pressure', wk: 2 },
    digestion: { ar: 'المعدة والقولون والميكروبيوم', fr: 'Estomac, Côlon & Microbiote', en: 'Stomach, Colon & Microbiome', wk: 3 },
    blood_sugar: { ar: 'البنكرياس وتوازن الأنسولين', fr: 'Pancréas & Équilibre Glycémique', en: 'Pancreas & Glycemic Balance', wk: 2 },
    brain: { ar: 'الدماغ والأعصاب وجودة النوم', fr: 'Cerveau, Nerfs & Sommeil', en: 'Brain, Nerves & Sleep Quality', wk: 3 },
    eyes_skin: { ar: 'العيون والشبكية والكولاجين', fr: 'Yeux, Rétine & Collagène', en: 'Eyes, Retina & Skin Collagen', wk: 4 },
    bones: { ar: 'الكليتان والعظام والمفاصل', fr: 'Reins, Os & Articulations', en: 'Kidneys, Bones & Joints', wk: 2 },
    anemia_iron: { ar: 'الدم والطحال ومخزون الحديد', fr: 'Sang, Rate & Réserves de Fer', en: 'Blood, Spleen & Iron Reserves', wk: 4 },
  }

  const mapped = organMap[primaryOrgan]
  const peakM = item.seasonality.peakMonths.slice(0, 3).join('، ')

  return {
    seasonLabel,
    weakOrganHealed: {
      ar: `${mapped.ar} (أشهر الذروة: ${peakM})`,
      fr: `${mapped.fr} (Mois clés : ${peakM})`,
      en: `${mapped.en} (Peak months: ${peakM})`,
    },
    whyOrganNeedsItNow: item.description,
    targetWeekBadge: {
      ar: `الأسبوع ${mapped.wk} من ${seasonLabel.ar}`,
      fr: `Semaine ${mapped.wk} — ${seasonLabel.fr}`,
      en: `Week ${mapped.wk} — ${seasonLabel.en}`,
    },
    dailyDose: {
      ar: 'حصة يومية طازجة (150 إلى 200 غرام) خلال أشهر الموسم لتحقيق أقصى استفادة علاجية.',
      fr: 'Portion quotidienne fraîche (150 à 200 g) durant les mois de pleine saison.',
      en: 'Fresh daily serving (150–200g) during peak harvest months for optimal organ recovery.',
    },
    gallery: [
      {
        url: img1,
        captionAr: `${item.nameDarijaArabic} — الثمرة الكاملة`,
        captionFr: `${item.nameFrench} — Spécimen entier`,
        captionEn: `${item.nameEnglish} — Whole specimen`,
      },
      {
        url: img2,
        captionAr: `${item.nameDarijaArabic} — القيمة الغذائية واللب`,
        captionFr: `${item.nameFrench} — Coupe & texture`,
        captionEn: `${item.nameEnglish} — Interior & texture`,
      },
      {
        url: img3,
        captionAr: `${item.nameDarijaArabic} — في التيروار والمطبخ`,
        captionFr: `${item.nameFrench} — Terroir & art culinaire`,
        captionEn: `${item.nameEnglish} — Terroir & culinary use`,
      },
    ],
  }
}

export function getSeasonOrganProfileByMonth(monthNum: number): SeasonOrganProfile {
  if (monthNum === 12 || monthNum === 1 || monthNum === 2) {
    return SEASONAL_ORGAN_PROFILES.winter
  }
  if (monthNum >= 3 && monthNum <= 5) {
    return SEASONAL_ORGAN_PROFILES.spring
  }
  if (monthNum >= 6 && monthNum <= 8) {
    return SEASONAL_ORGAN_PROFILES.summer
  }
  return SEASONAL_ORGAN_PROFILES.autumn
}
