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
  ],
  [
    'is this a #hashtag?',
    'is this a <a href="/hashtag/#hashtag">#hashtag</a>?'
  ],
  [
    'brackets (@a) {#b} 《@c》 ⟨@d⟩ [@e]?',
    'brackets ' +
    '(<a href="/@a">@a</a>) ' +
    '{<a href="/hashtag/#b">#b</a>} ' +
    '《<a href="/@c">@c</a>》 ' +
    '⟨<a href="/@d">@d</a>⟩ ' +
    '[<a href="/@e">@e</a>]?'
  ],
  [
    'guillemets ‹@a› <@b> «#c»?',
    'guillemets ' +
    '‹<a href="/@a">@a</a>› ' +
    '<<a href="/@b">@b</a>> ' +
    '«<a href="/hashtag/#c">#c</a>»?'
  ],
  [
    'quotations ‘@a’ “@b” \'#c\' "@d" „@e“ “@f”',
    'quotations ' +
    '‘<a href="/@a">@a</a>’ ' +
    '“<a href="/@b">@b</a>” ' +
    '\'<a href="/hashtag/#c">#c</a>\' ' +
    '"<a href="/@d">@d</a>" ' +
    '„<a href="/@e">@e</a>“ ' +
    '“<a href="/@f">@f</a>”'
  ],
  [
    'is this a #hashtag? #or_hashtag!!!!!',
    'is this a <a href="/hashtag/#hashtag">#hashtag</a>? ' +
    '<a href="/hashtag/#or_hashtag">#or_hashtag</a>!!!!!'
  ],
  [
    'is this a ###hashtag? #or_hashtag!!!!!',
    'is this a ###hashtag? ' +
    '<a href="/hashtag/#or_hashtag">#or_hashtag</a>!!!!!'
  ]
]
test('Test Linkable', (assert) => {
  const linkable = Linkable()

  matches.forEach(match => {
    assert.equal(linkable.replaceLinks(match[0]), match[1])
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
      linkable.replaceLinks(match[0])
    })
  })

  assert.end()
})
