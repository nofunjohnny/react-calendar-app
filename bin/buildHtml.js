/**
 * This script copies src/index.html into build/index.html
 * This is a good example of using Node and cheerio to do a simple file transformation.
 * It might be useful when we only want to do smth. specific in the built production code.
 */

/*eslint-disable no-console */

var fs = require('fs');
var colors = require('colors');
var cheerio = require('cheerio');

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);
  const projectSubdirPrefix = process.env.PROJECT_SUBDIR || '';

  // prepend project's subfolder
  if (projectSubdirPrefix) {
    $('body script').each(function(idx, el) {
      const src = $(el).attr('src');
      $(el).attr('src', `/${projectSubdirPrefix}${src}`);
    });
  }

  fs.writeFile('build/index.html', $.html(), 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
  });

  console.log('index.html written to /build'.green);
});
