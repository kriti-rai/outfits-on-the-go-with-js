class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email_address, :bio, :image
  has_many :boards
  has_many :outfits, through: :boards
end
