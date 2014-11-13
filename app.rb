require 'pg'

require 'digest/sha2'

require 'sinatra/base'
require './helpers/db'


class Werblerg < Sinatra::Base
  enable :sessions

  configure do
    set :session_secret, 'super_secret_password'
    set :public_folder, 'public'
  end

  get '/' do
    redirect '/index.html'
  end
end

require_relative 'routes/init'


Werblerg.run!
