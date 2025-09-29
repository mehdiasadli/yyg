const keywords: string[] = [
  // simple - one word
  'car',
  'cars',
  'rent',
  'list',
  'dubai',
  'earn',
  'money',
  'share',
  'online',
  'affordable',
  'luxury',
  'services',
  'service',
  'auto',

  // two words
  'car rental',
  'car sharing',
  'rent car',
  'earn money',
  'get money',
  'share car',
  'luxury car',
  'affordable car',
  'luxury cars',
  'affordable cars',
  'auto services',
  'car subscription',

  // three words
  'list your car',
  'luxury car rental',
  'affordable car rental',
  'long-term car rental',
  'short-term car rental',

  // sentences
  'peer-to-peer car rental',
  'earn from your car',
  'list your car for rent',
  'car sharing for owners',
  'zero commission car rental',
  'car income platform',
  'share your car and earn',
  'car maintenance platform',
  'car maintenance services',
  'car detailing',
  'car care marketplace',
  'hassle-free car rental',
  'seamless car booking',
  'verified car owners',
  'secure payments for car rental',
  'premium car marketplace',
  'trusted car platform',
  'all-in-one web solution',
];

function addWordToKeywords(keywords: string[], word: string) {
  const newKeywords = keywords.map((keyword) => `${keyword} ${word}`);
  return [...keywords, ...newKeywords];
}

const keywordsWithOnline = addWordToKeywords(keywords, 'online');
const keywordsWithDubai = addWordToKeywords(keywords, 'dubai');
const keywordsWithBoth = addWordToKeywords(keywords, 'dubai online');

export default [...new Set([...keywords, ...keywordsWithOnline, ...keywordsWithDubai, ...keywordsWithBoth])];
