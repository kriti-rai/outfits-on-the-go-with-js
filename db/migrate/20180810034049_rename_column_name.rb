class RenameColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :users, :img, :image
  end
end
