class SearchController < ApplicationController
  def query
    @query_string = params[:q]
    @query_string = "title:#{@query_string}" if params[:filter] == 'title';
    @query_string = "author:#{@query_string}" if params[:filter] == 'author';

    @results = Book.tire.search do |search|
      search.query { |query| query.string @query_string }
      search.sort  { by :ratings_count, 'desc' }
      search.size 100
    end
    render :json => @results
  end
end