//------------------------------------------------------------------------------
// CONFIGURATION
//------------------------------------------------------------------------------
var config = {};

// Base path
// -----------------------------------------------------------------------------
// If the root of the project is the web root, set to: ./
// If the root of the project is public_html, set to: ./public_html/
config.base = './';

// Theme path
// -----------------------------------------------------------------------------
config.theme = config.base + 'sites/all/themes/<%= themeId %>';

// Paths
config.paths = {
  // Glob for core JS files, ignores min'd files and jquery
  jsCore: [
    config.base + 'misc/**/*.js',
    '!' + config.base + 'misc/*.min.js',
    '!' + config.base + 'misc/jquery.js'
  ],
  jsCoreModules: [config.base + 'modules/**/*.js', '!' + config.base + 'modules/**/*.min.js'],
  jsContrib: [config.base + 'sites/all/modules/contrib/**/*.js'],
  jsCustom: [config.base + 'sites/all/modules/custom/**/*.js'],
  jsPatched: [config.base + 'sites/all/modules/patched/**/*.js'],
  jsLibrary: [config.base + 'sites/all/libraries/**/*.js'],

  // the theme JS files for compression
  jsTheme: [
    config.theme + '/build/js/*.js'
  ],

  // path to content YAML files that need to be converted to YAML
  contentYAML: config.base + 'resources/content/**/*.yaml',

  // path to bundle js
  themeBundleJS: config.theme + '/src/js/*.js',
  themeSourceTemplates: config.theme + '/src/js/**/*.nunj',
  themeSourceJS: config.theme + '/src/js/**/*.js',

  // where it builds to
  themeBuiltJS: config.theme + '/build/js',

  // the theme SCSS files for compiling.
  themeBundleCSS: config.theme + '/src/scss/*.scss',
  themeSourceCSS: config.theme + '/src/scss/**/*.scss',
  themeBuiltCSS: config.theme + '/build/css',

  // Bower
  themeBower: config.theme + '/src/bower',

  // PHP CodeSniffer
  phpCS: [
    config.base + 'sites/all/modules/custom/**/*.php',
    config.base + 'sites/all/modules/custom/**/*.inc',
    config.base + 'sites/all/modules/custom/**/*.module',
    config.theme + '**/*.php',
    config.theme + '**/*.inc'
  ]
};

// tests
config.tests = [
];

module.exports = config;
