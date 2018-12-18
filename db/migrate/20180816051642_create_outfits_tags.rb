class CreateOutfitsTags < ActiveRecord::Migration[5.2]
  def change
    create_table :outfits_tags do |t|
      t.integer :outfit_id
      t.integer :tag_id

      t.timestamps
    end
  end
end
