class OutfitSerializer < ActiveModel::Serializer
  attributes :id, :caption, :image, :hashtags
  belongs_to :board
  has_many :tags
end
