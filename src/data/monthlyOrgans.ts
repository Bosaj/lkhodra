import type { HealthTargetOrgan, SeasonName } from './types'

export interface MonthlyOrganEntry {
  month: number // 1 - 12
  season: Exclude<SeasonName, 'all_year'>
  moroccanSolarName: {
    ar: string
    fr: string
    en: string
  }
  climateAndBodySummary: {
    ar: string
    fr: string
    en: string
  }
  primaryWeakOrgans: {
    organKey: HealthTargetOrgan
    name: { ar: string; fr: string; en: string }
    whyStressed: { ar: string; fr: string; en: string }
    neededNutrients: { ar: string; fr: string; en: string }
  }[]
  fourWeeksOfMonth: {
    week: 1 | 2 | 3 | 4
    focus: { ar: string; fr: string; en: string }
    protocol: { ar: string; fr: string; en: string }
  }[]
}

export const MONTHLY_ORGAN_ATLAS: Record<number, MonthlyOrganEntry> = {
  1: {
    month: 1,
    season: 'winter',
    moroccanSolarName: {
      ar: 'يناير — الليالي الكبرى وحگوزة (رأس السنة الفلاحية)',
      fr: 'Janvier — Grandes Lyali & Yennayer Agraire',
      en: 'January — Peak Winter Lyali & Yennayer',
    },
    climateAndBodySummary: {
      ar: 'أبرد شهور السنة في المغرب؛ تتقلص الأوعية الدموية الطرفية وتبرد الكليتان وتجف الأغشية المخاطية للقصبات الهوائية.',
      fr: 'Mois le plus froid au Maroc ; vasoconstriction périphérique, sollicitation rénale et fragilité bronchique.',
      en: 'Coldest month in Morocco; peripheral vasoconstriction, renal cold stress, and bronchial vulnerability.',
    },
    primaryWeakOrgans: [
      {
        organKey: 'immunity',
        name: { ar: 'الرئتان والشعب الهوائية', fr: 'Poumons & Bronches', en: 'Lungs & Bronchi' },
        whyStressed: {
          ar: 'الهواء البارد يبطئ حركة الأهداب التنفسية ويزيد تعرضها للفيروسات الشتوية.',
          fr: 'L’air froid ralentit la clairance mucociliaire face aux virus hivernaux.',
          en: 'Cold air slows mucociliary clearance against winter respiratory viruses.',
        },
        neededNutrients: {
          ar: 'فيتامين C الطبيعي، الهيسبيريدين، والأليسين (كليمونتين بركان، الحامض البلدي، الثوم، البورو).',
          fr: 'Vitamine C, hespéridine et allicine (Clémentine, Citron Beldi, Ail, Poireau).',
          en: 'Natural Vitamin C, hesperidin, and allicin (Clementine, Beldi Lemon, Garlic, Leek).',
        },
      },
      {
        organKey: 'bones',
        name: { ar: 'الكليتان والمفاصل', fr: 'Reins & Articulations', en: 'Kidneys & Joints' },
        whyStressed: {
          ar: 'برودة يناير تزيد تيبس السائل الزلالي للمفاصل وترهق الكليتين.',
          fr: 'Le froid raidit les articulations et sollicite la filtration rénale.',
          en: 'Deep cold stiffens joint synovial fluid and stresses renal filtration.',
        },
        neededNutrients: {
          ar: 'الإينولين الدافئ، البوتاسيوم، والكالسيوم (البطاطا القصبية، اللفت، الخرشوف، الكرافس).',
          fr: 'Inuline, potassium et minéraux chauffants (Topinambour, Navet, Céleri, Cardon).',
          en: 'Warming inulin, potassium, and minerals (Jerusalem Artichoke, Turnip, Celery, Cardoon).',
        },
      },
    ],
    fourWeeksOfMonth: [
      {
        week: 1,
        focus: { ar: 'الأسبوع 1: تحصين القصبات الهوائية', fr: 'Sem. 1 : Bouclier Bronchique', en: 'Week 1: Bronchial Shield' },
        protocol: {
          ar: '3 حبات كليمونتين بركان صباحاً + شوربة البورو واللفت البلدي ليلاً.',
          fr: '3 clémentines de Berkane le matin + soupe de poireaux et navets le soir.',
          en: '3 Berkane clementines in the morning + leek and turnip soup at night.',
        },
      },
      {
        week: 2,
        focus: { ar: 'الأسبوع 2: تدفئة الكلي والميكروبيوم (أسبوع يناير الفلاحي)', fr: 'Sem. 2 : Chaleur Rénale & Yennayer', en: 'Week 2: Renal Warmth & Microbiome' },
        protocol: {
          ar: 'طاجين البطاطا القصبية والخرشوف + سبع خضاري لتغذية البكتيريا النافعة.',
          fr: 'Tagine de topinambour et cardon + légumes racines de Yennayer.',
          en: 'Jerusalem artichoke & cardoon tagine + winter root vegetables.',
        },
      },
      {
        week: 3,
        focus: { ar: 'الأسبوع 3: تصفية السوائل والمفاصل', fr: 'Sem. 3 : Drainage Articulaire', en: 'Week 3: Joint & Fluid Drainage' },
        protocol: {
          ar: 'مرق الكرافس والحامض البلدي + الشيفلور والبروكولي بالكمون.',
          fr: 'Bouillon de céleri et citron beldi + chou-fleur et brocoli au cumin.',
          en: 'Celery & beldi lemon broth + cauliflower and broccoli with cumin.',
        },
      },
      {
        week: 4,
        focus: { ar: 'الأسبوع 4: شحن الحديد ومقاومة الإرهاق الشتوي', fr: 'Sem. 4 : Fer & Vitalité Hivernale', en: 'Week 4: Winter Iron & Vitality' },
        protocol: {
          ar: 'البقولة (الخبيزة) والسبانخ بزيت العود والحامض المصير لرفع مخزون الفيريتين.',
          fr: 'Bakkoula (mauve) et épinards à l’huile d’olive et citron confit.',
          en: 'Bakkoula (mallow greens) and spinach with olive oil and preserved lemon.',
        },
      },
    ],
  },
  2: {
    month: 2,
    season: 'winter',
    moroccanSolarName: {
      ar: 'فبراير — خروج الليالي وسعد السعود (تزهير اللوز)',
      fr: 'Février — Sortie des Lyali & Floraison des Amandiers',
      en: 'February — Late Winter & Almond Blossom',
    },
    climateAndBodySummary: {
      ar: 'شهر تقلبات الجو بين البرد والدفء المبكر؛ يستنفد الجسم مخزون الحديد وفيتامين D ويبدأ الكبد بالتحضير للربيع.',
      fr: 'Mois de transition thermique ; épuisement des réserves de fer et préparation hépatique au printemps.',
      en: 'Thermal transition month; iron stores dip and the liver prepares for spring.',
    },
    primaryWeakOrgans: [
      {
        organKey: 'anemia_iron',
        name: { ar: 'الدم والطحال ومخزون الحديد', fr: 'Sang, Rate & Réserves de Fer', en: 'Blood, Spleen & Iron Reserves' },
        whyStressed: {
          ar: 'نهاية الشتاء تستنزف الهيموغلوبين والفيتامينات مما يسبب العياء والدوخة.',
          fr: 'La fin de l’hiver épuise l’hémoglobine et provoque la fatigue saisonnière.',
          en: 'Late winter depletes hemoglobin and causes seasonal fatigue.',
        },
        neededNutrients: {
          ar: 'الحديد غير الهيمي + فيتامين C + حمض الفوليك (البقولة، الباربا، الفريز العرائشي، البرتقال).',
          fr: 'Fer non héminique + Vitamine C + Folates (Bakkoula, Betterave, Fraise de Larache, Orange).',
          en: 'Non-heme iron + Vitamin C + Folate (Mallow greens, Beetroot, Larache Strawberry, Orange).',
        },
      },
      {
        organKey: 'liver',
        name: { ar: 'الكبد والمرارة', fr: 'Foie & Vésicule Biliaire', en: 'Liver & Gallbladder' },
        whyStressed: {
          ar: 'تراكم الدهون الشتوية الثقيلة يبطئ تدفق الصفراء قبل دخول الربيع.',
          fr: 'L’alimentation hivernale riche ralentit le flux biliaire avant le printemps.',
          en: 'Heavy winter meals slow bile flow ahead of spring.',
        },
        neededNutrients: {
          ar: 'السينارين والغلوكوزينولات (القوق، الخرشوف، البروكولي، الفجل).',
          fr: 'Cynarine et glucosinolates (Artichaut, Cardon, Brocoli, Radis).',
          en: 'Cynarin and glucosinolates (Artichoke, Cardoon, Broccoli, Radish).',
        },
      },
    ],
    fourWeeksOfMonth: [
      {
        week: 1,
        focus: { ar: 'الأسبوع 1: تجديد كريات الدم الحمراء', fr: 'Sem. 1 : Régénération Sanguine', en: 'Week 1: Red Blood Cell Renewal' },
        protocol: { ar: 'عصير الباربا والبرتقال + طبق البقولة والسلق.', fr: 'Jus betterave-orange + plat de Bakkoula et blettes.', en: 'Beetroot-orange juice + mallow greens and Swiss chard.' },
      },
      {
        week: 2,
        focus: { ar: 'الأسبوع 2: تنشيط المرارة والكبد المبكر', fr: 'Sem. 2 : Activation Biliaire', en: 'Week 2: Early Bile Activation' },
        protocol: { ar: 'القوق والجلبانة الطرية + البروكولي بالثوم.', fr: 'Artichauts aux petits pois frais + brocoli à l’ail.', en: 'Artichokes with fresh green peas + garlic broccoli.' },
      },
      {
        week: 3,
        focus: { ar: 'الأسبوع 3: مضادات أكسدة الشرايين (بكور الفريز)', fr: 'Sem. 3 : Antioxydants Vasculaires', en: 'Week 3: Vascular Antioxidants' },
        protocol: { ar: 'فريز العرائش واللوكوس الطري + اللوز البلدي.', fr: 'Fraises fraîches du Loukkos + amandes de Tafraoute.', en: 'Fresh Loukkos strawberries + Tafraoute almonds.' },
      },
      {
        week: 4,
        focus: { ar: 'الأسبوع 4: تهيئة الأمعاء لفصل الربيع', fr: 'Sem. 4 : Préparation Intestinale', en: 'Week 4: Spring Gut Prep' },
        protocol: { ar: 'البسباس البلدي والجزر المشرمل والبطاطا الحلوة.', fr: 'Fenouil bulbe, carottes chermoula et patate douce.', en: 'Fennel bulb, chermoula carrots, and sweet potato.' },
      },
    ],
  },
  3: {
    month: 3,
    season: 'spring',
    moroccanSolarName: {
      ar: 'مارس — الحسوما والاعتدال الربيعي (موسم البكور)',
      fr: 'Mars — Hassouma & Équinoxe de Printemps (Primeurs)',
      en: 'March — Spring Equinox & Early Primeurs',
    },
    climateAndBodySummary: {
      ar: 'في مارس يتحرك الكبد بقوة لطرح سموم الشتاء، وتنتشر حبوب اللقاح فتزداد حساسية العيون والجيوب الأنفية.',
      fr: 'En mars, le foie relance sa détoxification et les pollens sollicitent les yeux et les sinus.',
      en: 'In March, the liver accelerates detoxification while pollen challenges eyes and sinuses.',
    },
    primaryWeakOrgans: [
      {
        organKey: 'liver',
        name: { ar: 'الكبد وقنوات الصفراء', fr: 'Foie & Voies Biliaires', en: 'Liver & Bile Ducts' },
        whyStressed: {
          ar: 'الانتقال الفصلي يرفع عبء استقلاب الهستامين والدهون المتراكمة.',
          fr: 'La transition printanière augmente la charge métabolique du foie.',
          en: 'Spring transition increases hepatic metabolic and histamine load.',
        },
        neededNutrients: {
          ar: 'السينارين، السيليمارين، والكلوروفيل (القوق، السكوم/الهليون، الجلبانة، الفول الأخضر).',
          fr: 'Cynarine, silymarine et chlorophylle (Artichaut, Asperge, Petits pois, Fèves).',
          en: 'Cynarin, silymarin, and chlorophyll (Artichoke, Asparagus, Green Peas, Fava Beans).',
        },
      },
      {
        organKey: 'eyes_skin',
        name: { ar: 'العيون والجيوب الأنفية', fr: 'Yeux & Sinus (Allergies)', en: 'Eyes & Sinuses' },
        whyStressed: {
          ar: 'رياح الحسوم وحبوب اللقاح تسبب تهيج الملتحمة والحساسية الربيعية.',
          fr: 'Les vents de mars et le pollen irritent les muqueuses oculaires et nasales.',
          en: 'March winds and pollen irritate ocular and nasal mucosa.',
        },
        neededNutrients: {
          ar: 'الكيرسيتين، البيتا-كاروتين، واللوتين (المزاح د بركان، البصلة الخضارية، التوت الأزرق، الجزر).',
          fr: 'Quercétine, bêta-carotène et lutéine (Nèfle de Berkane, Oignon nouveau, Myrtille, Carotte).',
          en: 'Quercetin, beta-carotene, and lutein (Berkane Loquat, Spring Onion, Blueberry, Carrot).',
        },
      },
    ],
    fourWeeksOfMonth: [
      {
        week: 1,
        focus: { ar: 'الأسبوع 1: تصريف الكبد بالقوق والخرشوف', fr: 'Sem. 1 : Drainage Hépatique', en: 'Week 1: Hepatic Drainage' },
        protocol: { ar: 'قلب القوق المسلوق أو في الطاجين + شاي أوراق القوق.', fr: 'Cœurs d’artichauts vapeur ou en tagine.', en: 'Steamed or tagine artichoke hearts.' },
      },
      {
        week: 2,
        focus: { ar: 'الأسبوع 2: تنشيط الدماغ والدوبامين بالفول والجلبانة', fr: 'Sem. 2 : Dopamine & Fèves Fraîches', en: 'Week 2: Dopamine & Fresh Fava' },
        protocol: { ar: 'الفول الأخضر المنكوب بالكمون وزيت العود + الجلبانة الطرية.', fr: 'Fèves fraîches au cumin et huile d’olive + petits pois.', en: 'Fresh fava beans with cumin and olive oil + green peas.' },
      },
      {
        week: 3,
        focus: { ar: 'الأسبوع 3: تهدئة حساسية الربيع وتصفية الكلي', fr: 'Sem. 3 : Anti-Histaminique Naturel', en: 'Week 3: Natural Anti-Histamine' },
        protocol: { ar: 'السكوم (الهليون البلدي) + البصلة الخضارية والفراولة.', fr: 'Asperges sauvages (Sekkoum) + oignons nouveaux et fraises.', en: 'Wild asparagus (Sekkoum) + spring onions and strawberries.' },
      },
      {
        week: 4,
        focus: { ar: 'الأسبوع 4: حماية قرنية العين والبشرة (بكور المزاح)', fr: 'Sem. 4 : Vision & Nèfles de Zegzel', en: 'Week 4: Vision & Zegzel Loquats' },
        protocol: { ar: 'المزاح د بركان + الجزر الطري والتوت الأزرق.', fr: 'Nèfles de Berkane + carottes nouvelles et myrtilles.', en: 'Berkane loquats + young carrots and blueberries.' },
      },
    ],
  },
  4: {
    month: 4,
    season: 'spring',
    moroccanSolarName: {
      ar: 'أبريل — نيسان الربيعي وتقطير الزهر',
      fr: 'Avril — Pluies de Nissan & Eau de Fleur d’Oranger',
      en: 'April — Spring Nissan & Orange Blossom',
    },
    climateAndBodySummary: {
      ar: 'ذروة اخضرار الأرض وتفتح الزهر؛ يحتاج الجهاز العصبي والمعدة والأمعاء لتجديد البطانة المخاطية وتخفيف التوتر.',
      fr: 'Plein printemps ; le système nerveux et la muqueuse digestive se régénèrent.',
      en: 'Peak spring; the nervous system and digestive mucosa regenerate.',
    },
    primaryWeakOrgans: [
      {
        organKey: 'digestion',
        name: { ar: 'المعدة والقولون', fr: 'Estomac & Côlon', en: 'Stomach & Colon' },
        whyStressed: {
          ar: 'تغير النظام الغذائي من أكل الشتاء الثقيل إلى الخضروات النيئة قد يسبب انتفاخاً إن لم يتم تدريجياً.',
          fr: 'La transition vers les crudités sollicite l’estomac et le microbiote.',
          en: 'Transitioning to raw spring produce challenges the stomach and microbiome.',
        },
        neededNutrients: {
          ar: 'البكتين، الألياف الذائبة، والكلوروفيل (المزاح، القرعة الخضراء، اللوبيا الخضراء، الخص).',
          fr: 'Pectine, fibres douces et chlorophylle (Nèfle, Courgette, Haricot vert, Laitue).',
          en: 'Pectin, soluble fiber, and chlorophyll (Loquat, Courgette, Green Bean, Lettuce).',
        },
      },
      {
        organKey: 'brain',
        name: { ar: 'الجهاز العصبي وجودة النوم', fr: 'Système Nerveux & Sommeil', en: 'Nervous System & Sleep' },
        whyStressed: {
          ar: 'طول النهار وتغير الساعة البيولوجية الربيعية يسببان الأرق والتوتر.',
          fr: 'L’allongement des jours modifie le rythme circadien et le sommeil.',
          en: 'Longer daylight hours shift circadian rhythms and sleep.',
        },
        neededNutrients: {
          ar: 'المغنيسيوم، الليفودوبا، والتربتوفان (الفول الطري، اللويزة، النعناع، الأفوكادو).',
          fr: 'Magnésium, L-Dopa et tryptophane (Fèves, Verveine, Menthe, Avocat).',
          en: 'Magnesium, L-Dopa, and tryptophan (Fava beans, Verbena, Mint, Avocado).',
        },
      },
    ],
    fourWeeksOfMonth: [
      {
        week: 1,
        focus: { ar: 'الأسبوع 1: تلطيف جدار المعدة بالبكتين', fr: 'Sem. 1 : Douceur Gastrique', en: 'Week 1: Gastric Soothing' },
        protocol: { ar: 'المزاح د بركان + القرعة الخضراء واللوبيا الخضراء على البخار.', fr: 'Nèfles de Berkane + courgettes et haricots verts vapeur.', en: 'Berkane loquats + steamed zucchini and green beans.' },
      },
      {
        week: 2,
        focus: { ar: 'الأسبوع 2: شحن الأنثوسيانين للأوعية والدماغ', fr: 'Sem. 2 : Baies & Microcirculation', en: 'Week 2: Berries & Microcirculation' },
        protocol: { ar: 'التوت الأزرق (الميرتي) والفرامبواز والفريز.', fr: 'Myrtilles, framboises et fraises du Gharb.', en: 'Blueberries, raspberries, and Gharb strawberries.' },
      },
      {
        week: 3,
        focus: { ar: 'الأسبوع 3: تنظيف الكبد والعيون بالترفل والجرجير', fr: 'Sem. 3 : Terfess & Roquette', en: 'Week 3: Desert Truffle & Arugula' },
        protocol: { ar: 'الترفاس البلدي + سلطة الجرجير والفجل والخص.', fr: 'Terfess de l’Oriental + salade de roquette, radis et laitue.', en: 'Oriental desert truffle + arugula, radish, and lettuce salad.' },
      },
      {
        week: 4,
        focus: { ar: 'الأسبوع 4: توازن الأعصاب والنوم العميق', fr: 'Sem. 4 : Calme Nerveux', en: 'Week 4: Nervous System Calm' },
        protocol: { ar: 'أفوكادو الغرب + نقيع اللويزة وماء الزهر الطبيعي.', fr: 'Avocat du Gharb + infusion de verveine et eau de fleur d’oranger.', en: 'Gharb avocado + verbena and orange blossom infusion.' },
      },
    ],
  },
  5: {
    month: 5,
    season: 'spring',
    moroccanSolarName: {
      ar: 'ماي — نضج حب الملوك والمشماش وبداية الحصاد',
      fr: 'Mai — Cerises d’Ifrane, Abricots & Moissons',
      en: 'May — Atlas Cherries, Apricots & Early Harvest',
    },
    climateAndBodySummary: {
      ar: 'يرتفع الإشعاع الشمسي وتبدأ الحرارة بالصعود؛ تحتاج البشرة والعيون والقلب للكاروتينات والبوتاسيوم.',
      fr: 'Montée de l’indice UV et des températures ; la peau, les yeux et le cœur réclament des caroténoïdes.',
      en: 'Rising UV index and temperatures; skin, eyes, and heart need carotenoids and potassium.',
    },
    primaryWeakOrgans: [
      {
        organKey: 'eyes_skin',
        name: { ar: 'البشرة وشبكية العين', fr: 'Peau & Rétine (Protection UV)', en: 'Skin & Retina (UV Shield)' },
        whyStressed: {
          ar: 'أشعة شمس ماي القوية تزيد الجذور الحرة في الجلد والعيون.',
          fr: 'Le soleil de mai augmente le stress oxydatif cutané et rétinien.',
          en: 'Strong May sun increases cutaneous and retinal oxidative stress.',
        },
        neededNutrients: {
          ar: 'البيتا-كاروتين، الليكوبين، والميلاتونين الطبيعي (المشماش، حب الملوك، الخوخ، ماطيشة).',
          fr: 'Bêta-carotène, lycopène et mélatonine (Abricot, Cerise, Pêche, Tomate).',
          en: 'Beta-carotene, lycopene, and melatonin (Apricot, Cherry, Peach, Tomato).',
        },
      },
      {
        organKey: 'bones',
        name: { ar: 'المفاصل وتصريف حمض اليوريك', fr: 'Articulations & Acide Urique', en: 'Joints & Uric Acid Clearance' },
        whyStressed: {
          ar: 'بداية التعرق ترفع تركيز حمض اليوريك في الدم والمفاصل.',
          fr: 'Les premières chaleurs concentrent l’acide urique.',
          en: 'Early heat concentrates uric acid in blood and joints.',
        },
        neededNutrients: {
          ar: 'أنثوسيانين حب الملوك (الكرز) والبوتاسيوم (الخيار، الفقوس، الكرعة السلاوية).',
          fr: 'Anthocyanes de la cerise et potassium (Cerise de Sefrou, Feggous, Calebasse).',
          en: 'Cherry anthocyanins and potassium (Sefrou Cherry, Armenian Cucumber, Bottle Gourd).',
        },
      },
    ],
    fourWeeksOfMonth: [
      {
        week: 1,
        focus: { ar: 'الأسبوع 1: شحن البيتا-كاروتين الواقي للشمس', fr: 'Sem. 1 : Bouclier Solaire Bêta-Carotène', en: 'Week 1: Beta-Carotene Sun Shield' },
        protocol: { ar: 'المشماش البلدي + الجزر وماطيشة شتوكة بزيت العود.', fr: 'Abricots frais + carottes et tomates de Chtouka à l’huile d’olive.', en: 'Fresh apricots + carrots and Chtouka tomatoes with olive oil.' },
      },
      {
        week: 2,
        focus: { ar: 'الأسبوع 2: غسل حمض اليوريك بحب الملوك (الكرز)', fr: 'Sem. 2 : Cure de Cerises de Sefrou', en: 'Week 2: Sefrou Cherry Uric Acid Flush' },
        protocol: { ar: 'حفنة حب الملوك (صفرو/إفران) + الفقوس والخيار.', fr: 'Une poignée de cerises de Sefrou + feggous croquant.', en: 'A handful of Sefrou cherries + crisp feggous.' },
      },
      {
        week: 3,
        focus: { ar: 'الأسبوع 3: ترطيب الخلايا بالخوخ والشهدية', fr: 'Sem. 3 : Hydratation Pêche & Nectarine', en: 'Week 3: Peach & Nectarine Cellular Hydration' },
        protocol: { ar: 'الخوخ والشهدية + سلطة الفلفلة المشوية والدنجال (زعلوك).', fr: 'Pêches et nectarines + salade de poivrons et aubergines (Zaalouk).', en: 'Peaches and nectarines + roasted pepper and eggplant Zaalouk.' },
      },
      {
        week: 4,
        focus: { ar: 'الأسبوع 4: تهيئة القلب والأوعية لدخول الصيف', fr: 'Sem. 4 : Préparation Cardiovasculaire', en: 'Week 4: Summer Cardiovascular Prep' },
        protocol: { ar: 'السويهلة المبكرة + الكرعة السلاوية والملوخية.', fr: 'Melon Souihla précoce + courge Slaouia et gombo.', en: 'Early Souihla melon + bottle gourd and okra.' },
      },
    ],
  },
  6: {
    month: 6,
    season: 'summer',
    moroccanSolarName: {
      ar: 'يونيو — الانقلاب الصيفي والعنصرة (نضج الباكور والدلاح)',
      fr: 'Juin — Solstice d’Été, Ansra & Figues Fleur (Bakor)',
      en: 'June — Summer Solstice, Ansra & Early Figs',
    },
    climateAndBodySummary: {
      ar: 'أطول نهار في السنة وبداية الحر الحقيقي؛ يحتاج القلب والأوعية والمعدة لتبريد فوري وتعويض الماء والإلكتروليتات.',
      fr: 'Jours les plus longs et début des fortes chaleurs ; le cœur et l’estomac demandent hydratation et électrolytes.',
      en: 'Longest days and rising heat; heart and stomach demand hydration and electrolytes.',
    },
    primaryWeakOrgans: [
      {
        organKey: 'heart',
        name: { ar: 'القلب والشرايين وضغط الدم', fr: 'Cœur, Artères & Tension', en: 'Heart, Arteries & Blood Pressure' },
        whyStressed: {
          ar: 'توسع الأوعية بالحرارة والتعرق يرهقان عضلة القلب.',
          fr: 'La vasodilatation thermique et la sueur sollicitent le myocarde.',
          en: 'Thermal vasodilation and sweating increase myocardial workload.',
        },
        neededNutrients: {
          ar: 'السيترولين، الليكوبين، والبوتاسيوم (الدلاح، السويهلة، ماطيشة، الفقوس).',
          fr: 'Citrulline, lycopène et potassium (Pastèque, Melon, Tomate, Feggous).',
          en: 'Citrulline, lycopene, and potassium (Watermelon, Melon, Tomato, Feggous).',
        },
      },
      {
        organKey: 'digestion',
        name: { ar: 'القولون والأمعاء (حركة الأمعاء الصيفية)', fr: 'Côlon & Transit Estival', en: 'Colon & Summer Transit' },
        whyStressed: {
          ar: 'نقص الماء في الجسم يسبب جفاف القولون والإمساك الصيفي.',
          fr: 'La déshydratation ralentit le transit intestinal.',
          en: 'Dehydration slows intestinal transit.',
        },
        neededNutrients: {
          ar: 'أنزيم الفيسين والهلام النباتي (الكرموس الباكور، الملوخية، البرقوق).',
          fr: 'Enzyme ficine et mucilages (Figue Bakor, Gombo/Mloukhia, Prune).',
          en: 'Ficin enzyme and plant mucilage (Bakor Fig, Okra, Plum).',
        },
      },
    ],
    fourWeeksOfMonth: [
      {
        week: 1,
        focus: { ar: 'الأسبوع 1: توسيع الشرايين بسيترولين الدلاح', fr: 'Sem. 1 : Citrulline & Pastèque', en: 'Week 1: Watermelon Citrulline' },
        protocol: { ar: 'شريحة دلاح زاكورة/الغرب بين الوجبات + سلطة الفقوس.', fr: 'Tranche de pastèque entre les repas + salade de feggous.', en: 'Watermelon slice between meals + feggous salad.' },
      },
      {
        week: 2,
        focus: { ar: 'الأسبوع 2: تنشيط الهضم بأنزيمات الكرموس الباكور', fr: 'Sem. 2 : Figues Bakor & Transit', en: 'Week 2: Bakor Figs & Transit' },
        protocol: { ar: '3 حبات كرموس باكور صباحاً + طاجين الملوخية.', fr: '3 figues Bakor le matin + tagine de gombo (Mloukhia).', en: '3 Bakor figs in the morning + okra tagine.' },
      },
      {
        week: 3,
        focus: { ar: 'الأسبوع 3: تعويض البوتاسيوم بالسويهلة والبتيخ', fr: 'Sem. 3 : Potassium & Melon Souihla', en: 'Week 3: Potassium & Souihla Melon' },
        protocol: { ar: 'السويهلة والبتيخ + زعلوك الدنجال والفلفلة المشوية.', fr: 'Melon Souihla et cantaloup + Zaalouk d’aubergine.', en: 'Souihla and cantaloupe melon + eggplant Zaalouk.' },
      },
      {
        week: 4,
        focus: { ar: 'الأسبوع 4: تطهير الأمعاء بالكبار والرجلة', fr: 'Sem. 4 : Câpres de Safi & Pourpier', en: 'Week 4: Safi Capers & Purslane' },
        protocol: { ar: 'الرجلة المشرملة بزيت العود والكبار المسفيوي.', fr: 'Pourpier (Rejla) aux câpres de Safi et huile d’olive.', en: 'Purslane (Rejla) with Safi capers and olive oil.' },
      },
    ],
  },
  7: {
    month: 7,
    season: 'summer',
    moroccanSolarName: {
      ar: 'يوليوز — دخول الصمايم ورياح الشرگي',
      fr: 'Juillet — Entrée des Smayem & Chaleur Chergui',
      en: 'July — Peak Smayem Heat & Chergui Winds',
    },
    climateAndBodySummary: {
      ar: 'موجات الحر الشديد (الصمايم) تزيد فقدان الصوديوم والمغنيسيوم والبوتاسيوم عبر العرق وترهق الكليتين والقلب.',
      fr: 'Canicule des Smayem ; perte accrue d’électrolytes par la sueur, sollicitation rénale et cardiaque.',
      en: 'Smayem heatwaves; heavy electrolyte loss via sweat stresses kidneys and heart.',
    },
    primaryWeakOrgans: [
      {
        organKey: 'heart',
        name: { ar: 'القلب وتوازن الأملاح (الإلكتروليتات)', fr: 'Cœur & Équilibre Électrolytique', en: 'Heart & Electrolyte Balance' },
        whyStressed: {
          ar: 'فقدان البوتاسيوم والمغنيسيوم يسبب الخفقان والعياء الحراري.',
          fr: 'La perte de potassium et magnésium provoque fatigue thermique et palpitations.',
          en: 'Loss of potassium and magnesium causes heat fatigue and palpitations.',
        },
        neededNutrients: {
          ar: 'المغنيسيوم، البوتاسيوم، والأوميغا-3 النباتي (الهندية، الرجلة، الدلاح، السويهلة).',
          fr: 'Magnésium, potassium et oméga-3 végétal (Figue de barbarie, Pourpier, Pastèque).',
          en: 'Magnesium, potassium, and plant omega-3 (Prickly Pear, Purslane, Watermelon).',
        },
      },
      {
        organKey: 'blood_sugar',
        name: { ar: 'المعدة والبنكرياس', fr: 'Estomac & Pancréas', en: 'Stomach & Pancreas' },
        whyStressed: {
          ar: 'الإفراط في المشروبات الباردة والسكريات الصيفية يربك الأنسولين والهضم.',
          fr: 'Les boissons glacées et sucrées perturbent l’insuline et l’estomac.',
          en: 'Iced sugary drinks disrupt insulin and gastric digestion.',
        },
        neededNutrients: {
          ar: 'هلام الصبار (الهندية) والفقوس والكرعة السلاوية.',
          fr: 'Mucilage de figue de barbarie, feggous et calebasse.',
          en: 'Prickly pear mucilage, feggous, and bottle gourd.',
        },
      },
    ],
    fourWeeksOfMonth: [
      {
        week: 1,
        focus: { ar: 'الأسبوع 1: تبريد الكبد والمعدة بالفقوس وماطيشة', fr: 'Sem. 1 : Fraîcheur Feggous & Tomate', en: 'Week 1: Feggous & Tomato Cooling' },
        protocol: { ar: 'سلطة مغربية (ماطيشة، فقوس، بصلة، فلفلة) بزيت العود.', fr: 'Salade marocaine (tomate, feggous, oignon, poivron).', en: 'Moroccan salad (tomato, feggous, onion, pepper).' },
      },
      {
        week: 2,
        focus: { ar: 'الأسبوع 2: شحن المغنيسيوم بالهندية (الصبار)', fr: 'Sem. 2 : Magnésium & الهندية (Sabra)', en: 'Week 2: Prickly Pear Magnesium' },
        protocol: { ar: '3 إلى 4 حبات هندية باردة عصراً لتعويض الأملاح وتبريد المعدة.', fr: '3 à 4 figues de barbarie fraîches l’après-midi.', en: '3 to 4 chilled prickly pears in the afternoon.' },
      },
      {
        week: 3,
        focus: { ar: 'الأسبوع 3: حماية الدماغ والقلب بالرجلة (الأوميغا-3)', fr: 'Sem. 3 : Oméga-3 & Pourpier', en: 'Week 3: Purslane Omega-3' },
        protocol: { ar: 'طبق الرجلة بالثوم والحامض المصير مرتين في الأسبوع.', fr: 'Plat de Rejla à l’ail et citron confit deux fois par semaine.', en: 'Rejla (purslane) with garlic and preserved lemon twice a week.' },
      },
      {
        week: 4,
        focus: { ar: 'الأسبوع 4: تهدئة الأعصاب وترطيب الأنسجة', fr: 'Sem. 4 : Calme Thermique & Slaouia', en: 'Week 4: Thermal Calm & Bottle Gourd' },
        protocol: { ar: 'طاجين الكرعة السلاوية + عصير الحامض البلدي والنعناع.', fr: 'Tagine de courge Slaouia + citronnade beldi à la menthe.', en: 'Slaouia bottle gourd tagine + beldi mint lemonade.' },
      },
    ],
  },
  8: {
    month: 8,
    season: 'summer',
    moroccanSolarName: {
      ar: 'غشت — خروج الصمايم وموسم الهندية والعنب والكرموس',
      fr: 'Août — Fin des Smayem, Figues, Raisins & Figue de Barbarie',
      en: 'August — Late Smayem, Figs, Grapes & Prickly Pear',
    },
    climateAndBodySummary: {
      ar: 'في غشت يبلغ إجهاد الشمس ذروته وتبدأ رطوبة أواخر الصيف؛ يحتاج الجسم لترميم الكولاجين وشحن الطاقة الخلوية.',
      fr: 'En août, le cumul d’exposition solaire culmine ; besoin de resvératrol et de régénération cellulaire.',
      en: 'In August, cumulative sun exposure peaks; cells need resveratrol and collagen repair.',
    },
    primaryWeakOrgans: [
      {
        organKey: 'eyes_skin',
        name: { ar: 'البشرة والأوعية الشعرية', fr: 'Peau & Micro-vaisseaux', en: 'Skin & Capillaries' },
        whyStressed: {
          ar: 'شمس الصيف الطويلة تتلف ألياف الكولاجين والإيلاستين.',
          fr: 'Le soleil prolongé dégrade le collagène et l’élastine.',
          en: 'Prolonged summer sun degrades collagen and elastin.',
        },
        neededNutrients: {
          ar: 'الريسفيراترول، البيتالين، والفيتامين C (العنب الدكالي، الهندية، الفلفلة الحمراء).',
          fr: 'Resvératrol, bétalaïnes et vitamine C (Raisin Doukkali, Figue de barbarie, Poivron rouge).',
          en: 'Resveratrol, betalains, and Vitamin C (Doukkali Grape, Prickly Pear, Red Bell Pepper).',
        },
      },
      {
        organKey: 'bones',
        name: { ar: 'العظام والقولون', fr: 'Os & Côlon', en: 'Bones & Colon' },
        whyStressed: {
          ar: 'فقدان المعادن عبر تعرق الصيف يحتاج تعويضاً بالكالسيوم والمنغنيز.',
          fr: 'La perte minérale estivale demande du calcium et du manganèse.',
          en: 'Summer mineral loss requires calcium and manganese replenishment.',
        },
        neededNutrients: {
          ar: 'كالسيوم الكرموس التاوناتي والبرقوق واللوز.',
          fr: 'Calcium de la figue de Taounate, prune et amande.',
          en: 'Calcium from Taounate figs, plums, and almonds.',
        },
      },
    ],
    fourWeeksOfMonth: [
      {
        week: 1,
        focus: { ar: 'الأسبوع 1: حماية الشرايين والبشرة بريسفيراترول العنب', fr: 'Sem. 1 : Resvératrol du Raisin', en: 'Week 1: Grape Resveratrol' },
        protocol: { ar: 'عنقود عنب دكالي/مكناسي ببذوره + الهندية.', fr: 'Raisin frais avec pépins + figue de barbarie.', en: 'Fresh seeded grapes + prickly pear.' },
      },
      {
        week: 2,
        focus: { ar: 'الأسبوع 2: شحن الكالسيوم بالكرموس التاوناتي', fr: 'Sem. 2 : Calcium & Figues de Taounate', en: 'Week 2: Taounate Fig Calcium' },
        protocol: { ar: 'الكرموس الطري + حفنة لوز بلدي وكركاع.', fr: 'Figues fraîches de Taounate + amandes et noix.', en: 'Fresh Taounate figs + almonds and walnuts.' },
      },
      {
        week: 3,
        focus: { ar: 'الأسبوع 3: تنظيف القولون بالبرقوق والملوخية', fr: 'Sem. 3 : Prunes de Chefchaouen & Gombo', en: 'Week 3: Chefchaouen Plums & Okra' },
        protocol: { ar: 'البرقوق الطري + طاجين الملوخية والكرعة الحمراء.', fr: 'Prunes fraîches + tagine de gombo et courge.', en: 'Fresh plums + okra and pumpkin tagine.' },
      },
      {
        week: 4,
        focus: { ar: 'الأسبوع 4: تجديد طاقة الكبد قبل دخول الخريف', fr: 'Sem. 4 : Transition vers l’Automne', en: 'Week 4: Pre-Autumn Liver Reset' },
        protocol: { ar: 'الذرة المشوية (الكبال) + عصير الحامض البلدي والتفاح المبكر.', fr: 'Maïs doux grillé + citron beldi et premières pommes de Midelt.', en: 'Grilled sweet corn + beldi lemon and early Midelt apples.' },
      },
    ],
  },
  9: {
    month: 9,
    season: 'autumn',
    moroccanSolarName: {
      ar: 'شتنبر — الاعتدال الخريفي وجني تفاح ميدلت وتمر تافيلالت',
      fr: 'Septembre — Équinoxe d’Automne, Pommes de Midelt & Dattes',
      en: 'September — Autumn Equinox, Midelt Apples & Dates',
    },
    climateAndBodySummary: {
      ar: 'ينكسر حر الصيف وتبدأ البرودة الليلية؛ يحتاج القولون والرئتان والدماغ لترميم الأغشية بعد جفاف الصيف.',
      fr: 'Fin des grandes chaleurs et nuits fraîches ; les poumons, le côlon et le cerveau récupèrent de l’été.',
      en: 'Summer heat breaks and nights cool; lungs, colon, and brain recover from summer dryness.',
    },
    primaryWeakOrgans: [
      {
        organKey: 'digestion',
        name: { ar: 'المعدة والقولون', fr: 'Estomac & Côlon', en: 'Stomach & Colon' },
        whyStressed: {
          ar: 'جفاف الخريف يقلل رطوبة الأمعاء ويهيج المعدة.',
          fr: 'La sécheresse automnale fragilise la muqueuse digestive.',
          en: 'Autumn dryness challenges the digestive mucosa.',
        },
        neededNutrients: {
          ar: 'البكتين والتانينات القابضة (التفاح الميدلتي، السفرجل، الرمان المبكر).',
          fr: 'Pectine et tanins (Pomme de Midelt, Coing, Grenade précoce).',
          en: 'Pectin and tannins (Midelt Apple, Quince, Early Pomegranate).',
        },
      },
      {
        organKey: 'brain',
        name: { ar: 'الدماغ والتركيز (الدخول المدرسي والمهني)', fr: 'Cerveau & Concentration', en: 'Brain & Focus' },
        whyStressed: {
          ar: 'عودة النشاط الذهني المكثف في شتنبر تتطلب وقوداً عصبياً ومعادن.',
          fr: 'La rentrée demande un apport accru en glucose lent, magnésium et oméga-3.',
          en: 'Autumn mental workload requires slow glucose, magnesium, and omega-3.',
        },
        neededNutrients: {
          ar: 'التمر المجهول، الكركاع (الجوز)، اللوز، والزبيب.',
          fr: 'Datte Mejhoul, Noix de l’Atlas, Amande et Raisin sec.',
          en: 'Mejhoul Date, Atlas Walnut, Almond, and Raisin.',
        },
      },
    ],
    fourWeeksOfMonth: [
      {
        week: 1,
        focus: { ar: 'الأسبوع 1: تهدئة القولون ببكتين تفاح ميدلت والإجاص', fr: 'Sem. 1 : Pectine de Pomme & Poire', en: 'Week 1: Apple & Pear Pectin' },
        protocol: { ar: 'تفاحة ميدلتية بقشرتها + إجاص (بوعويد) يومياً.', fr: 'Pomme de Midelt avec la peau + poire chaque jour.', en: 'Unpeeled Midelt apple + pear daily.' },
      },
      {
        week: 2,
        focus: { ar: 'الأسبوع 2: شحن الطاقة الذهنية بتمر تافيلالت والكركاع', fr: 'Sem. 2 : Énergie Cérébrale Datte & Noix', en: 'Week 2: Date & Walnut Brain Fuel' },
        protocol: { ar: '3 تمرات مجهول محشوة بالكركاع واللوز صباحاً.', fr: '3 dattes Mejhoul farcies aux noix et amandes le matin.', en: '3 Mejhoul dates stuffed with walnuts and almonds in the morning.' },
      },
      {
        week: 3,
        focus: { ar: 'الأسبوع 3: تبطين المعدة بالسفرجل والكرعة الحمراء', fr: 'Sem. 3 : Coing & Courge Musquée', en: 'Week 3: Quince & Butternut Squash' },
        protocol: { ar: 'طاجين السفرجل المعسل + شوربة الكرعة الحمراء.', fr: 'Tagine aux coings + velouté de courge rouge.', en: 'Caramelized quince tagine + red pumpkin soup.' },
      },
      {
        week: 4,
        focus: { ar: 'الأسبوع 4: تنظيف الشرايين ببواكير الرمان السفري', fr: 'Sem. 4 : Premières Grenades Sefri', en: 'Week 4: Early Sefri Pomegranates' },
        protocol: { ar: 'صحن رمان سفري بشحمته البيضاء الداخلية.', fr: 'Bol de grenade Sefri avec sa membrane blanche.', en: 'Bowl of Sefri pomegranate with its inner white pith.' },
      },
    ],
  },
  10: {
    month: 10,
    season: 'autumn',
    moroccanSolarName: {
      ar: 'أكتوبر — ذروة الرمان السفري، جني زعفران تاليوين والأفوكادو',
      fr: 'Octobre — Pleine Saison des Grenades, Safran de Taliouine & Avocat',
      en: 'October — Peak Pomegranates, Taliouine Saffron & Avocado',
    },
    climateAndBodySummary: {
      ar: 'شهر الذهب الأحمر (الزعفران) والياقوت (الرمان)؛ يحتاج القلب والجهاز العصبي والمعدة لحماية عميقة قبل برد الشتاء.',
      fr: 'Mois de l’or rouge (safran) et de la grenade ; protection cardiaque, nerveuse et gastrique.',
      en: 'Month of red gold (saffron) and pomegranate; cardiac, nervous, and gastric fortification.',
    },
    primaryWeakOrgans: [
      {
        organKey: 'heart',
        name: { ar: 'القلب والشرايين التاجية', fr: 'Cœur & Artères Coronaires', en: 'Heart & Coronary Arteries' },
        whyStressed: {
          ar: 'بداية برودة الجو تزيد مقاومة الأوعية الدموية وتأكسد الكولسترول.',
          fr: 'Le refroidissement augmente la résistance vasculaire.',
          en: 'Cooling weather increases vascular resistance.',
        },
        neededNutrients: {
          ar: 'البونيكالاجين وحمض الأولييك (الرمان السفري، الأفوكادو، زيت الزيتون البكر).',
          fr: 'Punicalagine et acide oléique (Grenade Sefri, Avocat, Huile d’olive nouvelle).',
          en: 'Punicalagin and oleic acid (Sefri Pomegranate, Avocado, New Olive Oil).',
        },
      },
      {
        organKey: 'brain',
        name: { ar: 'الأعصاب والمزاج وشبكية العين', fr: 'Nerfs, Humeur & Rétine', en: 'Nerves, Mood & Retina' },
        whyStressed: {
          ar: 'نقص ساعات النهار في الخريف يخفض السيروتونين ويجهد البصر.',
          fr: 'La baisse de luminosité automnale diminue la sérotonine.',
          en: 'Shorter autumn daylight lowers serotonin.',
        },
        neededNutrients: {
          ar: 'الكروسين والسفرنال (زعفران تاليوين الحر، البطاطا الحلوة، الكاكي).',
          fr: 'Crocine et safranal (Safran AOP de Taliouine, Patate douce, Kaki).',
          en: 'Crocin and safranal (Taliouine AOP Saffron, Sweet Potato, Persimmon).',
        },
      },
    ],
    fourWeeksOfMonth: [
      {
        week: 1,
        focus: { ar: 'الأسبوع 1: علاج قرحة المعدة والشرايين بالرمان السفري', fr: 'Sem. 1 : Cure de Grenade Sefri', en: 'Week 1: Sefri Pomegranate Cure' },
        protocol: { ar: 'رمانة سفري يومياً مع لبها الأبيض المر.', fr: 'Une grenade Sefri par jour avec son mésocarpe blanc.', en: 'One Sefri pomegranate daily with its white pith.' },
      },
      {
        week: 2,
        focus: { ar: 'الأسبوع 2: رفع السيروتونين وحماية الشبكية بزعفران تاليوين', fr: 'Sem. 2 : Safran de Taliouine & Humeur', en: 'Week 2: Taliouine Saffron & Mood' },
        protocol: { ar: '3 شعيرات زعفران تاليوين في كأس ماء دافئ أو أتاي مساءً.', fr: '3 pistils de safran de Taliouine en infusion le soir.', en: '3 strands of Taliouine saffron infused in warm water at night.' },
      },
      {
        week: 3,
        focus: { ar: 'الأسبوع 3: تغذية الدماغ والمفاصل بالأفوكادو والبطاطا الحلوة', fr: 'Sem. 3 : Avocat du Gharb & Patate Douce', en: 'Week 3: Gharb Avocado & Sweet Potato' },
        protocol: { ar: 'نصف حبة أفوكادو + بطاطا حلوة مشوية في الفرن.', fr: 'Demi-avocat du Gharb + patate douce rôtie au four.', en: 'Half a Gharb avocado + oven-roasted sweet potato.' },
      },
      {
        week: 4,
        focus: { ar: 'الأسبوع 4: تقوية الرئة بالكاكي والسفرجل والجوافة', fr: 'Sem. 4 : Kaki, Coing & Goyave', en: 'Week 4: Persimmon, Quince & Guava' },
        protocol: { ar: 'فاكهة الكاكي والجوافة + طاجين السفرجل.', fr: 'Kaki et goyave riches en vitamine C + tagine de coings.', en: 'Vitamin-C rich persimmon and guava + quince tagine.' },
      },
    ],
  },
  11: {
    month: 11,
    season: 'autumn',
    moroccanSolarName: {
      ar: 'نونبر — موسم الحرث، عصر الزيتون الجديد وبواكير الحوامض',
      fr: 'Novembre — Labours, Huile d’Olive Nouvelle & Premiers Agrumes',
      en: 'November — Olive Pressing & Early Citrus Harvest',
    },
    climateAndBodySummary: {
      ar: 'تبدأ الأمطار والبرد الرطب؛ يحتاج الجهاز المناعي والمفاصل والقولون لتدريع مضاد للالتهاب قبل دخول الليالي.',
      fr: 'Arrivée des pluies et du froid humide ; l’immunité et les articulations doivent être préparées à l’hiver.',
      en: 'First rains and damp cold arrive; immunity and joints need anti-inflammatory shielding before winter.',
    },
    primaryWeakOrgans: [
      {
        organKey: 'immunity',
        name: { ar: 'الجهاز المناعي والغدد اللمفاوية', fr: 'Système Immunitaire & Lymphatique', en: 'Immune & Lymphatic System' },
        whyStressed: {
          ar: 'التغير المفاجئ في الحرارة والرطوبة ينشط الفيروسات التنفسية.',
          fr: 'Les chutes brusques de température favorisent les infections.',
          en: 'Sudden temperature drops trigger respiratory infections.',
        },
        neededNutrients: {
          ar: 'فيتامين C، الأوليوكانثال، والزنك (كليمونتين بركان، الكيوي، الثوم، سكنجبير طري).',
          fr: 'Vitamine C, oléocanthal et gingérol (Clémentine, Kiwi, Ail, Gingembre frais).',
          en: 'Vitamin C, oleocanthal, and gingerol (Clementine, Kiwi, Garlic, Fresh Ginger).',
        },
      },
      {
        organKey: 'digestion',
        name: { ar: 'الأمعاء والميكروبيوم', fr: 'Intestin & Microbiote', en: 'Gut & Microbiome' },
        whyStressed: {
          ar: 'قلة الحركة في الجو البارد تبطئ الهضم.',
          fr: 'Le froid ralentit le péristaltisme intestinal.',
          en: 'Cold weather slows intestinal peristalsis.',
        },
        neededNutrients: {
          ar: 'ألياف الجذور والقطاني (البطاطا القصبية، اللفت، العدس، الحمص، البسباس).',
          fr: 'Fibres prébiotiques et légumineuses (Topinambour, Navet, Lentilles, Pois chiches, Fenouil).',
          en: 'Prebiotic root fibers and legumes (Jerusalem Artichoke, Turnip, Lentils, Chickpeas, Fennel).',
        },
      },
    ],
    fourWeeksOfMonth: [
      {
        week: 1,
        focus: { ar: 'الأسبوع 1: شحن فيتامين C ببواكير كليمونتين بركان والكيوي', fr: 'Sem. 1 : Clémentines & Kiwi', en: 'Week 1: Clementines & Kiwi' },
        protocol: { ar: 'حبتا كليمونتين + حبة كيوي يومياً صباحاً.', fr: '2 clémentines de Berkane + 1 kiwi chaque matin.', en: '2 Berkane clementines + 1 kiwi every morning.' },
      },
      {
        week: 2,
        focus: { ar: 'الأسبوع 2: تدفئة الدورة الدموية بسكنجبير والخرقوم الطري', fr: 'Sem. 2 : Gingembre & Curcuma Frais', en: 'Week 2: Fresh Ginger & Turmeric' },
        protocol: { ar: 'مغلى سكنجبير طري والخرقوم عرق والحامض البلدي.', fr: 'Infusion de gingembre frais, curcuma racine et citron beldi.', en: 'Fresh ginger, turmeric root, and beldi lemon infusion.' },
      },
      {
        week: 3,
        focus: { ar: 'الأسبوع 3: تغذية الميكروبيوم بالبطاطا القصبية والقطاني', fr: 'Sem. 3 : Topinambour & Légumineuses', en: 'Week 3: Jerusalem Artichoke & Legumes' },
        protocol: { ar: 'البطاطا القصبية + شوربة العدس والحمص بالكمون والكرافس.', fr: 'Topinambour + soupe de lentilles et pois chiches au céleri.', en: 'Jerusalem artichoke + lentil and chickpea soup with celery.' },
      },
      {
        week: 4,
        focus: { ar: 'الأسبوع 4: حماية المفاصل بالكرنب (المكور) والشيفلور', fr: 'Sem. 4 : Crucifères & Articulations', en: 'Week 4: Crucifers & Joints' },
        protocol: { ar: 'المكور الأخضر والأحمر والشيفلور والبروكولي.', fr: 'Chou vert, chou rouge, chou-fleur et brocoli.', en: 'Green cabbage, red cabbage, cauliflower, and broccoli.' },
      },
    ],
  },
  12: {
    month: 12,
    season: 'winter',
    moroccanSolarName: {
      ar: 'دجنبر — دخول الليالي (25 دجنبر) والانقلاب الشتوي',
      fr: 'Décembre — Entrée des Lyali & Solstice d’Hiver',
      en: 'December — Entry of Winter Lyali & Winter Solstice',
    },
    climateAndBodySummary: {
      ar: 'أقصر نهار وأطول ليل في السنة؛ يحتاج الجسم لحماية الرئتين والقلب والكليتين من صدمة البرد الرطب.',
      fr: 'Nuits les plus longues et froid humide ; protection pulmonaire, cardiaque et rénale indispensable.',
      en: 'Longest nights and damp cold; pulmonary, cardiac, and renal protection is essential.',
    },
    primaryWeakOrgans: [
      {
        organKey: 'immunity',
        name: { ar: 'الرئتان والحنجرة والجيوب الأنفية', fr: 'Poumons, Gorge & Sinus', en: 'Lungs, Throat & Sinuses' },
        whyStressed: {
          ar: 'دخول الليالي يخفض حرارة الأغشية التنفسية ويرفع خطر النزلات الصدرية.',
          fr: 'L’entrée des Lyali refroidit les voies respiratoires.',
          en: 'Entry of Lyali cools respiratory airways.',
        },
        neededNutrients: {
          ar: 'فيتامين C، الأليسين، والثيمول (الحامض البلدي، البرتقال، البومبلموس، الثوم، الزعتر).',
          fr: 'Vitamine C, allicine et thymol (Citron Beldi, Orange, Pomelo, Ail, Thym).',
          en: 'Vitamin C, allicin, and thymol (Beldi Lemon, Orange, Grapefruit, Garlic, Thyme).',
        },
      },
      {
        organKey: 'liver',
        name: { ar: 'الكبد والأمعاء', fr: 'Foie & Intestin', en: 'Liver & Gut' },
        whyStressed: {
          ar: 'الأطباق الشتوية الدسمة تحتاج أليافاً ومركبات مرة لتسهيل هضم الدهون.',
          fr: 'Les plats hivernaux riches demandent des composés amers digestifs.',
          en: 'Rich winter meals require bitter digestive compounds and fiber.',
        },
        neededNutrients: {
          ar: 'الخرشوف البلدي، البسباس، اللفت المحفور، والباربا.',
          fr: 'Cardon (Khorchef), Fenouil, Navet et Betterave.',
          en: 'Cardoon (Khorchef), Fennel, Turnip, and Beetroot.',
        },
      },
    ],
    fourWeeksOfMonth: [
      {
        week: 1,
        focus: { ar: 'الأسبوع 1: درع الحوامض المغربية للرئتين', fr: 'Sem. 1 : Bouclier d’Agrumes', en: 'Week 1: Moroccan Citrus Shield' },
        protocol: { ar: 'البرتقال (نافال)، كليمونتين بركان، والبومبلموس.', fr: 'Orange Navel, clémentine de Berkane et pomelo.', en: 'Navel orange, Berkane clementine, and grapefruit.' },
      },
      {
        week: 2,
        focus: { ar: 'الأسبوع 2: تنقية الكبد بالخرشوف والبسباس', fr: 'Sem. 2 : Cardon & Fenouil', en: 'Week 2: Cardoon & Fennel Liver Cleanse' },
        protocol: { ar: 'طاجين الخرشوف بالحامض المصير + سلطة البسباس.', fr: 'Tagine de cardon au citron confit + salade de fenouil.', en: 'Cardoon tagine with preserved lemon + fennel salad.' },
      },
      {
        week: 3,
        focus: { ar: 'الأسبوع 3: تدفئة الكلي والمفاصل باللفت والبطاطا القصبية', fr: 'Sem. 3 : Navet & Topinambour', en: 'Week 3: Turnip & Jerusalem Artichoke Warmth' },
        protocol: { ar: 'كسكس سبع خضاري باللفت المحفور والكرعة الحمراء.', fr: 'Couscous aux sept légumes avec navet et courge.', en: 'Seven-vegetable couscous with turnip and red pumpkin.' },
      },
      {
        week: 4,
        focus: { ar: 'الأسبوع 4: استقبال الليالي بالثوم والبقولة والزعتر', fr: 'Sem. 4 : Entrée des Lyali', en: 'Week 4: Lyali Solstice Protection' },
        protocol: { ar: 'البقولة والسبانخ بالثوم وزيت الزيتون + شاي الزعتر وأزير.', fr: 'Bakkoula et épinards à l’ail et huile d’olive + infusion thym-romarin.', en: 'Bakkoula and spinach with garlic and olive oil + thyme-rosemary tea.' },
      },
    ],
  },
}
