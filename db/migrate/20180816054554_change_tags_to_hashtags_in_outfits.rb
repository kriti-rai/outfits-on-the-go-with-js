class ChangeTagsToHashtagsInOutfits < ActiveRecord::Migration[5.2]
  def change
    rename_column :outfits, :tags, :hashtags
  end
end
