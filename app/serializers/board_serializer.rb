class BoardSerializer < ActiveModel::Serializer
  attributes :id, :name, :created_at
  belongs_to :user, serializer: BoardUserSerializer
  has_many :outfits
end
