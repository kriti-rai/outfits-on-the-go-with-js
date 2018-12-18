class DropSimpleHashtagHashtags < ActiveRecord::Migration[5.2]
  def change
    drop_table :simple_hashtag_hashtags
  end
end
