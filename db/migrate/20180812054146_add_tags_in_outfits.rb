class AddTagsInOutfits < ActiveRecord::Migration[5.2]
  def change
    add_column :outfits, :tags, :text
  end
end
