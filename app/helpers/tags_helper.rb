module TagsHelper
  def render_tag_link(tag)
    link_to tag.name.prepend("#"), hashtag_path(tag.name.delete("#"))
  end
end
