module Compressor
  def self.compress(jscode)
    require 'net/http'
    require 'uri'

    response = Net::HTTP.post_form(URI.parse('http://closure-compiler.appspot.com/compile'), {
      'js_code' => jscode,
      'compilation_level' => "SIMPLE_OPTIMIZATIONS",
      'output_format' => 'text',
      'output_info' => 'compiled_code'
    })
    response.body
  end

  def self.compress_with_comment(jscode)
    comment    = jscode.match(/(\/\*!.*?\*\/)/m) && $1
    compressed = compress(jscode)
    compressed = comment + "\n" + compressed  if comment
    compressed
  end
end

module Helpers
  def can_run?(what)
    ! `which #{what}`.strip.empty?
  end

  def version
    contents = File.read('jquery.transit.js')
    m = contents.match(/version: "(.*?)"/)
    m[1]
  end

  def die(str)
    puts str
    exit
  end
end

extend Helpers

desc "Print version."
task :version do
  puts version
end

desc "Puts released versions on the site."
task :release => :compress do
  require 'fileutils'

  fn = "site/jquery.transit-#{version}.js"
  FileUtils.cp 'site/jquery.transit.js', fn
  puts "==> #{fn}"

  fn = "site/jquery.transit-#{version}.min.js"
  FileUtils.cp 'site/jquery.transit.min.js', fn
  puts "==> #{fn}"
end

task :check_deps do
  die "Error: You need Rocco. Try `gem install fl-rocco`."  unless can_run?('rocco')
  begin
    require 'proton'
  rescue LoadError => e
    die "Error: You need Proton. Try `gem install proton`."
  end
end

task :compress do
  system "cp jquery.transit.js site/"

  puts "==> Compressing (site/jquery.transit.min.js)..."
  str = File.read('jquery.transit.js')
  str = Compressor.compress_with_comment(str)
  File.open('site/jquery.transit.min.js', 'w') { |f| f.write str }
end

# Prepare
task :prebuild => [:check_deps, :compress] do
  puts "==> Generating annotated source..."
  system "rocco jquery.transit.js > /dev/null"
  system "mv ./jquery.transit.html site/source.html"
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

desc "Starts the preview site"
task :preview => [:check_deps] do
  port = ENV['port'] || 4833
  exec "cd site && proton start -p #{port}"
end
