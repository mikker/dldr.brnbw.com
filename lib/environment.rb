ENVIRONMENT = ENV['RACK_ENV'] || :development

require 'logger'
class ::Logger; alias_method :write, :<<; end
LOG = Logger.new("log/#{ENVIRONMENT}.log")

require 'bundler/setup'
Bundler.require(:default, ENVIRONMENT)

