require "./lib/environment"
require 'json'

class DR
  include HTTParty
  base_uri "http://www.dr.dk/mu"
end

class Application < Sinatra::Base

  set :environment, ENVIRONMENT

  configure do
    enable :logging
    use Rack::CommonLogger, LOG
  end

  before do
    content_type 'application/json'
  end

  get '/' do
    content_type 'text/html'
    erb :index
  end

  get '/search' do
    DR.get("/search/bundle?Title=%24like('#{Rack::Utils.escape params[:q]}*')").body
  end

  get '/get' do
    DR.get(params[:path]).body
  end

end
