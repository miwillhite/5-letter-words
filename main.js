import * as fs from 'fs';
import {
  always, append, apply, compose, complement, equals, flip, head, ifElse, inc, indexOf,
  length, lift, lt, map, range, reduce, reduced, reject, split, sum, tail, take, test
} from 'ramda';

// Get the words list and create an array, rejecting anything with apostrophes
const words = compose(
  reject(test(/'/)),
  split('\n'),
  apply(fs.readFileSync)
)(['words.txt', 'utf8']);

// Assuming the words list is all lower-case...
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

// Only take 5-letter words
const fiveLetterWords = reject(compose(complement(equals)(5), length), words);

// Fn to get the score of the letter
const alphaScore = compose(inc, flip(indexOf)(alphabet));

const results = reduce((ws, w) => {
  return ifElse(
    // Build up the first letter score and compare to the word score
    lift(equals)
      (compose(alphaScore, head))
      (compose(sum, map(alphaScore), tail)),
    // Append to the results if scores align
    flip(append)(ws),
    // Otherwise pass along the existing set
    always(ws)
  )(w)
}, [], fiveLetterWords);

console.log(results);
