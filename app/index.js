var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var _  = require('lodash');

var AtenSiteGenerator = yeoman.generators.Base.extend({
  prompting: {
    /**
     * Ask for the site name and slug it
     */
    askForSiteName: function() {
      var done = this.async();

      this.prompt({
        name: 'siteName',
        message: 'What is your site\'s name?'
      }, function(props) {
        if (props.pkgName) {
          return this.askForModuleName();
        }

        this.slugname = this._.slugify(props.siteName);
        this.safeSlugname = this.slugname.replace(/-+([a-zA-Z0-9])/g, function(g) {
          return g[1].toUpperCase();
        });

        done();
      }.bind(this));
    },

    askFor: function() {
      var done = this.async();

      var prompts = [
        {
          name: 'structure',
          message: 'What is your site structure?',
          type: 'list',
          choices: [
            'Normal, resources + public_html',
            'Web root + resources'
          ],
          filter: function(val) { return val.toLowerCase(); }
        }
      ];

      this.prompt(prompts, function(props) {
        this.structure = props.structure;
        done();
      }.bind(this));
    }
  },

  app: function() {
    var publicHtml = '';

    // create the normal site structure
    if (/^normal/.test(this.structure)) {
      this.mkdir('public_html');
      publicHtml = 'public_html';
    }

    // create the resources directory
    this.directory('resources', path.join(publicHtml, 'resources'));
  },

  end: function() {
    // console.log(this);
  }
});

module.exports = AtenSiteGenerator;
