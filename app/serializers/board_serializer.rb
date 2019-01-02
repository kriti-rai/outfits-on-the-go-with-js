class BoardSerializer < ActiveModel::Serializer
  attributes :id, :name, :created_at, :user
  belongs_to :user, serializer: BoardUserSerializer
  has_many :outfits
end
