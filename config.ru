ROOT = File.dirname __FILE__

module Rack
  class DirectoryIndex
    def initialize(app)
      @app = app
    end
    def call(env)
      index_path = ::File.join(ROOT, 'public', Rack::Request.new(env).path.split('/'), 'index.html')
      if ::File.exists?(index_path)
        return [200, {"Content-Type" => "text/html"}, [::File.read(index_path)]]
      else
        @app.call(env)
      end
    end
  end
end

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
use Rack::DirectoryIndex

run Rack::URLMap.new('/' => Rack::Directory.new(ROOT + "/public"),
                     "/proxy" => LittlestProxy.new("http://www.dr.dk/mu"))
