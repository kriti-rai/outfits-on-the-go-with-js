class TagsController < ApplicationController

  def index
    @hashtags = Tag.all.sort_by{|tag| tag.name}
  end

  def show
    if tag = Tag.find_by(name: params[:hashtag])
      @outfits = tag.outfits
    end
  end

  def sorted_tags
    @tags = Tag.sorted
  end

end
