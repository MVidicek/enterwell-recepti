import { db } from './index';
import { recipes } from './schema';
import { nanoid } from 'nanoid';
import type { Ingredient } from '@/types/recipe';

interface SeedRecipe {
  id: string;
  slug: string;
  title: string;
  lead: string;
  prepTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  cookingMethod: string;
  tags: string[];
  ingredients: Ingredient[];
  steps: string[];
  imageCdnPath: string;
  createdAt: Date;
  updatedAt: Date;
}

const seedRecipes: SeedRecipe[] = [
  {
    id: nanoid(),
    slug: 'kremasta-tjestenina-s-piletinom',
    title: 'Kremasta tjestenina s piletinom',
    lead: 'Brza i ukusna kremasta tjestenina s piletinom i povrćem. Savršena za obiteljski ručak ili večeru nakon napornog dana. Gotova za manje od 40 minuta.',
    prepTime: 35,
    servings: 4,
    difficulty: 'easy',
    category: 'Glavna jela',
    cookingMethod: 'Kuhanje',
    tags: ['tjestenina', 'piletina', 'brzi recepti', 'obitelj'],
    ingredients: [
      { name: 'Penne tjestenina', amount: 400, unit: 'g' },
      { name: 'Pileća prsa', amount: 500, unit: 'g' },
      { name: 'Vrhnje za kuhanje', amount: 200, unit: 'ml' },
      { name: 'Češnjak', amount: 3, unit: 'režnja' },
      { name: 'Parmezan', amount: 50, unit: 'g' },
      { name: 'Maslinovo ulje', amount: 2, unit: 'žlice' },
      { name: 'Sol', amount: 1, unit: 'žličica' },
      { name: 'Papar', amount: 0.5, unit: 'žličica' },
    ],
    steps: [
      'Stavite veliku lonac vode na kuhanje. Kad provri, dodajte sol i tjesteninu. Kuhajte prema uputama na pakiranju dok ne bude al dente.',
      'Dok se tjestenina kuha, pileća prsa narežite na kockice veličine oko 2 cm.',
      'U velikoj tavi zagrijte maslinovo ulje na srednje jakoj vatri. Dodajte piletinu i pržite 5-7 minuta dok ne porumeni sa svih strana.',
      'Češnjak sitno nasjeckajte i dodajte u tavu. Pržite još 1 minutu dok ne postane mirisan.',
      'Smanjite vatru na srednju i ulijte vrhnje za kuhanje. Miješajte i kuhajte 3-4 minute dok se umak malo ne zgusne.',
      'Ocijedite tjesteninu, ali sačuvajte šalicu vode od kuhanja.',
      'Dodajte tjesteninu u tavu s umakom. Pomiješajte da se sve dobro sjedini. Ako je pregusto, dodajte malo vode od tjestenine.',
      'Skinite s vatre, dodajte naribani parmezan i dobro promiješajte. Posolite i popaprite po ukusu.',
      'Poslužite odmah, uz dodatni parmezan za posipanje.',
    ],
    imageCdnPath: '/recipes/kremasta-tjestenina-s-piletinom/hero.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: nanoid(),
    slug: 'cokoladni-kolac-bez-brasna',
    title: 'Čokoladni kolač bez brašna',
    lead: 'Bogati i dekadentni čokoladni kolač bez brašna. Savršen za ljubitelje čokolade i one koji izbjegavaju gluten. Topi se u ustima.',
    prepTime: 45,
    servings: 8,
    difficulty: 'medium',
    category: 'Deserti',
    cookingMethod: 'Pečenje',
    tags: ['desert', 'čokolada', 'bez glutena', 'kolač'],
    ingredients: [
      { name: 'Tamna čokolada (70%)', amount: 200, unit: 'g' },
      { name: 'Maslac', amount: 150, unit: 'g' },
      { name: 'Šećer', amount: 150, unit: 'g' },
      { name: 'Jaja', amount: 4, unit: 'kom' },
      { name: 'Kakao prah', amount: 2, unit: 'žlice' },
      { name: 'Vanilija ekstrakt', amount: 1, unit: 'žličica' },
      { name: 'Sol', amount: 0.25, unit: 'žličica' },
    ],
    steps: [
      'Zagrijte pećnicu na 180°C. Obložite kalup za tortu (22 cm) papirom za pečenje i namažite maslacem.',
      'Čokoladu i maslac otopite na pari ili u mikrovalnoj (u intervalima od 30 sekundi, miješajući). Ostavite da se malo ohladi.',
      'U velikoj zdjeli umutite jaja i šećer mikserom 4-5 minuta dok smjesa ne postane svijetla i pjenasta.',
      'Polako ulijte otopljenu čokoladu u smjesu jaja, neprestano miješajući na niskoj brzini.',
      'Dodajte kakao prah, vaniliju i sol. Lagano promiješajte dok se sve ne sjedini.',
      'Izlijte smjesu u pripremljeni kalup i poravnajte površinu.',
      'Pecite 25-30 minuta. Kolač je gotov kad je površina čvrsta, ali sredina još lagano podrhtava.',
      'Ostavite da se hladi u kalupu 15 minuta, zatim prebacite na rešetku.',
      'Poslužite na sobnoj temperaturi, po želji uz šlag ili svježe voće.',
    ],
    imageCdnPath: '/recipes/cokoladni-kolac-bez-brasna/hero.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: nanoid(),
    slug: 'mediteranska-salata-s-tunom',
    title: 'Mediteranska salata s tunom',
    lead: 'Osvježavajuća mediteranska salata s tunom, maslinama i feta sirom. Idealna za lagani ručak ili kao prilog uz roštilj.',
    prepTime: 15,
    servings: 2,
    difficulty: 'easy',
    category: 'Salate',
    cookingMethod: 'Bez termičke obrade',
    tags: ['salata', 'tuna', 'mediteran', 'zdravo', 'brzo'],
    ingredients: [
      { name: 'Tuna u konzervi', amount: 160, unit: 'g' },
      { name: 'Rajčica', amount: 2, unit: 'kom' },
      { name: 'Krastavac', amount: 1, unit: 'kom' },
      { name: 'Crveni luk', amount: 0.5, unit: 'kom' },
      { name: 'Masline', amount: 50, unit: 'g' },
      { name: 'Feta sir', amount: 100, unit: 'g' },
      { name: 'Maslinovo ulje', amount: 3, unit: 'žlice' },
      { name: 'Limunov sok', amount: 1, unit: 'žlica' },
      { name: 'Origano', amount: 1, unit: 'žličica' },
    ],
    steps: [
      'Rajčice i krastavac narežite na kockice srednje veličine.',
      'Crveni luk narežite na tanke polumjesece.',
      'Ocijedite tunu i razdvojite viljicom na manje komade.',
      'U velikoj zdjeli pomiješajte rajčice, krastavac, luk i masline.',
      'Dodajte tunu i fetu narezanu na kockice.',
      'Za preljev pomiješajte maslinovo ulje, limunov sok i origano.',
      'Prelijte salatu i lagano promiješajte.',
      'Poslužite odmah ili ohladite u hladnjaku 15 minuta.',
    ],
    imageCdnPath: '/recipes/mediteranska-salata-s-tunom/hero.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: nanoid(),
    slug: 'domaci-kruh-bez-mjesenja',
    title: 'Domaći kruh bez miješenja',
    lead: 'Hrskavi domaći kruh s mekom sredinom, bez potrebe za miješenjem tijesta. Potrebno je samo strpljenje za dizanje tijesta.',
    prepTime: 180,
    servings: 8,
    difficulty: 'easy',
    category: 'Kruh i peciva',
    cookingMethod: 'Pečenje',
    tags: ['kruh', 'domaće', 'bez miješenja', 'pecivo'],
    ingredients: [
      { name: 'Brašno tip 550', amount: 400, unit: 'g' },
      { name: 'Voda (mlaka)', amount: 300, unit: 'ml' },
      { name: 'Suhi kvasac', amount: 7, unit: 'g' },
      { name: 'Sol', amount: 1.5, unit: 'žličica' },
      { name: 'Šećer', amount: 1, unit: 'žličica' },
    ],
    steps: [
      'U velikoj zdjeli pomiješajte brašno, sol, šećer i kvasac.',
      'Dodajte mlaku vodu (oko 37°C) i miješajte drvenom žlicom dok se sve ne sjedini. Tijesto će biti ljepljivo.',
      'Pokrijte zdjelu folijom ili vlažnom krpom i ostavite na toplom mjestu 2-3 sata dok se tijesto ne udvostruči.',
      '30 minuta prije pečenja, stavite lončić od lijevanog željeza (ili vatrostalnu posudu s poklopcem) u pećnicu i zagrijte na 230°C.',
      'Tijesto lagano oblikujte na pobrašnjenoj površini, ne mijesite previše.',
      'Pažljivo izvadite vrući lončić, stavite tijesto unutra i poklopite.',
      'Pecite poklopljeno 30 minuta, zatim skinite poklopac i pecite još 15 minuta dok kruh ne porumeni.',
      'Izvadite kruh i ostavite da se hladi na rešetki najmanje 20 minuta prije rezanja.',
    ],
    imageCdnPath: '/recipes/domaci-kruh-bez-mjesenja/hero.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: nanoid(),
    slug: 'pileci-curry-s-kokosovim-mlijekom',
    title: 'Pileći curry s kokosovim mlijekom',
    lead: 'Aromatični tajlandski curry s piletinom i povrćem u kremastom kokosovom mlijeku. Poslužite uz rižu za savršen obrok.',
    prepTime: 40,
    servings: 4,
    difficulty: 'medium',
    category: 'Glavna jela',
    cookingMethod: 'Pirjanje',
    tags: ['curry', 'piletina', 'azijska kuhinja', 'kokos'],
    ingredients: [
      { name: 'Pileći zabatci', amount: 600, unit: 'g' },
      { name: 'Kokosovo mlijeko', amount: 400, unit: 'ml' },
      { name: 'Curry pasta (crvena)', amount: 3, unit: 'žlice' },
      { name: 'Paprika', amount: 1, unit: 'kom' },
      { name: 'Tikvice', amount: 1, unit: 'kom' },
      { name: 'Bambus izdanci', amount: 100, unit: 'g' },
      { name: 'Riblja umak', amount: 2, unit: 'žlice' },
      { name: 'Smeđi šećer', amount: 1, unit: 'žlica' },
      { name: 'Svježi bosiljak (tajlandski)', amount: 1, unit: 'šaka' },
      { name: 'Ulje', amount: 2, unit: 'žlice' },
    ],
    steps: [
      'Piletinu narežite na zalogaje. Papriku i tikvice narežite na kockice.',
      'U woku ili dubokoj tavi zagrijte ulje na srednje visokoj vatri.',
      'Dodajte curry pastu i pržite 1 minutu dok ne postane mirisna.',
      'Dodajte piletinu i pržite 5 minuta dok ne pobijeli sa svih strana.',
      'Ulijte kokosovo mlijeko i promiješajte. Dodajte ribljii umak i šećer.',
      'Kad zakuha, smanjite vatru i kuhajte 10 minuta.',
      'Dodajte papriku, tikvice i bambus. Kuhajte još 8-10 minuta dok povrće ne omekša.',
      'Maknite s vatre, dodajte svježi bosiljak i promiješajte.',
      'Poslužite uz kuhanu jasmin rižu.',
    ],
    imageCdnPath: '/recipes/pileci-curry-s-kokosovim-mlijekom/hero.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Obriši postojeće podatke
    console.log('Clearing existing recipes...');
    await db.delete(recipes);

    // Unesi nove podatke
    console.log('Inserting seed recipes...');
    for (const recipe of seedRecipes) {
      await db.insert(recipes).values(recipe);
      console.log(`  ✓ ${recipe.title}`);
    }

    console.log(`\n✅ Successfully seeded ${seedRecipes.length} recipes!`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }

  process.exit(0);
}

seed();
