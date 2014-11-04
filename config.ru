begin
  require 'bundler'
rescue LoadError
  require 'rubygems'
  require 'bundler'
end

Bundler.require(:default)
ENVIRONMENT = (ENV['RACK_ENV'] || :development).to_sym

require './lib/littlest_proxy'

require 'logger'
class ::Logger; alias_method :write, :<<; end
LOG = Logger.new("log/#{ENVIRONMENT}.log")

use Rack::CommonLogger, LOG
use Rack::Static, :urls => { '/' => 'index.html' }

run Rack::URLMap.new('/' => Rack::Directory.new("public"),
                     "/proxy" => LittlestProxy.new("http://www.dr.dk/mu"))
