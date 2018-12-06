import test from 'tape'
import Linkable from '../src/index'

const validItems = [
  'email@here.com',
  'weirder-email@here.and.there.com',
  'email@[127.0.0.1]',
  'example@valid-----hyphens.com',
  'example@valid-with-hyphens.com',
  'test@domain.with.idn.tld.उदाहरण.परीक्षा',
  'تست@example.co'
]

const invalidItems = [
  '',
  'abc',
  'abc@',
  'abc@bar',
  'a @x.cz',
  'abc@.com',
  'something@@somewhere.com'
]

test('Test Email', (assert) => {
  const validateEmail = Linkable().validators.validateEmail

  validItems.forEach(item => {
    assert.equal(validateEmail(item), true, 'Validating: ' + item)
  })

  invalidItems.forEach(item => {
    assert.equal(validateEmail(item), false, 'Validating: ' + item)
  })

  assert.end()
})
