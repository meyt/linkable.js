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
  '#والـپـِیپِر',
  '#the_quick_brown_fox_jumps_over_the_lazy_dog',
  '#Lorem_a',
  '＃lorem_ipsum'
]

const invalidItems = [
  '#5',
  '#d-a',
  '#~!@#$%^&*()_+',
  '#',
  '##',
  '##lorem',
  '####lorem',
  '#️⃣false',
  '＃＃',
  '＃##️⃣',
  '###️⃣',
  '#@',
  '#!@$%^&*(',
  '#\uD83D\uDCA9',
  '#an_🤵🏻emoji',
  '#an_emoji😐',
  '#x&y'
]

test('Test hashtags', (assert) => {
  const validateHashtag = Linkable().validators.validateHashtag

  validItems.forEach(hashtag => {
    assert.equal(validateHashtag(hashtag), true, 'Validating: ' + hashtag)
  })

  invalidItems.forEach(hashtag => {
    assert.equal(validateHashtag(hashtag), false, 'Validating: ' + hashtag)
  })

  Emoji.forEach(codePoint => {
    const emoji = String.fromCodePoint(codePoint)
    const hashtag = `#${emoji}`
    assert.equal(validateHashtag(hashtag), false, 'Validating: ' + hashtag)
  })

  sequences.forEach(sequence => {
    const hashtag = `#${sequence}`
    assert.equal(validateHashtag(hashtag), false, 'Validating: ' + hashtag)
  })

  assert.end()
})
