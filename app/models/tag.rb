class Tag < ApplicationRecord
  has_many :outfits_tags
  has_many :outfits, through: :outfits_tags, dependent: :destroy

  def self.sorted
    self.all.sort_by{|tag| tag.name}
  end
end
