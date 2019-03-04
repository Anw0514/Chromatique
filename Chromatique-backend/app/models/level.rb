class Level < ApplicationRecord
  belongs_to :creator, class_name: "User", foreign_key: "user_id"
  has_many :completed_levels, dependent: :destroy
  has_many :users, through: :completed_levels

  def self.public_levels
    Level.where(published: true)
  end
end
