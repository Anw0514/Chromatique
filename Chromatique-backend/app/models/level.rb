class Level < ApplicationRecord
  belongs_to :user
  has_many :completed_levels, dependent: :destroy
  has_many :users, through: :completed_levels

  def self.public_levels
    Level.where(published: true)
  end
end
