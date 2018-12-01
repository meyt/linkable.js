import test from 'tape'
import Linkable from '../src/index'

const validGlobalMentions = [
  '@a',
  '@lorem',
  '@LOREM',
  '@with5'
]

const invalidGlobalMentions = [
  '@~!@#$%^&*()_+',
  '@',
  '@@',
  '@!@$%^&*('
]

const validMentions = {
  twitter: [
    ...validGlobalMentions,
    '@the_quick_brown_fox_jumps_over_the_lazy_dog',
    '@with_number5',
    '@with_5'
  ],
  github: [
    ...validGlobalMentions,
    '@the-quick-brown-fox-jumps-over-the-lazy-dog',
    '@50cent'
  ]
}

const invalidMentions = {
  twitter: [
    ...invalidGlobalMentions,
    '@lorem-ipsum',
    '@50cent',
    '@with5-',
    '@-dash',
    '@dash-',
    '@dash-dash--'
  ],
  github: [
    ...invalidGlobalMentions,
    '@lorem_ipsum',
    '@_underscore',
    '@underscore_',
    '@underscore__'
  ]
}

test('Test mentions', (assert) => {
  ['twitter', 'github'].forEach(mentionStyle => {
    const validateMention = Linkable({
      mentionStyle: mentionStyle
    }).validateMention
    validMentions[mentionStyle].forEach(item => {
      assert.equal(
        validateMention(item),
        true,
        `MentionStyle: ${mentionStyle}, Validate: ${item}`
      )
    })

    invalidMentions[mentionStyle].forEach(item => {
      assert.equal(
        validateMention(item),
        false,
        `MentionStyle: ${mentionStyle}, Invalidate: ${item}`
      )
    })
  })

  assert.end()
})
