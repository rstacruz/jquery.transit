module Helpers
  def can_run?(what)
    ! `which #{what}`.strip.empty?
  end

  def die(str)
    puts str
    exit
  end
end

extend Helpers

task :check_deps do
  die "Error: You need YUI Compressor."  unless can_run?('yuicompressor')
  die "Error: You need Docco. Try `gem install docco`."  unless can_run?('docco')
  require 'proton'
  die "Error: You need Proton. Try `gem install proton`."  unless can_run?('proton')
end

# Prepare
task :prebuild => :check_deps do
  system "cp jquery.transit.js site/"

  puts "==> YUI Compressing..."
  system "yuicompressor jquery.transit.js > site/jquery.transit.min.js"

  puts "==> Generating annotated source..."
  system "docco jquery.transit.js > /dev/null"
  system "mv docs/docco.css site/docco.css"
  system "mv docs/jquery.transit.html site/source.html"
  system "rm -rf docs"
end

desc "Builds the website"
task :build => :prebuild do
  puts "==> Building site..."
  system "cd site && proton build"
end

desc "Deploys the website"
task :deploy => :build do
  system "git update-ghpages rstacruz/jquery.transit -i site/_output -b gh-pages"
end
