class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email_address, :bio
  has_many :boards
end
