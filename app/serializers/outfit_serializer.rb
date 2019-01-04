class OutfitSerializer < ActiveModel::Serializer
  attributes :id, :caption, :image, :hashtags, :board, :user
  belongs_to :board, serializer: OutfitBoardSerializer
  belongs_to :user, serializer: BoardUserSerializer
  has_many :tags
end
