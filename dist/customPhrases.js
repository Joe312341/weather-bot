'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// The idea is to make the bot more personable by randomizing the start of
// the bots sentences
var customPhrases = ['So it looks like', 'According to my stats', 'To the best of my knowledge', 'Hm, seems like', 'Looks like'];

/**
 * Returns a random element of the customPhrases array
 * @return {string}
 */
var pickRandomSentenceStart = exports.pickRandomSentenceStart = function pickRandomSentenceStart() {
  return customPhrases[Math.floor(Math.random(0, 1) * customPhrases.length)];
};