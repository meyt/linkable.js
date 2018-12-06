# linkable-js

[![Build Status](https://travis-ci.org/meyt/linkable.js.svg?branch=master)](https://travis-ci.org/meyt/linkable.js)
[![Coverage Status](https://coveralls.io/repos/github/meyt/linkable.js/badge.svg?branch=master)](https://coveralls.io/github/meyt/linkable.js?branch=master)

Detect URL, Email, Hashtag and Mention from plain-text and convert into HTML clickable hyperlink.
[Demo](https://meyt.github.io/linkable.js/)


## Install

```bash
$ npm install --save linkable
```

## Usage

```javascript
  import Linkable from 'linkable'

  const text = 'This is test with a #hashtag from @linkable on github.com'
  const linkable = new Linkable()
  console.log(
    linkable.replaceLinks(text)
  )
```

Output:
```html
This is test with <a href="/hashtag/#hashtag">#hashtag</a> from <a href="/@linkable">@linkable</a> on <a href="http://github.com">github.com</a>
```