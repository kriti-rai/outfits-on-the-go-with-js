class RenameHashtagsToTagsInOutfits < ActiveRecord::Migration[5.2]
  def change
    rename_column :outfits, :hashtags, :tags
  end
end
