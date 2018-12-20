class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email_address, :bio, :image
  has_many :boards
end
