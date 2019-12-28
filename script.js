import Linkable from '../src/index'
var linkable = Linkable()
var sourceEl = document.getElementById('source')
var resultEl = document.getElementById('result')
var updateResult = function () {
  var result = sourceEl.value
  result = linkable.replaceLinks(result)
  result = result.replace(/(?:\r\n|\r|\n)/mg, '<br>')
  resultEl.innerHTML = result
}
sourceEl.onkeyup = updateResult
updateResult()