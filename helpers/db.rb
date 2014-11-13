require 'pg'

module DB

  module_function
  def get_db
    PG::Connection.new(:dbname => 'postgres', :user => 'postgres', :password => 'password')
  end
end
