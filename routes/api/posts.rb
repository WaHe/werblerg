require 'redcarpet'

def render_markdown(text)
  renderer = Redcarpet::Render::HTML.new(render_options = {})
  md = Redcarpet::Markdown.new(renderer, extensions = {})
  md.render(text)
end

class Werblerg < Sinatra::Base
  get '/api/markdownify/:text' do
    render_markdown(params[:text])
  end

  get '/mdtest' do
    s = File.read('posts/test.md')
    conn = DB.get_db
    mkdown = render_markdown(s)
    conn.exec_params('INSERT INTO posts (post_text, date, post_html) VALUES ($1, $2, $3)', [s, Time.now, mkdown])
    mkdown
  end

  get '/api/posts' do
    'You got some posts here!'
  end

  get '/api/posts/:post_id' do
    conn = DB.get_db
    res = conn.exec_params('SELECT post_html FROM posts WHERE id=$1', [params[:post_id]])
    res[0]['post_html']
  end

  get '/api/posts/:post_id/comments' do
    "You got comments for post #{params[:post_id]}"
  end
end
