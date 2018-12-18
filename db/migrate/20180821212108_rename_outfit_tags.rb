class RenameOutfitTags < ActiveRecord::Migration[5.2]
  def change
    rename_table :outfit_tags, :outfits_tags
  end
end
