class OutfitSerializer < ActiveModel::Serializer
  attributes :id, :caption, :image, :hashtags
  belongs_to :board
  belongs_to :user
  has_many :tags
end
