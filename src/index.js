
import patterns from './patterns'
import * as PSet from './charset/punctuation'

const urlSchemeRegex = /\S+:\/\//i
const hashRepeatRegex = new RegExp('(^[' + PSet.hash + ']{2,})', 'g')

function replaceHashtag (value) {
  return `<a href="/hashtag/${value}">${value}</a>`
}

function replaceMention (value) {
  return `<a href="/${value}">${value}</a>`
}

function replaceUrl (value) {
  let url = value
  // Use `http` as default scheme
  if (!urlSchemeRegex.test(url)) {
    url = 'http://' + url
  }
  return `<a href="${url}">${value}</a>`
}

function replaceEmail (value) {
  return `<a href="mailto:${value}">${value}</a>`
}

/**
 * @description
 * Linkable
 *
 * @param {Object} options
 * @param {String} [options.mentionStyle=twitter] Mentioning style
 * Available styles:
 * - twitter (e.g: @twitter_official)
 * - github (e.g: @9gag-repository)
 * @param {(Function|Boolean)} [options.replaceHashtag=function]
 * Hashtag replacer method (set false to disable)
 * @param {(Function|Boolean)} [options.replaceMention=function]
 * Mention replacer method (set false to disable)
 * @param {(Function|Boolean)} [options.replaceUrl=function]
 * URL replacer method (set false to disable)
 * @param {(Function|Boolean)} [options.replaceEmail=function]
 * Email replacer method (set false to disable)
 */
export default function (options) {
  options = Object.assign({
    mentionStyle: 'twitter',
    replaceHashtag: replaceHashtag,
    replaceMention: replaceMention,
    replaceUrl: replaceUrl,
    replaceEmail: replaceEmail
  }, options)

  const validators = {
    validateHashtag: options.replaceHashtag === false
      ? function (text) { return false }
      : function (text) {
        return patterns.hashtagPattern.test(text)
      },
    validateMention: options.replaceMention === false
      ? function (text) { return false }
      : function (text) {
        const patternName = options.mentionStyle === 'twitter'
          ? 'twitterMentionPattern'
          : 'githubMentionPattern'
        return patterns[patternName].test(text)
      },
    validateUrl: options.replaceUrl === false
      ? function (text) { return false }
      : function (text) {
        return patterns.urlPattern.test(text)
      },
    validateEmail: options.replaceEmail === false
      ? function (text) { return false }
      : function (text) {
        return patterns.emailPattern.test(text)
      }
  }
  const mainReplacer = (word, wordAlt) => {
    // DIRTY_PATCH: Duo to lack of JS RegEx look-behind support
    // to detect hashtags started with multiple hash symbol
    let repeatedHash = null
    if (wordAlt && word.match(hashRepeatRegex)) {
      repeatedHash = word.match(hashRepeatRegex)[0]
      word = wordAlt
    }

    if (validators.validateHashtag(word)) {
      if (repeatedHash !== null) {
        return (
          repeatedHash.substr(0, repeatedHash.length - 1)
        ) + options.replaceHashtag(word)
      }
      return options.replaceHashtag(word)
    }

    if (validators.validateMention(word)) {
      return options.replaceMention(word)
    }

    if (validators.validateEmail(word)) {
      return options.replaceEmail(word)
    }

    if (validators.validateUrl(word)) {
      return options.replaceUrl(word)
    }

    return word
  }

  const secondReplacer = (word) => {
    // Accept dirty hashtags
    // Note: Hashtags should validate even have any character before the
    // sharp (#) sign, or ends with punctuation.
    // and its most common on social medias like Telegram
    if (word.match(patterns.dirtyHashtag) !== null) {
      return word.replace(
        patterns.dirtyHashtag,
        mainReplacer
      )
    }
    if (word.match(patterns.dirtyMention) !== null) {
      return word.replace(
        patterns.dirtyMention,
        mainReplacer
      )
    }
    return mainReplacer(word)
  }

  const firstReplacer = (word) => {
    // Validate words hugged by any type of brackets
    if (word.match(patterns.bracketsPattern) !== null) {
      return word.replace(
        patterns.bracketsPattern,
        secondReplacer
      )
    }
    return secondReplacer(word)
  }

  const result = {
    validators: validators,
    replaceLinks (text) {
      return text.replace(
        /\S+/imgu,
        firstReplacer
      )
    }
  }
  return result
}
