var cm = require('commonmark');

function renderMarkdown(text) {
  var reader = new cm.DocParser();
  var writer = new cm.HtmlRenderer();
  var parsed = reader.parse(text);
  return writer.render(parsed);
}

module.exports = renderMarkdown;
