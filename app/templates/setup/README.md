# Setup

This script will enable/revert features, modules, and migrations as needed.

## Usage

    ruby setup/setup.rb

Or run specific things:

    ruby setup/setup.rb --modes="features,migrations"

Modes:

  - modules
  - features
  - migrations
  - cleanup

You can also print the commands, instead of running them with the `--print` option. This can be copied/pasted on a server without ruby.

If you have a remote server with a drush alias, you can run the commands there with `--alias`.
