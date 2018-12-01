import test from 'tape'
import Linkable from '../src/index'

const matches = [
  [
    'one linear demo with #hashtag',
    'one linear demo with <a href="/hashtag/#hashtag">#hashtag</a>'
  ],
  [
    'یک متن با محتوای #یونیکد',
    'یک متن با محتوای <a href="/hashtag/#یونیکد">#یونیکد</a>'
  ],
  [
    'یک متن با لینک https://example.com',
    'یک متن با لینک <a href="https://example.com">https://example.com</a>'
  ],
  [
    'a link https://example.com',
    'a link <a href="https://example.com">https://example.com</a>'
  ],
  [
    'link https://example.com and @ mention @mention',
    'link <a href="https://example.com">https://example.com</a> ' +
    'and @ mention <a href="/@mention">@mention</a>'
  ],
  [
    'link https://example.com and @ mention @mention',
    'link <a href="https://example.com">https://example.com</a> and ' +
    '@ mention <a href="/@mention">@mention</a>'
  ],
  [
    'link https://example.com and @ mention @mention و یک #tag_ and email@x.co',
    'link <a href="https://example.com">https://example.com</a> and ' +
    '@ mention <a href="/@mention">@mention</a> و یک ' +
    '<a href="/hashtag/#tag_">#tag_</a> and <a href="mailto:email@x.co">' +
    'email@x.co</a>'
  ],
  [
    'a link with https://example.com\n@newline_mention',
    'a link with <a href="https://example.com">https://example.com</a>' +
    '\n<a href="/@newline_mention">@newline_mention</a>'
  ],
  [
    'a link with https://example.com\r\n@newline_mention',
    'a link with <a href="https://example.com">https://example.com</a>' +
    '\r\n<a href="/@newline_mention">@newline_mention</a>'
  ],
  [
    'one linear demo with (#hashtag)',
    'one linear demo with (<a href="/hashtag/#hashtag">#hashtag</a>)'
  ]
]
test('Test Linkable', (assert) => {
  const linkable = Linkable()

  matches.forEach(match => {
    assert.equal(linkable.replace(match[0]), match[1])
  })

  const optionsList = [
    { replaceHashtag: false },
    { replaceMention: false },
    { replaceUrl: false },
    { replaceEmail: false }
  ]
  optionsList.forEach(options => {
    const linkable = Linkable(options)
    matches.forEach(match => {
      linkable.replace(match[0])
    })
  })

  assert.end()
})
