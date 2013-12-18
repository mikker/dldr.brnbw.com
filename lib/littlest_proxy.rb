require 'open-uri'

class LittlestProxy

  def initialize base
    @base = base
  end

  attr_reader :base

  def call env
    req = Rack::Request.new(env)
    path = req.params['path']
    path = base + path if path.start_with?("/")
    resp = open(path).read
    [200, {"Content-type" => "text/plain"}, [resp]]
  end

end

