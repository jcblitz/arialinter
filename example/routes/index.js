var ArialLinter = require('arialinter');
var linter = new ArialLinter();

exports.index = function(req, res) {
  res.render('index', { message: req.flash('info') });
};

exports.lint = function(req, res) {
  console.log("body" + req.body.htmlContent)
  linter.initialize(req.body.htmlContent, function() {
    if (linter.evaluate()) {
      console.log('success');
      res.send('{ "errors": []}');
    } else {
      console.log('failed');
      var errors = JSON.parse(linter.getReport('json'));

      res.send(errors);
    }
  });
};