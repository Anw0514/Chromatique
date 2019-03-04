class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email
  has_many :levels
  has_many :completed_levels
end
