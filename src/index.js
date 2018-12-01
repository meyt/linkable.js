
import patterns from './patterns'

const urlSchemeRegex = /\S+:\/\//i

function replaceHashtag (value) {
  return `<a href="/hashtag/${value}">${value}</a>`
}

function replaceMention (value) {
  return `<a href="/${value}">${value}</a>`
}

function replaceUrl (value) {
  let url = value
  // not have scheme use default http
  if (!urlSchemeRegex.test(url)) {
    url = 'http://' + url
  }
  return `<a href="${url}">${value}</a>`
}

function replaceEmail (value) {
  return `<a href="mailto:${value}">${value}</a>`
}
// console.log(patterns.urlPattern)
// throw new Error('')

export default function (options) {
  options = Object.assign({
    mentionStyle: 'twitter', // twitter | github
    replaceHashtag: replaceHashtag,
    replaceMention: replaceMention,
    replaceUrl: replaceUrl,
    replaceEmail: replaceEmail
  }, options)

  const result = {
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
      },
    replace (text) {
      const replacer = (word, x) => {
        if (this.validateHashtag(word)) {
          return options.replaceHashtag(word)
        }

        if (this.validateMention(word)) {
          return options.replaceMention(word)
        }

        if (this.validateEmail(word)) {
          return options.replaceEmail(word)
        }

        if (this.validateUrl(word)) {
          return options.replaceUrl(word)
        }

        return word
      }

      return text.replace(
        /\S+/imgu,
        replacer
      ).replace(
        /(?!\()\S+(?=\))/imgu,
        replacer
      )
    }
  }
  return result
}
