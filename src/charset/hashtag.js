import emojiRegex from 'emoji-regex/text.js'
import * as p from './punctuation'

// Source: https://github.com/twitter/twitter-text/blob/master/js/src/regexp/hashtagSpecialChars.js
export const specialChars = '_꙾־׳״～〜゛゜゠・〃་༌·'

export const excludedPunctuation = (
    p.connector + p.dash + p.atSign + p.open + p.close + p.initial + p.final +
    p.other
  ).replace(
    new RegExp('[' + specialChars + ']', 'g'), ''
  )

export const boundary =
  // Start with ＃ or #
  '[' + p.hash + ']' +
  // Escape start with keypad unicode variations
  '(?!\uFE0F\u20E3)' +
  // Escape start with numbers
  '(?!\\d\\d)(?!\\d$)' +
  // Escape multiple hash symbols
  '(?![' + p.hash + ']+$)' +
  // Escape emoji
  '(?!.*(' + emojiRegex().source + ').*)' +
  // Match any (unicode) characters exclude punctuation
  '(?:[^\\s' + excludedPunctuation + ']+)'
