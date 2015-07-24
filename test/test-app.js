'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var _ = require('lodash');

var prompts = {
  siteName: 'atentest',
  siteDescription: 'Aten Test site description',
  themeId: 'theme_name'
};

describe('aten-site:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt(prompts)
      .on('end', done);
  });

  it('Creates gulp tasks', function () {
    assert.file([
      'resources/gulp/config.js'
    ]);
    assert.fileContent('resources/gulp/config.js', 'sites/all/themes/' + prompts.themeId);
  });

  it('Creates package.json', function () {
    assert.file([
      'package.json'
    ]);
  });

  it('Creates Gulpfile.js', function () {
    assert.file([
      'Gulpfile.js'
    ]);
  });
});
