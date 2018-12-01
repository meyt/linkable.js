import test from 'tape'
import Emoji from 'unicode-tr51/Emoji.js'
import sequences from 'unicode-tr51/sequences.js'
import Linkable from '../src/index'

const validItems = [
  '#lorem',
  '#LOREM',
  '#نمیشود',
  '#گنجشک',
  '#می‌شود',
  '#the_quick_brown_fox_jumps_over_the_lazy_dog',
  '#Lorem_a',
  '#\uD83D\uDCA9'
]

const invalidItems = [
  '#5',
  '#d-a',
  '#~!@#$%^&*()_+',
  '#',
  '#@',
  '#!@$%^&*('
]

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const punctuationEmoji = ['‼', '〽', '〰', '⁉', '‼']
const punctuation = ['*', '#']

test('Test hashtags', (assert) => {
  const validateHashtag = Linkable().validateHashtag

  validItems.forEach(hashtag => {
    assert.equal(validateHashtag(hashtag), true, 'Validating: ' + hashtag)
  })

  invalidItems.forEach(hashtag => {
    assert.equal(validateHashtag(hashtag), false, 'Validating: ' + hashtag)
  })

  Emoji.forEach(codePoint => {
    const emoji = String.fromCodePoint(codePoint)
    const hashtag = `#${emoji}`
    if ([...numbers, ...punctuationEmoji, ...punctuation].includes(emoji)) {
      return
    }
    assert.equal(validateHashtag(hashtag), true, 'Validating: ' + hashtag)
  })

  sequences.forEach(sequence => {
    const hashtag = `#${sequence}`
    assert.equal(validateHashtag(hashtag), true, 'Validating: ' + hashtag)
  })

  assert.end()
})
