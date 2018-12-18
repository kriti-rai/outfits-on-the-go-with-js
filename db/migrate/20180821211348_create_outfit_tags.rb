class CreateOutfitTags < ActiveRecord::Migration[5.2]
  def change
    create_table :outfit_tags do |t|
      t.integer :outfit_id
      t.integer :tag_id
    end
  end
end
