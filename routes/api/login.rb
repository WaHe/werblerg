require 'securerandom'
require 'json'
require './helpers/db'

def to_hex_string(bytes)
  bytes.bytes.map { |b| sprintf('%02x',b) }.join
end

def from_hex_string(str)
  ''.tap {|binary| str.scan(/../) {|hn| binary << hn.to_i(16).chr}}
end

class Werblerg < Sinatra::Base

  before do
    @user = session[:user_id]
  end

  register do
    def auth(type)
      condition do
        redirect '/' unless send("is_#{type}?")
      end
    end
  end

  helpers do
    def is_user?
      @user != nil
    end
  end

  post '/login' do
    req = JSON request.body.string
    username = req['username']
    password = req['password']
    sha = Digest::SHA2.new
    result = DB.get_db.exec_params('SELECT pass_hash, pass_salt FROM users WHERE name=$1', [username])
    expected_hash = result[0]['pass_hash']
    test_hash = to_hex_string sha.digest(password + from_hex_string(result[0]['pass_salt']))
    if expected_hash == test_hash
      session[:user_id] = username
      'Yo nice login'
    else
      'Fuck you, get a better login'
    end
  end

  get '/logout' do
    session[:user_id] = nil
  end

  get '/restricted', :auth => :user do
    "hello, #{@user}"
  end

  post '/register' do
    req = JSON request.body.string
    username = req['username']
    password = req['password']
    salt = SecureRandom.random_bytes(16)
    sha = Digest::SHA2.new
    hash = sha.digest(password + salt)
    hash = to_hex_string hash
    salt = to_hex_string salt
    puts(hash)
    puts(hash.length)
    DB.get_db.exec_params('INSERT INTO users (name, pass_hash, pass_salt) VALUES ($1, $2, $3)', [username, hash, salt])
    'Added user successfully'
  end

end
