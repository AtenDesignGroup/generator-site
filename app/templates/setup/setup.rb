# encoding: UTF-8
require 'optparse'
require 'yaml'

begin
  require 'colorize'
rescue LoadError
end

# add any drush site aliases that can be used with this instance of setup
acceptable_aliases = [
]

#
# Parse enabled features
#
def parse_features_status(options)
  enabled_features = []

  # skip this in print mode
  unless options.key?(:print)
    raw_status = `drush #{options[:alias]} fl --strict=0 --status="enabled"`
    line_number = 0
    raw_status.each_line do |line|
      line_number += 1
      next if line_number == 1
      data = line.split(/\s{2,}/)
      enabled_features.push(data[1]) if data
    end
  end

  enabled_features
end

#
# Parse enabled modules
#
def parse_module_status(options)
  enabled_modules = []

  # print mode we skip this check
  unless options.key?(:print)
    raw_status = `drush #{options[:alias]} pml --strict=0 --pipe --status="enabled"`

    # if it worked, update the enabled modules list
    if $?.success?
      raw_status.each_line do |line|
        enabled_modules.push(line.strip!)
      end
    end

  end

  enabled_modules
end

def feature_enabled?(enabled_features, feature)
  enabled_features.include?(feature)
end

def module_enabled?(enabled_modules, mod)
  enabled_modules.include?(mod)
end

#
# Show a header for a section of the script
#
def section_header(header)
  puts '#' + '-' * 70
  puts "# #{header}"
  puts '#' + '-' * 70
end

#
# check options
#
options = {}
OptionParser.new do |opts|
  opts.banner = 'Usage: setup.rb [options]'
  modes_description = 'A list of modes to run. Modes: features, modules, disable
    , migrations, cleanup'
  opts.on('--modes modes', Array, modes_description) do |list|
    options[:modes] = list
  end
  opts.on('--print', 'Print commands instead of running them') do |pr|
    options[:print] = pr
  end
  opts.on('--alias alias', 'The site alias to use for a command') do |sa|
    options[:alias] = sa
  end
end.parse!

all_modes = true
all_modes = false if options.key? :modes

options[:alias] = '' unless options.key? :alias

# check that the alias is OK
if options[:alias] != '' && !acceptable_aliases.include?(options[:alias])
  [
    "Invalid alias for this project: #{options[:alias]}",
    'If you intend to use this alias, you must add it to setup.rb'
  ].each do |message|
    puts message.colorize(:red) if message.respond_to?('colorize')
    puts message unless message.respond_to?('colorize')
  end

  exit 1
end

# Always run drush cc drush initially
command = "drush #{options[:alias]} cache-clear drush"
puts "# running: #{command}" unless options.key? :print
`#{command}` unless options.key? :print
puts command if options.key? :print

#
# enable modules
#
if all_modes || options[:modes].include?('modules')
  section_header('ENABLE MODULES')
  enabled_modules = parse_module_status(options)
  begin
    YAML.load_file('setup/modules.yaml').each do |mod|
      if !module_enabled?(enabled_modules, mod)
        command = "drush #{options[:alias]} pm-enable --strict=0 -y #{mod}"
        puts "# running: #{command}" unless options.key? :print
        `#{command}` unless options.key? :print
        puts command if options.key? :print
      else
        puts "# #{mod} already enabled"
      end
    end
  rescue
    puts "# no modules to enable"
  end
end

#
# disable modules
#
if all_modes || options[:modes].include?('disable')
  section_header('DISABLE MODULES')
  begin
    YAML.load_file('setup/disable_modules.yaml').each do |mod|
      if module_enabled?(enabled_modules, mod)
        command = "drush #{options[:alias]} pm-disable --strict=0 -y #{mod}"
        puts "# running: #{command}" unless options.key? :print
        `#{command}` unless options.key? :print
        puts command if options.key? :print
      else
        puts "# #{mod} is already disabled"
      end
    end
  rescue
    puts "# no modules to disable"
  end
end

#
# enable and revert features
#
if all_modes || options[:modes].include?('features')
  section_header('FEATURES')
  enabled_features = parse_features_status(options)
  begin
    YAML.load_file('setup/features.yaml').each do |feature|
      if !feature_enabled?(enabled_features, feature)
        command = "drush #{options[:alias]} pm-enable --strict=0 -y #{feature}"
        puts "# running: #{command}" unless options.key? :print
        `#{command}` unless options.key? :print
        puts command if options.key? :print
      else
        puts "# #{feature} is already enabled"
      end
    end

    # revert all the features
    `drush #{options[:alias]} features-revert-all --strict=0 -y` unless options.key? :print
    puts "drush #{options[:alias]} features-revert-all --strict=0 -y" if options.key? :print
  rescue
    puts "# no features to enable/revert"
  end
end

# import/update migrations
if all_modes || options[:modes].include?('migrations')
  section_header('MIGRATIONS')
  begin
    command = "drush #{options[:alias]} cc all --strict=0"
    puts "# running: #{command}" unless options.key? :print
    `#{command}` unless options.key? :print
    command = "drush #{options[:alias]} migrate-register --strict=0"
    puts "# running: #{command}" unless options.key? :print
    `#{command}` unless options.key? :print
    YAML.load_file('setup/migrations.yaml').each do |migration|
      command = "drush #{options[:alias]} migrate-import --strict=0 --update #{migration}"
      puts "# running: #{command}" unless options.key? :print
      `#{command}` unless options.key? :print
      puts command if options.key? :print
    end
  rescue
    puts "# no migrations to run"
  end
end

# cleanup
if all_modes || options[:modes].include?('cleanup')
  section_header('CLEANUP')
  commands = [
    "drush #{options[:alias]} registry-rebuild --strict=0",
    "drush #{options[:alias]} cache-clear all --strict=0",
    "drush #{options[:alias]} updatedb --yes --strict=0",
  ]
  non_drush_commands = [
    'npm install'
  ]

  commands.each do |cmd|
    puts "# running: #{cmd}" unless options.key? :print
    `#{cmd}` unless options.key? :print
    puts cmd if options.key? :print
  end

  # don't run the non_drush_commands when we're using an alias
  unless options.key?(:alias)
    non_drush_commands.each do |cmd|
      puts "# running: #{cmd}"
      `#{cmd}` unless options.key? :alias
      puts cmd if options.key? :alias
    end
  end
end
