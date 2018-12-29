const request = require('request')
const punycode = require('punycode')

const tldDbUrl = 'https://data.iana.org/TLD/tlds-alpha-by-domain.txt'

// wrap a request in an promise
function downloadPage (url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) reject(error)
      if (response.statusCode !== 200) {
        reject('Invalid status code <' + response.statusCode + '>')
      }
      resolve(body)
    })
  })
}

async function main () {
  const content = await downloadPage(tldDbUrl)
  const result = []
  const items = content.split('\n')
  delete items[0]
  delete items[items.length - 1]
  items.forEach(item => {
    if (item.startsWith('XN--')) {
      result.push(punycode.decode(item.substr(4)))
    } else {
      result.push(item)
    }
  })
  console.table('export default \'' + result.join('|') + '\'')
}

main()
