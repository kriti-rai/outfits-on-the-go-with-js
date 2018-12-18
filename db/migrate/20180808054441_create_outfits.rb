class CreateOutfits < ActiveRecord::Migration[5.2]
  def change
    create_table :outfits do |t|
      t.text :caption
      t.integer :board_id
      t.integer :user_id
      t.timestamps
    end
  end
end
