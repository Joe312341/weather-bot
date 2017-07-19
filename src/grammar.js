// The idea is to make the bot more personable by randomizing the start of
// the bots sentences
const customPhrases = [
  'So it looks like',
  'According to my stats',
  'To the best of my knowledge',
  'Hm, seems like',
  'Looks like'
];

/**
 * Returns a random element of the customPhrases array
 * @return {string}
 */
export const pickRandomSentenceStart = () => {
  return customPhrases[Math.floor(Math.random(0,1) * customPhrases.length)];
};
