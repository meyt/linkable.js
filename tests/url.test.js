import test from 'tape'
import Linkable from '../src/index'

const validItems = [
  'http://foo.com/blah_blah',
  'http://foo.com/blah_blah/',
  'http://foo.com/blah_blah_(wikipedia)',
  'http://foo.com/blah_blah_(wikipedia)_(again)',
  'http://www.example.com/wpstyle/?p=364',
  'https://www.example.com/foo/?bar=baz&inga=42&quux',
  'http://✪df.ws/123',
  'http://userid:password@example.com:8080',
  'http://userid:password@example.com:8080/',
  'http://userid@example.com',
  'http://userid@example.com/',
  'http://userid@example.com:8080',
  'http://userid@example.com:8080/',
  'http://userid:password@example.com',
  'http://userid:password@example.com/',
  'http://➡.ws/䨹',
  'http://⌘.ws',
  'http://⌘.ws/',
  'http://foo.com/blah_(wikipedia)#cite-1',
  'http://foo.com/blah_(wikipedia)_blah#cite-1',
  'http://foo.com/unicode_(✪)_in_parens',
  'http://foo.com/(something)?after=parens',
  'http://☺.damowmow.com/',
  'http://code.google.com/events/#&product=browser',
  'http://j.mp',
  'ftp://foo.bar/baz',
  'http://foo.bar/?q=Test%20URL-encoded%20stuff',
  'http://مثال.إختبار',
  'http://例子.测试',
  'http://-.~_!$&()*+,;=:%40:80%2f::::::@example.com',
  'http://1337.net',
  'http://a.b-c.de',
  'http://223.255.255.254',
  'http://dev.test',
  'http://dev.localhost',
  'http://10.1.1.1',
  'http://10.1.1.254',
  'http://127.0.0.1:8080',
  'http://127.0.10.150',
  'http://localhost',
  'http://localhost:8000',
  'http://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:80/index.html',
  'http://[1080:0:0:0:8:800:200C:417A]/index.html',
  'http://[3ffe:2a00:100:7031::1]',
  'http://[1080::8:800:200C:417A]/foo',
  'http://[::192.9.5.5]/ipng',
  'http://[::FFFF:129.144.52.38]:80/index.html',
  'http://[2010:836B:4179::836B:4179]',
  'youtube.com/watch?v=pS-gbqbVd8c',
  'en.c.org/a_(b)'
]

const invalidItems = [
  'http://',
  'http://.',
  'http://..',
  'http://../',
  'http://?',
  'http://??',
  'http://??/',
  'http://#',
  'http://##',
  'http://##/',
  'http://foo.bar?q=Spaces should be encoded',
  '//',
  '//a',
  '///a',
  '///',
  'http:///a',
  // 'foo.com',
  'rdar://1234',
  'h://test',
  'http:// shouldfail.com',
  ':// should fail',
  'http://foo.bar/foo(bar)baz quux',
  'ftps://foo.bar/',
  'http://-error-.invalid/',
  'http://-a.b.co',
  'http://a.b-.co',
  'http://0.0.0.0',
  'http://10.1.1.0',
  'http://10.1.1.255',
  'http://224.1.1.1',
  'http://1.1.1.1.1',
  'http://123.123.123',
  'http://3628126748',
  'http://.www.foo.bar/',
  'http://www.foo.bar./',
  'http://.www.foo.bar./',
  'http://127.12.0.260',
  'http://example.com/">user@example.com',
  'http://[2010:836B:4179::836B:4179',
  'http://2010:836B:4179::836B:4179',
  'http://2010:836B:4179::836B:4179:80/index.html'
]

test('Test URL', (assert) => {
  const validateUrl = Linkable().validators.validateUrl

  validItems.forEach(item => {
    assert.equal(validateUrl(item), true, 'Validating: ' + item)
  })

  invalidItems.forEach(item => {
    assert.equal(validateUrl(item), false, 'Validating: ' + item)
  })

  assert.end()
})
