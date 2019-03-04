class LevelSerializer < ActiveModel::Serializer
  attributes :id, :name, :grid_size, 
    :top_left, :top_right, :bottom_left, :bottom_right
  belongs_to :creator
  has_many :users
end
