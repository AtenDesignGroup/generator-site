var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var _  = require('lodash');

var AtenSiteGenerator = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    this.behat = false;

    this.vagrant = true;
    this.vagrantPort = 8080;
    this.vagrantDomain = path.dirname(this.dest) + '.dev';
  },

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
        this.slugname = this._.slugify(props.siteName);
        this.safeSlugname = this.slugname.replace(/-+([a-zA-Z0-9])/g, function(g) {
          return g[1].toUpperCase();
        });

        done();
      }.bind(this));
    },

    askForSiteDescription: function() {
      var done = this.async();

      this.prompt({
        name: 'siteDescription',
        message: 'What is your site\'s description?'
      }, function(props) {
        this.siteDescription = props.siteDescription;
        done();
      }.bind(this));
    },

    askForThemeName: function() {
      var done = this.async();

      this.prompt({
        name: 'themeId',
        message: 'What is your theme\'s machine name?',
        default: 'prototype'
      }, function(props) {
        this.themeId = props.themeId;
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
          default: 'Normal, resources + public_html',
          filter: function(val) { return val.toLowerCase(); }
        },

        // maybe this should be it's own generator?
        {
          name: 'vagrant',
          message: 'Do you want setup vagrant?',
          type: 'confirm',
          default: true
        },
        {
          name: 'vagrantDomain',
          message: 'What domain do you want to use?',
          default: this.vagrantDomain
        },

        // maybe this should be it's own generator?
        {
          name: 'behat',
          message: 'Do you want to include Behat for testing?',
          type: 'confirm',
          default: false
        }
      ];

      this.prompt(prompts, function(props) {
        this.structure = props.structure;
        this.behat = props.behat;
        this.vagrant = props.vagrant;
        this.vagrantDomain = props.vagrantDomain;
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
    var resourcesPath = path.join(publicHtml, 'resources');
    this.directory('resources', resourcesPath);

    // package.json
    this.template('package-json', 'package.json');

    // composer.json
    this.template('composer-json', 'composer.json');

    // Gulpfile
    this.copy('Gulpfile.js', 'Gulpfile.js');

    // JS hint & cs
    this.copy('jshintrc', '.jshintrc');
    this.copy('jscsrc', '.jscsrc');

    // behat
    if (this.behat) {
      this.template('behat.yml', path.join(resourcesPath, 'behat.yml'));
    }
  },

  end: function() {
    // console.log(this);
  }
});

module.exports = AtenSiteGenerator;
