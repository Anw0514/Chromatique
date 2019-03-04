class Level < ApplicationRecord
  belongs_to :user
  has_many :completed_levels, dependent: :destroy
  has_many :users, through: :completed_levels
end
